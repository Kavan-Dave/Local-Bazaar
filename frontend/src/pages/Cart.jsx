// // import React, { useEffect, useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import api from "../api/client.js";
// // import { Card, Button, TextInput, Alert, Spinner } from "flowbite-react";

// // export default function Cart() {
// //   const [cart, setCart] = useState(null);
// //   const [err, setErr] = useState("");
// //   const [busyId, setBusyId] = useState(null);
// //   const nav = useNavigate();

// //   async function load() {
// //     try {
// //       const c = await api.getCart();
// //       setCart(c);
// //       setErr("");
// //     } catch (e) {
// //       setErr(e.message || "Failed to load cart");
// //     }
// //   }

// //   useEffect(() => { load(); }, []);

// //   async function setQ(id, q) {
// //     if (q < 0) return;
// //     try {
// //       setBusyId(id);
// //       await api.setCartItemQuantity(id, q);
// //       await load();
// //     } catch (e) { setErr(e.message || "Failed to update quantity"); }
// //     finally { setBusyId(null); }
// //   }

// //   async function removeItem(id) {
// //     try {
// //       setBusyId(id);
// //       await api.removeFromCart(id);
// //       await load();
// //     } catch (e) { setErr(e.message || "Failed to remove item"); }
// //     finally { setBusyId(null); }
// //   }

// //   async function clear() {
// //     try {
// //       setBusyId("clear");
// //       await api.clearCart();
// //       await load();
// //     } catch (e) { setErr(e.message || "Failed to clear cart"); }
// //     finally { setBusyId(null); }
// //   }

// //   if (!cart)
// //     return (
// //       <div className="p-6 flex justify-center items-center min-h-screen">
// //         <Spinner size="xl" aria-label="Loading cart" color="blue" />
// //       </div>
// //     );

// //   const items = cart.items || [];

// //   return (
// //     <div className="mx-auto max-w-6xl px-6 py-8">
// //       <h1 className="mb-6 text-3xl font-bold text-gray-900">Your Cart</h1>
// //       {err && <Alert color="failure" className="mb-6" onDismiss={() => setErr("")}>{err}</Alert>}

// //       {items.length === 0 ? (
// //         <p className="text-gray-600 text-lg">
// //           No items in your cart.{" "}
// //           <Link to="/products" className="text-blue-600 hover:underline">Shop now</Link>
// //         </p>
// //       ) : (
// //         <div className="space-y-6">
// //           {items.map((it) => {
// //             const product = it.productId || {};
// //             const pid = product._id || it.productId;
// //             return (
// //               <Card key={pid} className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-lg p-5">
// //                 <div className="flex items-center gap-4 mb-4 md:mb-0 md:w-2/3">
// //                   <div className="h-20 w-20 rounded bg-slate-100 flex items-center justify-center text-gray-400 text-sm select-none">
// //                     Image Placeholder
// //                   </div>
// //                   <div>
// //                     <div className="font-semibold text-xl">{product.name || "Product"}</div>
// //                     <div className="text-gray-500 text-sm mt-1">
// //                       ${it.price} × {it.quantity} = ${(it.price * it.quantity).toFixed(2)}
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-3">
// //                   <TextInput
// //                     type="number"
// //                     min={0}
// //                     className="w-24"
// //                     value={it.quantity}
// //                     onChange={(e) => setQ(pid, Math.max(0, parseInt(e.target.value || "0", 10)))}
// //                     disabled={busyId === pid}
// //                   />
// //                   <Button color="failure" onClick={() => removeItem(pid)} disabled={busyId === pid}>
// //                     {busyId === pid ? <Spinner size="sm" color="white" /> : "Remove"}
// //                   </Button>
// //                 </div>
// //               </Card>
// //             );
// //           })}
// //           <Card className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-lg p-5">
// //             <div className="font-bold text-xl">Subtotal: ${cart.subTotal.toFixed(2)}</div>
// //             <div className="flex gap-3 mt-4 md:mt-0">
// //               <Button color="light" onClick={clear} disabled={busyId === "clear"}>
// //                 {busyId === "clear" ? <Spinner size="sm" /> : "Clear Cart"}
// //               </Button>
// //               <Button color="primary" onClick={() => nav("/checkout")}>Proceed to Checkout</Button>
// //             </div>
// //           </Card>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// // Cart.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api/client.js";
// import { Card, Button, TextInput, Alert, Spinner } from "flowbite-react";

// export default function Cart() {
//   const [cart, setCart] = useState(null);
//   const [err, setErr] = useState("");
//   const [imageUrls, setImageUrls] = useState({});
//   const nav = useNavigate();
//   const accessKey = import.meta.env.VITE_ACCESS_KEY;

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

//   async function load() {
//     try {
//       const c = await api.getCart();
//       setCart(c);
//       setErr("");
//       if (c && c.items && c.items.length > 0) {
//         const promises = c.items.map(async (it) => {
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
//       setErr(e.message || "Failed to load cart");
//     }
//   }

//   useEffect(() => {
//     load();
//   }, []);

//   async function setQ(id, q) {
//     if (q < 0) return;
//     try {
//       await api.setCartItemQuantity(id, q);
//       await load();
//     } catch (e) {
//       setErr(e.message || "Failed to update quantity");
//     }
//   }

//   async function removeItem(id) {
//     try {
//       await api.removeFromCart(id);
//       await load();
//     } catch (e) {
//       setErr(e.message || "Failed to remove item");
//     }
//   }

