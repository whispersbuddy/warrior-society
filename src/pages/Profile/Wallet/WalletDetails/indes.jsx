import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { BaseURL } from "../../../../config/apiUrl";
import { Get } from "../../../../Axios/AxiosFunctions";
import classes from "./WalletDetails.module.css";

const WalletDetails = () => {
  const { access_token } = useSelector((state) => state.authReducer);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const url = BaseURL("stripe/get-balance");
    setLoading(true);
    const response = await Get(url, access_token);
    if (response) {
      let availableBalance = response.data?.available?.reduce(
        (a, b) => a + b?.amount / 100,
        0
      );
      let pendingBalance = response.data?.pending?.reduce(
        (a, b) => a + b?.amount / 100,
        0
      );
      setBalance(availableBalance + pendingBalance);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes.profilePage}>
      <Container className="text-center">
        <h2>Wallet Details</h2>
        <p className="h3 mt-4">
          {loading ? "Loading..." : `Balance: $${balance}`}
        </p>
      </Container>
    </div>
  );
};

export default WalletDetails;
