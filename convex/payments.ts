import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

// Create payment mutation
export const createPayment = internalMutation({
  args: {
    userId: v.id("users"),
    amount: v.number(),
    planId: v.id("plans"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("payments", {
      userId: args.userId,
      stripeId: "",
      status: "pending",
      amount: args.amount,
      planId: args.planId,
      createdAt: new Date().toString(),
    });
  },
});

// convex/payments.ts (continued)
export const fulfill = internalMutation({
  args: { stripeId: v.string() },
  handler: async (ctx, { stripeId }) => {
    const payment = await ctx.db
      .query("payments")
      .withIndex("stripeIdIndex", (q) => q.eq("stripeId", stripeId))
      .unique();
    if (!payment) throw new ConvexError("Payment not found");

    await ctx.db.patch(payment._id, { status: "fulfilled" });

    const user = await ctx.db.get(payment.userId);
    const plan = await ctx.db.get(payment.planId);
    const newCredits = (user?.credits ?? 0) + (plan?.credits ?? 0);

    await ctx.db.patch(user?._id!, { credits: newCredits });
  },
});

// Mark payment as pending
export const markPending = internalMutation({
  args: {
    paymentId: v.id("payments"),
    stripeId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.paymentId, {
      stripeId: args.stripeId,
      status: "pending",
    });
  },
});

// Fulfill payment
export const fulfillPayment = internalMutation({
  args: { stripeId: v.string() },
  handler: async (ctx, args) => {
    const payment = await ctx.db
      .query("payments")
      .withIndex("stripeIdIndex", (q) => q.eq("stripeId", args.stripeId))
      .unique();
    if (!payment) throw new ConvexError("Payment not found");

    await ctx.db.patch(payment._id, { status: "fulfilled" });

    const user = await ctx.db.get(payment.userId);
    const plan = await ctx.db.get(payment.planId);
    const newCredits = (user?.credits ?? 0) + (plan?.credits ?? 0);

    await ctx.db.patch(user?._id!, { credits: newCredits });
  },
});

// Get payment by ID
export const getPaymentById = query({
  args: { paymentId: v.id("payments") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.paymentId);
  },
});
