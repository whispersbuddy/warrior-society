import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

import { Button } from "../../Button/Button";
import styles from "./CardForm.module.css";

const AddCardForm = ({ secret, setAddCard, onClick }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const cardData = await stripe.confirmCardSetup(secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (cardData?.error) {
      setErrorMessage(cardData?.error.message);
      setIsProcessing(false);
    } else {
      toast.success("Added successfully");
      onClick();
      setErrorMessage("");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.cardInput}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      {errorMessage && (
        <div className={styles.cardError} role="alert">
          {errorMessage}
        </div>
      )}
      <Button
        className="mt-4"
        type="Add"
        disabled={!stripe || isProcessing}
        label={isProcessing ? "Adding..." : "Add"}
      />
      <Button
        onClick={() => setAddCard(false)}
        label={"Cancel"}
        className="ms-4"
      />
    </form>
  );
};

export default AddCardForm;
