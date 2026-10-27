
/* =====================================
   FOODIEHUB - SHARED APPLICATION LOGIC
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setupMobileNavigation();
  renderHomePage();

  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

/* Cart quantity displayed in the header */
function updateCartCount() {
  const countElement = document.getElementById("cartCount");

  if (!countElement) return;

  const totalQuantity = getCart().reduce(
    (total, item) => total + Math.max(0, Number(item.quantity) || 0),
    0
  );

  countElement.textContent = totalQuantity;
}

/* Responsive mobile navigation */
function setupMobileNavigation() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    });
  });
}

/* Render category cards */
function renderCategories() {
  const container = document.getElementById("categoryGrid");

  if (!container) return;

  const foods = getFoods();

  container.innerHTML = CATEGORIES.map(category => {
    const count = foods.filter(
      food => food.category === category.name
    ).length;

    return `
      <a class="category-card"
         href="menu.html?category=${encodeURIComponent(category.name)}">
        <span class="category-icon">${category.icon}</span>
        <strong>${category.name}</strong>
        <small>${count} items</small>
      </a>
    `;
  }).join("");
}

/* Render featured foods on the home page */
function renderFeaturedFoods() {
  const container = document.getElementById("featuredFoods");

  if (!container) return;

  const foods = getFoods().slice(0, 8);

  if (foods.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No food items available</h3>
        <p>Please check back later.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = foods.map(food => `
    <article class="food-card">
      <div class="food-image">
        <img
          src="${food.image}"
          alt="${food.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=Food'"
        >
        <span class="food-tag">${food.tag || food.category}</span>
      </div>

      <div class="food-info">
        <h3>${food.name}</h3>
        <p>${food.description}</p>

        <div class="food-meta">
          <span class="food-price">${formatPrice(food.price)}</span>

          <button
            class="add-cart-btn"
            data-add-cart="${food.id}"
            type="button"
            aria-label="Add ${food.name} to cart">
            + Add
          </button>
        </div>
      </div>
    </article>
  `).join("");

  /* One event listener handles all food-card buttons */
  container.addEventListener("click", event => {
    const button = event.target.closest("[data-add-cart]");

    if (!button) return;

    addToCart(button.dataset.addCart);
  });
}

/* Add an item to the persistent cart */
function addToCart(foodId) {
  const foods = getFoods();

  const food = foods.find(
    item => String(item.id) === String(foodId)
  );

  if (!food) {
    alert("This food item is no longer available.");
    return;
  }

  const cart = getCart();

  const existingItem = cart.find(
    item => String(item.id) === String(food.id)
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: food.id,
      quantity: 1
    });
  }

  if (!saveCart(cart)) {
    alert("Could not save your cart. Please check browser storage.");
    return;
  }

  updateCartCount();

  /* Simple confirmation for the demo */
  alert(`${food.name} added to your cart!`);
}

/* Initialize the home page sections */
function renderHomePage() {
  renderCategories();
  renderFeaturedFoods();
}
