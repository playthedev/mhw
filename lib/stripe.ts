import Stripe from "stripe"

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-05-27.dahlia",
    })
  }
  return _stripe
}

// Keep named export for backwards compatibility in API routes
export const stripe = {
  checkout: {
    sessions: {
      create: (params: any) => getStripe().checkout.sessions.create(params),
    },
  },
  webhooks: {
    constructEvent: (body: string, sig: string, secret: string) =>
      getStripe().webhooks.constructEvent(body, sig, secret),
  },
}
