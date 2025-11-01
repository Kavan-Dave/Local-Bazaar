// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000",
//   withCredentials: true,
// });

// // Token helpers
// function setToken(token) {
//   API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   localStorage.setItem("lb_token", token);
// }
// function clearToken() {
//   delete API.defaults.headers.common["Authorization"];
//   localStorage.removeItem("lb_token");
// }
// function loadTokenFromStorage() {
//   const t = localStorage.getItem("lb_token");
//   if (t) API.defaults.headers.common["Authorization"] = `Bearer ${t}`;
//   return t;
// }

// // API surface
// const api = {
//   // Auth
//   login: (payload) => API.post("/users/login", payload).then((r) => r.data),
//   register: (payload) => API.post("/users/register", payload).then((r) => r.data),
//   me: () => API.get("/users/me").then((r) => r.data),
//   logout: () => API.post("/users/logout").then((r) => r.data),

//   // Products
//   listProducts: () => API.get("/products").then((r) => r.data),
//   listMyProducts: () => API.get("/products/mine").then((r) => r.data),
//   getProduct: (id) => API.get(`/products/${id}`).then((r) => r.data),
//   addProduct: (payload) => API.post("/products", payload).then((r) => r.data),
//   updateProduct: (id, payload) => API.put(`/products/${id}`, payload).then((r) => r.data),

//   // Cart
//   getCart: () => API.get("/cart").then((r) => r.data),
//   addToCart: (payload) => API.post("/cart/items", payload).then((r) => r.data),
//   setCartItemQuantity: (productId, quantity) =>
//     API.patch(`/cart/items/${productId}`, { quantity }).then((r) => r.data),
//   removeFromCart: (productId) => API.delete(`/cart/items/${productId}`).then((r) => r.data),
//   clearCart: () => API.delete("/cart").then((r) => r.data),

//   // Orders
//   placeOrder: () => API.post("/checkout").then((r) => r.data), // uses your checkout route
//   myOrders: () => API.get("/orders").then((r) => r.data),
//   getShopOrders: () => API.get("/orders/shoporders").then(r => r.data),
//   deleteOrder(orderId) {
//   return axios.delete(`/orders/${orderId}`, {
//     headers: { Authorization: `Bearer ${getToken()}` }
//   }).then(res => res.data);
// },

//   // Vendor
//   vendorSetQuantity: (productId, quantity) =>
//     API.put(`/products/${productId}`, { quantity }).then((r) => r.data), // backend maps quantity -> stock

//   // Vendor order actions
//   vendorAccept: (orderId) =>
//     API.patch(`/orders/${orderId}/accept`).then((r) => r.data),
//   vendorSetStatus: (orderId, status) =>
//     API.patch(`/orders/${orderId}/status`, { status }).then((r) => r.data),
// };

// export default api;
// export { api, API, setToken, clearToken, loadTokenFromStorage };
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// Token helpers
function setToken(token) {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("lb_token", token);
}

function clearToken() {
  delete API.defaults.headers.common["Authorization"];
  localStorage.removeItem("lb_token");
}

function loadTokenFromStorage() {
  const t = localStorage.getItem("lb_token");
  if (t) API.defaults.headers.common["Authorization"] = `Bearer ${t}`;
  return t;
}

function getToken() {
  return localStorage.getItem("lb_token");
}

// API surface
const api = {
  // Auth
  login: (payload) => API.post("/users/login", payload).then((r) => r.data),
  register: (payload) => API.post("/users/register", payload).then((r) => r.data),
  me: () => API.get("/users/me").then((r) => r.data),
  logout: () => API.post("/users/logout").then((r) => r.data),

  // Products
  listProducts: () => API.get("/products").then((r) => r.data),
  listMyProducts: () => API.get("/products/mine").then((r) => r.data),
  getProduct: (id) => API.get(`/products/${id}`).then((r) => r.data),
  addProduct: (payload) => API.post("/products", payload).then((r) => r.data),
  updateProduct: (id, payload) => API.put(`/products/${id}`, payload).then((r) => r.data),

  // Cart
  getCart: () => API.get("/cart").then((r) => r.data),
  addToCart: (payload) => API.post("/cart/items", payload).then((r) => r.data),
  setCartItemQuantity: (productId, quantity) =>
    API.patch(`/cart/items/${productId}`, { quantity }).then((r) => r.data),
  removeFromCart: (productId) => API.delete(`/cart/items/${productId}`).then((r) => r.data),
  clearCart: () => API.delete("/cart").then((r) => r.data),

  // Orders
  placeOrder: () => API.post("/checkout").then((r) => r.data),
  myOrders: () => API.get("/orders").then((r) => r.data),
  getShopOrders: () => API.get("/orders/shoporders").then((r) => r.data),
  deleteOrder: (orderId) => API.delete(`/orders/${orderId}`).then((r) => r.data),

  // Vendor
  vendorSetQuantity: (productId, quantity) =>
    API.put(`/products/${productId}`, { quantity }).then((r) => r.data),

  // Vendor order actions
  vendorAccept: (orderId) => API.patch(`/orders/${orderId}/accept`).then((r) => r.data),
  vendorSetStatus: (orderId, status) =>
    API.patch(`/orders/${orderId}/status`, { status }).then((r) => r.data),
};

export default api;
export { api, API, setToken, clearToken, loadTokenFromStorage, getToken };
