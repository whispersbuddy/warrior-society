import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import ModalSkeleton from "../ModalSkeleton";
import { Button } from "../../Component/Button/Button";
import { Loader } from "../../Component/Loader";
import { Input } from "../../Component/Input/Input";
import { apiHeader, BaseURL } from "../../config/apiUrl";
import { Get, Post } from "../../Axios/AxiosFunctions";
import classes from "./WithdrawModal.module.css";

const WithdrawModal = ({ show, setShow, onClick, maxAmount }) => {
  const { access_token } = useSelector((state) => state.authReducer);
  const [banks, setBanks] = useState([]);
  const [amount, setAmount] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const url = BaseURL("stripe/get-banks");
    setDataLoading(true);
    const response = await Get(url, access_token);
    if (response) {
      setBanks(response.data?.data);
    }
    setDataLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = async () => {
    if (!amount || amount == 0) return toast.error("Please insert amount");
    if (amount > maxAmount) return toast.error("Maximum amount exceeded");
    if (!selectedBank) return toast.error("Please select a bank to proceed");

    const url = BaseURL("stripe/payout");
    const data = {
      bankId: selectedBank,
      amount,
    };
    setLoading(true);
    const response = await Post(url, data, apiHeader(access_token));
    console.log({response});
    
    if (response) {
      // onClick();
      setAmount(0);
      setShow(false);
      toast.success("Payout Successful");
    }
    setLoading(false);
  };

  const handleRadioChange = (bankId) => {
    setSelectedBank(bankId);
  };

  return (
    <ModalSkeleton
      width={"600px"}
      header={"Select Bank"}
      setShow={setShow}
      show={show}
      borderRadius={"10px"}
    >
      <div className={classes.main}>
        <div className={classes.bankList}>
          {dataLoading && <Loader />}
          {!banks?.length && !dataLoading ? (
            <p className="text-center fs-4">No bank found</p>
          ) : (
            <div>
              <Input
                value={amount}
                setter={setAmount}
                placeholder="Amount"
                label="Amount"
              />
              <p className="mt-1">Max. Amount: {maxAmount}</p>
              <div className="mt-4">
                {banks?.map((bank) => (
                  <div
                    key={bank?.id}
                    className={
                      classes.bank +
                      " " +
                      (selectedBank === bank.id ? classes.selectedBank : "")
                    }
                    onClick={() => handleRadioChange(bank.id)}
                  >
                    <div className={classes.bankContent}>
                      <div>
                        <h4>{bank.bank_name}</h4>
                        <h4>{bank.last4}</h4>
                      </div>
                      <div className={classes.rightSide}>
                        <p className={classes.bankBrand}>
                          {bank.routing_number}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Button
          onClick={handleClick}
          disabled={loading}
          label={loading ? "Processing..." : "Payout"}
        />
      </div>
    </ModalSkeleton>
  );
};

export default WithdrawModal;
