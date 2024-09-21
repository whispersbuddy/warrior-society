import React from "react";
import moment from "moment";

import { Button } from "../../Component/Button/Button";
import NoData from "../../Component/NoData/NoData";
import ModalSkeleton from "../ModalSkeleton";
import { imageUrl } from "../../config/apiUrl";
import styles from "./SponsorRequestsModal.module.css";
import { Loader } from "../../Component/Loader";

export default function SponsorRequestsModal({
  show,
  setShow,
  loading,
  onClick,
  data,
}) {
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header="Sponsors"
      width={"900px"}
      modalClass={styles.modalBody}
    >
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          {/* <Row> */}
          {data?.length > 0 ? (
            <>
              <table className={styles.requestsTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((sponsor, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <img src={imageUrl(sponsor?.sender?.logo)} width="50" />
                        {/* <ProfilePhoto
                        photo={sponsor?.sender?.logo}
                        profilePhotoDimensions={
                          sponsor?.sender?.logoDimensions
                        }
                        className={styles.profileImg}
                      /> */}
                      </td>
                      <td>
                        {sponsor?.sender?.firstName} {sponsor?.sender?.lastName}
                      </td>
                      <td>${sponsor?.amount}</td>
                      <td>
                        {moment(sponsor?.createdAt)?.format("MM/DD/YYYY")}
                      </td>
                      <td>
                        <Button
                          label="Accept"
                          className={styles.acceptBtn}
                          onClick={() => {
                            onClick(sponsor?._id, "accepted");
                          }}
                        />
                        <Button
                          label="Reject"
                          className={styles.rejectBtn}
                          onClick={() => {
                            onClick(sponsor?._id, "rejected");
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <NoData text="No Sponsor Requests" />
          )}
          {/* </Row> */}
        </div>
      )}
    </ModalSkeleton>
  );
}
