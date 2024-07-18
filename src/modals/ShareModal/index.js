import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdOutlineContentCopy } from "react-icons/md";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./ShareModal.module.css";

const ShareModal = ({ show, setShow, url }) => {
  const socialIconProps = {
    size: 32,
  };

  const title = "This is a dummy title";
  return (
    <ModalSkeleton
      className={classes.modal_width}
      show={show}
      setShow={setShow}
      borderRadius="20px"
      header={`Share`}
      width={"600px"}
    >
      <div className={classes.container}>
        <div className={classes.main}>
          <h1>Share this website with friends and family</h1>
        </div>
        <div className={classes.socialDivs}>
          <div className="row">
            <div className={`col-md-6 ${classes.social} c-p`}>
              <CopyToClipboard
                text={url}
                onCopy={() => toast.success("Link copied to clipboard.")}
              >
                <div className={`${classes.social_inner}`}>
                  <MdOutlineContentCopy round {...socialIconProps} />
                  <span>Copy Link</span>
                </div>
              </CopyToClipboard>
            </div>
            <div className={`col-md-6 ${classes.social}`}>
              <EmailShareButton url={url} quote={title}>
                {/* <img src={Logo} alt={"logo"} /> */}
                <EmailIcon round {...socialIconProps} />
                <span>Gmail</span>
              </EmailShareButton>
            </div>
            <div className={`col-md-6 ${classes.social}`}>
              <WhatsappShareButton url={url} quote={title}>
                <WhatsappIcon round {...socialIconProps} />
                <span>WhatsApp</span>
              </WhatsappShareButton>
            </div>{" "}
            <div className={`col-md-6 ${classes.social}`}>
              <FacebookShareButton url={url} quote={title}>
                <FacebookIcon round {...socialIconProps} />
                <span>Facebook</span>
              </FacebookShareButton>
            </div>
            <div className={`col-md-6 ${classes.social}`}>
              <FacebookShareButton url={url} quote={title}>
                <FacebookMessengerIcon round {...socialIconProps} />
                <span>Messenger</span>
              </FacebookShareButton>
            </div>
            {/* <div className={`col-md-6 ${classes.social} c-p`}>
              <div className={`${classes.social_inner}`}>
                <img
                  src={snapChat}
                  alt={"logo"}
                  className={classes.snachat_img}
                />
                <span>Snapchat</span>
              </div>
            </div> */}
            <div className={`col-md-6 ${classes.social}`}>
              <TwitterShareButton url={url} quote={title}>
                <TwitterIcon round {...socialIconProps} />
                <span>Twitter</span>
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>
    </ModalSkeleton>
  );
};

export default ShareModal;
