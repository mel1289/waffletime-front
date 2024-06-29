import React from "react";
import { Modal, Button } from "react-bootstrap";

const ReloadAlert = (props) => {
  return (
    <Modal
      {...props}
      backdrop="false"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="__bodyReloadAlert">
        <div className="__bodyReloadAlertTitle">Reste à la page !</div>
        Pense à rafraîchir la page pour mettre à jour la disponibilité des produits.
        <div className="__bodyReloadAlertBtn">
          <Button variant="light" onClick={props.onHide}>
            Rafraichir
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReloadAlert;
