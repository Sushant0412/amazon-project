import { cart, deleteItem } from "../data/cart.js";
import { products } from "../data/products.js";
import money from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import deliveryOptions from "../data/deliveryOptions.js";

const cartItems = document.querySelector(".order-summary");

function renderCart() {
  let itemsContent = "";
  cart.forEach((item) => {
    const productId = item.productId;

    let matchingProduct = products.find((p) => p.id === productId);

    if (matchingProduct) {
      itemsContent += `<div class="cart-item-container">
          <div class="delivery-date">Delivery date: ${dayjs()
            .add(7, "days")
            .format("dddd, MMMM D")}</div>
          
          <div class="cart-item-details-grid">
            <img class="product-image" src=${matchingProduct.image} />
          
            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">$${money(
                matchingProduct.priceCents
              )}</div>
              <div class="product-quantity">
                <span> Quantity: <span class="quantity-label">2</span> </span>
                <span class="update-quantity-link link-primary">Update</span>
                <span data-product-id="${
                  matchingProduct.id
                }" class="js-delete-link delete-quantity-link link-primary">Delete</span>
              </div>
            </div>
          
            <div class="delivery-options">
              <div class="delivery-options-title">Choose a delivery option:</div>
              ${deliveryOptionsHTML(matchingProduct)}
            </div>
          </div>
        </div>`;
    }
  });
  cartItems.innerHTML = itemsContent;

  function deliveryOptionsHTML(matchingProduct) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${(deliveryOption.priceCents / 100).toFixed(2)} - `;

      html += `
      <div class="delivery-option">
        <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}" />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>
      `;
    });

    return html;
  }

  // Add event listeners to the new delete links
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      deleteItem(productId);
      renderCart(); // Re-render the cart after deleting the item
    });
  });
}

// Initial render
renderCart();
