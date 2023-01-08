import {
  StripeElementsOptions,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';

export interface PaymentTabs extends StripePaymentElementOptions {
  layout: string;
}
