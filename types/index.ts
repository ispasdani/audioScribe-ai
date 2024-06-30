/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from "react";

import { Id } from "@/convex/_generated/dataModel";

export interface EmptyStateProps {
  title: string;
  search?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export interface TopTtstersProps {
  _id: Id<"users">;
  _creationTime: number;
  email: string;
  imageUrl: string;
  clerkId: string;
  name: string;
  podcast: {
    podcastTitle: string;
    podcastId: Id<"tts">;
  }[];
  totalPodcasts: number;
}

export interface TtsProps {
  _id: Id<"tts">;
  _creationTime: number;
  audioStorageId?: Id<"_storage"> | null;
  user: Id<"users">;
  ttsTitle: string;
  ttsDescription: string;
  audioUrl: string | null;
  imageUrl: string | null;
  imageStorageId: Id<"_storage"> | null;
  author: string;
  authorId: string;
  authorImageUrl: string;
  voicePrompt: string;
  imagePrompt: string | null;
  voiceType: string;
  audioDuration: number;
  views: number;
}

export interface ProfileTtsProps {
  tts: TtsProps[];
  listeners: number;
}

export interface GenerateTtsProps {
  voiceType: string;
  userId: string;
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
  setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  voicePrompt: string;
  setVoicePrompt: Dispatch<SetStateAction<string>>;
  setAudioDuration: Dispatch<SetStateAction<number>>;
}

export interface GenerateThumbnailProps {
  userId: string;
  setImage: Dispatch<SetStateAction<string>>;
  setImageStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  image: string;
  imagePrompt: string;
  setImagePrompt: Dispatch<SetStateAction<string>>;
}

export interface LatestTtsCardProps {
  imgUrl: string;
  title: string;
  duration: string;
  index: number;
  audioUrl: string;
  author: string;
  views: number;
  ttsId: Id<"tts">;
}

export interface TtsDetailPlayerProps {
  audioUrl: string;
  ttsTitle: string;
  author: string;
  isOwner: boolean;
  imageUrl: string;
  ttsId: Id<"tts">;
  imageStorageId: Id<"_storage">;
  audioStorageId: Id<"_storage">;
  authorImageUrl: string;
  authorId: string;
}

export interface AudioProps {
  title: string;
  audioUrl: string;
  author: string;
  imageUrl: string;
  podcastId?: string;
  ttsId?: string;
}

export interface AudioContextType {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

export interface TtsCardProps {
  imgUrl: string;
  title: string;
  description: string;
  ttsId: Id<"tts">;
}

export interface CarouselProps {
  fansLikeDetail: TopTtstersProps[];
}

export interface ProfileCardProps {
  ttsData: ProfileTtsProps;
  imageUrl: string;
  userFirstName: string;
}

export type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};
