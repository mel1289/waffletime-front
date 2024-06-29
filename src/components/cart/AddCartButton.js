import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../../contexts/CartContext";
import {
  addProductInCart,
  createNewCart,
  checkQty,
  isProductInCart,
} from "../../cart";
import { toast } from "react-toastify";
import { PurchaseContext } from "../../contexts/PurchaseContext";

const AddCartButton = (props) => {
  const { product } = props;
  const [cart, setCart] = useContext(CartContext);
  const [purchase, setPurchase] = useContext(PurchaseContext);

  let addToCartElem;

  const handleButtonClick = () => {
 /*   if (purchase.canOrder === true) {
      toast.error("Désolé, les commandes sont fermés.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

      return;
    }*/


    let cartData = cart;
    if (cartData !== null) {
      const updatedCart = addProductInCart(cartData, product);
      setCart(updatedCart);
    } else {
      cartData = createNewCart(product);
      setCart(cartData);
    }

    setPurchase((prevState) => ({
      ...prevState,
      step: 1,
    }));

    toast.success("Le produit a été ajouté au panier !", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  if (product.qty == 0) {
    addToCartElem = <div className="__noStock">Rupture de stock</div>;
  } 
  else if (product.qty == -1) {
    addToCartElem = <div className="__toCome">Mise à jour du stock à 18H</div>
  }
  else {
    if (cart == 20) {
      addToCartElem = (
        <>
          <Button
            size="sm"
            variant="dark"
            onClick={handleButtonClick}
            disabled={checkQty(cart, product)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>

          <div className="__itemQty">
            {cart.products[isProductInCart(cart, product)].qty}
          </div>

          <Button
            size="sm"
            variant="dark"
            onClick={handleButtonClick}
            disabled={checkQty(cart, product)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </>
      );
    } else {
      addToCartElem = (
        <>
          <Button
            size="sm"
            variant="dark"
            onClick={handleButtonClick}
            disabled={checkQty(cart, product)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </>
      );
    }
  }

  return <div>{addToCartElem}</div>;
};

export default AddCartButton;
