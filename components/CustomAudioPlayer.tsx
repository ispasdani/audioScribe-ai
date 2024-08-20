import { useState, useEffect, useRef } from "react";
import { Play, Pause, Trash, CassetteTape } from "lucide-react";

const CustomAudioPlayer = ({
  audioUrl,
  onDelete,
}: {
  audioUrl: string | null;
  onDelete: () => void;
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<string>("0:00");
  const [size, setSize] = useState<string>("0 kB");

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        // Calculate and set the duration
        const totalSeconds = Math.floor(audioRef.current?.duration || 0);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setDuration(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      };

      audioRef.current.onended = () => setIsPlaying(false); // Reset to pause when the audio ends
    }
  }, []);

  useEffect(() => {
    if (audioUrl) {
      fetch(audioUrl)
        .then((response) => response.blob())
        .then((blob) => {
          // Calculate and set the size
          const sizeInKB = (blob.size / 1024).toFixed(1);
          setSize(`${sizeInKB} kB`);
        });
    }
  }, [audioUrl]);

  return (
    <div className="flex items-center justify-between w-full p-3 bg-white-1 rounded-lg shadow-md border border-gray-300">
      <div className="flex items-center">
        <div className="p-2 bg-gray-200 rounded-full">
          <CassetteTape size={22} />
        </div>
        <div className="ml-4">
          <p className="text-gray-800 font-semibold">recording.wav</p>
          <p className="text-gray-500 text-sm">
            {duration} | {size}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={togglePlayPause}
          className={`p-2 rounded-full ${audioUrl ? "bg-green-600 hover:bg-green-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
        >
          {isPlaying ? (
            <Pause className="text-white-1" size={20} />
          ) : (
            <Play className="text-white-1" size={20} />
          )}
        </button>
        <button
          onClick={onDelete}
          className={`ml-2 p-2 rounded-full  ${audioUrl ? "hover:bg-red-300 bg-red-500 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
        >
          <Trash className="text-white-1" size={20} />
        </button>
      </div>
      <audio ref={audioRef} src={audioUrl ? audioUrl : ""} className="hidden" />
    </div>
  );
};

export default CustomAudioPlayer;
