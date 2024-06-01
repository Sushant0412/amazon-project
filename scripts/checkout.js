import { cart, deleteItem } from "../data/cart.js";
import { products } from "../data/products.js";
import money from "./utils/money.js";

const cartItems = document.querySelector(".order-summary");

let itemsContent = "";
loadCart(cart);

function loadCart(cart) {
  cart.forEach((item) => {
    const productId = item.productId;

    let matchingProduct;

    products.forEach((p) => {
      if (p.id === productId) {
        matchingProduct = p;
      }
    });

    itemsContent += `<div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
        <div class="delivery-date">Delivery date: Tuesday, June 21</div>
        
        <div class="cart-item-details-grid">
          <img
            class="product-image"
            src=${matchingProduct.image}
          />
        
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">$${money(
              matchingProduct.priceCents
            )}</div>
            <div class="product-quantity">
              <span> Quantity: <span class="quantity-label">2</span> </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span data-product-id="${
                matchingProduct.id
              }" class="js-delete-link delete-quantity-link link-primary">
                Delete
              </span>
            </div>
          </div>
        
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
              />
              <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">FREE Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
              />
              <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
              />
              <div>
                <div class="delivery-option-date">Monday, June 13</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
              </div>
            </div>
          </div>
        </div>
        </div>`;
  });
}

cartItems.innerHTML = itemsContent;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    deleteItem(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
  });
});
