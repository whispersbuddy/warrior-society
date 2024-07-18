import { Skeleton } from '@mui/material';
import React from 'react';
import classes from './UserSkeleton.module.css';
const UserSkeleton = ({ records }) => {
  return (
    <>
      {Array(records)
        .fill()
        ?.map((_) => (
          <div className={classes.user}>
            <Skeleton
              variant='rounded'
              width={20}
              height={20}
            />
            <div className={classes.userContent}>
              <div>
                <Skeleton
                  animation='wave'
                  variant='circular'
                  width={50}
                  height={50}
                />
              </div>
              <Skeleton
                animation='wave'
                height={40}
                width='80%'
                style={{ marginBottom: 6 }}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default UserSkeleton;
