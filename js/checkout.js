
const CHECKOUT_DELIVERY_FEE = 49;
const CHECKOUT_FREE_DELIVERY_LIMIT = 499;
const CHECKOUT_TAX_RATE = 0.05;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkoutForm");
  const paymentMethod = document.getElementById("paymentMethod");
  const demoPaymentOptions = document.getElementById("demoPaymentOptions");
  const paymentResult = document.getElementById("paymentResult");
  const checkoutNotice = document.getElementById("checkoutNotice");
  const placeOrderBtn = document.getElementById("placeOrderBtn");

  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amount);

  function getCheckoutItems() {
    const foods = getFoods();
    const cart = getCart();

    return cart
      .map((cartItem) => {
        const food = foods.find(
          (item) => Number(item.id) === Number(cartItem.id)
        );

        if (!food || cartItem.quantity <= 0) {
          return null;
        }

        return {
          id: food.id,
          name: food.name,
          price: Number(food.price),
          image: food.image,
          quantity: Number(cartItem.quantity)
        };
      })
      .filter(Boolean);
  }

  function calculateCheckoutBill(items) {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const deliveryFee =
      subtotal === 0 || subtotal >= CHECKOUT_FREE_DELIVERY_LIMIT
        ? 0
        : CHECKOUT_DELIVERY_FEE;

    const tax = Math.round(subtotal * CHECKOUT_TAX_RATE * 100) / 100;
    const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;

    return { subtotal, deliveryFee, tax, total };
  }

  function showNotice(message, type = "info") {
    checkoutNotice.textContent = message;
    checkoutNotice.hidden = false;
    checkoutNotice.className = `notice ${type}`;
  }

  function renderCheckout() {
    const items = getCheckoutItems();
    const summary = document.getElementById("checkoutSummary");

    if (items.length === 0) {
      summary.textContent = "Your cart is empty. Add food before checkout.";

      document.getElementById("checkoutSubtotal").textContent = money(0);
      document.getElementById("checkoutDelivery").textContent = money(0);
      document.getElementById("checkoutTax").textContent = money(0);
      document.getElementById("checkoutTotal").textContent = money(0);

      placeOrderBtn.disabled = true;
      placeOrderBtn.textContent = "Cart Is Empty";
      return;
    }

    placeOrderBtn.disabled = false;
    placeOrderBtn.textContent = "Place Order";

    summary.replaceChildren();

    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "checkout-item";

      const details = document.createElement("div");
      details.className = "checkout-item-details";

      const name = document.createElement("strong");
      name.textContent = item.name;

      const quantity = document.createElement("span");
      quantity.textContent = `Qty: ${item.quantity}`;

      const price = document.createElement("strong");
      price.textContent = money(item.price * item.quantity);

      details.append(name, quantity);
      row.append(details, price);
      summary.appendChild(row);
    });

    const bill = calculateCheckoutBill(items);

    document.getElementById("checkoutSubtotal").textContent =
      money(bill.subtotal);

    document.getElementById("checkoutDelivery").textContent =
      bill.deliveryFee === 0 && bill.subtotal > 0
        ? "FREE"
        : money(bill.deliveryFee);

    document.getElementById("checkoutTax").textContent = money(bill.tax);
    document.getElementById("checkoutTotal").textContent = money(bill.total);
  }

  function updatePaymentOptions() {
    const isOnlinePayment = paymentMethod.value !== "cod";
    demoPaymentOptions.hidden = !isOnlinePayment;
  }

  function createOrderId() {
    return (
      "FH-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random().toString(36).slice(2, 6).toUpperCase()
    );
  }

  paymentMethod.addEventListener("change", updatePaymentOptions);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const items = getCheckoutItems();

    if (items.length === 0) {
      showNotice("Your cart is empty. Please add food first.", "error");
      renderCheckout();
      return;
    }

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const method = paymentMethod.value;

    if (!name || !phone || !address) {
      showNotice("Please complete all delivery details.", "error");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      showNotice("Enter a valid 10-digit Indian mobile number.", "error");
      return;
    }

    if (address.length < 10) {
      showNotice("Please enter a more complete delivery address.", "error");
      return;
    }

    // Simulate online payment. This does not charge real money.
    if (method !== "cod" && paymentResult.value === "failure") {
      showNotice(
        "Demo payment failed. Your order was not placed and your cart is unchanged. Try again.",
        "error"
      );
      return;
    }

    const bill = calculateCheckoutBill(items);

    const paymentLabels = {
      cod: "Cash on Delivery",
      upi: "Demo UPI",
      card: "Demo Card"
    };

    const order = {
      id: createOrderId(),
      createdAt: new Date().toISOString(),

      customer: {
        name,
        phone,
        address
      },

      items: items.map((item) => ({ ...item })),

      subtotal: bill.subtotal,
      deliveryFee: bill.deliveryFee,
      tax: bill.tax,
      total: bill.total,

      paymentMethod: paymentLabels[method],
      paymentStatus: method === "cod" ? "Pay on Delivery" : "Paid (Demo)",

      status: "Pending"
    };

    const existingOrders = getOrders();

    // Avoid accidentally overwriting existing order history.
    const updatedOrders = [order, ...existingOrders];

    try {
      saveOrders(updatedOrders);

      // Verify that the order was saved before clearing the cart.
      const savedOrders = getOrders();
      const savedSuccessfully = savedOrders.some(
        (savedOrder) => savedOrder.id === order.id
      );

      if (!savedSuccessfully) {
        throw new Error("Order could not be verified in storage.");
      }

      saveCart([]);

      document.getElementById("checkoutContent").hidden = true;

      const successSection = document.getElementById("orderSuccess");
      successSection.hidden = false;

      document.getElementById("successOrderId").textContent = order.id;
      document.getElementById("successOrderTotal").textContent =
        money(order.total);

      document.getElementById("successMessage").textContent =
        method === "cod"
          ? "Your order is confirmed for Cash on Delivery. Its current status is Pending."
          : "Your demo payment succeeded. Your order is saved and its current status is Pending.";

      updateCartCount();

      successSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      console.error("Order saving error:", error);

      showNotice(
        "We could not save your order. Your cart has not been intentionally cleared. Please check browser storage and try again.",
        "error"
      );
    }
  });

  updatePaymentOptions();
  renderCheckout();
});
