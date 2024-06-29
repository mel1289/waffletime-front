import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HowTo from "./pages/HowTo";
import Contact from "./pages/Contact";
import NotFoundPage from "./pages/NotFoundPage";
import PurchaseSwitcher from "./pages/purchase/PurchaseSwitcher";
import { CartProvider } from "./contexts/CartContext";
import { PurchaseProvider } from "./contexts/PurchaseContext";
import { Modal } from "react-bootstrap";
import MaintenancePage from "./pages/MaintenancePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const maintenance = false;

  useEffect(() => {
    window.addEventListener("offline", () => {
      setShowNetworkModal(true);
    });

    window.addEventListener("online", () => {
      setShowNetworkModal(false);
    });
  });

  if (maintenance) return <MaintenancePage />;
  else
    return (
      <Router>
        <div className="App">
          <PurchaseProvider>
            <CartProvider>
              <Modal
                backdrop="false"
                size="sm"
                show={showNetworkModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Body className="__center">
                  <p className="mt-2 __noNetwork">
                    Tu as perdu la connexion internet !
                  </p>
                </Modal.Body>
              </Modal>

              <Header />
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/ma-commande" component={PurchaseSwitcher} />
                <Route path="/comment-ça-marche" component={HowTo} />
                <Route path="/contact" component={Contact} />
                <Route component={NotFoundPage} />
              </Switch>
            </CartProvider>
          </PurchaseProvider>
        </div>
      </Router>
    );
}

export default App;
