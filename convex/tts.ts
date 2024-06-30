import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";

// create podcast mutation
export const createTts = mutation({
  args: {
    audioStorageId: v.id("_storage"),
    ttsTitle: v.string(),
    ttsDescription: v.string(),
    audioUrl: v.string(),
    imageUrl: v.string(),
    imageStorageId: v.id("_storage"),
    voicePrompt: v.string(),
    imagePrompt: v.string(),
    voiceType: v.string(),
    views: v.number(),
    audioDuration: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    return await ctx.db.insert("tts", {
      audioStorageId: args.audioStorageId,
      user: user[0]._id,
      ttsTitle: args.ttsTitle,
      ttsDescription: args.ttsDescription,
      audioUrl: args.audioUrl,
      imageUrl: args.imageUrl,
      imageStorageId: args.imageStorageId,
      author: user[0].name,
      authorId: user[0].clerkId,
      voicePrompt: args.voicePrompt,
      imagePrompt: args.imagePrompt,
      voiceType: args.voiceType,
      views: args.views,
      authorImageUrl: user[0].imageUrl,
      audioDuration: args.audioDuration,
    });
  },
});

// this mutation is required to generate the url after uploading the file to the storage.
export const getUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

// this query will get all the podcasts based on the voiceType of the podcast , which we are showing in the Similar Podcasts section.
export const getTtsByVoiceType = query({
  args: {
    ttsId: v.id("tts"),
  },
  handler: async (ctx, args) => {
    const tts = await ctx.db.get(args.ttsId);

    return await ctx.db
      .query("tts")
      .filter((q) =>
        q.and(
          q.eq(q.field("voiceType"), tts?.voiceType),
          q.neq(q.field("_id"), args.ttsId)
        )
      )
      .collect();
  },
});

// this query will get all the tts.
export const getAllTts = query({
  handler: async (ctx) => {
    return await ctx.db.query("tts").order("desc").collect();
  },
});

// this query will get the tts by the ttsId.
export const getTtsById = query({
  args: {
    ttsId: v.id("tts"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.ttsId);
  },
});

// this query will get the tts based on the views of the tts , which we are showing in the Trending Tts section.
export const getTrendingTts = query({
  handler: async (ctx) => {
    const tts = await ctx.db.query("tts").collect();

    return tts.sort((a, b) => b.views - a.views).slice(0, 4);
  },
});

// this query will get the tts by the authorId.
export const getTtsByAuthorId = query({
  args: {
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    const tts = await ctx.db
      .query("tts")
      .filter((q) => q.eq(q.field("authorId"), args.authorId))
      .collect();

    const totalListeners = tts.reduce((sum, tts) => sum + tts.views, 0);

    return { tts, listeners: totalListeners };
  },
});

// this query will get the podcast by the search query.
export const getTtsBySearch = query({
  args: {
    search: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.search === "") {
      return await ctx.db.query("tts").order("desc").collect();
    }

    const authorSearch = await ctx.db
      .query("tts")
      .withSearchIndex("search_author", (q) => q.search("author", args.search))
      .take(10);

    if (authorSearch.length > 0) {
      return authorSearch;
    }

    const titleSearch = await ctx.db
      .query("tts")
      .withSearchIndex("search_title", (q) => q.search("ttsTitle", args.search))
      .take(10);

    if (titleSearch.length > 0) {
      return titleSearch;
    }

    return await ctx.db
      .query("tts")
      .withSearchIndex("search_body", (q) =>
        q.search("ttsDescription" || "ttsTitle", args.search)
      )
      .take(10);
  },
});

// this mutation will update the views of the tts.
export const updateTtsViews = mutation({
  args: {
    ttsId: v.id("tts"),
  },
  handler: async (ctx, args) => {
    const tts = await ctx.db.get(args.ttsId);

    if (!tts) {
      throw new ConvexError("Tts not found");
    }

    return await ctx.db.patch(args.ttsId, {
      views: tts.views + 1,
    });
  },
});

// this mutation will delete the tts.
export const deleteTts = mutation({
  args: {
    ttsId: v.id("tts"),
    imageStorageId: v.id("_storage"),
    audioStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const tts = await ctx.db.get(args.ttsId);

    if (!tts) {
      throw new ConvexError("Tts not found");
    }

    await ctx.storage.delete(args.imageStorageId);
    await ctx.storage.delete(args.audioStorageId);
    return await ctx.db.delete(args.ttsId);
  },
});

export const getPaginatedTts = query({
  args: { limit: v.optional(v.number()), offset: v.optional(v.number()) },
  handler: async (ctx, { limit = 8, offset = 0 }) => {
    const allTts = await ctx.db.query("tts").order("desc").take(1000);
    const totalItems = allTts.length;
    const paginatedTts = allTts.slice(offset, offset + limit);
    return { items: paginatedTts, totalItems };
  },
});
