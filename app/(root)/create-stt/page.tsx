"use client";

import CustomAudioPlayer from "@/components/CustomAudioPlayer";
import { Mic, MicOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const languages = [
  { code: "ar-SA", name: "Arabic (Saudi Arabia)" },
  { code: "zh-CN", name: "Chinese (Mandarin, Simplified)" },
  { code: "zh-HK", name: "Chinese (Cantonese, Traditional)" },
  { code: "nl-NL", name: "Dutch (Netherlands)" },
  { code: "en-US", name: "English (United States)" },
  { code: "en-GB", name: "English (United Kingdom)" },
  { code: "fr-FR", name: "French (France)" },
  { code: "de-DE", name: "German (Germany)" },
  { code: "it-IT", name: "Italian (Italy)" },
  { code: "ja-JP", name: "Japanese" },
  { code: "ko-KR", name: "Korean" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },
  { code: "pt-PT", name: "Portuguese (Portugal)" },
  { code: "ro-RO", name: "Romanian" },
  { code: "ru-RU", name: "Russian" },
  { code: "es-ES", name: "Spanish (Spain)" },
  { code: "es-MX", name: "Spanish (Mexico)" },
  { code: "sv-SE", name: "Swedish" },
];

const SpeechToTextWithLanguageSelection = () => {
  const [transcript, setTranscript] = useState<
    { text: string; time: string }[]
  >([]);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-US"); // Default language is English (US)
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // State to store the audio URL
  const [timeElapsed, setTimeElapsed] = useState(0); // Timer state
  const [audioLevel, setAudioLevel] = useState<number[]>(new Array(12).fill(1));
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language; // Set the selected language

      recognition.onresult = (event: any) => {
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript.trim();

          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart + " ";
          }
        }

        if (finalTranscript) {
          const now = new Date();
          const timeString = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          setTranscript((prevTranscript) => [
            ...prevTranscript,
            { text: finalTranscript, time: timeString },
          ]);
        }
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("SpeechRecognition API is not supported in this browser.");
    }
  }, [language]); // Re-run the effect when the language changes

  const startListening = async () => {
    if (recognitionRef.current) {
      setIsListening(true);
      setTimeElapsed(0);
      startTimeRef.current = Date.now();
      recognitionRef.current.start();

      // Request permission to use the microphone and start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.start();

        // Initialize Web Audio API for visualizing audio levels
        audioContextRef.current = new AudioContext();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        source.connect(analyserRef.current);

        // const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

        // const updateAudioLevels = () => {
        //   if (analyserRef.current) {
        //     analyserRef.current.getByteFrequencyData(dataArray);
        //     const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;

        //     const newLevels = audioLevel.map((_, i) =>
        //       Math.min(10, Math.max(1, Math.floor((avg / (10 - i)) * 2)))
        //     );

        //     console.log(newLevels); // Log the levels for debugging
        //     setAudioLevel(newLevels);
        //   }
        //   animationFrameRef.current = requestAnimationFrame(updateAudioLevels);
        // };

        // updateAudioLevels();

        const updateTime = () => {
          setTimeElapsed(
            Math.floor((Date.now() - (startTimeRef.current || 0)) / 1000)
          );
          animationFrameRef.current = requestAnimationFrame(updateTime);
        };

        updateTime();
      } catch (err) {
        console.error("Failed to start recording:", err);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      recognitionRef.current.stop();

      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl); // Set the audio URL to state
        };
      }
      setAudioLevel(new Array(12).fill(1)); // Reset audio levels
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const downloadTranscript = () => {
    const element = document.createElement("a");
    const file = new Blob(
      transcript.map((item) => `[${item.time}] ${item.text}\n`),
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = "recording.wav";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const deleteAudio = () => {
    setAudioUrl(null); // Delete the audio by clearing the URL
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full px-10 py-10 bg-white-1 text-black-1 relative">
      <div className="flex flex-col justify-center items-center md:items-start md:flex-row md:space-x-8 max-w-full mx-auto">
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-5xl font-extrabold text-black-1 mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Speech
            </span>{" "}
            to Text Online
          </h2>
          <p className="text-lg text-black-1 mb-10">
            Choose your language, start speaking, and see the magic happen!
          </p>
          <p className="text-lg font-bold">Ecosystem:</p>
          <p>
            Try our other apps from our ecosystem. Together combined, gives you
            a lot of power.
          </p>
          <div className="w-full h-[350px] rounded-xl mt-5 border shadow-md border-gray-300"></div>
        </div>
        <div className="md:w-2/3 flex flex-col justify-center items-center bg-white-1 bg-opacity-10 p-4 z-20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg border border-gray-200">
          <div className="flex flex-col lg:flex-row w-full">
            <div className="w-full lg:pr-3">
              <label
                htmlFor="language-select"
                className="block text-lg font-medium mb-2 text-black-1"
              >
                Choose a language:
              </label>
              <div className="relative">
                <select
                  id="language-select"
                  value={language}
                  onChange={handleLanguageChange}
                  disabled={isListening} // Disable dropdown while listening
                  className={`cursor-pointer w-full px-3 py-[1.4rem] bg-white-1 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                    isListening ? "bg-white-1 cursor-not-allowed" : "bg-white-1"
                  }`}
                >
                  {languages.map((lang) => (
                    <option
                      key={lang.code}
                      value={lang.code}
                      className="text-black-1"
                    >
                      {lang.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full mt-5 lg:mt-0 lg:pl-3">
              <p className="text-lg font-medium mb-2 text-black-1">
                Your Recording:
              </p>
              <CustomAudioPlayer audioUrl={audioUrl} onDelete={deleteAudio} />

              <button
                onClick={downloadAudio}
                className={`mt-4 w-full py-2 px-4 rounded-lg transition-colors ${
                  audioUrl
                    ? "bg-green-600 hover:bg-green-700 text-white-1 cursor-pointer"
                    : "bg-gray-400 text-white-1 cursor-not-allowed"
                }`}
              >
                Download Recording
              </button>
            </div>
          </div>

          {/* Microphone Button with Timer and Audio Levels */}
          <div className="flex flex-col items-center mt-10">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-[80px] h-[80px] p-4 rounded-full text-white-1 transition-colors flex justify-center items-center ${
                isListening
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-[#3841e6] hover:bg-blue-600"
              }`}
            >
              {isListening ? <MicOff size={35} /> : <Mic size={35} />}
            </button>

            {/* <div className="flex space-x-1 mt-4">
              {audioLevel.map((level, index) => (
                <div
                  key={index}
                  className={`w-2 h-6 bg-gray-300 rounded transition-all duration-200`}
                  style={{
                    height: `${level * 10}%`,
                    backgroundColor:
                      level > 1
                        ? `rgba(56, 65, 230, ${level / 10})`
                        : "rgba(200, 200, 200, 0.5)",
                  }}
                ></div>
              ))}
            </div> */}

            {/* Timer */}
            <p className="mt-2 text-sm text-gray-500">
              {formatTime(timeElapsed)}
            </p>
          </div>

          <div className="mt-5 w-full">
            <p className="text-lg font-medium mb-2 text-black-1">
              Live Transcript:
            </p>
            <div className="p-4 bg-gray-50 rounded-lg min-h-[300px] space-y-2 border">
              {transcript.length === 0 ? ( // Check if the transcript is empty
                <div>
                  <p className="text-gray-400 mb-4">
                    1. Select your preferred language.
                  </p>
                  <p className="text-gray-400 mb-4">
                    2. Click "Start Listening" and begin speaking.
                  </p>
                  <p className="text-gray-400 mb-4">
                    3. Your speech will be transcribed below in real-time.
                  </p>
                  <p className="text-gray-400 mb-4">
                    4. Click "Stop Listening" to end the transcription.
                  </p>
                  <p className="text-gray-400">
                    Note: You cannot change the language while listening is
                    active.
                  </p>
                </div>
              ) : (
                transcript.map((item, index) => (
                  <div key={index} className="flex items-center justify-start">
                    <span className="text-gray-500 text-sm w-20">
                      {item.time}
                    </span>
                    <span className="text-gray-900 ml-2">{item.text}</span>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={downloadTranscript}
              className={`mt-4 w-full py-2 px-4 rounded-lg transition-colors ${transcript.length === 0 ? "bg-gray-400 text-white-1 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white-1 cursor-pointer"}`}
            >
              Download Transcript
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToTextWithLanguageSelection;
