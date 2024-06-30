import { action } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";
import { api, internal } from "./_generated/api";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string(), userId: v.string() },
  handler: async (ctx, { input, voice, userId }) => {
    // Verify if the user exists
    const user = await ctx.runQuery(api.users.getUserById, { clerkId: userId });

    // Subtract one credit from the user
    await ctx.runMutation(internal.users.subtractUserCredit, {
      userId: user._id,
    });

    // Generate the audio
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice as SpeechCreateParams["voice"],
      input,
    });

    const buffer = await mp3.arrayBuffer();

    return buffer;
  },
});

export const generateImageAction = action({
  args: { prompt: v.string(), userId: v.string() },
  handler: async (ctx, { prompt, userId }) => {
    // Verify if the user exists
    const user = await ctx.runQuery(api.users.getUserById, { clerkId: userId });

    // Subtract one credit from the user
    await ctx.runMutation(internal.users.subtractUserCredit, {
      userId: user._id,
    });

    // Generate the image
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    const url = response.data[0].url;

    if (!url) {
      throw new ConvexError("Error generating image");
    }

    const imageResponse = await fetch(url);
    const buffer = await imageResponse.arrayBuffer();

    return buffer;
  },
});
