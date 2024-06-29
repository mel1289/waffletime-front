import React from "react";
import { Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="__footer">
      <Row>
        <Col md={6} lg={6}>
          <div className="__footerTitle mb-3 mt-3">WaffleTime</div>
          <p className="noselect">contact@waffletime.fr</p>
          <p>
            <a href="#">CGV</a>
          </p>
          <p>
            <a href="#">Mentions légales</a>
          </p>
          <p>
            <a
              href="https://www.instagram.com/waffletimeorleans/"
              target="_blank"
            >
              <img src="./imgs/insta.png" />
            </a>
            <a
              href="https://www.facebook.com/waffletimeorleans/"
              target="_blank"
            >
              <img src="./imgs/facebook.png" className="ml-3" />
            </a>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
