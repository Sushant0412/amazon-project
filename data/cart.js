export let cart = [
  {
    productId: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    quantity: 2,
  },
  {
    productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    quantity: 4,
  },
];

export function deleteItem(id) {
  const newCart = [];
  cart.forEach((item) => {
    if (item.productId !== id) {
      newCart.push(item);
    }
  });
  cart = newCart;
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
}
