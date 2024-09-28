import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Loader } from "../../../../Component/Loader";
import { Button } from "../../../../Component/Button/Button";
import WithdrawModal from "../../../../modals/WithdrawModal";
import { BaseURL } from "../../../../config/apiUrl";
import { Get } from "../../../../Axios/AxiosFunctions";
import classes from "./WalletDetails.module.css";

const WalletDetails = () => {
  const { access_token } = useSelector((state) => state.authReducer);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);

  const getData = async () => {
    const url = BaseURL("stripe/get-balance");
    const payoutUrl = BaseURL("stripe/get-payouts");
    setLoading(true);
    const response = await Get(url, access_token);
    const payoutResponse = await Get(payoutUrl, access_token);
    if (response) {
      let availableBalance = response.data?.available?.reduce(
        (a, b) => a + b?.amount / 100,
        0
      );
      let pendingBalance = response.data?.pending?.reduce(
        (a, b) => a + b?.amount / 100,
        0
      );
      setAvailableBalance(availableBalance);
      setPendingBalance(pendingBalance);
    }

    if (payoutResponse) {
      setPayouts(payoutResponse.data?.data);
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
          {loading ? (
            <Loader />
          ) : (
            <div>
              <p className="h3">Available Balance: ${availableBalance}</p>
              <p className="h3 mt-4">Pending Balance: ${pendingBalance}</p>
              <Button
                variant="primary"
                className="mt-4"
                label="Withdraw"
                onClick={() => setWithdrawModal(true)}
              />
              {payouts?.length ? (
                <div className="mt-4">
                  <h3>Payouts</h3>
                  <ul>
                    {payouts?.map((payout) => (
                      <li key={payout.id}>
                        <p>
                          <strong>Amount:</strong> ${payout?.amount / 100}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(payout?.created * 1000).toDateString()}
                        </p>
                        <p>
                          <strong>Status:</strong> {payout?.status}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </p>
        {withdrawModal ? (
          <WithdrawModal
            show={withdrawModal}
            setShow={setWithdrawModal}
            maxAmount={availableBalance}
          />
        ) : null}
      </Container>
    </div>
  );
};

export default WalletDetails;
