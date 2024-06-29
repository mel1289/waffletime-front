import React from "react";
import { Modal, Button } from "react-bootstrap";
import Lottie from "react-lottie";
import animationData from "../lotties/11124-error-icon.json";

const ErrorModal = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Modal
        show={props.show}
        centered
        size="md"
        backdrop={props.backdrop || false}
      >
        <Modal.Header>
          <Modal.Title
            className="__alertError"
            id="contained-modal-title-vcenter"
          >
            {props.title || "Erreur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Lottie options={defaultOptions} height={100} width={100} />
          <div className="__modalAlertText">{props.content}</div>
        </Modal.Body>
        {props.onHide && (
          <Modal.Footer>
            <Button variant="outline-danger" onClick={props.onHide || null}>
              Ok
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default ErrorModal;
