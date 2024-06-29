import React, { useContext, useEffect, useState } from "react";
import { Container, Button, Form, Col } from "react-bootstrap";
import Autocomplete from "react-google-autocomplete";
import { PurchaseContext } from "../../contexts/PurchaseContext";
import { isValidCity } from "../../utils";
import CheckoutStepBar from "../../components/CheckoutStepBar";
import CityHeader from "../../components/CityHeader";
import Footer from "../../components/Footer";

const CheckoutPage = () => {
  const [purchase, setPurchase] = useContext(PurchaseContext);
  const [errors, setErrors] = useState({ error: false });
  const [cityError, setCityError] = useState(false);

  const emailExp = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  const phoneExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;

  const checkErrors = () => {
    let err = false;
    if (!purchase.customer.firstname) {
      err = true;
      setErrors((prevState) => ({
        ...prevState,
        firstname: true,
        error: true,
      }));
    }
    if (!purchase.customer.lastname) {
      err = true;
      setErrors((prevState) => ({
        ...prevState,
        lastname: true,
        error: true,
      }));
    }
    if (
      !purchase.customer.email ||
      !emailExp.test(purchase.customer.email.toLowerCase())
    ) {
      err = true;
      setErrors((prevState) => ({
        ...prevState,
        email: true,
        error: true,
      }));
    }
    if (!purchase.customer.phone || !phoneExp.test(purchase.customer.phone)) {
      err = true;
      setErrors((prevState) => ({
        ...prevState,
        phone: true,
        error: true,
      }));
    }
    if (!purchase.customer.address || !purchase.selectedCity) {
      err = true;
      setErrors((prevState) => ({
        ...prevState,
        address: true,
        error: true,
      }));
    }

    return err;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "address") {
      setPurchase((prevState) => ({
        ...prevState,
        selectedCity: false,
      }));
    }

    setPurchase((prevState) => ({
      ...prevState,
      customer: {
        ...prevState.customer,
        [name]: value,
      },
    }));
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();

    setErrors({ error: false });

    if (!checkErrors()) {
      setPurchase((prevState) => ({
        ...prevState,
        step: purchase.step + 1,
      }));
    }
  };

  return (
    <div>
      <CityHeader />

      <Container className="mt-4 mb-4">
        <CheckoutStepBar />

        <div class="__categoryTitle">On a besoin de quelques informations</div>
        <div class="separator"></div>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                name="firstname"
                isInvalid={errors.firstname}
                onChange={changeHandler}
                type="text"
                value={purchase.customer.firstname}
                placeholder="Prénom"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                name="lastname"
                isInvalid={errors.lastname}
                onChange={changeHandler}
                type="text"
                value={purchase.customer.lastname}
                placeholder="Nom"
              />
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <Form.Label>Adresse email</Form.Label>
            <Form.Control
              name="email"
              isInvalid={errors.email}
              onChange={changeHandler}
              type="email"
              value={purchase.customer.email}
              placeholder="Entrez votre adresse email"
            />
            <Form.Text className="text-muted">
              Vous recevrez le reçu de la commande par email.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Numéro de téléphone</Form.Label>
            <Form.Control
              name="phone"
              isInvalid={errors.phone}
              onChange={changeHandler}
              type="text"
              value={purchase.customer.phone}
              placeholder="Entrez votre numéro de téléphone"
            />
            <Form.Text className="text-muted">
              Vous recevrez un SMS lorsque le livreur sera arrivé.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Adresse de livraison</Form.Label>
            {cityError && (
              <Form.Text className="__text-form-error">
                L'adresse ne correspond pas à la zone sélectionnée (
                {purchase.customer.city}- {purchase.customer.postalCode}).
              </Form.Text>
            )}
            <Autocomplete
              name="address"
              placeholder="Entrez votre adresse"
              className={
                errors.address ? `form-control is-invalid` : `form-control`
              }
              style={{ width: "100%" }}
              onPlaceSelected={(place) => {
                if (
                  isValidCity(
                    place,
                    purchase.customer.postalCode,
                    purchase.customer.city
                  )
                ) {
                  setCityError(true);
                } else {
                  setCityError(false);
                  setPurchase((prevState) => ({
                    ...prevState,
                    selectedCity: true,
                    customer: {
                      ...prevState.customer,
                      address: place.formatted_address,
                      lat: place.geometry.location.lat(),
                      lng: place.geometry.location.lng(),
                    },
                  }));
                }
              }}
              types={["address"]}
              onChange={changeHandler}
              value={purchase.customer.address}
              componentRestrictions={{ country: "fr" }}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSubmitClick} type="submit">
            Suivant
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
