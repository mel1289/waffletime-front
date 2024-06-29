import React, { useContext } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { PurchaseContext } from "../contexts/PurchaseContext";

const CheckoutStepBar = () => {
  const [purchase, setPurchase] = useContext(PurchaseContext);

  const handleClick = (step) => {
    if (purchase.step == step || step > purchase.step) return;

    setPurchase((prevState) => ({
      ...prevState,
      step: step,
    }));
  };

  return (
    <div className="__purchaseStep mb-3">
      <div
        className={purchase.step == 1 ? "__step __active" : "__step"}
        onClick={() => handleClick(1)}
      >
        1 - Panier
      </div>

      <div
        className={purchase.step == 2 ? "__step __active" : "__step"}
        onClick={() => handleClick(2)}
      >
        {" "}
        2 - Identité
      </div>

      <div className={purchase.step == 3 ? "__step __active" : "__step"}>
        {" "}
        3 - Paiement
      </div>
    </div>
  );
};

export default CheckoutStepBar;
