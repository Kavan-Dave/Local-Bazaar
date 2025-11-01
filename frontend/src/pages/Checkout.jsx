// // import React, { useEffect, useMemo, useState } from "react";
// // import api from "../api/client.js";
// // import { useAuth } from "../hooks/AuthContext.jsx";
// // import { useNavigate } from "react-router-dom";
// // import { Card, Button, TextInput, Spinner, Alert } from "flowbite-react";

// // export default function Checkout() {
// //   const { user, loading } = useAuth();
// //   const nav = useNavigate();
// //   const [cart, setCart] = useState(null);
// //   const [err, setErr] = useState("");
// //   const [ok, setOk] = useState("");
// //   const [busy, setBusy] = useState(false);

// //   useEffect(() => {
// //     if (loading) return;
// //     if (!user) {
// //       nav("/login", { state: { from: { pathname: "/checkout" } } });
// //       return;
// //     }
// //     loadCart();
// //   }, [user, loading]);

// //   async function loadCart() {
// //     try {
// //       const data = await api.getCart();
// //       setCart(data || { items: [], subTotal: 0 });
// //     } catch (e) { setErr(e?.message || "Failed to load cart"); }
// //   }

// //   const total = useMemo(() => {
// //     if (!cart?.items?.length) return "0.00";
// //     return cart.items.reduce((s, it) => s + (Number(it.total) || 0), 0).toFixed(2);
// //   }, [cart]);

// //   async function updateQty(pid, quantity) {
// //     try {
// //       const q = Math.max(1, parseInt(quantity || "1", 10));
// //       await api.setCartItemQuantity(pid, q);
// //       await loadCart();
// //     } catch (e) { setErr(e?.message || "Update failed"); }
// //   }

// //   async function removeItem(pid) {
// //     try { await api.removeFromCart(pid); await loadCart(); }
// //     catch (e) { setErr(e?.message || "Remove failed"); }
// //   }

// //   async function placeOrder() {
// //     try {
// //       if (!cart?.items?.length) { setErr("Cart is empty"); return; }
// //       setBusy(true);
// //       await api.placeOrder();
// //       setOk("Order placed successfully");
// //       await loadCart();
// //       setTimeout(() => nav("/orders"), 500);
// //     } catch (e) { setErr(e?.message || "Checkout failed"); }
// //     finally { setBusy(false); }
// //   }

// //   if (loading || !user || !cart)
// //     return (
// //       <div className="p-6 flex justify-center items-center min-h-screen">
// //         <Spinner size="xl" aria-label="Loading" color="blue" />
// //       </div>
// //     );

// //   return (
// //     <div className="mx-auto max-w-4xl px-6 py-8">
// //       <h1 className="mb-6 text-3xl font-bold text-gray-900 tracking-wide">Checkout</h1>
// //       {err && <Alert color="failure" className="mb-5" onDismiss={() => setErr("")}>{err}</Alert>}
// //       {ok && <Alert color="success" className="mb-5" onDismiss={() => setOk("")}>{ok}</Alert>}

// //       {cart.items.length === 0 ? (
// //         <div className="text-gray-600 italic text-lg">Your cart is empty.</div>
// //       ) : (
// //         <>
// //           <div className="space-y-5">
// //             {cart.items.map((it) => {
// //               const product = it.productId || {};
// //               const pid = product._id || it.productId;
// //               return (
// //                 <Card key={pid} className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-lg p-5">
// //                   <div className="flex items-center gap-4 min-w-0">
// //                     <div className="h-20 w-20 rounded bg-slate-100 flex items-center justify-center text-gray-400 text-sm select-none">
// //                       Image Placeholder
// //                     </div>
// //                     <div className="min-w-0">
// //                       <div className="text-xs text-gray-500">{it.shopId?.name || "Shop"}</div>
// //                       <div className="font-semibold truncate text-lg">{product.name || "Product"}</div>
// //                       <div className="text-sm text-gray-600 mt-1">Price: ${it.price} • Line: ${it.total.toFixed(2)}</div>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-3 mt-4 md:mt-0">
// //                     <TextInput type="number" min="1" className="w-20" value={it.quantity}
// //                       onChange={(e) => updateQty(pid, e.target.value)} disabled={busy} />
// //                     <Button color="failure" onClick={() => removeItem(pid)} disabled={busy}>Remove</Button>
// //                   </div>
// //                 </Card>
// //               );
// //             })}
// //           </div>

// //           <div className="mt-6 flex items-center justify-between rounded border bg-white p-4 shadow-sm">
// //             <div className="font-semibold text-xl">Total</div>
// //             <div className="text-2xl font-bold">${total}</div>
// //           </div>

// //           <div className="mt-6 flex justify-end">
// //             <Button disabled={busy} className="px-10 py-3 text-lg font-semibold" color="primary" onClick={placeOrder}>
// //               {busy ? "Placing Order..." : "Place Order"}
// //             </Button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }
// // Checkout.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import api from "../api/client.js";
// import { useAuth } from "../hooks/AuthContext.jsx";
// import { useNavigate } from "react-router-dom";
// import { Card, Button, TextInput, Spinner, Alert } from "flowbite-react";

