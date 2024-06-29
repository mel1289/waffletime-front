import { API_URL } from "../constants";

export const getAllProducts = (shipperId) => {
  return fetch(API_URL + "shippers/" + shipperId + "/products");
};
