import React from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import classes from "./modalSkeleton.module.css";

export default function ModalSkeleton({
  show,
  setShow,
  header,
  footer,
  children,
  modalClass,
  hideHeaderBorder,
  hideBorder,
  headerStyles,
  footerStyles,
  borderRadius,
  showCloseIcon = true,
  width,
  borderLine = true,
  headerClass,
  iconClass,
  className,
  modal_width,
  modal_padding,
  ...props
}) {
  function handleClose() {
    setShow(false);
  }
  return (
    <>
      <style jsx>{`
        .modal-dialog-centered {
          height: 100% !important;
        }
        .modal-header {
          border-bottom: none !important;
        }
        .modal-header {
          border-bottom: ${hideHeaderBorder
            ? "none"
            : `1px solid var(--main-color-yellow)`};
        }
        .modal-footer {
          margin: 0px;
          display: unset;
          justify-content: unset;
          align-items: unset;
          padding: ${!borderLine ? "15px 30px" : "0px"};
        }

        .${classes.header} button {
          color: var(--black-color) !important;
        }
        .modal-content {
          width: ${modal_width || "94%"};
          border-radius: ${borderRadius ? borderRadius : "15px"};
          margin: 0 auto;
          overflow: visible !important;
          border:none
        }

        .modal .modal-dialog {
          max-width: ${width};
          margin: 0px auto;
        }
        @media screen and (max-width: 992px) {
          .modal .modal-dialog {
            max-width: 70%;
          }
        }
        @media screen and (max-width: 768px) {
          .modal .modal-dialog {
            max-width: 80%;
          }
        }
        @media screen and (max-width: 575px) {
          .modal .modal-dialog {
            max-width: 90%;
          }
        }
      `}</style>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        className={`  ${[classes.modal, className].join(" ")} `}
        style={{ width: modal_width, padding: modal_padding }}
        {...props}
      >
        {header && (
          <Modal.Header
            // closeButton
            className={`${[classes.header, headerClass && headerClass].join(
              " ",
            )}`}
            style={{ ...headerStyles }}
          >
            <h4>{header}</h4>
          </Modal.Header>
        )}
        {showCloseIcon && (
          <div
            className={[classes.iconBox, showCloseIcon && iconClass].join(" ")}
            onClick={handleClose}
          >
            <AiOutlineClose size={18} color={"var(--white-color)"} />
          </div>
        )}
        <Modal.Body
          className={`${[classes.body, modalClass && modalClass].join(" ")}`}
        >
          {children}
        </Modal.Body>
        {footer && (
          <Modal.Footer
            className={`${[classes.footer].join(" ")}`}
            style={{
              ...footerStyles,
            }}
          >
            <div>{footer}</div>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
