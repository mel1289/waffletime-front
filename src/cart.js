export const createNewCart = (product) => {
  const newProduct = createNewProduct(product);

  return {
    products: [newProduct],
    totalProducts: 1,
    totalPrice: newProduct.price,
  };
};

export const createNewProduct = (product) => {
  return {
    productId: product.id,
    imageUrl: product.imageUrl,
    name: product.name,
    price: product.price,
    qty: 1,
    total: product.price,
  };
};

export const addProductInCart = (cart, product) => {
  const productIndex = isProductInCart(cart, product.id);

  if (productIndex > -1) {
    cart.products[productIndex].qty += 1;
    cart.products[productIndex].total = parseInt(
      cart.products[productIndex].qty * product.price
    );
  } else {
    cart.products.push(createNewProduct(product));
  }

  const updatedCart = {
    products: cart.products,
    totalPrice: parseInt(getTotalPrice(cart)),
    totalProducts: getTotalProducts(cart),
  };

  return updatedCart;
};

export const removeProductInCart = (cart, product) => {
  const productIndex = isProductInCart(cart, product.productId);

  if (productIndex < 0) {
    return cart;
  }

  if (cart.products[productIndex].qty > 1) {
    cart.products[productIndex].qty -= 1;
    cart.products[productIndex].total = parseInt(
      cart.products[productIndex].qty * product.price
    );
  } else {
    cart.products.splice(productIndex, 1);

    if (cart.products.length <= 0 || cart.products === "undefined") {
      return null;
    }
  }

  const updatedCart = {
    products: cart.products,
    totalPrice: parseInt(getTotalPrice(cart)),
    totalProducts: getTotalProducts(cart),
  };

  return updatedCart;
};

export const getTotalPrice = (cart) => {
  let total = 0;

  cart.products.forEach((product) => {
    total += product.total;
  });

  return total;
};

export const getTotalProducts = (cart) => {
  let total = 0;

  cart.products.forEach((product) => {
    total += product.qty;
  });

  return total;
};

export const isProductInCart = (cart, productId) => {
  if (!cart) return -1;

  const filteredTab = cart.products.filter((item) => {
    if (productId === item.productId) {
      return item;
    }
  });

  return cart.products.indexOf(filteredTab[0]);
};

export const checkQty = (cart, product) => {
  const productIndex = isProductInCart(cart, product.id);

  if (productIndex > -1) {
    if (cart.products[productIndex].qty >= product.qty) {
      return true;
    }
  }

  return false;
};

export const updateCartBeforeCheckout = (cart, products) => {
  let isUpdated = false;

  products.forEach((product) => {
    const productIndex = isProductInCart(cart, product.id);

    if (productIndex > -1) {
      if (cart.products[productIndex].qty > product.qty) {
        if (product.qty === 0) {
          cart.products.splice(productIndex, 1);
        } else {
          cart.products[productIndex].qty = product.qty;
        }
        isUpdated = true;
      }
    }
  });

  const updatedCart = {
    products: cart.products,
    totalPrice: parseInt(getTotalPrice(cart)),
    totalProducts: getTotalProducts(cart),
    updated: isUpdated,
  };

  return updatedCart;
};

export const isCartEmpty = (cart) => {
  if (
    cart == null ||
    cart.products === "undefined" ||
    cart.products.length <= 0
  ) {
    return true;
  }

  return false;
};
