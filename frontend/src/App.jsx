import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import ShopOrders from "./pages/ShopOrders.jsx";
import VendorDashboard from "./pages/vendor/Dashboard.jsx";
import ProductStock from "./pages/vendor/ProductStock.jsx";
import OrderActions from "./pages/vendor/OrderActions.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Protected from "./components/Protected.jsx";
import PublicHome from "./pages/PublicHome.jsx";
import PublicProducts from "./pages/PublicProducts.jsx";
import { useAuth } from "./hooks/AuthContext.jsx";
import 'flowbite/dist/flowbite.css';

function RootGate() {
  const { user, loading } = useAuth();

  if (loading) 
    return <div className="p-6 text-center text-lg">Loading...</div>;

  return user ? <Navigate to="/products" replace /> : <PublicHome />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow mx-auto max-w-6xl w-full px-4 py-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<RootGate />} />
          <Route path="/browse" element={<PublicProducts />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* General Product Routes */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Customer Only Protected Routes */}
          <Route element={<Protected roles={["customer"]} />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/shops/:shopId/orders" element={<ShopOrders />} />
          </Route>

          {/* Vendor Only Protected Routes */}
          <Route element={<Protected roles={["vendor"]} />}>
            <Route path="/vendor" element={<VendorDashboard />} />
            <Route path="/vendor/stock" element={<ProductStock />} />
            <Route path="/vendor/shoporders" element={<OrderActions />} />
          </Route>

          {/* Catch-all Not Found */}
          <Route path="*" element={<div className="p-8 text-center text-xl font-semibold">Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
