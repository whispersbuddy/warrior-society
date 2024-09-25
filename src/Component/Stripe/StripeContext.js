import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51JgkdmKnJ4EeoOXBwvfCtW8iRZdcAmdSS72zHKTNN2Ut3LZKtL5ZgXMLUngxyXGRnlI3cBxdegHx5M3nrqcV35z900lPlpKhoz"
);

const StripeContext = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeContext;
