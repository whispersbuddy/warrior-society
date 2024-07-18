import React, { useState } from "react";
import classes from "./ProfileDetails.module.css";
import StudentUserProfile from "./StudentUserProfile";
import TrainerUserProfile from "./TrainerUserProfile";
import FighterUserProfile from "./FighterUserProfile";
import GymUserProfile from "./GymUserProfile";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
const ProfileDetails = ({ currentRole, setCurrentRole, allRoles }) => {
  return (
    <>
      <div className={classes.profile_container}>
        <Container className={classes.profileTabs}>
          {allRoles?.map((role) => (
            <div
              className={[
                classes.tab,
                currentRole?.name === role?.name && classes.activeTab,
              ].join(" ")}
              onClick={() => setCurrentRole(role)}
            >
              {role?.name}
            </div>
          ))}
        </Container>
      </div>
      {/* {renderProfile(currentRole)} */}
      {currentRole?.name == "Student" && <StudentUserProfile />}
      {currentRole?.name == "Trainer" && <TrainerUserProfile />}{" "}
      {currentRole?.name == "GYM" && <GymUserProfile />}{" "}
      {currentRole?.name == "Fighter" && <FighterUserProfile />}
    </>
  );
};

export default ProfileDetails;
