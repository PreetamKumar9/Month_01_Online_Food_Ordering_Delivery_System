# 🍔 FoodieHub — Online Food Ordering & Delivery System

A modern, responsive food ordering and delivery web application built using **HTML, CSS, and JavaScript**. FoodieHub allows users to explore food items, manage their shopping cart, place demo orders, and track order status through a dedicated dashboard. It also includes an admin panel for managing food items and customer orders.

<p align="center">
  <a href="https://preetamkumar9.github.io/Month_01_Online_Food_Ordering_Delivery_System/">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20FoodieHub-orange?style=for-the-badge&logo=github" alt="Visit FoodieHub Live Demo">
  </a>
</p>

## 🌐 Live Demo

**Try the application here:**

🔗 [FoodieHub — Live Website](https://preetamkumar9.github.io/Month_01_Online_Food_Ordering_Delivery_System/)

**Project Repository:** [Month_01_Online_Food_Ordering_Delivery_System](https://github.com/preetamkumar9/Month_01_Online_Food_Ordering_Delivery_System)

---

## ✨ Features

### 🛍️ Customer Features
- **Home Page:** Explore featured food items and food categories.
- **Food Menu:** Browse 30 food items across seven categories.
- **Search and Filter:** Find food by name, category, price, or rating.
- **Shopping Cart:** Add items, change quantities, remove products, and clear the cart.
- **Automatic Billing:** Calculate subtotal, delivery charges, taxes, and the final payable amount.
- **Checkout:** Enter customer details and select a demo payment method.
- **Order Placement:** Place demo orders and save order details.
- **Order Dashboard:** View previous orders, order totals, payment information, and delivery status.
- **Persistent Data:** Store cart items, food catalog changes, and order history in browser `localStorage`.

### 🛠️ Admin Features
- **Protected Admin Interface:** Access the admin panel using the demo credentials.
- **Food Management:** Add, view, edit, and delete food items.
- **Order Management:** View customer orders and update their delivery status.
- **Order Status Tracking:** Manage orders through the following stages:
  - Pending
  - Confirmed
  - Out for Delivery
  - Delivered
- **Persistent Updates:** Save food catalog changes and order status updates in browser storage.

### 🎨 UI/UX Features
- Responsive layout for desktop, tablet, and mobile devices.
- Modern design with orange, blue, pink, red, black, and white accents.
- Interactive food cards and navigation.
- Clear billing summaries and order status indicators.
- Simple and intuitive customer and admin interfaces.

---

## 📄 Application Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Featured dishes, categories, and promotional content |
| Menu | `menu.html` | Browse, search, filter, sort, and add food items |
| Cart | `cart.html` | Manage cart items and review the bill |
| Checkout | `checkout.html` | Enter delivery information and place a demo order |
| My Orders | `dashboard.html` | Review previous orders and track delivery status |
| Admin Panel | `admin.html` | Manage food items and update order statuses |

---

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling, layouts, and responsive design |
| JavaScript (ES6+) | Application logic and interactive functionality |
| LocalStorage | Persistent browser-side data storage |
| SessionStorage | Demo admin session state |
| Git & GitHub | Version control and source code hosting |
| GitHub Pages | Static website deployment |

---

## 📁 Project Structure

```text
Month_01_Online_Food_Ordering_Delivery_System/
│
├── index.html
├── menu.html
├── cart.html
├── checkout.html
├── dashboard.html
├── admin.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── data.js
│   ├── app.js
│   ├── menu.js
│   ├── cart.js
│   ├── checkout.js
│   ├── dashboard.js
│   └── admin.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser.
- Git (optional, for cloning the repository).
- Visual Studio Code (recommended for local development).

### 1. Clone the Repository

```bash
git clone https://github.com/preetamkumar9/Month_01_Online_Food_Ordering_Delivery_System.git
```

### 2. Navigate to the Project Directory

```bash
cd Month_01_Online_Food_Ordering_Delivery_System
```

### 3. Open the Project

Open the project folder in Visual Studio Code.

For the best local development experience, install the **Live Server** extension and launch `index.html` using **Open with Live Server**.

You can also open `index.html` directly in your browser.

---

## 🔐 Demo Admin Access

Use the following credentials to explore the admin panel:

| Field | Demo Value |
|---|---|
| Username | `admin` |
| Password | `preet@preet` |

**Important:** These credentials are intended only for demonstration. Because this project uses frontend JavaScript, the admin login is not secure enough for a production application.

---

## 💾 Data Persistence

FoodieHub uses the browser's `localStorage` to preserve supported application data, including:

- Shopping cart items and quantities.
- Food catalog changes made through the admin panel.
- Customer order history.
- Order status updates.

Data remains available after refreshing or closing and reopening the browser, provided the browser data is not cleared and the same browser storage origin is used.

**Current limitation:** Data is stored locally in the user's browser. It is not synchronized across different devices or browsers, and it is not backed by a central database.

---

## 💳 Payment Information

FoodieHub includes demo checkout options to demonstrate the ordering workflow.

- Cash on Delivery (demo).
- Demo UPI payment.
- Demo card payment.

**No real payment is processed.** Do not enter real card details or sensitive financial information.

---

## ⚠️ Current Limitations

This project is a frontend demonstration built with HTML, CSS, and JavaScript.

- It does not include a backend server or database.
- Admin authentication is client-side and can be bypassed by technically knowledgeable users.
- Orders and catalog updates are stored per browser rather than centrally.
- Payment options simulate a checkout flow and do not process transactions.
- Live delivery partner integration and real-time location tracking are not implemented.

For a production-ready version, the application would need a backend API, a database, secure server-side authentication and authorization, and a trusted payment gateway.

---

## 🔮 Future Enhancements

- Backend integration using Node.js and Express.js.
- MongoDB database for centralized food and order storage.
- Secure authentication and role-based authorization.
- Real payment gateway integration.
- Order notifications and real-time status updates.
- Delivery partner assignment and live tracking.
- Unit and integration testing.
- Improved accessibility and performance optimization.

---

## 🎯 Project Objectives

This project demonstrates practical frontend development skills, including:

- Building a multi-page responsive website.
- Implementing dynamic UI updates with JavaScript.
- Managing shopping cart state.
- Performing CRUD operations.
- Calculating order totals and delivery charges.
- Persisting data using browser storage.
- Implementing a demo checkout and order tracking workflow.
- Organizing code into reusable styles and page-specific scripts.

---

## 👨‍💻 Author

**Preetam Kumar**

Computer Science and Engineering Student | Web Developer

- **GitHub:** [@preetamkumar9](https://github.com/preetamkumar9)
- **Live Project:** [FoodieHub — Online Food Ordering & Delivery System](https://preetamkumar9.github.io/Month_01_Online_Food_Ordering_Delivery_System/)

---

## 📜 License

This project is intended for learning, demonstration, and portfolio purposes. Unless a separate license is added to the repository, no additional permissions for redistribution or commercial use are granted by this README.

---

<p align="center">
  <strong>FoodieHub — Bringing Your Favorite Food Closer to You! 🍕🍔</strong>
</p>
