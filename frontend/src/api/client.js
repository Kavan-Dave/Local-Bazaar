const base = "/api";

let accessToken = null;

export function setToken(token) {
  accessToken = token;
}

export function clearToken() {
  accessToken = null;
}

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const res = await fetch(base + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  // Try parsing JSON only if content-type indicates JSON
  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();
  const data =
    text && contentType.includes("application/json")
      ? JSON.parse(text)
      : text || null;

  if (!res.ok) {
    const err = new Error(
      (data && data.error) || res.statusText || "Request failed"
    );
    err.status = res.status;
    err.body = data;
    throw err;
  }

  return data;
}

// Auth
export const api = {
  login: (payload) => request("/users/login", { method: "POST", body: payload }),
  register: (payload) =>
    request("/users/register", { method: "POST", body: payload }),
  me: () => request("/users/me"),

  // Products
  listProducts: () => request("/products"),
  getProduct: (id) => request(`/products/${id}`),

  // Cart
  getCart: () => request("/cart"),
  addToCart: (payload) =>
    request("/cart/items", { method: "POST", body: payload }),
  setQuantity: (productId, quantity) =>
    request(`/cart/items/${productId}`, { method: "PATCH", body: { quantity } }),
  removeFromCart: (productId) =>
    request(`/cart/items/${productId}`, { method: "DELETE" }),
  clearCart: () => request("/cart", { method: "DELETE" }),

  // Checkout
  checkout: () => request("/checkout", { method: "POST" }),

  // Orders (customer)
  myOrders: () => request("/orders"),
  myHistory: () => request("/orders/me/history"),
  myPending: () => request("/orders/pending"),
  shopHistory: (shopId) => request(`/orders/${shopId}/orders/history`),

  // Vendor actions
  vendorAccept: (orderId) =>
    request(`/orders/${orderId}/accept`, { method: "PATCH" }),
  vendorSetStatus: (orderId, status) =>
    request(`/orders/${orderId}/status`, { method: "PATCH", body: { status } }),
  vendorSetQuantity: (productId, quantity) =>
    request(`/shops/products/${productId}/quantity`, {
      method: "PATCH",
      body: { quantity },
    }),
};

export default api;