// export default function Checkout() {
//   const { user, loading } = useAuth();
//   const nav = useNavigate();
//   const [cart, setCart] = useState(null);
//   const [err, setErr] = useState("");
//   const [ok, setOk] = useState("");
//   const [imageUrls, setImageUrls] = useState({});
//   const accessKey = import.meta.env.VITE_ACCESS_KEY;

//   useEffect(() => {
//     if (loading) return;
//     if (!user) {
//       nav("/login", { state: { from: { pathname: "/checkout" } } });
//       return;
//     }
//     loadCart();
//   }, [user, loading]);

//   async function fetchImage(productName) {
//     if (!productName) return "";
//     try {
//       const response = await fetch(
//         `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
//           productName
//         )}&client_id=${accessKey}&per_page=1`
//       );
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         return data.results[0].urls.small;
//       }
//     } catch {}
//     return "";
//   }

//   async function loadCart() {
//     try {
//       const data = await api.getCart();
//       setCart(data || { items: [], subTotal: 0 });

//       if (data && data.items && data.items.length > 0) {
//         const promises = data.items.map(async (it) => {
//           const pname = (it.productId && it.productId.name) || "";
//           const url = await fetchImage(pname);
//           return { id: it.productId ? it.productId._id : it.productId, url };
//         });
//         const results = await Promise.all(promises);
//         const urlMap = {};
//         results.forEach(({ id, url }) => {
//           if (url) urlMap[id] = url;
//         });
//         setImageUrls(urlMap);
//       } else {
//         setImageUrls({});
//       }
//     } catch (e) {
//       setErr(e?.message || "Failed to load cart");
//     }
//   }

//   const total = useMemo(() => {
//     if (!cart?.items?.length) return "0.00";
//     return cart.items.reduce((s, it) => s + (Number(it.total) || 0), 0).toFixed(2);
//   }, [cart]);

//   async function updateQty(pid, quantity) {
//     try {
//       const q = Math.max(1, parseInt(quantity || "1", 10));
//       await api.setCartItemQuantity(pid, q);
//       await loadCart();
//     } catch (e) {
//       setErr(e?.message || "Update failed");
//     }
//   }

//   async function removeItem(pid) {
//     try {
//       await api.removeFromCart(pid);
//       await loadCart();
//     } catch (e) {
//       setErr(e?.message || "Remove failed");
//     }
//   }

//   async function placeOrder() {
//     try {
//       if (!cart?.items?.length) {
//         setErr("Cart is empty");
//         return;
//       }
//       await api.placeOrder();
//       setOk("Order placed successfully");
//       await loadCart();
//       setTimeout(() => nav("/orders"), 500);
//     } catch (e) {
//       setErr(e?.message || "Checkout failed");
//     }
//   }

//   if (loading || !user || !cart)
//     return (
//       <div className="p-6 flex justify-center items-center min-h-screen">
//         <Spinner size="xl" aria-label="Loading" color="blue" />
//       </div>
//     );

//   return (
//     <div className="mx-auto max-w-4xl px-6 py-8">
//       <h1 className="mb-6 text-3xl font-bold text-gray-900 tracking-wide">Checkout</h1>
//       {err && (
//         <Alert color="failure" className="mb-5" onDismiss={() => setErr("")}>
//           {err}
//         </Alert>
//       )}
//       {ok && (
//         <Alert color="success" className="mb-5" onDismiss={() => setOk("")}>
//           {ok}
//         </Alert>
//       )}

//       {cart.items.length === 0 ? (
//         <div className="text-gray-600 italic text-lg">Your cart is empty.</div>
//       ) : (
//         <>
//           <div className="space-y-5">
//             {cart.items.map((it) => {
//               const product = it.productId || {};
//               const pid = product._id || it.productId;
//               const imageUrl = imageUrls[pid] || null;
//               return (
//                 <Card
//                   key={pid}
//                   className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-lg p-5"
//                 >
//                   <div className="flex items-center gap-4 min-w-0">
//                     {imageUrl ? (
//                       <img
//                         src={imageUrl}
//                         alt={product.name || "Product"}
//                         className="h-20 w-20 rounded object-cover"
//                       />
//                     ) : (
//                       <div className="h-20 w-20 rounded bg-slate-100 flex items-center justify-center text-gray-400 text-sm select-none">
//                         Image Placeholder
//                       </div>
//                     )}
//                     <div className="min-w-0">
//                       <div className="text-xs text-gray-500">{it.shopId?.name || "Shop"}</div>
//                       <div className="font-semibold truncate text-lg">{product.name || "Product"}</div>
//                       <div className="text-sm text-gray-600 mt-1">
//                         Price: ${it.price} • Line: ${it.total.toFixed(2)}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3 mt-4 md:mt-0">
//                     <TextInput
//                       type="number"
//                       min="1"
//                       className="w-20"
//                       value={it.quantity}
//                       onChange={(e) => updateQty(pid, e.target.value)}
//                     />
//                     <Button
//                       color="light"
//                       className="px-4 py-2 font-semibold"
//                       onClick={() => removeItem(pid)}
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 </Card>
//               );
//             })}
//           </div>

