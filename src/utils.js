export const getGooglePlaceCity = (place) => {
  let city = null;

  if (!place.address_components) return city;

  for (var j = 0; j < place.address_components.length; j++) {
    for (var k = 0; k < place.address_components[j].types.length; k++) {
      if (place.address_components[j].types[k] == "locality") {
        city = place.address_components[j].long_name;
      }
    }
  }

  return city;
};

export const isValidCity = (place, postalCode, city) => {
  console.log(city);

  if (!place.address_components) return false;

  for (var j = 0; j < place.address_components.length; j++) {
    for (var k = 0; k < place.address_components[j].types.length; k++) {
      if (place.address_components[j].types[k] == "postal_code") {
        if (place.address_components[j].long_name == postalCode) return true;
      }

      if (place.address_components[j].types[k] == "locality") {
        if (place.address_components[j].long_name == city) return true;
      }
    }
  }

  return false;
};

export const getGooglePlacePostalCode = (place) => {
  let postalCode = -1;

  if (!place.address_components) return postalCode;

  for (var j = 0; j < place.address_components.length; j++) {
    for (var k = 0; k < place.address_components[j].types.length; k++) {
      if (place.address_components[j].types[k] == "postal_code") {
        postalCode = place.address_components[j].long_name;
      }
    }
  }

  return postalCode;
};
