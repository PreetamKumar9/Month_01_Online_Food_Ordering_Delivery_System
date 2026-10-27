
document.addEventListener("DOMContentLoaded", () => {
  const ordersContainer = document.getElementById("ordersContainer");
  const emptyOrders = document.getElementById("emptyOrders");
  const emptyOrdersMessage = document.getElementById("emptyOrdersMessage");
  const orderSearch = document.getElementById("orderSearch");
  const statusFilter = document.getElementById("statusFilter");
  const orderCount = document.getElementById("orderCount");
  const dashboardNotice = document.getElementById("dashboardNotice");

  const ORDER_STATUSES = [
    "Pending",
    "Confirmed",
    "Out for Delivery",
    "Delivered"
  ];

  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(Number(amount) || 0);

  function getSafeStatus(status) {
    return ORDER_STATUSES.includes(status) ? status : "Pending";
  }

  function formatDate(dateValue) {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text !== undefined && text !== null) {
      element.textContent = String(text);
    }

    return element;
  }

  function showNotice(message) {
    dashboardNotice.textContent = message;
    dashboardNotice.hidden = false;
  }

  function updateStatistics(orders) {
    const activeCount = orders.filter(
      (order) => getSafeStatus(order.status) !== "Delivered"
    ).length;

    const deliveredCount = orders.filter(
      (order) => getSafeStatus(order.status) === "Delivered"
    ).length;

    const totalSpent = orders.reduce(
      (sum, order) => sum + (Number(order.total) || 0),
      0
    );

    document.getElementById("totalOrders").textContent = orders.length;
    document.getElementById("activeOrders").textContent = activeCount;
    document.getElementById("deliveredOrders").textContent = deliveredCount;
    document.getElementById("totalSpent").textContent = money(totalSpent);
  }

  function renderProgress(status) {
    const progress = createElement("div", "order-progress");
    progress.setAttribute("aria-label", `Order status: ${status}`);

    const currentIndex = ORDER_STATUSES.indexOf(status);

    ORDER_STATUSES.forEach((step, index) => {
      const stepElement = createElement("div", "progress-step");

      if (index < currentIndex) {
        stepElement.classList.add("completed");
      } else if (index === currentIndex) {
        stepElement.classList.add("current");
      }

      const marker = createElement(
        "span",
        "progress-marker",
        index < currentIndex ? "✓" : String(index + 1)
      );

      const label = createElement("span", "progress-label", step);

      stepElement.append(marker, label);
      progress.appendChild(stepElement);
    });

    return progress;
  }

  function renderOrderItems(items) {
    const list = createElement("div", "order-food-list");

    if (!Array.isArray(items) || items.length === 0) {
      list.appendChild(
        createElement("p", "muted-text", "Item details unavailable.")
      );
      return list;
    }

    items.forEach((item) => {
      const row = createElement("div", "order-food-item");

      const details = createElement("div", "order-food-details");
      details.append(
        createElement("strong", "", item.name || "Food item"),
        createElement(
          "span",
          "muted-text",
          `${Number(item.quantity) || 0} × ${money(item.price)}`
        )
      );

      const lineTotal =
        (Number(item.price) || 0) * (Number(item.quantity) || 0);

      row.append(
        details,
        createElement("strong", "", money(lineTotal))
      );

      list.appendChild(row);
    });

    return list;
  }

  function renderOrder(order) {
    const status = getSafeStatus(order.status);
    const card = createElement("article", "panel order-card");

    const header = createElement("div", "order-card-header");
    const heading = createElement("div", "order-heading");

    heading.append(
      createElement("h3", "", `Order ${order.id || "ID unavailable"}`),
      createElement("p", "muted-text", formatDate(order.createdAt))
    );

    const statusBadge = createElement(
      "span",
      `status status-${status.toLowerCase().replaceAll(" ", "-")}`,
      status
    );

    header.append(heading, statusBadge);

    const progressHeading = createElement("h4", "order-section-title", "Delivery Progress");
    const progress = renderProgress(status);

    const summary = createElement("div", "order-quick-summary");

    const itemCount = Array.isArray(order.items)
      ? order.items.reduce(
          (sum, item) => sum + (Number(item.quantity) || 0),
          0
        )
      : 0;

    const summaryItem = createElement(
      "span",
      "",
      `${itemCount} food item${itemCount === 1 ? "" : "s"}`
    );

    const summaryTotal = createElement("strong", "", money(order.total));

    summary.append(summaryItem, summaryTotal);

    const details = createElement("details", "order-details");
    const detailsSummary = createElement("summary", "", "View Order Details");

    const detailsBody = createElement("div", "order-details-body");

    detailsBody.append(
      createElement("h4", "order-section-title", "Items Ordered"),
      renderOrderItems(order.items),
      createElement("h4", "order-section-title", "Delivery Information")
    );

    const customer = order.customer || {};

    const customerInfo = createElement("div", "order-customer-info");

    customerInfo.append(
      createElement("p", "", `Name: ${customer.name || "Not available"}`),
      createElement("p", "", `Phone: ${customer.phone || "Not available"}`),
      createElement("p", "", `Address: ${customer.address || "Not available"}`)
    );

    const billDetails = createElement("div", "order-bill-details");

    const billRows = [
      ["Subtotal", order.subtotal],
      ["Delivery Fee", order.deliveryFee],
      ["Tax", order.tax]
    ];

    billRows.forEach(([label, amount]) => {
      const row = createElement("div", "bill-row");
      row.append(
        createElement("span", "", label),
        createElement("strong", "", money(amount))
      );
      billDetails.appendChild(row);
    });

    const totalRow = createElement("div", "bill-row bill-total");
    totalRow.append(
      createElement("span", "", "Total"),
      createElement("strong", "", money(order.total))
    );
    billDetails.appendChild(totalRow);

    const paymentInfo = createElement("div", "order-payment-info");
    paymentInfo.append(
      createElement(
        "p",
        "",
        `Payment Method: ${order.paymentMethod || "Not available"}`
      ),
      createElement(
        "p",
        "",
        `Payment Status: ${order.paymentStatus || "Not available"}`
      )
    );

    detailsBody.append(customerInfo, billDetails, paymentInfo);
    details.append(detailsSummary, detailsBody);

    card.append(
      header,
      progressHeading,
      progress,
      summary,
      details
    );

    return card;
  }

  function renderDashboard() {
    dashboardNotice.hidden = true;

    let orders;

    try {
      orders = getOrders();

      if (!Array.isArray(orders)) {
        orders = [];
      }
    } catch (error) {
      console.error("Could not read order history:", error);
      showNotice("Unable to read order history from browser storage.");
      orders = [];
    }

    // Show the newest orders first.
    orders.sort((a, b) => {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    updateStatistics(orders);

    const searchTerm = orderSearch.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;

    const filteredOrders = orders.filter((order) => {
      const customer = order.customer || {};
      const items = Array.isArray(order.items) ? order.items : [];

      const searchableText = [
        order.id,
        customer.name,
        customer.phone,
        customer.address,
        ...items.map((item) => item.name)
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchTerm);
      const matchesStatus =
        selectedStatus === "all" ||
        getSafeStatus(order.status) === selectedStatus;

      return matchesSearch && matchesStatus;
    });

    ordersContainer.replaceChildren();

    filteredOrders.forEach((order) => {
      ordersContainer.appendChild(renderOrder(order));
    });

    orderCount.textContent =
      `${filteredOrders.length} order${filteredOrders.length === 1 ? "" : "s"}`;

    const shouldShowEmptyState = filteredOrders.length === 0;
    emptyOrders.hidden = !shouldShowEmptyState;

    if (orders.length === 0) {
      emptyOrdersMessage.textContent =
        "Your order history will appear here after your first order.";
    } else {
      emptyOrdersMessage.textContent =
        "No orders match your search or selected status. Try changing the filters.";
    }
  }

  orderSearch.addEventListener("input", renderDashboard);
  statusFilter.addEventListener("change", renderDashboard);

  document
    .getElementById("refreshOrdersBtn")
    .addEventListener("click", renderDashboard);

  // Refresh if the admin changes order status in another browser tab.
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEYS.orders) {
      renderDashboard();
    }
  });

  // Refresh when the user returns to this page.
  window.addEventListener("focus", renderDashboard);

  renderDashboard();
});
