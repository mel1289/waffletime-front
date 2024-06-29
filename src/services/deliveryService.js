import { API_URL } from "../constants";

export const getDeliveryTime = (shipperId, coords, orderDate) => {
  return fetch(API_URL + "shippers/" + shipperId + "/getDeliveryTime", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: coords,
    }),
  });
};