//           <div className="mt-6 flex items-center justify-between rounded border bg-white p-4 shadow-sm">
//             <div className="font-semibold text-xl">Total</div>
//             <div className="text-2xl font-bold">${total}</div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <Button
//               color="light"
//               className="px-10 py-3 text-lg font-semibold"
//               onClick={placeOrder}
//             >
//               Place Order
//             </Button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useMemo, useState } from "react";
import api from "../api/client.js";
import { useAuth } from "../hooks/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Card, Button, TextInput, Spinner, Alert } from "flowbite-react";

export default function Checkout() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [cart, setCart] = useState(null);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const accessKey = import.meta.env.VITE_ACCESS_KEY;

  useEffect(() => {
    if (loading) return;
    if (!user) {
      nav("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }
    loadCart();
  }, [user, loading]);

  async function fetchImage(productName) {
    if (!productName) return "";
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          productName
        )}&client_id=${accessKey}&per_page=1`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.small;
      }
    } catch {}
    return "";
  }

  async function loadCart() {
    try {
      const data = await api.getCart();
      setCart(data || { items: [], subTotal: 0 });

      if (data && data.items && data.items.length > 0) {
        const promises = data.items.map(async (it) => {
          const pname = (it.productId && it.productId.name) || "";
          const url = await fetchImage(pname);
          return { id: it.productId ? it.productId._id : it.productId, url };
        });
        const results = await Promise.all(promises);
        const urlMap = {};
        results.forEach(({ id, url }) => {
          if (url) urlMap[id] = url;
        });
        setImageUrls(urlMap);
      } else {
        setImageUrls({});
      }
    } catch (e) {
      setErr(e?.message || "Failed to load cart");
    }
  }

  const total = useMemo(() => {
    if (!cart?.items?.length) return "0.00";
    return cart.items.reduce((s, it) => s + (Number(it.total) || 0), 0).toFixed(2);
  }, [cart]);

  async function updateQty(pid, quantity) {
    try {
      const q = Math.max(1, parseInt(quantity || "1", 10));
      await api.setCartItemQuantity(pid, q);
      await loadCart();
    } catch (e) {
      setErr(e?.message || "Update failed");
    }
  }

  async function removeItem(pid) {
    try {
      await api.removeFromCart(pid);
      await loadCart();
    } catch (e) {
      setErr(e?.message || "Remove failed");
    }
  }

  async function placeOrder() {
    try {
      if (!cart?.items?.length) {
        setErr("Cart is empty");
        return;
      }
      setBusy(true);
      await api.placeOrder();
      setOk("Order placed successfully");
      await loadCart();
      setTimeout(() => nav("/orders"), 500);
    } catch (e) {
      setErr(e?.message || "Checkout failed");
    } finally {
      setBusy(false);
    }
  }

  if (loading || !user || !cart)
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
        <Spinner size="xl" aria-label="Loading" color="success" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="mb-10 text-4xl font-bold text-gray-900">Checkout</h1>
        {err && (
          <Alert color="failure" className="mb-6 rounded-lg" onDismiss={() => setErr("")}>
            {err}
          </Alert>
        )}
        {ok && (
          <Alert color="success" className="mb-6 rounded-lg" onDismiss={() => setOk("")}>
            {ok}
          </Alert>
        )}

        {cart.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
            <button
              onClick={() => nav("/products")}
              className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
              {cart.items.map((it) => {
                const product = it.productId || {};
                const pid = product._id || it.productId;
                const imageUrl = imageUrls[pid] || null;
                return (
                  <div
                    key={pid}
                    className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name || "Product"}
                          className="h-24 w-24 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-24 w-24 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <p className="text-xs text-gray-500 mb-1">{it.shopId?.name || "Shop"}</p>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {product.name || "Product"}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Price: ${it.price.toFixed(2)}</span>
                        <span>•</span>
                        <span>Qty: {it.quantity}</span>
                      </div>
                    </div>

                    {/* Actions and Total */}
                    <div className="flex flex-col items-end justify-between">
                      <p className="font-bold text-xl text-gray-900">
                        ₹{it.total.toFixed(2)}
                      </p>
                      <button
                        className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                        onClick={() => removeItem(pid)}
                        disabled={busy}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-teal-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>₹0.00</span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={busy}
                  className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {busy ? "Placing Order..." : "Place Order"}
                </button>

                <button
                  onClick={() => nav("/cart")}
                  className="w-full mt-3 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Back to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
