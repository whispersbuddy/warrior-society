import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import ModalSkeleton from "../ModalSkeleton";
import { Button } from "../../Component/Button/Button";
import StripeContext from "../../Component/Stripe/StripeContext";
import CardForm from "../../Component/Stripe/CardForm/CardForm";
import { Loader } from "../../Component/Loader";
import { apiHeader, BaseURL } from "../../config/apiUrl";
import { Get, Post } from "../../Axios/AxiosFunctions";
import classes from "./AddCardModal.module.css";

const AddCardModal = ({
  show,
  setShow,
  amount,
  setAmount,
  userId,
  onClick,
}) => {
  const { access_token } = useSelector((state) => state.authReducer);
  const [cards, setCards] = useState([]);
  const [secret, setSecret] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [addCard, setAddCard] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const url = BaseURL("stripe/get-payment-methods");
    setDataLoading(true);
    const response = await Get(url, access_token);
    if (response) {
      setCards(response.data.paymentMethods);
      setSecret(response.data.clientSecret);
    }
    setDataLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = async () => {
    if (!selectedCard) {
      toast.error("Please select a card to proceed");
      return;
    }
    const url = BaseURL("stripe/sponsor-user");
    const data = {
      cardId: selectedCard,
      amount,
      userId,
    };
    setLoading(true);
    const response = await Post(url, data, apiHeader(access_token));
    if (response) {
      onClick();
      setAmount(0);
      setShow(false);
      toast.success("Payment Successful");
    }
    setLoading(false);
  };

  const handleRadioChange = (cardId) => {
    setSelectedCard(cardId);
  };

  return (
    <ModalSkeleton
      width={"600px"}
      header={"Select Payment Method"}
      setShow={setShow}
      show={show}
      borderRadius={"10px"}
    >
      <div className={classes.main}>
        {addCard ? (
          <div className="mt-4">
            <StripeContext>
              {secret && (
                <CardForm
                  secret={secret}
                  amount={amount}
                  setAmount={setAmount}
                  setShow={setShow}
                  userId={userId}
                  onClick={onClick}
                />
              )}
            </StripeContext>
          </div>
        ) : (
          <div className={classes.cardList}>
            {dataLoading && <Loader />}
            {!cards.length && !dataLoading ? (
              <p className="text-center fs-4">No card found</p>
            ) : (
              cards.map((card) => (
                <div
                  key={card?.id}
                  className={
                    classes.card +
                    " " +
                    (selectedCard === card.id ? classes.selectedCard : "")
                  }
                  onClick={() => handleRadioChange(card.id)}
                >
                  <div className={classes.cardContent}>
                    <div>
                      <h4>**** **** **** {card.card?.last4}</h4>
                      <p>
                        Expires: {card.card?.exp_month}/{card.card?.exp_year}
                      </p>
                    </div>
                    <div>
                      <p className={classes.cardBrand}>{card.card?.brand}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        <div className={classes.divider}>
          <div className={classes.line}></div>
          <span className={classes.text}>Or</span>
          <div className={classes.line}></div>
        </div>
        <Button
          onClick={() => setAddCard(!addCard)}
          label={addCard ? "Select Card" : "Add New Card"}
          className={classes.addCardBtn}
        />
        {!addCard && (
          <Button
            onClick={handleClick}
            disabled={loading}
            label={loading ? "Processing..." : "Pay"}
          />
        )}
      </div>
    </ModalSkeleton>
  );
};

export default AddCardModal;
