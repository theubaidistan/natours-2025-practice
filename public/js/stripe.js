/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
import { loadStripe } from '@stripe/stripe-js';

// const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);

const stripe = Stripe(
  'pk_test_51RxYnzIbsoKiZDAd51PrbsDlgNIUnlA2a3OBqjPKxtypyT00T2E9iVtlM4EVndUDHwBzMv2ySP4TZGqEB9wqCS6000IaQYmzy6',
);
/*
const stripe = loadStripe(
  'pk_test_51RxYnzIbsoKiZDAd51PrbsDlgNIUnlA2a3OBqjPKxtypyT00T2E9iVtlM4EVndUDHwBzMv2ySP4TZGqEB9wqCS6000IaQYmzy6',
);
*/
export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API

    /*
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    */

    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    console.log(session);

    // 2) Create checkout form + chance credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
