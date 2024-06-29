import React, { useContext, useState } from "react";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PurchaseContext } from "../contexts/PurchaseContext";
import { CartContext } from "../contexts/CartContext";
import { Modal, Button } from "react-bootstrap";
import { isBusinessOpen } from "../hours";

const CityHeader = () => {
  const [purchase, setPurchase] = useContext(PurchaseContext);
  const [cart, setCart] = useContext(CartContext);
  const [modalShow, setModalShow] = useState(false);

  const handleClick = () => {
    if (purchase.customer.postalCode != null) {
      setModalShow(true);
    }
  };

  const confirmReset = () => {
    setCart(null);
    setPurchase({
      customer: {
        firstname: null,
        lastname: null,
        email: null,
        phone: null,
        address: null,
        shipperId: null,
        postalCode: null,
        city: null,
        lat: null,
        lng: null,
        zoneId: null,
      },
      step: 1,
      canOrder: isBusinessOpen(),
    });
    setModalShow(false);
  };

  return (
    <div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Changement de zone
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Attention, en changeant de zone, votre panier sera automatiquement
            réinitialisé.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setModalShow(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={confirmReset}>
            Je veux changer
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="__cityHeader __pointer" onClick={handleClick}>
        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
        {purchase.customer.city != null
          ? `${purchase.customer.city} (${purchase.customer.postalCode})`
          : "Vous devez sélectionner une zone de livraison."}
      </div>
    </div>
  );
};

export default CityHeader;
