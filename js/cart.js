
/* =====================================
   FOODIEHUB - SHOPPING CART
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.getElementById("cartItems");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const cartNotice = document.getElementById("cartNotice");

  const DELIVERY_FEE = 49;
  const FREE_DELIVERY_LIMIT = 499;
  const TAX_RATE = 0.05;

  let noticeTimer;

  function showNotice(message) {
    cartNotice.textContent = message;
    cartNotice.hidden = false;

    clearTimeout(noticeTimer);

    noticeTimer = setTimeout(() => {
      cartNotice.hidden = true;
    }, 2500);
  }

  /* Match saved cart entries with the current food catalog. */
  function getValidCartItems() {
    const foods = getFoods();
    const cart = getCart();

    const validItems = cart.filter(item => {
      const foodExists = foods.some(
        food => String(food.id) === String(item.id)
      );

      return foodExists &&
        Number.isInteger(Number(item.quantity)) &&
        Number(item.quantity) > 0;
    });

    if (validItems.length !== cart.length) {
      saveCart(validItems);
    }

    return validItems.map(item => {
      const food = foods.find(
        product => String(product.id) === String(item.id)
      );

      return {
        ...food,
        quantity: Number(item.quantity)
      };
    });
  }

  /* Calculate all bill components consistently. */
  function calculateBill(items) {
    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    const deliveryFee =
      subtotal === 0 || subtotal >= FREE_DELIVERY_LIMIT
        ? 0
        : DELIVERY_FEE;

    // Demo tax is calculated on the food subtotal.
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;

    const total = Math.round(
      (subtotal + deliveryFee + tax) * 100
    ) / 100;

    return {
      subtotal,
      deliveryFee,
      tax,
      total
    };
  }

  /* Display the cart items and their quantity controls. */
  function renderCart() {
    const items = getValidCartItems();

    const totalQuantity = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    document.getElementById("cartItemCount").textContent =
      `${totalQuantity} item${totalQuantity === 1 ? "" : "s"} in your cart`;

    if (items.length === 0) {
      cartItems.innerHTML = `
        <div class="empty-state">
          <h3>Your cart is empty 🛒</h3>
          <p>Discover something delicious from our menu.</p>
          <a href="menu.html" class="btn btn-primary mt-20">
            Explore Menu
          </a>
        </div>
      `;
    } else {
      cartItems.innerHTML = items.map(item => `
        <article class="cart-item">
          <img
            src="${item.image}"
            alt="${item.name}"
            onerror="this.onerror=null;this.src='https://placehold.co/160x120?text=Food'"
          >

          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>${formatPrice(item.price)} each</p>

            <div class="quantity-controls">
              <button
                type="button"
                data-cart-action="decrease"
                data-food-id="${item.id}"
                aria-label="Decrease ${item.name} quantity">−</button>

              <span>${item.quantity}</span>

              <button
                type="button"
                data-cart-action="increase"
                data-food-id="${item.id}"
                aria-label="Increase ${item.name} quantity">+</button>
            </div>
          </div>

          <div class="cart-item-end">
            <strong>${formatPrice(item.price * item.quantity)}</strong>
            <button
              type="button"
              class="remove-item"
              data-cart-action="remove"
              data-food-id="${item.id}">
              Remove
            </button>
          </div>
        </article>
      `).join("");
    }

    renderBill(items);
    updateCartCount();

    checkoutBtn.classList.toggle("is-disabled", items.length === 0);
    checkoutBtn.setAttribute("aria-disabled", String(items.length === 0));

    if (items.length === 0) {
      document.getElementById("deliveryMessage").textContent =
        "Add food to see your delivery charges.";
    }
  }

  /* Update bill amounts and delivery messaging. */
  function renderBill(items) {
    const bill = calculateBill(items);

    document.getElementById("subtotal").textContent =
      formatPrice(bill.subtotal);

    document.getElementById("deliveryFee").textContent =
      formatPrice(bill.deliveryFee);

    document.getElementById("taxAmount").textContent =
      formatPrice(bill.tax);

    document.getElementById("grandTotal").textContent =
      formatPrice(bill.total);

    const deliveryMessage = document.getElementById("deliveryMessage");

    if (bill.subtotal === 0) {
      deliveryMessage.textContent =
        "Add food to see your delivery charges.";
    } else if (bill.subtotal >= FREE_DELIVERY_LIMIT) {
      deliveryMessage.textContent =
        "🎉 You've unlocked free delivery!";
    } else {
      const remaining = FREE_DELIVERY_LIMIT - bill.subtotal;

      deliveryMessage.textContent =
        `Add ${formatPrice(remaining)} more for free delivery.`;
    }
  }

  /* Handle increase, decrease, and remove actions. */
  cartItems.addEventListener("click", event => {
    const button = event.target.closest("[data-cart-action]");

    if (!button) return;

    const action = button.dataset.cartAction;
    const foodId = button.dataset.foodId;
    const cart = getCart();

    const item = cart.find(
      entry => String(entry.id) === String(foodId)
    );

    if (!item) {
      renderCart();
      return;
    }

    if (action === "increase") {
      if (Number(item.quantity) >= 99) {
        showNotice("Maximum quantity is 99 per item.");
        return;
      }

      item.quantity = Number(item.quantity) + 1;
    } else if (action === "decrease") {
      item.quantity = Number(item.quantity) - 1;

      if (item.quantity <= 0) {
        const updatedCart = cart.filter(
          entry => String(entry.id) !== String(foodId)
        );

        if (!saveCart(updatedCart)) {
          showNotice("Unable to save your changes.");
          return;
        }

        renderCart();
        return;
      }
    } else if (action === "remove") {
      const updatedCart = cart.filter(
        entry => String(entry.id) !== String(foodId)
      );

      if (!saveCart(updatedCart)) {
        showNotice("Unable to save your changes.");
        return;
      }

      renderCart();
      showNotice("Item removed from your cart.");
      return;
    }

    if (!saveCart(cart)) {
      showNotice("Unable to save your changes.");
      return;
    }

    renderCart();
  });

  /* Clear the complete cart. */
  clearCartBtn.addEventListener("click", () => {
    if (getCart().length === 0) {
      showNotice("Your cart is already empty.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to remove all items?"
    );

    if (!confirmed) return;

    if (!saveCart([])) {
      showNotice("Unable to clear your cart.");
      return;
    }

    renderCart();
    showNotice("Your cart has been cleared.");
  });

  /* Prevent checkout when no items are present. */
  checkoutBtn.addEventListener("click", event => {
    if (getValidCartItems().length === 0) {
      event.preventDefault();
      showNotice("Please add food before proceeding to checkout.");
    }
  });

  renderCart();
});
