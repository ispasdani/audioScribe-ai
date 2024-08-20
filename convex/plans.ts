import { v } from "convex/values";
import { internalMutation, internalQuery, query } from "./_generated/server";

// Get plan by ID
export const getPlan = internalQuery({
  args: { planId: v.id("plans") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.planId);
  },
});

// this query will get all the podcasts.
export const getAllPlans = query({
  handler: async (ctx) => {
    return await ctx.db.query("plans").collect();
  },
});

// Create plan mutation
export const createPlan = internalMutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("plans", {
      name: args.name,
      price: args.price,
      credits: args.credits,
      imageGeneration: args.imageGeneration,
      description: args.description,
      messageOne: args.messageOne,
      messageTwo: args.messageTwo,
      messageThree: args.messageThree,
      messageFour: args.messageFour,
      messageFive: args.messageFive,
      messageSix: args.messageSix,
    });
  },
});

// Update plan mutation
export const updatePlan = internalMutation({
  args: {
    planId: v.id("plans"),
    name: v.optional(v.string()),
    price: v.optional(v.number()),
    credits: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const updates = {
      ...(args.name !== undefined && { name: args.name }),
      ...(args.price !== undefined && { price: args.price }),
      ...(args.credits !== undefined && { credits: args.credits }),
    };

    return await ctx.db.patch(args.planId, updates);
  },
});

// Delete plan mutation
export const deletePlan = internalMutation({
  args: {
    planId: v.id("plans"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.planId);
  },
});
