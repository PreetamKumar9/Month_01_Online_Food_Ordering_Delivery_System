
/* =====================================
   FOODIEHUB - DATA & STORAGE
===================================== */

const CATEGORIES = [
  { name: "Burgers", icon: "🍔" },
  { name: "Pizza", icon: "🍕" },
  { name: "Indian", icon: "🍛" },
  { name: "Chinese", icon: "🥡" },
  { name: "Snacks", icon: "🍟" },
  { name: "Desserts", icon: "🍰" },
  { name: "Drinks", icon: "🥤" }
];

const DEFAULT_FOODS = [
  // BURGERS
  { id: 1, name: "Classic Cheeseburger", category: "Burgers", price: 199, rating: 4.7, tag: "Bestseller", description: "Juicy patty, cheddar cheese and fresh lettuce.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80" },
  { id: 2, name: "Double Smash Burger", category: "Burgers", price: 279, rating: 4.8, tag: "Popular", description: "Double patties with our signature sauce.", image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=700&q=80" },
  { id: 3, name: "Crispy Chicken Burger", category: "Burgers", price: 229, rating: 4.6, tag: "Crispy", description: "Crispy chicken, crunchy lettuce and mayo.", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=700&q=80" },
  { id: 4, name: "Veggie Delight Burger", category: "Burgers", price: 159, rating: 4.4, tag: "Veg", description: "Vegetable patty with fresh garden toppings.", image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=80" },
  { id: 5, name: "BBQ Bacon-Style Burger", category: "Burgers", price: 299, rating: 4.5, tag: "Special", description: "Smoky BBQ sauce with a rich grilled flavour.", image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=700&q=80" },

  // PIZZA
  { id: 6, name: "Margherita Pizza", category: "Pizza", price: 249, rating: 4.6, tag: "Classic", description: "Tomato, mozzarella and aromatic basil.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80" },
  { id: 7, name: "Farmhouse Pizza", category: "Pizza", price: 349, rating: 4.7, tag: "Bestseller", description: "Onions, capsicum, tomatoes and mushrooms.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80" },
  { id: 8, name: "Pepperoni Pizza", category: "Pizza", price: 399, rating: 4.8, tag: "Popular", description: "A savoury pepperoni-style pizza.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80" },
  { id: 9, name: "Paneer Tikka Pizza", category: "Pizza", price: 369, rating: 4.5, tag: "Indian Twist", description: "Tandoori paneer with onion and capsicum.", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=80" },

  // INDIAN
  { id: 10, name: "Paneer Butter Masala", category: "Indian", price: 279, rating: 4.8, tag: "Bestseller", description: "Paneer in a creamy tomato-based gravy.", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80" },
  { id: 11, name: "Chicken Biryani", category: "Indian", price: 299, rating: 4.8, tag: "Popular", description: "Fragrant basmati rice and spiced chicken.", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=700&q=80" },
  { id: 12, name: "Veg Dum Biryani", category: "Indian", price: 219, rating: 4.5, tag: "Veg", description: "Aromatic rice with vegetables and spices.", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80" },
  { id: 13, name: "Dal Makhani", category: "Indian", price: 199, rating: 4.6, tag: "Comfort Food", description: "Slow-cooked lentils in a creamy gravy.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80" },
  { id: 14, name: "Butter Chicken", category: "Indian", price: 329, rating: 4.7, tag: "Popular", description: "Tender chicken in a buttery tomato gravy.", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80" },

  // CHINESE
  { id: 15, name: "Veg Hakka Noodles", category: "Chinese", price: 179, rating: 4.4, tag: "Veg", description: "Stir-fried noodles with crisp vegetables.", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80" },
  { id: 16, name: "Chicken Fried Rice", category: "Chinese", price: 219, rating: 4.5, tag: "Popular", description: "Wok-fried rice with chicken and vegetables.", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80" },
  { id: 17, name: "Veg Manchurian", category: "Chinese", price: 189, rating: 4.4, tag: "Spicy", description: "Vegetable dumplings in tangy Manchurian sauce.", image: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=700&q=80" },
  { id: 18, name: "Chilli Chicken", category: "Chinese", price: 249, rating: 4.6, tag: "Spicy", description: "Chicken tossed in a spicy Indo-Chinese sauce.", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80" },

  // SNACKS
  { id: 19, name: "French Fries", category: "Snacks", price: 99, rating: 4.5, tag: "Classic", description: "Golden, crispy fries with a pinch of salt.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80" },
  { id: 20, name: "Peri Peri Fries", category: "Snacks", price: 129, rating: 4.6, tag: "Spicy", description: "Crispy fries dusted with peri-peri seasoning.", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=700&q=80" },
  { id: 21, name: "Veg Cheese Sandwich", category: "Snacks", price: 149, rating: 4.3, tag: "Veg", description: "Grilled sandwich with cheese and vegetables.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80" },
  { id: 22, name: "Chicken Momos", category: "Snacks", price: 169, rating: 4.7, tag: "Popular", description: "Steamed dumplings served with spicy chutney.", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80" },
  { id: 23, name: "Crispy Samosa", category: "Snacks", price: 49, rating: 4.4, tag: "Value Pick", description: "Flaky pastry filled with spiced potato.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80" },

  // DESSERTS
  { id: 24, name: "Chocolate Brownie", category: "Desserts", price: 129, rating: 4.7, tag: "Chocolate", description: "Rich chocolate brownie with a fudgy centre.", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80" },
  { id: 25, name: "New York Cheesecake", category: "Desserts", price: 199, rating: 4.8, tag: "Popular", description: "Creamy cheesecake on a buttery biscuit base.", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80" },
  { id: 26, name: "Chocolate Ice Cream", category: "Desserts", price: 99, rating: 4.5, tag: "Cold Treat", description: "Smooth and creamy chocolate ice cream.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=80" },

  // DRINKS
  { id: 27, name: "Classic Cold Coffee", category: "Drinks", price: 119, rating: 4.5, tag: "Chilled", description: "Chilled coffee blended until smooth and frothy.", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80" },
  { id: 28, name: "Fresh Lemonade", category: "Drinks", price: 79, rating: 4.3, tag: "Refreshing", description: "Fresh lemon with a balanced sweet and tangy taste.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=80" },
  { id: 29, name: "Mango Smoothie", category: "Drinks", price: 149, rating: 4.6, tag: "Seasonal", description: "A creamy mango smoothie served chilled.", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=700&q=80" },
  { id: 30, name: "Strawberry Milkshake", category: "Drinks", price: 139, rating: 4.5, tag: "Sweet Treat", description: "A sweet strawberry milkshake.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80" }
];

/* Storage keys: keep these consistent across all pages. */
const STORAGE_KEYS = {
  foods: "foodiehub_foods_v1",
  cart: "foodiehub_cart_v1",
  orders: "foodiehub_orders_v1",
  adminSession: "foodiehub_admin_session_v1"
};

/* Safe JSON storage helpers */
function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    console.error("Could not read local storage:", error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Could not save local storage:", error);
    return false;
  }
}

/* Initialize the catalog only once.
   Admin edits will remain saved on this browser. */
function getFoods() {
  const savedFoods = readStorage(STORAGE_KEYS.foods, null);

  if (Array.isArray(savedFoods)) {
    return savedFoods;
  }

  writeStorage(STORAGE_KEYS.foods, DEFAULT_FOODS);
  return DEFAULT_FOODS;
}

function getCart() {
  const cart = readStorage(STORAGE_KEYS.cart, []);
  return Array.isArray(cart) ? cart : [];
}

function saveCart(cart) {
  return writeStorage(STORAGE_KEYS.cart, cart);
}

function getOrders() {
  const orders = readStorage(STORAGE_KEYS.orders, []);
  return Array.isArray(orders) ? orders : [];
}

function saveOrders(orders) {
  return writeStorage(STORAGE_KEYS.orders, orders);
}

function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(Number(amount) || 0);
}
