import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../../contexts/CartContext";
import { removeProductInCart } from "../../cart";

const RemoveCartButton = (props) => {
  const { product } = props;
  const [cart, setCart] = useContext(CartContext);

  const handleClickButton = () => {
    const updatedCart = removeProductInCart(cart, product);

    setCart(updatedCart);
  };

  return (
    <Button onClick={handleClickButton} variant="outline-danger" size="sm">
      <FontAwesomeIcon icon={faMinus} />
    </Button>
  );
};

export default RemoveCartButton;
