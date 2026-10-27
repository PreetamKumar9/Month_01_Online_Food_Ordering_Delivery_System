
document.addEventListener("DOMContentLoaded", () => {
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "preet@preet";

  const ORDER_STATUSES = [
    "Pending",
    "Confirmed",
    "Out for Delivery",
    "Delivered"
  ];

  const loginSection = document.getElementById("adminLoginSection");
  const dashboard = document.getElementById("adminDashboard");
  const loginForm = document.getElementById("adminLoginForm");
  const loginMessage = document.getElementById("loginMessage");
  const adminNotice = document.getElementById("adminNotice");
  const foodForm = document.getElementById("foodForm");
  const foodTable = document.getElementById("adminFoodTable");
  const orderTable = document.getElementById("adminOrderTable");

  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(Number(amount) || 0);

  function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) element.className = className;
    if (text !== undefined && text !== null) {
      element.textContent = String(text);
    }

    return element;
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (error) {
      console.error(`Could not read ${key}:`, error);
      return fallback;
    }
  }

  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Could not save ${key}:`, error);
      showNotice(
        "Unable to save data. Check available browser storage and try again.",
        "error"
      );
      return false;
    }
  }

  function readFoods() {
    const foods = getFoods();
    return Array.isArray(foods) ? foods : [];
  }

  function readOrders() {
    const orders = getOrders();
    return Array.isArray(orders) ? orders : [];
  }

  function showNotice(message, type = "success") {
    adminNotice.textContent = message;
    adminNotice.className = `notice ${type}`;
    adminNotice.hidden = false;
  }

  function setLoggedIn(isLoggedIn) {
    loginSection.hidden = isLoggedIn;
    dashboard.hidden = !isLoggedIn;

    if (isLoggedIn) {
      renderAll();
    }
  }

  function isLoggedIn() {
    return sessionStorage.getItem(STORAGE_KEYS.adminSession) === "true";
  }

  // Fill the category selector using the project's shared category data.
  function populateCategories() {
    const categorySelect = document.getElementById("foodCategory");
    categorySelect.replaceChildren();

    CATEGORIES.forEach((category) => {
      categorySelect.appendChild(
        createElement("option", "", category)
      );
    });
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEYS.adminSession, "true");
      loginMessage.hidden = true;
      loginForm.reset();
      setLoggedIn(true);
    } else {
      loginMessage.textContent = "Incorrect username or password.";
      loginMessage.className = "notice error";
      loginMessage.hidden = false;
    }
  });

  document.getElementById("adminLogoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem(STORAGE_KEYS.adminSession);
    adminNotice.hidden = true;
    resetFoodForm();
    setLoggedIn(false);
  });

  function updateAdminStats(foods, orders) {
    document.getElementById("adminFoodCount").textContent = foods.length;
    document.getElementById("adminOrderCount").textContent = orders.length;

    document.getElementById("adminPendingCount").textContent =
      orders.filter((order) => order.status === "Pending").length;

    document.getElementById("adminDeliveredCount").textContent =
      orders.filter((order) => order.status === "Delivered").length;
  }

  // ---------------- FOOD CRUD ----------------

  function renderFoods() {
    const foods = readFoods();
    foodTable.replaceChildren();

    document.getElementById("foodTableCount").textContent =
      `${foods.length} item${foods.length === 1 ? "" : "s"}`;

    document.getElementById("emptyFoodTable").hidden = foods.length > 0;

    foods.forEach((food) => {
      const row = createElement("tr");

      const foodCell = createElement("td");
      const foodName = createElement("strong", "", food.name);
      const foodDescription = createElement(
        "div",
        "admin-food-description",
        food.description || ""
      );

      foodCell.append(foodName, foodDescription);

      const categoryCell = createElement("td", "", food.category);
      const priceCell = createElement("td", "", money(food.price));
      const ratingCell = createElement("td", "", `★ ${food.rating ?? "—"}`);

      const actionsCell = createElement("td");
      actionsCell.className = "admin-action-cell";

      const editButton = createElement("button", "small-btn", "Edit");
      editButton.type = "button";
      editButton.dataset.foodEdit = String(food.id);

      const deleteButton = createElement("button", "small-btn danger-btn", "Delete");
      deleteButton.type = "button";
      deleteButton.dataset.foodDelete = String(food.id);

      actionsCell.append(editButton, deleteButton);
      row.append(foodCell, categoryCell, priceCell, ratingCell, actionsCell);

      foodTable.appendChild(row);
    });
  }

  function resetFoodForm() {
    foodForm.reset();

    document.getElementById("foodId").value = "";
    document.getElementById("foodRating").value = "4.5";
    document.getElementById("saveFoodBtn").textContent = "Add Food Item";
    document.getElementById("cancelEditBtn").hidden = true;
  }

  function startFoodEdit(foodId) {
    const food = readFoods().find(
      (item) => String(item.id) === String(foodId)
    );

    if (!food) {
      showNotice("That food item could not be found.", "error");
      return;
    }

    document.getElementById("foodId").value = food.id;
    document.getElementById("foodName").value = food.name || "";
    document.getElementById("foodCategory").value = food.category || CATEGORIES[0];
    document.getElementById("foodPrice").value = food.price ?? "";
    document.getElementById("foodRating").value = food.rating ?? 4.5;
    document.getElementById("foodTag").value = food.tag || "";
    document.getElementById("foodDescription").value = food.description || "";
    document.getElementById("foodImage").value = food.image || "";

    document.getElementById("saveFoodBtn").textContent = "Save Changes";
    document.getElementById("cancelEditBtn").hidden = false;

    foodForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  foodForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const existingId = document.getElementById("foodId").value;
    const name = document.getElementById("foodName").value.trim();
    const category = document.getElementById("foodCategory").value;
    const price = Number(document.getElementById("foodPrice").value);
    const rating = Number(document.getElementById("foodRating").value);
    const tag = document.getElementById("foodTag").value.trim();
    const description = document.getElementById("foodDescription").value.trim();
    const image = document.getElementById("foodImage").value.trim();

    if (
      name.length < 2 ||
      !CATEGORIES.includes(category) ||
      !Number.isFinite(price) ||
      price <= 0 ||
      price > 100000 ||
      !Number.isFinite(rating) ||
      rating < 0 ||
      rating > 5 ||
      !description ||
      !image
    ) {
      showNotice("Please enter valid food details.", "error");
      return;
    }

    let imageURL;

    try {
      imageURL = new URL(image);

      if (!["https:", "http:"].includes(imageURL.protocol)) {
        throw new Error("Unsupported image URL protocol");
      }
    } catch {
      showNotice("Enter a valid HTTP or HTTPS image URL.", "error");
      return;
    }

    const foods = readFoods();

    const foodData = {
      name,
      category,
      price,
      rating,
      tag,
      description,
      image: imageURL.href
    };

    let updatedFoods;

    if (existingId !== "") {
      const index = foods.findIndex(
        (food) => String(food.id) === String(existingId)
      );

      if (index === -1) {
        showNotice("Food item not found. Refresh and try again.", "error");
        return;
      }

      updatedFoods = foods.map((food, i) =>
        i === index ? { ...food, ...foodData } : food
      );
    } else {
      const nextId =
        foods.reduce(
          (maxId, food) => Math.max(maxId, Number(food.id) || 0),
          0
        ) + 1;

      updatedFoods = [
        ...foods,
        {
          id: nextId,
          ...foodData
        }
      ];
    }

    if (!saveJSON(STORAGE_KEYS.foods, updatedFoods)) return;

    resetFoodForm();
    renderAll();

    showNotice(
      existingId !== ""
        ? "Food item updated successfully."
        : "Food item added successfully."
    );
  });

  document.getElementById("cancelEditBtn").addEventListener("click", () => {
    resetFoodForm();
  });

  foodTable.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-food-edit]");
    const deleteButton = event.target.closest("[data-food-delete]");

    if (editButton) {
      startFoodEdit(editButton.dataset.foodEdit);
      return;
    }

    if (deleteButton) {
      const foodId = deleteButton.dataset.foodDelete;
      const foods = readFoods();
      const food = foods.find(
        (item) => String(item.id) === String(foodId)
      );

      if (!food) {
        showNotice("Food item not found.", "error");
        return;
      }

      if (!confirm(`Delete "${food.name}" from the menu?`)) return;

      const updatedFoods = foods.filter(
        (item) => String(item.id) !== String(foodId)
      );

      if (!saveJSON(STORAGE_KEYS.foods, updatedFoods)) return;

      // Remove this item from any saved carts as well.
      const cart = readJSON(STORAGE_KEYS.cart, []);
      const updatedCart = Array.isArray(cart)
        ? cart.filter((item) => String(item.id) !== String(foodId))
        : [];

      if (!saveJSON(STORAGE_KEYS.cart, updatedCart)) return;

      if (String(document.getElementById("foodId").value) === String(foodId)) {
        resetFoodForm();
      }

      renderAll();
      showNotice("Food item deleted successfully.");
    }
  });

  // ---------------- ORDER MANAGEMENT ----------------

  function renderOrders() {
    const orders = readOrders();
    const searchTerm = document
      .getElementById("adminOrderSearch")
      .value.trim()
      .toLowerCase();

    const selectedStatus = document.getElementById(
      "adminOrderStatusFilter"
    ).value;

    const filteredOrders = orders
      .filter((order) => {
        const customer = order.customer || {};
        const searchable = [
          order.id,
          customer.name,
          customer.phone,
          customer.address
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch = searchable.includes(searchTerm);
        const matchesStatus =
          selectedStatus === "all" || order.status === selectedStatus;

        return matchesSearch && matchesStatus;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

    orderTable.replaceChildren();

    document.getElementById("emptyAdminOrders").hidden =
      filteredOrders.length > 0;

    filteredOrders.forEach((order) => {
      const row = createElement("tr");
      const customer = order.customer || {};
      const items = Array.isArray(order.items) ? order.items : [];

      const itemSummary = items
        .map((item) => `${item.name || "Food"} × ${Number(item.quantity) || 0}`)
        .join(", ");

      const cells = [
        order.id || "N/A",
        `${customer.name || "N/A"}\n${customer.phone || ""}`,
        itemSummary || "No item details",
        money(order.total),
        `${order.paymentMethod || "N/A"}\n${order.paymentStatus || ""}`
      ];

      cells.forEach((value) => {
        const cell = createElement("td", "", value);
        cell.style.whiteSpace = "pre-line";
        row.appendChild(cell);
      });

      const statusCell = createElement("td");
      const statusSelect = createElement("select", "form-control");
      statusSelect.setAttribute("aria-label", `Status for order ${order.id}`);
      statusSelect.dataset.orderStatus = String(order.id);

      ORDER_STATUSES.forEach((status) => {
        const option = createElement("option", "", status);
        option.value = status;
        statusSelect.appendChild(option);
      });

      statusSelect.value = ORDER_STATUSES.includes(order.status)
        ? order.status
        : "Pending";

      statusCell.appendChild(statusSelect);

      const actionCell = createElement("td");
      const updateButton = createElement("button", "small-btn", "Update");
      updateButton.type = "button";
      updateButton.dataset.updateOrder = String(order.id);
      actionCell.appendChild(updateButton);

      row.append(statusCell, actionCell);
      orderTable.appendChild(row);
    });
  }

  orderTable.addEventListener("click", (event) => {
    const updateButton = event.target.closest("[data-update-order]");
    if (!updateButton) return;

    const orderId = updateButton.dataset.updateOrder;
    const statusSelect = orderTable.querySelector(
      `[data-order-status="${CSS.escape(orderId)}"]`
    );

    if (!statusSelect) {
      showNotice("Could not read the selected order status.", "error");
      return;
    }

    const newStatus = statusSelect.value;

    if (!ORDER_STATUSES.includes(newStatus)) {
      showNotice("Invalid order status.", "error");
      return;
    }

    const orders = readOrders();
    const orderExists = orders.some(
      (order) => String(order.id) === String(orderId)
    );

    if (!orderExists) {
      showNotice("Order not found. Refresh the order list.", "error");
      return;
    }

    const updatedOrders = orders.map((order) =>
      String(order.id) === String(orderId)
        ? { ...order, status: newStatus }
        : order
    );

    if (!saveJSON(STORAGE_KEYS.orders, updatedOrders)) return;

    renderAll();
    showNotice(`Order ${orderId} status updated to "${newStatus}".`);
  });

  document
    .getElementById("adminOrderSearch")
    .addEventListener("input", renderOrders);

  document
    .getElementById("adminOrderStatusFilter")
    .addEventListener("change", renderOrders);

  document
    .getElementById("refreshAdminOrdersBtn")
    .addEventListener("click", renderAll);

  function renderAll() {
    const foods = readFoods();
    const orders = readOrders();

    updateAdminStats(foods, orders);
    renderFoods();
    renderOrders();
  }

  // Another tab may have changed the catalog or orders.
  window.addEventListener("storage", (event) => {
    if (
      event.key === STORAGE_KEYS.foods ||
      event.key === STORAGE_KEYS.orders ||
      event.key === STORAGE_KEYS.cart
    ) {
      if (isLoggedIn()) renderAll();
    }
  });

  populateCategories();
  setLoggedIn(isLoggedIn());
});
