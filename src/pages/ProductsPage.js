import React, { useState, useEffect, useContext } from "react";
import {
  CardDeck,
  Row,
  Col,
  Badge,
  Container,
  Table,
  Modal,
  Button,
} from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PurchaseContext } from "../contexts/PurchaseContext";
import { getAllProducts } from "../services/productService";
import HeaderLand from "../components/HeaderLand";
import CityHeader from "../components/CityHeader";
import ModalAlert from "../components/ModalAlert";
import { isCartEmpty, updateCartBeforeCheckout } from "../cart";
import Skeleton from "react-loading-skeleton";
import ErrorModal from "../components/ErrorModal";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartResumeModal from "../components/CartResumeModal";
import RemoveCartButton from "../components/cart/RemoveCartButton";
import ReloadAlert from "../components/ReloadAlert";
import { MIN_PRICE } from "../constants";
import moment from "moment";

import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";
import ToComeAlert from "../components/ToComeAlert";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useContext(CartContext);
  const [purchase, setPurchase] = useContext(PurchaseContext);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reloadAlert, setReloadAlert] = useState(false);
  const [cartResumeModal, setCartResumeModal] = useState(false);
  const [commingAlert, setCommingAlert] = useState(false);
  const history = useHistory();
  let interval = null;

  const fetchProducts = (reloaded = false) => {
    setProducts([]);
    setLoading(true);

    getAllProducts(purchase.customer.shipperId)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setProducts(data);

        data.forEach((product) => {
          if (product.qty == -1 && commingAlert == false) setCommingAlert(true);
        });

        if (reloaded && !isCartEmpty(cart)) {
          const updatedCart = updateCartBeforeCheckout(cart, data);
          if (updatedCart.updated) {
            if (!isCartEmpty(cart)) setAlert(true);

            setCart(updatedCart);
          }
        }
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  };

  useEffect(() => {
    fetchProducts();

    window.scrollTo(0, 0);

    interval = setInterval(() => {
      if (!reloadAlert) setReloadAlert(true);
    }, 1000 * 60 * 5);

    if (cart && cart.updated && isCartEmpty(cart)) setAlert(true);

    return () => {
      clearTimeout(interval);
    };
  }, []);

  return (
    <div>
      <HeaderLand />
      <CityHeader />
      <ModalAlert
        show={alert}
        content="Nous n'avons plus certains produits, ton panier a été mis à jour."
        onHide={() => {
          setAlert(false);

          setCart((prevState) => ({
            ...prevState,
            updated: false,
          }));
        }}
      />
      <ReloadAlert
        show={reloadAlert}
        onHide={() => {
          fetchProducts(true);
          setReloadAlert(false);
        }}
      />
      <ToComeAlert
        show={commingAlert}
        onHide={() => {
          setCommingAlert(false);
        }}
      />
      <ErrorModal
        show={error}
        backdrop={true}
        content="Impossible de joindre le serveur. Veuillez réessayer plus tard."
      />
      <CartResumeModal
        show={cartResumeModal}
        onHide={() => setCartResumeModal(false)}
      />
      <Container className="mt-2 mb-4">
        <ToastContainer />

        <Row>
          <Col md={12} lg={9} className="mt-2">
            <div className="__filterButtons mb-2">
              <div className="__filterBtn">
                <a href="#waffles">Gaufres salées</a>
              </div>
              <div className="__filterBtn">
                <a href="#cup">Waffle Cup</a>
              </div>
              <div className="__filterBtn">
                <a href="#bx">Gaufres sucrées</a>
              </div>
              <div className="__filterBtn">
                <a href="#drinks">Boissons</a>
              </div>
            </div>

            <div className="__categoryTitle" id="waffles">
              Gaufres salées
            </div>
            <div className="separator"></div>
            {loading && (
              <Row>
                <Col md={6} lg={6} key={1} className="mt-3">
                  <Skeleton height={280} />
                  <Skeleton height={40} className="mt-4" />
                </Col>

                <Col md={6} lg={6} key={2} className="mt-3">
                  <Skeleton height={280} />
                  <Skeleton height={40} className="mt-4" />
                </Col>

                <Col md={6} lg={6} key={3} className="mt-3">
                  <Skeleton height={280} />
                  <Skeleton height={40} className="mt-4" />
                </Col>
              </Row>
            )}
            <CardDeck>
              <Row>
                {products.map((product) => {
                  if (product.category === "food") {
                    return (
                      <Col md={6} lg={6} key={product.id} className="mt-3">
                        <ProductCard product={product} />
                      </Col>
                    );
                  }
                })}
              </Row>
            </CardDeck>

            <div className="__categoryTitle mt-4" id="cup">
              Waffle Cup
            </div>
            <div className="separator"></div>
            <h3>
              <Badge variant="dark">Dessert format XL (550 ml) 🥄</Badge>
            </h3>
            {loading && (
              <Row>
                <Col md={6} lg={6} key={1} className="mt-3">
                  <Skeleton height={280} />
                  <Skeleton height={40} className="mt-4" />
                </Col>

                <Col md={6} lg={6} key={2} className="mt-3">
                  <Skeleton height={280} />
                  <Skeleton height={40} className="mt-4" />
                </Col>

                <Col md={6} lg={6} key={3} className="mt-3">
                  <Skeleton height={280} />
                  <Skeleton height={40} className="mt-4" />
                </Col>
              </Row>
            )}
            <CardDeck>
              <Row>
                {products.map((product) => {
                  if (product.category === "cup") {
                    return (
                      <Col md={6} lg={6} key={product.id} className="mt-3">
                        <ProductCard product={product} />
                      </Col>
                    );
                  }
                })}
              </Row>
            </CardDeck>

            <div className="__categoryTitle mt-4" id="bx">
              Gaufres sucrées
            </div>
            <div className="separator"></div>
            {loading && (
              <Row>
                <Col md={6} lg={6} key={1} className="mt-3">
                  <Skeleton height={280} />
                  <Skeleton height={40} className="mt-4" />
                </Col>

                <Col md={6} lg={6} key={2} className="mt-3">
                  <Skeleton height={280} />
                  <Skeleton height={40} className="mt-4" />
                </Col>

                <Col md={6} lg={6} key={3} className="mt-3">
                  <Skeleton height={280} />
                  <Skeleton height={40} className="mt-4" />
                </Col>
              </Row>
            )}
            <CardDeck>
              <Row>
                {products.map((product) => {
                  if (product.category === "candy") {
                    return (
                      <Col md={6} lg={6} key={product.id} className="mt-3">
                        <ProductCard product={product} />
                      </Col>
                    );
                  }
                })}
              </Row>
            </CardDeck>

            <div className="__categoryTitle mt-4" id="drinks">
              Boissons
            </div>
            <div className="separator"></div>
            {loading && (
              <Row>
                <Col md={6} lg={6} key={1} className="mt-3">
                  <Skeleton height={280} />
                  <Skeleton height={40} className="mt-4" />
                </Col>

                <Col md={6} lg={6} key={2} className="mt-3">
                  <Skeleton height={280} />
                  <Skeleton height={40} className="mt-4" />
                </Col>

                <Col md={6} lg={6} key={3} className="mt-3">
                  <Skeleton height={280} />
                  <Skeleton height={40} className="mt-4" />
                </Col>
              </Row>
            )}
            <CardDeck>
              <Row>
                {products.map((product) => {
                  if (product.category === "drink") {
                    return (
                      <Col md={6} lg={6} key={product.id} className="mt-3">
                        <ProductCard product={product} />
                      </Col>
                    );
                  }
                })}
              </Row>
            </CardDeck>

            <div class="__fabBtn" onClick={() => setCartResumeModal(true)}>
              {cart && cart.totalPrice && cart.totalPrice / 100 + "€"}

              {!cart && (
                <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
              )}
            </div>
          </Col>

          <Col>
            <div className="__cartResume shadow">
              <div className="__cartResumeTitle">Panier</div>
              {isCartEmpty(cart) && (
                <>
                  <hr />
                  <div className="__cartResumeEmpty">Le panier est vide.</div>
                </>
              )}
              <div className="__cartItems">
                {!isCartEmpty(cart) && (
                  <>
                    <Table>
                      <tbody>
                        {cart.products.map((product) => {
                          return (
                            <tr>
                              <td>{product.qty}x</td>

                              <td>{product.name}</td>
                              <td>{(product.total / 100).toFixed(2)}€</td>
                              <td>
                                <RemoveCartButton product={product} />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </>
                )}
              </div>

              {cart && !isCartEmpty(cart) && (
                <>
                  <hr />
                  <div className="__cartResumeTotal">
                    {cart &&
                      cart.totalPrice != 0 &&
                      "Total " + (cart.totalPrice / 100).toFixed(2) + " €"}

                    {!cart && "Total 0.00 €"}
                  </div>

                  <Button
                    className="mt-3"
                    disabled={
                      isCartEmpty(cart) || cart.totalPrice < MIN_PRICE * 100
                    }
                    onClick={() => history.push("/ma-commande")}
                    block
                  >
                    {!cart || cart.totalPrice < MIN_PRICE * 100
                      ? "Le minimum de commande est de 10.00€"
                      : "Continuer"}
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default ProductsPage;
