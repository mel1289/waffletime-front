import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalAlert = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="__bodyAlert">
        <div className="__bodyAlertTitle">Oupss !</div>
        {props.content}

        <div className="__bodyAlertBtn">
          <Button variant="light" onClick={props.onHide}>
            Ok
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAlert;
