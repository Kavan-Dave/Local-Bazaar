# Locale Bazaar - E-commerce Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) e-commerce application connecting local vendors with customers. This platform enables seamless interactions between buyers and vendors, product management, shopping cart functionality, and order processing within a local marketplace context.

## 🌟 Features

### For Customers:
- User registration and authentication
- Browse products from multiple vendors
- Search and filter products
- Add products to cart
- Place orders and track order history
- View product details

### For Vendors:
- Register as a vendor
- Create and manage shop
- Add, edit, and delete products
- View and manage incoming orders
- Inventory management

### General:
- JWT-based authentication
- Role-based access control (Customer/Vendor)
- Responsive design
- Secure password storage

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Flowbite React (UI components)
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcrypt for password hashing

**Database:**
- MongoDB

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)

## 📁 Project Structure

Locale_Bazaar/
├── backend/ # Express.js API server
│ ├── config/ # Database configuration
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── middleware/ # Authentication middleware
│ ├── server.js # Entry point
│ ├── package.json # Backend dependencies
│ └── .env.example # Environment variables template
├── frontend/ # React application
│ ├── src/ # Source files
│ ├── public/ # Static assets
│ ├── package.json # Frontend dependencies
│ └── .env.example # Environment variables template
├── db-backup/ # MongoDB database backup
│ └── locale_bazaar/ # Database dump files
├── README.md # This file
└── .gitignore # Git ignore rules


## 🚀 Installation & Setup

### 1. Clone the Repository

git clone https://github.com/Kavan-Dave/Local-Bazaar.git
cd Locale_Bazaar


### 2. Backend Setup

Navigate to backend directory
cd backend

Install dependencies
npm install

Create .env file from example
cp .env.example .env


**Edit `backend/.env` and configure:**

PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/locale_bazaar
JWT_SECRET=your_strong_jwt_secret_key_here


**Generate a strong JWT secret:**
- You can use online tools or run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 3. Frontend Setup

Navigate to frontend directory (open new terminal)
cd frontend

Install dependencies
npm install

Create .env file from example
cp .env.example .env


**Edit `frontend/.env` and configure:**

VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Locale Bazaar
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_api_key_here


**Note:** Unsplash API key is optional. Get one from [Unsplash Developers](https://unsplash.com/developers) if you want to use image features.

### 4. Database Setup

**Option A: Restore from Backup (Recommended)**

Ensure MongoDB is running, then:

From project root directory
mongorestore --db locale_bazaar ./db-backup/locale_bazaar


**Option B: Start Fresh (Empty Database)**

The database will be created automatically when you start the backend. You'll need to register users manually through the application.

### 5. Running the Application

**Start Backend Server (Terminal 1):**

cd backend
npm run dev


Backend will run on: `http://localhost:5000`

**Start Frontend Development Server (Terminal 2):**

cd frontend
npm run dev


Frontend will run on: `http://localhost:5173`

### 6. Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

## 👤 Default Test Accounts

If you restored the database from backup, you can use these test accounts:

**Customer Account:**
- Email: `customer@example.com`
- Password: `password123`

**Vendor Account:**
- Email: `vendor@example.com`
- Password: `password123`

*(If these don't exist, register new accounts through the application)*

## 📡 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user (customer/vendor)
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Add new product (Vendor only)
- `PUT /api/products/:id` - Update product (Vendor only)
- `DELETE /api/products/:id` - Delete product (Vendor only)

### Shops
- `GET /api/shops` - Get all shops
- `GET /api/shops/:id` - Get shop by ID
- `POST /api/shops` - Create shop (Vendor only)
- `GET /api/shops/vendor/:vendorId` - Get vendor's shop

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:itemId` - Update cart item
- `DELETE /api/cart/items/:itemId` - Remove item from cart

### Orders
- `POST /api/checkout` - Place order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/shoporders` - Get shop orders (Vendor only)

## 🐛 Troubleshooting

### Database Connection Error
- Ensure MongoDB is running locally: `mongod` or check MongoDB service status
- Verify `MONGO_URI` in `backend/.env` is correct
- Check if port 27017 is available

### Port Already in Use
- Change `PORT` in `backend/.env` to another port (e.g., 5001)
- Update `VITE_API_URL` in `frontend/.env` accordingly

### Module Not Found Errors
- Delete `node_modules` folder: `rm -rf node_modules`
- Delete `package-lock.json`
- Run `npm install` again

### CORS Errors
- Ensure backend CORS is configured to allow frontend origin
- Check that `VITE_API_URL` matches your backend URL

### Frontend Build Errors
- Clear Vite cache: `rm -rf node_modules/.vite`
- Reinstall dependencies: `npm install`

## 📦 Building for Production

### Frontend Build

cd frontend
npm run build


Production files will be in `frontend/dist/`

### Backend Production

cd backend
NODE_ENV=production npm start


## 🔒 Security Notes

- Never commit `.env` files to version control
- Always use strong JWT secrets in production
- Use HTTPS in production environments
- Validate and sanitize all user inputs
- Keep dependencies updated

## 📝 Future Enhancements

- Payment gateway integration
- Real-time notifications
- Advanced search and filtering
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Admin dashboard
- Analytics for vendors

## 🤝 Contributing

This is an academic project. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of a B.Tech academic project at Dharamsinh Desai University.

## 👨‍💻 Author

**[Your Name]**
- GitHub: [@Kavan-Dave](https://github.com/Kavan-Dave)
- Email: kavandave15@gmail.com

## 🙏 Acknowledgments

- Dharamsinh Desai University, Nadiad, Gujarat
- MERN Stack Community
- Open Source Contributors

---
