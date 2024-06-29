import React, { useEffect } from "react";
import OrderStep from "../imgs/order_step.svg";
import DeliveryStep from "../imgs/delivery_step.svg";
import EatStep from "../imgs/eat_step.svg";
import { CardDeck, Row, Col, Container, Modal, Button } from "react-bootstrap";
import Footer from "../components/Footer";

const HowTo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container className="mt-2 __howTo">
        <div className="__categoryTitle mt-4" id="bx">
          Comment ça marche ?
        </div>
        <div className="separator mb-4"></div>

        <Row>
          <Col md={6} lg={4} key={1} className="__stepItem mt-3">
            <img src={OrderStep} height={200} />
            <div className="__stepTitle">Passe une commande</div>
            <div className="__stepText">
              Fais ton choix, procède au paiement en ligne
              sécurisé ou sur place en espèces.
            </div>
          </Col>

          <Col md={6} lg={4} key={2} className="__stepItem mt-3">
            <img src={DeliveryStep} height={200} />
            <div className="__stepTitle">Le livreur arrive</div>
            <div className="__stepText">
              En route pour réveiller tes papilles.
            </div>
          </Col>

          <Col md={6} lg={4} key={3} className="__stepItem mt-3">
            <img src={EatStep} height={200} />
            <div className="__stepTitle">Le meilleur moment</div>

            <div className="__stepText">Miam</div>
          </Col>
        </Row>

        <div className="__categoryTitle mt-4" id="bx">
          Comment annuler ma commande ?
        </div>
        <div className="separator mb-4"></div>
        <p>Pour annuler une commande, envoyez un e-mail à <b>contact@waffletime.fr</b> avec pour objet « Annulation de commande ». Indiquez la référence (<i>indiqué dans l'email récapitulatif</i>) de votre commande ainsi que votre identité dans l'e-mail.</p>
      </Container>
      <Footer />
    </>
  );
};

export default HowTo;
