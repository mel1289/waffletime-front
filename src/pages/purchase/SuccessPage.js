import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import Lottie from "react-lottie";
import animationData from "../../lotties/pay.json";
import { CartContext } from "../../contexts/CartContext";
import { PurchaseContext } from "../../contexts/PurchaseContext";
import { useHistory } from "react-router-dom";

const SuccessPage = (props) => {
  const [cart, setCart] = useContext(CartContext);
  const [purchase, setPurchase] = useContext(PurchaseContext);
  const history = useHistory();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setCart(null);
/*
    const redirect = setTimeout(() => {
      setPurchase((prevState) => ({
        ...prevState,
        customer: {
          ...prevState.customer,
          plannedAt: null,
        },
        step: 1,
      }));
      history.push("/");
    }, 10000);
*/
    return () => {
      //clearInterval(redirect);

      setPurchase((prevState) => ({
        ...prevState,
        customer: {
          ...prevState.customer,
          plannedAt: null,
        },
        step: 1,
      }));
    };
  }, []);

  return (
    <>
      <Container className="mt-2 mb-4">
        <div className="__orderSuccess">
          Merci, votre commande a bien été prise en compte!
        </div>
        <div className="__orderSuccessInfo">
          Un récapitulatif de votre commande vous a été envoyé par mail.
        </div>

        <Lottie options={defaultOptions} height={400} width={400} />
      </Container>
    </>
  );
};

export default SuccessPage;
