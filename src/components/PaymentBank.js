import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import PaymentDetails from "./PaymentDetails";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import StripeForm from "./stripe/StripeForm";
import { loadStripe } from "@stripe/stripe-js";
import ErrorModal from "../components/ErrorModal"

const PaymentBank = () => {
  const [cart, setCart] = useContext(CartContext);
  const [error, setError] = useState(null);

  const stripePromise = loadStripe("pk_live_7jaayDqNkuP0PCoQo1f8FQKa00YAtxiTPU");

  return (
    <div>
      <ErrorModal show={error != null} content={error} onHide={() => setError(null)} />

      <PaymentDetails cart={cart} />
      <div className="__paymentCardBox">
        <div className="__paymentCardBoxTitle">Carte bancaire</div>
        <div className="__paymentCardBoxHint">
          <FontAwesomeIcon icon={faExclamationCircle} className="mr-3" />
          Vos données bancaires ne sont pas stockées.
        </div>
        <Elements stripe={stripePromise} options={{ locale: 'fr' }}>
          <StripeForm error={setError} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentBank;
