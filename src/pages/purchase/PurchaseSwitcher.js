import React, { useContext } from "react";

import { PurchaseContext } from "../../contexts/PurchaseContext";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import PaymentPage from "./PaymentPage";
import SuccessPage from "./SuccessPage";

const PurchaseSwitcher = () => {
  const [purchase, setPurchase] = useContext(PurchaseContext);

  switch (purchase.step) {
    case 1:
      return <CartPage />;
    case 2:
      return <CheckoutPage />;
    case 3:
      return <PaymentPage />;
    case 4:
      return <SuccessPage />;
    default:
      return <CartPage />;
  }
};

export default PurchaseSwitcher;
