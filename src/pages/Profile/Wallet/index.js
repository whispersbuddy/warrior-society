import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import WalletDetails from "./WalletDetails/indes";
import ConnectAccount from "./ConnectAccount/indes";
import classes from "./WalletDetails.module.css";

const Wallet = () => {
  const tabs = ["Wallet"];
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const renderProfile = () => {
    switch (currentTab) {
      case "Wallet":
        return <WalletDetails />;
      case "Connect Account":
        return <ConnectAccount />;
      default:
        return <>ds</>;
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