//   async function clear() {
//     try {
//       await api.clearCart();
//       await load();
//     } catch (e) {
//       setErr(e.message || "Failed to clear cart");
//     }
//   }

//   if (!cart)
//     return (
//       <div className="p-6 flex justify-center items-center min-h-screen">
//         <Spinner size="xl" aria-label="Loading cart" color="blue" />
//       </div>
//     );

//   const items = cart.items || [];

//   return (
//     <div className="mx-auto max-w-6xl px-6 py-8">
//       <h1 className="mb-6 text-3xl font-bold text-gray-900">Your Cart</h1>
//       {err && (
//         <Alert color="failure" className="mb-6" onDismiss={() => setErr("")}>
//           {err}
//         </Alert>
//       )}

//       {items.length === 0 ? (
//         <p className="text-gray-600 text-lg">
//           No items in your cart.{" "}
//           <Link to="/products" className="text-blue-600 hover:underline">
//             Shop now
//           </Link>
//         </p>
//       ) : (
//         <div className="space-y-6">
//           {items.map((it) => {
//             const product = it.productId || {};
//             const pid = product._id || it.productId;
//             const imageUrl = imageUrls[pid] || null;
//             return (
//               <Card
//                 key={pid}
//                 className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-lg p-5"
//               >
//                 <div className="flex items-center gap-4 mb-4 md:mb-0 md:w-2/3">
//                   {imageUrl ? (
//                     <img
//                       src={imageUrl}
//                       alt={product.name || "Product"}
//                       className="h-20 w-20 rounded object-cover"
//                     />
//                   ) : (
//                     <div className="h-20 w-20 rounded bg-slate-100 flex items-center justify-center text-gray-400 text-sm select-none">
//                       Image Placeholder
//                     </div>
//                   )}
//                   <div>
//                     <div className="font-semibold text-xl">
//                       {product.name || "Product"}
//                     </div>
//                     <div className="text-gray-500 text-sm mt-1">
//                       ${it.price} × {it.quantity} ={" "}
//                       {(it.price * it.quantity).toFixed(2)}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <TextInput
//                     type="number"
//                     min={0}
//                     className="w-24"
//                     value={it.quantity}
//                     onChange={(e) =>
//                       setQ(pid, Math.max(0, parseInt(e.target.value || "0", 10)))
//                     }
//                   />
//                   <Button
//                     color="light"
//                     className="px-4 py-2 font-semibold"
//                     onClick={() => removeItem(pid)}
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               </Card>
//             );
//           })}
//           <Card className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-lg p-5">
//             <div className="font-bold text-xl">Subtotal: ${cart.subTotal.toFixed(2)}</div>
//             <div className="flex gap-3 mt-4 md:mt-0">
//               <Button color="light" onClick={clear}>
//                 Clear Cart
//               </Button>
//               <Button color="light" onClick={() => nav("/checkout")}>
//                 Proceed to Checkout
//               </Button>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client.js";
import { Card, Button, TextInput, Alert, Spinner } from "flowbite-react";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [err, setErr] = useState("");
  const [imageUrls, setImageUrls] = useState({});
  const nav = useNavigate();
  const accessKey = import.meta.env.VITE_ACCESS_KEY;

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

  async function load() {
    try {
      const c = await api.getCart();
      setCart(c);
      setErr("");
      if (c && c.items && c.items.length > 0) {
        const promises = c.items.map(async (it) => {
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
      setErr(e.message || "Failed to load cart");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function setQ(id, q) {
    if (q < 0) return;
    try {
      await api.setCartItemQuantity(id, q);
      await load();
    } catch (e) {
      setErr(e.message || "Failed to update quantity");
    }
  }

  async function removeItem(id) {
    try {
      await api.removeFromCart(id);
      await load();
    } catch (e) {
      setErr(e.message || "Failed to remove item");
    }
  }

  async function clear() {
    try {
      await api.clearCart();
      await load();
    } catch (e) {
      setErr(e.message || "Failed to clear cart");
    }
  }

  if (!cart)
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
        <Spinner size="xl" aria-label="Loading cart" color="success" />
      </div>
    );

  const items = cart.items || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-10 text-4xl font-bold text-gray-900">Shopping Cart</h1>
        {err && (
          <Alert color="failure" className="mb-6 rounded-lg" onDismiss={() => setErr("")}>
            {err}
          </Alert>
        )}

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
            <Link 
              to="/products" 
              className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((it) => {
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
                          className="h-32 w-32 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-32 w-32 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {product.name || "Product"}
                        </h3>
                        <p className="text-teal-600 font-bold text-xl mb-3">
                          ₹{it.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-600 font-medium">Qty:</label>
                          <input
                            type="number"
                            min={0}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            value={it.quantity}
                            onChange={(e) =>
                              setQ(pid, Math.max(0, parseInt(e.target.value || "0", 10)))
                            }
                          />
                        </div>
                        <button
                          className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                          onClick={() => removeItem(pid)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="flex-shrink-0 text-right">
                      <p className="text-sm text-gray-600 mb-1">Total</p>
                      <p className="font-bold text-xl text-gray-900">
                        ₹{(it.price * it.quantity).toFixed(2)}
                      </p>
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
                    <span>Items ({items.length})</span>
                    <span>₹{cart.subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-teal-600 font-medium">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span>₹{cart.subTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => nav("/checkout")}
                  className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 shadow-sm hover:shadow-md mb-3"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={clear}
                  className="w-full bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
