import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import WalletDetails from "./WalletDetails/indes";
import ConnectAccount from "./ConnectAccount/indes";
import Bank from "./Bank/indes";
import Card from "./Card/indes";
import classes from "./WalletDetails.module.css";

const Wallet = () => {
  const tabs = ["Wallet", "Details", "Bank", "Card"];
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const renderProfile = () => {
    switch (currentTab) {
      case "Wallet":
        return <WalletDetails />;
      case "Details":
        return <ConnectAccount />;
      case "Bank":
        return <Bank />;
      case "Card":
        return <Card />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    setCurrentTab(tabs[0]);
  }, []);

  return (
    <>
      <div className={classes.profile_container}>
        <Container className={classes.profileTabs}>
          {tabs?.map((tab) => (
            <div
              className={[
                classes.tab,
                currentTab === tab && classes.activeTab,
              ].join(" ")}
              onClick={() => setCurrentTab(tab)}
              key={tab}
            >
              {tab}
            </div>
          ))}
        </Container>
      </div>
      {renderProfile()}
    </>
  );
};

export default Wallet;
