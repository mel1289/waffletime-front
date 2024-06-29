import React, { useState, useEffect, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { PurchaseContext } from "../contexts/PurchaseContext";
import { Typeahead } from "react-bootstrap-typeahead";

import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { API_URL } from "../constants";
import ModalLoader from "../components/ModalLoader";

const AddressPage = () => {
  const [cities, setCities] = useState([]);

  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(null);
  const [purchase, setPurchase] = useContext(PurchaseContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(API_URL + "zones")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setCities(data);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);

        setError(
          err instanceof TypeError
            ? "Une erreur est survenue, veuillez rafraîchir votre page."
            : err.message
        );
      });
  }, []);

  const handleClick = () => {
    if (selected == null) return;

    setPurchase((prevState) => {
      return {
        ...prevState,
        customer: {
          ...prevState.customer,
          shipperId: selected[0].shipperId,
          postalCode: selected[0].postalCode,
          city: selected[0].city,
          zoneId: selected[0].id,
        },
      };
    });
  };

  return (
    <div>
      <div className="__homeBackground">
        <Container className="mt-4 mb-4">
          <ModalLoader show={loading} />

          <div className="__box shadow">
            <div className="__categoryTitle">Où souhaites-tu être livré ?</div>
            <div className="separator"></div>

            <div className="__address-container">
              {error && <div className="__error mb-3">{error}</div>}

              <Typeahead
                disabled={error}
                id="city-selection"
                labelKey={(option) => `${option.postalCode} ${option.city}`}
                multiple={false}
                minLength={3}
                emptyLabel="Aucun résultat."
                onChange={(city) => setSelected(city)}
                options={cities}
                placeholder="Ville ou code postal"
                selected={selected}
                renderMenuItemChildren={(city) => (
                  <div>
                    {city.postalCode} - {city.city}
                  </div>
                )}
              />

              <p className="__warning">
                Seul les villes que nous livrons sont proposées.
              </p>

              <Button
                className="mt-3"
                size="lg"
                onClick={handleClick}
                disabled={selected == null ? true : false}
                block
              >
                Valider
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AddressPage;
