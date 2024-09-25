import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { Button } from "../../Button/Button";
import { apiHeader, BaseURL } from "../../../config/apiUrl";
import { Post } from "../../../Axios/AxiosFunctions";
import styles from "./CardForm.module.css";
import { toast } from "react-toastify";

const CardForm = ({ secret, amount, setAmount, setShow, userId, onClick }) => {
  const { access_token } = useSelector((state) => state.authReducer);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    if (isChecked) {
      const cardData = await stripe.confirmCardSetup(secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (cardData?.error) {
        setErrorMessage(cardData?.error.message);
        setIsProcessing(false);
      } else {
        const url = BaseURL("stripe/sponsor-user");
        const data = {
          cardId: cardData?.setupIntent?.payment_method,
          amount,
          userId,
        };
        const response = await Post(url, data, apiHeader(access_token));
        if (response) {
          onClick();
          setAmount(0);
          setShow(false);
          toast.success("Payment Successful");
        }
        setErrorMessage("");
        setIsProcessing(false);
      }
    } else {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
      } else {
        const url = BaseURL("stripe/sponsor-user");
        const data = {
          cardId: paymentMethod?.id,
          amount,
          userId,
        };
        const response = await Post(url, data, apiHeader(access_token));
        if (response) {
          onClick();
          setAmount(0);
          setShow(false);
          toast.success("Payment Successful");
        }
        setErrorMessage("");
        setIsProcessing(false);
      }
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="saveCard"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="saveCard" className={styles.label}>
          Save card for future payments
        </label>
      </div>
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        label={isProcessing ? "Processing..." : "Pay"}
      />
    </form>
  );
};

export default CardForm;
