import React, { createContext, useState } from "react";
import { isBusinessOpen } from "../hours";

export const PurchaseContext = createContext();

export const PurchaseProvider = (props) => {
  const [purchase, setPurchase] = useState({
    // Penser à changer les valeurs dans CityHeader.js
    customer: {
      firstname: null,
      lastname: null,
      email: null,
      phone: null,
      address: null,
      shipperId: null,
      zoneId: null,
      postalCode: null,
      city: null,
      lat: null,
      lng: null,
      plannedAt: null,
    },
    selectedCity: true,
    canOrder: isBusinessOpen(),
    step: 1,
  });

  return (
    <PurchaseContext.Provider value={[purchase, setPurchase]}>
      {props.children}
    </PurchaseContext.Provider>
  );
};
