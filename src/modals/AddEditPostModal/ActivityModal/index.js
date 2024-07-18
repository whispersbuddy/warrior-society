import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { activitiesData, feelingsData } from '../../../config/Data';
import classes from './ActivityModal.module.css';
const ActivityModal = ({ setActivityModal, setActivity, activity }) => {
  const [activeTab, setActiveTab] = useState(
    activitiesData?.find((ele) => activity?.includes?.(ele?.text))
      ? 'Activity'
      : 'Feeling'
  );
  return (
    <>
      <div className={classes.modalContainer}>
        <div className={classes.tabs}>
          <div
            className={[
              classes.tab,
              activeTab === 'Feeling' && classes.active,
            ].join(' ')}
            onClick={() => setActiveTab('Feeling')}
          >
            Feeling
          </div>
          <div
            className={[
              classes.tab,
              activeTab === 'Activity' && classes.active,
            ].join(' ')}
            onClick={() => setActiveTab('Activity')}
          >
            Activity
          </div>
        </div>
        <div className={classes.backIcon}>
          <FaArrowLeft onClick={() => setActivityModal(false)} />
        </div>
        {activeTab === 'Feeling' && (
          <div className={classes.activityContainer}>
            {feelingsData?.map((feeling) => (
              <div
                className={[
                  classes.feelingDiv,
                  activity?.includes?.(feeling?.text) &&
                    classes.activeFeeling,
                ].join(' ')}
                onClick={() => {
                  if (activity?.includes?.(feeling?.text)) {
                    setActivity('');
                    setActivityModal(false);
                    return;
                  }
                  setActivity(feeling?.icon + ' ' + feeling?.text);
                  setActivityModal(false);
                }}
              >
                <span>{feeling.icon}</span>
                <p>{feeling.text}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Activity' && (
          <div className={classes.activityContainer}>
            {activitiesData?.map((feeling) => (
              <div
                className={[
                  classes.feelingDiv,
                  activity?.includes?.(feeling?.text) &&
                    classes.activeFeeling,
                ].join(' ')}
                onClick={() => {
                  if (activity?.includes?.(feeling?.text)) {
                    setActivity('');
                    setActivityModal(false);
                    return;
                  }
                  setActivity(feeling?.icon + ' ' + feeling?.text);
                  setActivityModal(false);
                }}
              >
                <span>'{feeling.icon}</span>
                <p>{feeling.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ActivityModal;
