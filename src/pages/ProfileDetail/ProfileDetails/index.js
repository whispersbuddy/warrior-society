import React, { useEffect, useState } from "react";
import FighterUserProfile from "./FighterUserProfile";
import GymUserProfile from "./GymUserProfile";
import classes from "./ProfileDetails.module.css";
import StudentUserProfile from "./StudentUserProfile";
import TrainerUserProfile from "./TrainerUserProfile";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
const allRoles = [
  { label: "Student", value: "studentDetails" },
  { label: "Trainer", value: "trainerDetails" },
  { label: "GYM", value: "schoolDetails" },
  { label: "Fighter", value: "fighterDetails" },
];
const ProfileDetails = ({
  isLoading,
  profileData,
  newWarriorUsers,
  setCreateRoomModal,
  setCurrentRole,
  currentRole,
}) => {
  const filteredRoles = allRoles.filter((role) => profileData?.[role.value]);

  const renderProfile = (role) => {
    switch (role) {
      case allRoles[0]?.label:
        return (
          <StudentUserProfile
            profileData={profileData}
            isLoading={isLoading}
            newWarriorUsers={newWarriorUsers}
          />
        );
      case allRoles[1]?.label:
        return (
          <TrainerUserProfile
            profileData={profileData}
            isLoading={isLoading}
            setCreateRoomModal={setCreateRoomModal}
          />
        );
      case allRoles[2]?.label:
        return (
          <GymUserProfile profileData={profileData} isLoading={isLoading} />
        );
      case allRoles[3]?.label:
        return (
          <FighterUserProfile
            profileData={profileData}
            isLoading={isLoading}
            setCreateRoomModal={setCreateRoomModal}
          />
        );
      default:
        return <></>;
    }
  };
  useEffect(() => {
    setCurrentRole(filteredRoles[0]?.label);
  }, []);

  return (
    <>
      <div className={classes.profile_container}>
        <Container className={classes.profileTabs}>
          {filteredRoles?.map((role) => (
            <div
              className={[
                classes.tab,
                currentRole === role?.label && classes.activeTab,
              ].join(" ")}
              onClick={() => setCurrentRole(role?.label)}
            >
              {role?.label}
            </div>
          ))}
        </Container>
      </div>
      <Container>{renderProfile(currentRole)}</Container>
    </>
  );
};

export default ProfileDetails;
