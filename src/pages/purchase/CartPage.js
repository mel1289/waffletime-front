import React, { useContext, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { CartContext } from "../../contexts/CartContext";
import { PurchaseContext } from "../../contexts/PurchaseContext";
import RemoveCartButton from "../../components/cart/RemoveCartButton";
import { useHistory } from "react-router-dom";
import CheckoutStepBar from "../../components/CheckoutStepBar";
import CityHeader from "../../components/CityHeader";
import { isCartEmpty } from "../../cart";
import { MIN_PRICE } from "../../constants";
import { toast } from "react-toastify";
import Footer from "../../components/Footer"

toast.configure();

const CartPage = () => {
  const [cart, setCart] = useContext(CartContext);
  const [purchase, setPurchase] = useContext(PurchaseContext);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0)

    if (purchase.customer.postalCode == null) {
      history.push("/");
    }
  }, [purchase.customer.postalCode]);

  const handleValidClick = () => {
    if (cart.totalPrice < MIN_PRICE * 100) {
      toast.error(`Le minimum de commande est de ${MIN_PRICE}€`, {
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

    setPurchase((prevState) => ({
      ...prevState,
      step: purchase.step + 1,
    }));
  };

  if (!isCartEmpty(cart)) {
    return (
      <div>
        <CityHeader />
        <Container className="mt-4">
          <CheckoutStepBar />

          <div class="__categoryTitle">Contenu du panier</div>
          <div class="separator"></div>
          <Table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.products.map((product) => {
                return (
                  <tr>
                    <td>{product.name}</td>
                    <td>{product.qty}</td>
                    <td>{(product.total / 100).toFixed(2)}€</td>
                    <td>
                      <RemoveCartButton product={product} />
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td>Frais de livraison</td>
                <td></td>
                <td>
                  <b className="__free">Offert</b>
                </td>
              </tr>
            </tbody>
          </Table>

          <div class="__categoryTitle">Total</div>
          <div class="separator"></div>

          <div class="__totalPrice">{(cart.totalPrice / 100).toFixed(2)}€*</div>
          <p className="__hint">*Prix TTC</p>

          <Button
            onClick={handleValidClick}
            block
            className="mb-3 mt-3"
          >
            Valider le panier
          </Button>
        </Container>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <CityHeader />
        <div className="__emptyCart">Ton panier est vide !</div>
      </div>
    );
  }
};

export default CartPage;
