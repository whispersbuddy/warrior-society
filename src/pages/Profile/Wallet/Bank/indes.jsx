import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Country } from "country-state-city";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Input } from "../../../../Component/Input/Input";
import { DropDown } from "../../../../Component/DropDown/DropDown";
import { Button } from "../../../../Component/Button/Button";
import { validateUserFields } from "../../../../config/HelperFunction";
import { apiHeader, BaseURL } from "../../../../config/apiUrl";
import { Delete, Get, Post } from "../../../../Axios/AxiosFunctions";
import classes from "./Bank.module.css";
import { Loader } from "../../../../Component/Loader";
import { BsTrash } from "react-icons/bs";

const Bank = () => {
  const { access_token } = useSelector((state) => state?.authReducer);

  const [banks, setBanks] = useState([]);
  const [accountNo, setAccountNo] = useState("000123456789");
  const [routingNo, setRoutingNo] = useState();
  const [country, setCountry] = useState(null);
  const [addBank, setAddBank] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errorFields, setErrorFields] = useState([]);

  const getData = async () => {
    const url = BaseURL("stripe/get-banks");
    setLoading(true);
    const response = await Get(url, access_token);
    if (response) {
      setBanks(response?.data?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFieldError = (field, actualField) => {
    const theField = actualField ? actualField : field;

    return (
      ((Array.isArray(eval(theField)) && eval(theField)?.length === 0) ||
        [undefined, null, ""].includes(eval(theField))) &&
      errorFields?.includes(field)
    );
  };

  const handleSubmit = async () => {
    const errorFieldNames = [];
    let params = {
      accountNo,
      country: typeof country === "string" ? country : country?.isoCode,
      currency: typeof country === "string" ? country : country?.currency,
    };
    for (let key in params) {
      if (!params[key]) {
        errorFieldNames.push(key);
      }
    }
    if (errorFieldNames.length > 0) {
      setErrorFields(errorFieldNames);
      return toast.error("Please fill all the required fields!");
    }
    if (!validateUserFields(params)) {
      return;
    }
    params = {
      ...params,
      account_number: accountNo,
      routing_number: routingNo,
    };
    setUpdateLoading(true);
    const apiUrl = BaseURL("stripe/bank");
    const response = await Post(apiUrl, params, apiHeader(access_token));
    if (response) {
      toast.success("Added Successfully");
      getData();
      setAddBank(false);
      setAccountNo("");
      setRoutingNo("");
      setCountry(null);
    }
    setUpdateLoading(false);
  };

  const handleDelete = async (id) => {
    const apiUrl = BaseURL(`stripe/bank/${id}`);
    const response = await Delete(apiUrl, apiHeader(access_token));
    if (response) {
      toast.success("Deleted Successfully");
      getData();
    }
  };

  return (
    <div className={classes.container}>
      <Container>
        {addBank ? (
          <Row>
            <Col xl={6} className={classes.inputField}>
              <Input
                value={accountNo}
                setter={setAccountNo}
                placeholder="Account Number"
                label="Account Number"
                error={handleFieldError("accountNo")}
              />
            </Col>
            <Col xl={6} className={classes.inputField}>
              <Input
                value={routingNo}
                setter={setRoutingNo}
                placeholder="Routing Number"
                label="Routing Number"
                error={handleFieldError("routingNo")}
              />
            </Col>
            <Col md={6} className={classes.inputField}>
              <DropDown
                options={Country.getAllCountries()}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                value={
                  typeof country == "string"
                    ? Country.getAllCountries()?.find(
                        (item) => item?.name == country
                      )
                    : country
                }
                setter={(e) => {
                  setCountry(e);
                  setErrorFields([]);
                }}
                inputStyle={{
                  padding: "12px 15px",
                }}
                placeholder="Select Country"
                label={"Country / Region"}
                isSearchable={true}
                error={errorFields[0]}
              />
            </Col>
          </Row>
        ) : (
          <div className={classes.bankList}>
            {loading ? (
              <Loader />
            ) : !banks?.length && !loading ? (
              <p className="text-center fs-4">No bank found</p>
            ) : (
              banks.map((bank) => (
                <div
                  key={bank?.id}
                  className={classes.bank}
                  // onClick={() => handleRadioChange(card.id)}
                >
                  <div className={classes.bankContent}>
                    <div>
                      <h4>{bank.bank_name}</h4>
                      <h4>{bank.last4}</h4>
                    </div>
                    <div className={classes.rightSide}>
                      <p className={classes.bankBrand}>{bank.routing_number}</p>
                      <p
                        className={classes.bankBrand}
                        onClick={() => handleDelete(bank?.id)}
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
          {addBank ? (
            <>
              <Button
                className="mt-4"
                label={updateLoading ? "Submitting..." : "Submit"}
                disabled={updateLoading}
                onClick={handleSubmit}
              />
              <Button
                onClick={() => setAddBank(false)}
                label={"Cancel"}
                className="ms-4"
              />
            </>
          ) : (
            <>
              <Button
                onClick={() => setAddBank(true)}
                label={"Add Bank"}
                className="mt-4"
                disabled={banks?.length >= 3}
              />
              {banks?.length >= 3 && (
                <span className="text-danger ms-4">Max. 3 banks</span>
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Bank;
