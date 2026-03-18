import { NextRequest, NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { errorResponse } from "@/lib/api/response";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return errorResponse("Server misconfigured", 500);
  }

  const stripe = getStripeServer();
  const supabaseAdmin = getSupabaseAdmin();

  const tierLimits: Record<string, { tier: string; limit: number }> = {};
  if (process.env.STRIPE_BASIC_PRICE_ID) {
    tierLimits[process.env.STRIPE_BASIC_PRICE_ID] = { tier: "basic", limit: 30 };
  }
  if (process.env.STRIPE_PREMIUM_PRICE_ID) {
    tierLimits[process.env.STRIPE_PREMIUM_PRICE_ID] = { tier: "premium", limit: 100 };
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return errorResponse("Missing signature", 400);
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return errorResponse("Invalid signature", 400);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      if (session.metadata?.user_id) {
        await supabaseAdmin
          .from("profiles")
          .update({
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
          })
          .eq("id", session.metadata.user_id);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const priceId = subscription.items.data[0]?.price?.id;
      const config = priceId ? tierLimits[priceId] : null;

      if (config) {
        await supabaseAdmin
          .from("profiles")
          .update({
            subscription_tier: config.tier,
            generations_limit: config.limit,
          })
          .eq("stripe_subscription_id", subscription.id);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await supabaseAdmin
        .from("profiles")
        .update({
          subscription_tier: "free",
          generations_limit: 3,
          stripe_subscription_id: null,
        })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.warn("Payment failed for customer:", invoice.customer);
      break;
    }

    default:
      console.log(`Unhandled Stripe webhook event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
