import { Description } from "@radix-ui/react-toast";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tts: defineTable({
    user: v.id("users"),
    ttsTitle: v.string(),
    ttsDescription: v.string(),
    audioUrl: v.optional(v.string()),
    audioStorageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    author: v.string(),
    authorId: v.string(),
    authorImageUrl: v.string(),
    voicePrompt: v.string(),
    imagePrompt: v.string(),
    voiceType: v.string(),
    audioDuration: v.number(),
    views: v.number(),
  })
    .searchIndex("search_author", { searchField: "author" })
    .searchIndex("search_title", { searchField: "ttsTitle" })
    .searchIndex("search_body", { searchField: "ttsDescription" }),
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
    credits: v.number(),
  }),
  payments: defineTable({
    userId: v.id("users"),
    stripeId: v.string(),
    status: v.string(),
    amount: v.number(),
    planId: v.id("plans"),
    createdAt: v.string(),
  }).index("stripeIdIndex", ["stripeId"]),
  plans: defineTable({
    name: v.string(),
    price: v.number(),
    credits: v.number(),
    imageGeneration: v.number(),
    description: v.string(),
    messageOne: v.string(),
    messageTwo: v.string(),
    messageThree: v.string(),
    messageFour: v.string(),
    messageFive: v.string(),
    messageSix: v.string(),
  }),
});
