import React from "react";
import { Modal, Spinner } from "react-bootstrap";

const ModalLoader = (props) => {
  return (
    <Modal
      backdrop="false"
      size="sm"
      show={props.show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="__center">
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="primary" />
        <p className="mt-2">
          {props.content ? props.content : "Un peu de patience ..."}
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default ModalLoader;
