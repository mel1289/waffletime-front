import React, { useContext } from "react";
import { Modal, Table, Button } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import { useHistory } from "react-router-dom";
import { isCartEmpty } from "../cart";
import RemoveCartButton from "../components/cart/RemoveCartButton";

const CartResumeModal = (props) => {
  const [cart, setCart] = useContext(CartContext);

  const history = useHistory();

  return (
    <>
      <Modal show={props.show} centered size="lg">
        <Modal.Header>
          <Modal.Title
            className="__alertError"
            id="contained-modal-title-vcenter"
          >
            Votre panier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isCartEmpty(cart) && "Votre panier est vide"}
          {!isCartEmpty(cart) && (
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
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={props.onHide}>
            Continuer mes achats
          </Button>
          {!isCartEmpty(cart) && (
            <Button
              variant="dark"
              onClick={() => history.push("/ma-commande")}
            >
              Passer au paiement
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartResumeModal;
