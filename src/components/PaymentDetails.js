import React, { useEffect, useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import ModalLoader from "../components/ModalLoader";
import { PurchaseContext } from "../contexts/PurchaseContext";
import { getDeliveryTime } from "../services/deliveryService";
import moment from "moment";
import { toast } from "react-toastify";

toast.configure();

const PaymentDetails = ({ cart, plannedAt }) => {
  const [loading, setLoading] = useState(false);
  const [purchase, setPurchase] = useContext(PurchaseContext);

  useEffect(() => {
    setLoading(true);
    getDeliveryTime(purchase.customer.shipperId, {
      lat: purchase.customer.lat,
      lng: purchase.customer.lng,
    })
      .then((response) => response.json())
      .then((data) => {
        setPurchase((prevState) => ({
          ...prevState,
          customer: {
            ...prevState.customer,
            plannedAt: data.plannedAt,
          },
        }));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Une erreur est survenue, veuillez réessayer.", {
          position: "bottom-right",
          autoClose: 8000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        console.log("Une erreur", err);
      });
  }, []);

  return (
    <div className="__paymentBox">
      <ModalLoader show={loading} />

      <p>
        Livraison au <strong>{purchase.customer.address}</strong>
      </p>

      <p>
        Livraison prévue à :
        <div className="__paymentTime">
          {purchase.customer.plannedAt != null
            ? moment(purchase.customer.plannedAt).format("HH") +
              "h" +
              moment(purchase.customer.plannedAt).format("mm")
            : ""}{" (délai maximum)"}
        </div>
      </p>

      <hr />

      {cart && cart.updated && (
        <div className="__cartError">
          Votre panier a subit des modifications, vérifiez le.
        </div>
      )}

      {cart &&
        cart.products.map((product) => {
          return (
            <Row className="__center __paymentCartItem">
              <Col>{product.name}</Col>
              <Col>x{product.qty}</Col>
              <Col>{(product.total / 100).toFixed(2)}€</Col>
            </Row>
          );
        })}
      <Row className="__center __paymentCartItem">
        <Col>Frais de livraison</Col>
        <Col></Col>
        <Col>
          <b className="__free">Offert</b>
        </Col>
      </Row>
      <div className="mt-4 __paymentTotal">
        Total à payer : {cart ? (cart.totalPrice / 100).toFixed(2) : "?"}€
      </div>
      <hr />
      <p className="__paymentTerms">
        Contrats sur les services En cliquant sur le bouton pour passer votre
        commande, vous acceptez{" "}
        <a href="#">Contrat sur les services de livraison.</a>
      </p>
    </div>
  );
};

export default PaymentDetails;
