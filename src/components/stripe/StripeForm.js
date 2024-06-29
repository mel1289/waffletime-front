import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";
import { PurchaseContext } from "../../contexts/PurchaseContext";
import { getDeliveryTime } from "../../services/deliveryService";
import { API_URL, MIN_PRICE } from "../../constants";
import { CartContext } from "../../contexts/CartContext";
import { getAllProducts } from "../../services/productService";
import { updateCartBeforeCheckout, isCartEmpty } from "../../cart";
import ModalAlert from "../ModalAlert";
import ModalLoader from "../ModalLoader";
import { toast } from "react-toastify";
import moment from "moment";

toast.configure();

const StripeForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [purchase, setPurchase] = useContext(PurchaseContext);
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [checkingStock, setCheckingStock] = useState(false);
  const [alert, setAlert] = useState(false);

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#414141",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      elements.getElement(CardElement)._empty ||
      elements.getElement(CardElement)._invalid
    )
      return;

    if (!stripe || !elements) {
      props.error("Une erreur est survenue veuillez réessayer.");
      return;
    }

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
          const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
              address: {
                city: purchase.customer.city,
                line1: purchase.customer.address,
                postal_code: purchase.customer.postalCode,
              },
              email: purchase.customer.email,
              name:
                purchase.customer.firstname + " " + purchase.customer.lastname,
            },
          });

          if (error) {
            setLoading(false);
          }

          if (!error) {
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

              props.error("Désolé, le délai de livraison a changé.");
            } else {
              fetch(API_URL + "orders/payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: paymentMethod.id,
                  customer: purchase.customer,
                  cart: cart,
                  type: "card",
                }),
              })
                .then((res) => {
                  if (!res.ok) {
                    setLoading(false);
                    toast.error(
                      "Une erreur est survenue, veuillez réessayer. Votre carte n'a pas été débitée.",
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
                  toast.error(
                    "Une erreur est survenue, veuillez réessayer. Votre carte n'a pas été débitée.",
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
                });
            }
          } else {
            setLoading(false);
            props.error("Une erreur est survenue veuillez réessayer.");
          }
        }
      })
      .catch((e) => {
        setLoading(false);
        setCheckingStock(false);
        console.log(e);
        toast.error(
          "Une erreur est survenue, veuillez réessayer. Votre carte n'a pas été débitée.",
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
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ModalAlert
        show={alert}
        content="Votre panier a été modifié car des produits ne sont plus disponible. Vérifiez votre panier."
        onHide={() => {
          setAlert(false);
        }}
      />
      <ModalLoader show={loading} />
      <ModalLoader
        show={checkingStock}
        content="Nous vérifions si les produits sont toujours disponible ..."
      />
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <Button
        className="mt-3"
        block
        type="submit"
        disabled={
          !stripe ||
          loading ||
          isCartEmpty(cart) ||
          !purchase.customer.plannedAt
        }
      >
        Valider le paiement
      </Button>
    </form>
  );
};

export default StripeForm;
