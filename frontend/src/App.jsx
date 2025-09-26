import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import ShopOrders from "./pages/ShopOrders.jsx";
import VendorDashboard from "./pages/vendor/Dashboard.jsx";
import ProductStock from "./pages/vendor/ProductStock.jsx";
import OrderActions from "./pages/vendor/OrderActions.jsx";
import Protected from "./components/Protected.jsx";

export default function App() {
return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 text-slate-900">
<Navbar />
<div className="mx-auto max-w-6xl px-4 py-6">
<Routes>
<Route path="/" element={<Navigate to="/products" replace />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />

      <Route element={<Protected roles={["customer"]} />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/shops/:shopId/orders" element={<ShopOrders />} />
      </Route>

      <Route element={<Protected roles={["vendor"]} />}>
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/vendor/stock" element={<ProductStock />} />
        <Route path="/vendor/orders" element={<OrderActions />} />
      </Route>

      <Route path="*" element={<div className="p-8">Not Found</div>} />
    </Routes>
  </div>
</div>
);
}