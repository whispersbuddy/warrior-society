import React from "react";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./ViewUpcomingFights.module.css";
import moment from "moment";
const ViewUpcomingFights = ({ show, setShow, data }) => {
  return (
    <>
      <ModalSkeleton show={show} setShow={setShow} width={"800px"}>
        <div className={classes.fightingContainer}>
          <div className={classes.header}>
            <h3>Upcoming Fights </h3>
          </div>
          <div className={classes.content}>
            <div className={classes.tableWrapper}>
              {
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Opponent</th>
                        <th>Venue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.fighterDetails?.upcomingFight?.map((e, i) => (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{e?.time}</td>
                          <td>{moment(e?.date)?.format("MM/DD/YYYY")}</td>
                          <td>{e?.opponent}</td>
                          <td>{e?.venue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              }
            </div>
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default ViewUpcomingFights;
