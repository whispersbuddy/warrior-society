import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BsTrash } from "react-icons/bs";

import { Button } from "../../../../Component/Button/Button";
import { Loader } from "../../../../Component/Loader";
import AddCardForm from "../../../../Component/Stripe/CardForm/AddCardForm";
import StripeContext from "../../../../Component/Stripe/StripeContext";
import { apiHeader, BaseURL } from "../../../../config/apiUrl";
import { Delete, Get } from "../../../../Axios/AxiosFunctions";
import classes from "./Card.module.css";

const Card = () => {
  const { access_token } = useSelector((state) => state?.authReducer);

  const [cards, setCards] = useState([]);
  const [secret, setSecret] = useState("");
  const [addCard, setAddCard] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const url = BaseURL("stripe/get-payment-methods");
    setLoading(true);
    const response = await Get(url, access_token);
    if (response) {
      setCards(response.data.paymentMethods);
      setSecret(response.data.clientSecret);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    getData();
    setAddCard(false);
  };

  const handleDelete = async (id) => {
    const apiUrl = BaseURL(`stripe/payment-method/${id}`);
    const response = await Delete(apiUrl, apiHeader(access_token));
    if (response) {
      toast.success("Deleted Successfully");
      getData();
    }
  };

  return (
    <div className={classes.container}>
      <Container>
        {addCard && secret ? (
          <StripeContext>
            <AddCardForm
              secret={secret}
              setAddCard={setAddCard}
              onClick={handleSubmit}
            />
          </StripeContext>
        ) : (
          <div className={classes.cardList}>
            {loading ? (
              <Loader />
            ) : !cards?.length && !loading ? (
              <p className="text-center fs-4">No Card found</p>
            ) : (
              cards.map((card) => (
                <div key={card?.id} className={classes.card}>
                  <div className={classes.cardContent}>
                    <div>
                      <h4>**** **** **** {card.card?.last4}</h4>
                      <p>
                        Expires: {card.card?.exp_month}/{card.card?.exp_year}
                      </p>
                    </div>
                    <div>
                      <p className={classes.cardBrand}>{card.card?.brand}</p>
                      <p
                        className={classes.cardBrand}
                        onClick={() => handleDelete(card?.id)}
                      >
                        <BsTrash
                          size={20}
                          role="button"
                          className="text-danger"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        <div className={classes.buttonContainer}>
          {addCard ? null : (
            <>
              <Button
                onClick={() => setAddCard(true)}
                label={"Add Card"}
                className="mt-4"
              />
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Card;
