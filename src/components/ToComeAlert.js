import React from "react";
import { Modal, Button } from "react-bootstrap";
import Lottie from "react-lottie";
import animationData from "../lotties/24363-sleepy-moon.json";

const ToComeAlert = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="__toComeAlertBG">
        <div className="__bodyReloadAlertTitle">Informations</div>
        <Lottie options={defaultOptions} height={150} width={150} />
        Nous sommes ouverts du Jeudi au Dimanche.<br />
        Les précommandes sont possibles à partir de 18H. <br /> Nous livrons de 19H jusqu'à
        01H.
        <div className="__bodyReloadAlertBtn">
          <Button variant="light" onClick={props.onHide}>
            OK
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ToComeAlert;
