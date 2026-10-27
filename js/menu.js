
/* =====================================
   FOODIEHUB - MENU PAGE
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("foodSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortSelect = document.getElementById("sortFoods");
  const clearButton = document.getElementById("clearFilters");
  const menuContainer = document.getElementById("menuFoods");

  if (
    !searchInput ||
    !categoryFilter ||
    !sortSelect ||
    !clearButton ||
    !menuContainer
  ) {
    return;
  }

  // Read the category selected from the home page URL.
  const params = new URLSearchParams(window.location.search);
  const selectedCategory = params.get("category");

  if (
    selectedCategory &&
    CATEGORIES.some(category => category.name === selectedCategory)
  ) {
    categoryFilter.value = selectedCategory;
  }

  // Search, filter, and sorting all use the same rendering function.
  function renderMenu() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortBy = sortSelect.value;

    let foods = getFoods().filter(food => {
      const searchableText = [
        food.name,
        food.description,
        food.category,
        food.tag
      ].filter(Boolean).join(" ").toLowerCase();

      const matchesSearch = searchableText.includes(searchTerm);

      const matchesCategory =
        selectedCategory === "All" ||
        food.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort a new array without changing the saved catalog.
    foods = [...foods];

    switch (sortBy) {
      case "price-low":
        foods.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-high":
        foods.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "name":
        foods.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "rating":
        foods.sort((a, b) =>
          (Number(b.rating) || 0) - (Number(a.rating) || 0)
        );
        break;

      default:
        // Keep the original catalog order.
        break;
    }

    const countElement = document.getElementById("foodResultCount");
    const emptyMessage = document.getElementById("noFoodsMessage");

    countElement.textContent =
      `${foods.length} food item${foods.length === 1 ? "" : "s"} found`;

    emptyMessage.hidden = foods.length !== 0;
    menuContainer.hidden = foods.length === 0;

    menuContainer.innerHTML = foods.map(food => `
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
            <span aria-label="Rating ${food.rating || 0} out of 5">
              ⭐ ${Number(food.rating || 0).toFixed(1)}
            </span>
          </div>

          <div class="food-meta">
            <small class="text-muted">${food.category}</small>
            <button
              class="add-cart-btn"
              type="button"
              data-add-cart="${food.id}"
              aria-label="Add ${food.name} to cart">
              + Add
            </button>
          </div>
        </div>
      </article>
    `).join("");
  }

  // Update results when the customer changes any filter.
  searchInput.addEventListener("input", renderMenu);
  categoryFilter.addEventListener("change", renderMenu);
  sortSelect.addEventListener("change", renderMenu);

  // Reset every filter to its default value.
  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "All";
    sortSelect.value = "default";

    renderMenu();
  });

  // Event delegation handles Add buttons for all rendered cards.
  menuContainer.addEventListener("click", event => {
    const button = event.target.closest("[data-add-cart]");

    if (!button) return;

    addToCart(button.dataset.addCart);
  });

  renderMenu();
});
