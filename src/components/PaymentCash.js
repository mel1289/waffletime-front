import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";
import { PurchaseContext } from "../contexts/PurchaseContext";
import { getDeliveryTime } from "../services/deliveryService";
import { API_URL, MIN_PRICE } from "../constants";
import { CartContext } from "../contexts/CartContext";
import { getAllProducts } from "../services/productService";
import { updateCartBeforeCheckout, isCartEmpty } from "../cart";
import { toast } from "react-toastify";
import moment from "moment";
import ErrorModal from "../components/ErrorModal";
import PaymentDetails from "./PaymentDetails";
import ReCAPTCHA from "react-google-recaptcha";

const PaymentCash = () => {
  const [purchase, setPurchase] = useContext(PurchaseContext);
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [checkingStock, setCheckingStock] = useState(false);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(null);
  const [captcha, setCaptcha] = useState(false);

  const handleSubmit = async () => {
    if (cart.totalPrice < MIN_PRICE * 100) {
      toast.error(
        `Une erreur est survenue. Le minimum de commande est de ${MIN_PRICE}€`,
        {
          position: "bottom-right",
          autoClose: 8000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    setCheckingStock(true);

    getAllProducts(purchase.customer.shipperId)
      .then((res) => res.json())
      .then(async (products) => {
        const updatedCart = updateCartBeforeCheckout(cart, products);

        setCheckingStock(false);
        if (updatedCart.updated) {
          if (!isCartEmpty(cart)) setAlert(true);

          setCart(updatedCart);
        } else {
          setLoading(true);

          const checkDeliveryTime = await getDeliveryTime(
            purchase.customer.shipperId,
            {
              lat: purchase.customer.lat,
              lng: purchase.customer.lng,
            }
          );

          const deliveryData = await checkDeliveryTime.json();

          if (
            moment(deliveryData.plannedAt).diff(
              moment(purchase.customer.plannedAt),
              "minutes"
            ) >= 5
          ) {
            setPurchase((prevState) => ({
              ...prevState,
              customer: {
                ...prevState.customer,
                plannedAt: deliveryData.plannedAt,
              },
            }));

            setLoading(false);

            setError("Désolé, le délai de livraison a changé.");
          } else {
            fetch(API_URL + "orders/payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: null,
                customer: purchase.customer,
                cart: cart,
                type: "cash",
              }),
            })
              .then((res) => {
                if (!res.ok) {
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
                  return;
                }

                setLoading(false);
                setPurchase((prevState) => ({
                  ...prevState,
                  step: purchase.step + 1,
                }));
                // reset cart, redirect to success page
              })
              .catch((e) => {
                setLoading(false);
                console.log(e);
                toast.error("Une erreur est survenue, veuillez réessayer.", {
                  position: "bottom-right",
                  autoClose: 8000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                });
              });
          }
        }
      })
      .catch((e) => {
        setLoading(false);
        setCheckingStock(false);
        console.log(e);
        toast.error("Une erreur est survenue, veuillez réessayer.", {
          position: "bottom-right",
          autoClose: 8000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <ErrorModal
        show={error != null}
        content={error}
        onHide={() => setError(null)}
      />

      <PaymentDetails cart={cart} />

      <div className="__paymentCardBox">
        <div className="__paymentCardBoxTitle mb-4">
          Le paiement se fera sur place.
        </div>

        <ReCAPTCHA
          sitekey="6LcpUsoZAAAAAN9QesvotTVJ6Q1DWj6lD1K_WRVo"
          onChange={() => setCaptcha(true)}
          hl="fr"
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="mt-2"
        block
        disabled={
          loading ||
          isCartEmpty(cart) ||
          !purchase.customer.plannedAt ||
          !captcha
        }
      >
        Valider la commande
      </Button>
    </div>
  );
};

export default PaymentCash;
