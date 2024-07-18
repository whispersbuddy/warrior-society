import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { allRoles } from "..";
import FighterUserProfile from "./FighterUserProfile";
import GymUserProfile from "./GymUserProfile";
import classes from "./ProfileDetails.module.css";
import StudentUserProfile from "./StudentUserProfile";
import TrainerUserProfile from "./TrainerUserProfile";
const ProfileDetails = ({ newWarriorUsers, currentRole, setCurrentRole }) => {
  const redirected = useLocation()?.state;
  const renderProfile = (role) => {
    switch (role) {
      case allRoles[0]:
        return <StudentUserProfile newWarriorUsers={newWarriorUsers} />;
      case allRoles[1]:
        return <TrainerUserProfile />;
      case allRoles[2]:
        return <GymUserProfile />;
      case allRoles[3]:
        return <FighterUserProfile />;
      default:
        return <></>;
    }
  };
  useEffect(() => {
    setCurrentRole(redirected || allRoles[0]);
  }, []);

  return (
    <>
      <div className={classes.profile_container}>
        <Container className={classes.profileTabs}>
          {allRoles?.map((role) => (
            <div
              className={[
                classes.tab,
                currentRole === role && classes.activeTab,
              ].join(" ")}
              onClick={() => setCurrentRole(role)}
            >
              {role}
            </div>
          ))}
        </Container>
      </div>
      {renderProfile(currentRole)}
    </>
  );
};

export default ProfileDetails;
