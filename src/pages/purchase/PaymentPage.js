import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CheckoutStepBar from "../../components/CheckoutStepBar";
import PaymentBank from "../../components/PaymentBank";
import PaymentCash from "../../components/PaymentCash";
import { isCartEmpty } from "../../cart";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { PurchaseContext } from "../../contexts/PurchaseContext";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CityHeader from "../../components/CityHeader";
import Footer from "../../components/Footer";

const PaymentPage = () => {
  const [type, setType] = useState("bank");
  const [cart, setCart] = useContext(CartContext);
  const [purchase, setPurchase] = useContext(PurchaseContext);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isCartEmpty(cart)) {
      setPurchase((prevState) => ({
        ...prevState,
        step: 1,
      }));

      history.push("/");
    }
  }, [cart]);

  return (
    <div>
      <CityHeader />
      <Container className="mt-4 mb-4">
        <CheckoutStepBar />
        <div class="__categoryTitle">Paiement</div>
        <div class="separator"></div>
        <Row>
          <Col xs={12} md={12} lg={4}>
            <div
              className={
                type === "bank"
                  ? `__paymentType __paymentActive`
                  : `__paymentType`
              }
              onClick={() => setType("bank")}
            >
              <div className="__paymentIcon">
                <FontAwesomeIcon icon={faMoneyCheckAlt} className="mr-1" />
              </div>
              Carte bancaire
            </div>
            <div
              className={
                type === "cash"
                  ? `__paymentType __paymentActive`
                  : `__paymentType`
              }
              onClick={() => setType("cash")}
            >
              <div className="__paymentIcon">
                <FontAwesomeIcon icon={faMoneyBillWave} className="mr-1" />
              </div>{" "}
              Espèces
            </div>
          </Col>
          <Col xs={12} md={12} lg={8}>
            {type === "bank" ? <PaymentBank /> : ""}
            {type === "cash" ? <PaymentCash /> : ""}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default PaymentPage;
