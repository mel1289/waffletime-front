import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const HeaderLand = () => {
  return (
    <div className="__land">
      <Container>
        <Row>
          <Col>
            <div className="__landTitle">
              Une <strike>petite</strike> grosse faim ? Tu es au bon endroit.
            </div>
            <div className="__landDesc">
              Des gaufres salées, sucrées & des jus maisons rien que pour toi !
            </div>
          </Col>
          <Col lg={5} className="d-none d-lg-block">
            <img className="__imgHead shadow" src="./imgs/reseaux.png" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderLand;
