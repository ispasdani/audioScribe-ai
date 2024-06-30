"use node";

import { v } from "convex/values";
import { action, internalAction } from "./_generated/server"; // Import Id type
import { Id } from "./_generated/dataModel";
import Stripe from "stripe";
import { internal } from "./_generated/api"; // Ensure internal API is properly referenced

type CreateCheckoutSessionArgs = {
  userId: Id<"users">; // Ensure userId is correctly typed
  planId: Id<"plans">; // Ensure planId is correctly typed
};

type Plan = {
  _id: Id<"plans">;
  name: string;
  price: number;
  credits: number;
};

export const fulfill = internalAction({
  args: { signature: v.string(), payload: v.string() },
  handler: async ({ runMutation }, { signature, payload }) => {
    const stripe = new Stripe(process.env.STRIPE_KEY_SECRET!, {
      apiVersion: "2024-06-20",
    });

    const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET as string;
    try {
      // This call verifies the request
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      );
      if (event.type === "checkout.session.completed") {
        const stripeId = (event.data.object as { id: string }).id;
        // Mark the payment as fulfilled
        await runMutation(internal.payments.fulfill, { stripeId });
      }
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },
});

export const createCheckoutSession = action({
  args: { userId: v.id("users"), planId: v.id("plans") },
  handler: async (
    { runQuery, runMutation },
    { userId, planId }: CreateCheckoutSessionArgs
  ): Promise<string | null> => {
    const domain =
      process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
    const stripe = new Stripe(process.env.STRIPE_KEY_SECRET!, {
      apiVersion: "2024-06-20",
    });

    // Convert planId to the correct type if necessary
    const planIdTyped = planId as Id<"plans">;

    const plan: Plan | null = await runQuery(internal.plans.getPlan, {
      planId: planIdTyped,
    });
    if (!plan) {
      throw new Error("Plan not found");
    }
    const amount: number = plan.price * 100;

    const paymentId: Id<"payments"> = await runMutation(
      internal.payments.createPayment,
      {
        userId,
        amount,
        planId: planIdTyped,
      }
    );

    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "EUR",
              unit_amount: amount,
              product_data: { name: plan.name },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${domain}/profile}`,
        cancel_url: `${domain}/cancel`,
        // automatic_tax: { enabled: true },
      });

    await runMutation(internal.payments.markPending, {
      paymentId,
      stripeId: session.id,
    });

    return session.url;
  },
});

export const handleStripeWebhook = action({
  args: { signature: v.string(), payload: v.string() },
  handler: async ({ runMutation }, { signature, payload }) => {
    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: "2024-06-20",
    });
    const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET!;

    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      );

      if (event.type === "checkout.session.completed") {
        const stripeId = (event.data.object as { id: string }).id;
        await runMutation(internal.payments.fulfillPayment, { stripeId });
      }

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: (err as { message: string }).message };
    }
  },
});
