# 🛒 Local Bazaar

> A full-stack **MERN E-Commerce Marketplace** that connects local vendors with customers. The platform enables secure authentication, product management, shopping cart functionality, order processing, and vendor-specific dashboards.

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Node.js-20-339933?logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-Backend-000000?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb" />
  <img src="https://img.shields.io/badge/JWT-Authentication-orange" />
  <img src="https://img.shields.io/badge/License-Educational-blue" />
</p>

---

## 📌 Overview

Local Bazaar is a full-stack marketplace designed to simplify buying and selling within local communities. Customers can browse products, manage carts, and place orders, while vendors can manage shops, inventory, and customer orders through dedicated dashboards.

---

## ✨ Key Features

### 👤 Customer

- User Registration & Login
- Browse Products
- Product Search
- Shopping Cart
- Place Orders
- Order History
- Product Details

### 🏪 Vendor

- Vendor Registration
- Shop Management
- Product Management
- Inventory Management
- Order Management

### 🔒 Security

- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Authorization
- Protected API Routes

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React 18, Vite, Flowbite React, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| Version Control | Git & GitHub |

---

# 📸 Screenshots


## Home Page

<img width="1918" height="957" alt="image" src="https://github.com/user-attachments/assets/81079f2e-1111-4815-a716-667edbf508fa" />


---

## Customer Dashboard

<img width="1918" height="971" alt="image" src="https://github.com/user-attachments/assets/91ca0390-8717-4fb8-a396-56bcfb69b88c" />


---

## Vendor Dashboard

<img width="1918" height="971" alt="image" src="https://github.com/user-attachments/assets/19089014-f469-4b38-a3bb-0182f8246929" />


---

## Shopping Cart

<img width="1918" height="970" alt="image" src="https://github.com/user-attachments/assets/016dbc51-c2ed-4ef4-80c6-ce8cd0ef0398" />


---

## Orders


<img width="1912" height="967" alt="image" src="https://github.com/user-attachments/assets/133ba1b8-8a0d-4bfe-925d-2bb79db43e34" />


<img width="1918" height="951" alt="image" src="https://github.com/user-attachments/assets/88c4c3e1-e0bf-4a14-93af-14900619d170" />

---

# 🏗 System Architecture

```
                React Frontend
                      │
                  Axios API
                      │
             Express REST API
                      │
          JWT Authentication Layer
                      │
                MongoDB Database
```

---

# 📂 Project Structure

```
Local-Bazaar
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── screenshots/
│
├── README.md
└── .gitignore
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/Kavan-Dave/Local-Bazaar.git

cd Local-Bazaar
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

### backend/.env

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

### frontend/.env

```env
VITE_API_URL=http://localhost:5000

VITE_UNSPLASH_ACCESS_KEY=your_api_key
```

---

# 💾 Database Setup

### Restore Existing Database

```bash
mongorestore --db locale_bazaar ./db-backup/locale_bazaar
```

or simply start MongoDB and register new users.

---

# 📡 Main API Modules

- Authentication
- Products
- Shops
- Shopping Cart
- Orders

---

# 🚀 Future Improvements

- [ ] Online Payment Gateway
- [ ] Product Reviews & Ratings
- [ ] Wishlist
- [ ] Email Notifications
- [ ] Real-Time Notifications
- [ ] Admin Dashboard
- [ ] Vendor Analytics
- [ ] AI Product Recommendation

---

# 📚 Learning Outcomes

During this project, I gained hands-on experience with:

- Building REST APIs using Express.js
- React component-based architecture
- JWT Authentication & Authorization
- MongoDB schema design
- CRUD Operations
- State Management
- Full Stack Integration
- Role-Based Access Control

---

# 👨‍💻 Developer

**Kavan Dave**

B.Tech Computer Engineering

Dharmsinh Desai University

📧 Email: **kavandave15@gmail.com**

🐙 GitHub: **https://github.com/Kavan-Dave**

---

# 📄 License

This project was developed for academic and learning purposes.

---

## ⭐ If you found this project helpful, consider giving it a star.
