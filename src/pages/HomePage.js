import React, { useContext } from "react";

import { PurchaseContext } from "../contexts/PurchaseContext";
import AddressPage from "./AddressPage";
import ProductsPage from "./ProductsPage";

const HomePage = () => {
  const [purchase, setPurchase] = useContext(PurchaseContext);

  if (purchase.customer.shipperId == null) {
    return <AddressPage />;
  } else {
    return <ProductsPage />;
  }
};

export default HomePage;
