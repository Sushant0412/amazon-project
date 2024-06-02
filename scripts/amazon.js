import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import money from "./utils/money.js";
const productContainer = document.querySelector(".products-grid");
const items = document.querySelector(".cart-quantity");
let cartFromStorage = localStorage.getItem("cart");
if (cartFromStorage) {
  items.innerHTML = JSON.parse(cartFromStorage).length;
} else {
  items.innerHTML = 0;
}
let productHTML = "";

products.forEach((p, index) => {
  productHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${p.image}" />
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${p.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${
            p.rating.stars * 10
          }.png" />
          <div class="product-rating-count link-primary">${p.rating.count}</div>
        </div>

        <div class="product-price">$${money(p.priceCents)}</div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png" />
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
          p.id
        }">Add to Cart</button>
      </div>
    `;
});

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  items.innerHTML = cartQuantity;
}

productContainer.innerHTML = productHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
    //console.log(cart);
  });
});
