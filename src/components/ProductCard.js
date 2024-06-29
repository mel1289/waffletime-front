import React, { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import ProductModal from "./ProductModal";
import AddCartButton from "./cart/AddCartButton";
import { API_URL } from "../constants";

const ProductCard = ({ product }) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleProductModalClick = (product) => {
    setSelectedProduct(product);
    setModalShow(true);
  };

  const trunc = (text) => {
    return text.length > 30 ? `${text.substr(0, 30)}...` : text;
  };

  return (
    <div>
      <ProductModal
        show={modalShow}
        product={selectedProduct}
        onHide={() => {
          setModalShow(false);
          setSelectedProduct({});
        }}
      />

      <Card className="shadow">
        {product.imageUrl != "" && (
          <Card.Img
            onClick={() => handleProductModalClick(product)}
            variant="top"
            className="__pointer"
            src={`${API_URL}uploads/` + product.imageUrl}
          />
        )}

        <Card.Body>
          {product.isNew != false && 
            <Badge variant="danger __isNew" className="mb-2">
              Nouveauté 😍
            </Badge>
          }
          {product.isWeekProduct != false &&
            <Badge variant="success __isNew" className="ml-2 mb-2">
              WaffleCup de la semaine 🔥
            </Badge>
          }
          <Card.Title
            className="__titleProduct __pointer"
            onClick={() => handleProductModalClick(product)}
          >
            {product.name}
          </Card.Title>
          <Card.Text>{trunc(product.description)}</Card.Text>

          <hr />

          <div className="d-flex justify-content-between">
            <div className="__price">{(product.price / 100).toFixed(2)}€</div>
            <AddCartButton product={product} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
