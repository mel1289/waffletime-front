import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cart, setCart] = useState(null);

  /*useEffect(() => {
    if (process.browser) {
      let cartData = localStorage.getItem("cart-data");
      cartData = cartData !== null ? JSON.parse(cartData) : "";
      setCart(cartData);
    }
  }, []);
*/
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};
