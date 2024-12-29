import type { FastifyReply, FastifyRequest } from "fastify";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

export const createSubscription = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { email, priceId, paymentMethodId, trialPeriodDays } = request.body as {
    email: string;
    priceId: string;
    paymentMethodId?: string;
    trialPeriodDays?: number;
  };

  try {
    const customer = await stripe.customers.create({
      email,
    });

    if (paymentMethodId)
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id,
      });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      trial_period_days: trialPeriodDays || 7,
      expand: ["latest_invoice.payment_intent"],
    });

    let clientSecret = null;
    if (
      subscription.latest_invoice &&
      typeof subscription.latest_invoice !== "string"
    ) {
      const paymentIntent = subscription.latest_invoice
        .payment_intent as Stripe.PaymentIntent;
      clientSecret = paymentIntent?.client_secret || null;
    }

    reply.send({
      subscriptionId: subscription.id,
      status: subscription.status,
      clientSecret,
      trialEnd: subscription.trial_end,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe Error:", error.message);
      reply.status(500).send({ error: error.message });
    } else if (error instanceof Error) {
      console.error("General Error:", error.message);
      reply.status(500).send({ error: error.message });
    } else {
      console.error("Unexpected Error:", error);
      reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};

export const checkSubscriptionStatus = async (
  request: FastifyRequest<{
    Params: { customerId: string; productId: string };
  }>,
  reply: FastifyReply,
) => {
  const { customerId, productId } = request.params;

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
    });

    const activeSubscription = subscriptions.data.find((subscription) =>
      subscription.items.data.some((item) => item.price.product === productId),
    );

    if (
      activeSubscription &&
      ["active", "trialing"].includes(activeSubscription.status)
    ) {
      reply.send({
        isSubscribed: true,
        subscriptionId: activeSubscription.id,
        status: activeSubscription.status,
      });
    } else {
      reply.send({ isSubscribed: false });
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe Error:", error.message);
      reply.status(500).send({ error: error.message });
    } else if (error instanceof Error) {
      console.error("General Error:", error.message);
      reply.status(500).send({ error: error.message });
    } else {
      console.error("Unexpected Error:", error);
      reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};

export const createPaymentLink = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { priceId, email, userId, trialPeriodDays } = request.body as {
    priceId: string;
    email: string;
    userId?: string;
    trialPeriodDays?: number;
  };

  try {
    const metadata: Record<string, string | null> = {
      email: email || null,
    };

    if (userId) {
      metadata.userId = userId;
    }

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      payment_method_collection: "if_required",
      subscription_data: {
        trial_period_days: trialPeriodDays || 7,
      },
      metadata,
      allow_promotion_codes: true,
    });

    const prefilledUrl = email
      ? `${paymentLink.url}?prefilled_email=${encodeURIComponent(email)}`
      : paymentLink.url;

    reply.send({ url: prefilledUrl });
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe Error:", error.message);
      reply.status(500).send({ error: error.message });
    } else if (error instanceof Error) {
      console.error("General Error:", error.message);
      reply.status(500).send({ error: error.message });
    } else {
      console.error("Unexpected Error:", error);
      reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }
};

export const handleWebhook = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const sig = request.headers["stripe-signature"];
  const buf = request.body as Buffer;

  let event = null;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig || "",
      process.env.STRIPE_WEBHOOK_SECRET || "",
    );
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe Error:", error.message);
      reply.status(500).send({ error: error.message });
    } else if (error instanceof Error) {
      console.error("General Error:", error.message);
      reply.status(500).send({ error: error.message });
    } else {
      console.error("Unexpected Error:", error);
      reply.status(500).send({ error: "An unexpected error occurred" });
    }
  }

  const subscription = event?.data.object as Stripe.Subscription;
  const customerId = subscription.customer as string;
  switch (event?.type) {
    case "customer.subscription.created":
      console.log("Subscription created for customer:", customerId);
      // TODO: Save customerId to database, associated with user
      break;
    case "customer.subscription.trial_will_end":
      console.log(`Trial ending soon for subscription ${subscription.id}`);
      // TODO: Notify the customer to add a payment method
      break;
    case "invoice.paid":
      console.log("Invoice paid:", event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event?.type}`);
  }

  reply.status(200).send({ received: true });
};
