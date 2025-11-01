// import React, { useEffect, useState } from "react";
// import api from "../api/client.js";
// import { useAuth } from "../hooks/AuthContext.jsx";
// import { useNavigate } from "react-router-dom";
// import { Card, Badge, Alert } from "flowbite-react";

// export default function Orders() {
//   const { user, loading } = useAuth();
//   const nav = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [err, setErr] = useState("");

//   useEffect(() => {
//     if (loading) return;
//     if (!user) {
//       nav("/login", { state: { from: { pathname: "/orders" } } });
//       return;
//     }
//     loadOrders();
//   }, [user, loading]);

//   async function loadOrders() {
//     try {
//       const data = await api.myOrders();
//       setOrders(Array.isArray(data) ? data : []);
//       setErr("");
//     } catch (e) {
//       setErr(e?.response?.data?.error || e.message || "Failed to load orders");
//     }
//   }

//   const pending = orders.filter((o) => o.status === "pending" || o.status === "processing");
//   const history = orders.filter((o) => o.status === "completed" || o.status === "cancelled");

//   function OrderCard({ o }) {
//     return (
//       <Card className="mb-4 shadow-md hover:shadow-lg transition-shadow rounded-lg">
//         <div className="flex items-center justify-between mb-2">
//           <div className="font-semibold text-lg">{o.shopId?.name || "Shop"}</div>
//           <div className="text-sm text-gray-500">
//             {new Date(o.orderDate || o.createdAt).toLocaleString()}
//           </div>
//         </div>
//         <div className="text-sm text-gray-600 mb-3">
//           Status:{" "}
//           <Badge
//             color={
//               o.status === "pending"
//                 ? "warning"
//                 : o.status === "completed"
//                 ? "success"
//                 : o.status === "cancelled"
//                 ? "failure"
//                 : "gray"
//             }
//             className="capitalize"
//           >
//             {o.status}
//           </Badge>
//         </div>
//         <div className="text-sm mb-3">
//           {Array.isArray(o.products) && o.products.length > 0 ? (
//             <ul className="list-disc pl-5 space-y-1">
//               {o.products.map((it, idx) => (
//                 <li key={idx}>
//                   {(it.productId && it.productId.name) || "Product"} × {it.quantity} • ${it.price.toFixed(2)}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="italic text-gray-400">No items</div>
//           )}
//         </div>
//         <div className="font-semibold text-lg">Total: ${o.totalAmount.toFixed(2)}</div>
//       </Card>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl px-6 py-8">
//       <h1 className="mb-6 text-3xl font-bold text-gray-900">My Orders</h1>
//       {err && <Alert color="failure" className="mb-5" onDismiss={() => setErr("")}>{err}</Alert>}

//       <section className="mb-8">
//         <h2 className="font-semibold mb-3 text-xl border-b border-gray-300 pb-1">Pending Orders</h2>
//         {pending.length === 0 ? <p className="text-gray-600 italic">None</p> :
//           <div className="space-y-4">{pending.map((o) => <OrderCard key={o._id} o={o} />)}</div>}
//       </section>

//       <section>
//         <h2 className="font-semibold mb-3 text-xl border-b border-gray-300 pb-1">Order History</h2>
//         {history.length === 0 ? <p className="text-gray-600 italic">No history</p> :
//           <div className="space-y-4">{history.map((o) => <OrderCard key={o._id} o={o} />)}</div>}
//       </section>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import api from "../api/client.js";
// import { useAuth } from "../hooks/AuthContext.jsx";
// import { useNavigate } from "react-router-dom";
// import { Card, Badge, Alert, Spinner } from "flowbite-react";

// export default function Orders() {
//   const { user, loading } = useAuth();
//   const nav = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [err, setErr] = useState("");
//   const [ordersLoading, setOrdersLoading] = useState(true);

//   useEffect(() => {
//     if (loading) return;
//     if (!user) {
//       nav("/login", { state: { from: { pathname: "/orders" } } });
//       return;
//     }
//     loadOrders();
//   }, [user, loading]);

//   async function loadOrders() {
//     try {
//       setOrdersLoading(true);
//       const data = await api.myOrders();
//       setOrders(Array.isArray(data) ? data : []);
//       setErr("");
//     } catch (e) {
//       setErr(e?.response?.data?.error || e.message || "Failed to load orders");
//     } finally {
//       setOrdersLoading(false);
//     }
//   }

//   const pending = orders.filter((o) => o.status === "pending" || o.status === "processing");
//   const history = orders.filter((o) => o.status === "completed" || o.status === "cancelled");

//   function OrderCard({ o }) {
//     const statusColors = {
//       pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
//       processing: "bg-blue-100 text-blue-800 border-blue-200",
//       completed: "bg-green-100 text-green-800 border-green-200",
//       cancelled: "bg-red-100 text-red-800 border-red-200"
//     };

//     return (
//       <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 border border-gray-100">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
//           <div>
//             <h3 className="font-semibold text-lg text-gray-900">{o.shopId?.name || "Shop"}</h3>
//             <p className="text-sm text-gray-500 mt-1">
//               Order #{o._id?.slice(-8) || "N/A"}
//             </p>
//           </div>
//           <span
//             className={`px-3 py-1 rounded-full text-xs font-medium border ${
//               statusColors[o.status] || "bg-gray-100 text-gray-800 border-gray-200"
//             }`}
//           >
//             {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
//           </span>
//         </div>

//         {/* Order Date */}
//         <div className="text-sm text-gray-600 mb-4">
//           <span className="font-medium">Order Date:</span>{" "}
//           {new Date(o.orderDate || o.createdAt).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//             hour: "2-digit",
//             minute: "2-digit"
//           })}
//         </div>

//         {/* Products */}
//         <div className="mb-4">
//           <h4 className="text-sm font-medium text-gray-700 mb-2">Items:</h4>
//           {Array.isArray(o.products) && o.products.length > 0 ? (
//             <div className="space-y-2">
//               {o.products.map((it, idx) => (
//                 <div key={idx} className="flex justify-between items-center text-sm bg-gray-50 rounded-md p-3">
//                   <div className="flex-grow">
//                     <span className="text-gray-900 font-medium">
//                       {(it.productId && it.productId.name) || "Product"}
//                     </span>
//                     <span className="text-gray-500 ml-2">× {it.quantity}</span>
//                   </div>
//                   <span className="text-gray-900 font-medium">₹{it.price.toFixed(2)}</span>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="italic text-gray-400 text-sm">No items</div>
//           )}
//         </div>

//         {/* Total */}
//         <div className="flex justify-between items-center pt-4 border-t border-gray-100">
//           <span className="text-gray-700 font-medium">Total Amount</span>
//           <span className="text-2xl font-bold text-gray-900">₹{o.totalAmount.toFixed(2)}</span>
//         </div>
//       </div>
//     );
//   }

//   if (ordersLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex justify-center items-center">
//         <Spinner size="xl" aria-label="Loading orders" color="success" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="mx-auto max-w-5xl px-6">
//         <h1 className="mb-10 text-4xl font-bold text-gray-900">My Orders</h1>
//         {err && (
//           <Alert color="failure" className="mb-6 rounded-lg" onDismiss={() => setErr("")}>
//             {err}
//           </Alert>
//         )}

//         {/* Pending Orders Section */}
//         <section className="mb-12">
//           <div className="flex items-center mb-6">
//             <h2 className="text-2xl font-semibold text-gray-900">Pending Orders</h2>
//             {pending.length > 0 && (
//               <span className="ml-3 bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
//                 {pending.length}
//               </span>
//             )}
//           </div>
//           {pending.length === 0 ? (
//             <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//               <p className="text-gray-500">No pending orders</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {pending.map((o) => (
//                 <OrderCard key={o._id} o={o} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Order History Section */}
//         <section>
//           <div className="flex items-center mb-6">
//             <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
//             {history.length > 0 && (
//               <span className="ml-3 bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
//                 {history.length}
//               </span>
//             )}
//           </div>
//           {history.length === 0 ? (
//             <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//               <p className="text-gray-500">No order history</p>
//               <button
//                 onClick={() => nav("/products")}
//                 className="mt-4 inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
//               >
//                 Start Shopping
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {history.map((o) => (
//                 <OrderCard key={o._id} o={o} />
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../api/client.js";
import { useAuth } from "../hooks/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Card, Badge, Alert, Spinner } from "flowbite-react";

export default function Orders() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [orders, setOrders] = useState([]);
  const [err, setErr] = useState("");
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      nav("/login", { state: { from: { pathname: "/orders" } } });
      return;
    }
    loadOrders();
  }, [user, loading]);

  async function loadOrders() {
    try {
      setOrdersLoading(true);
      const data = await api.myOrders();
      setOrders(Array.isArray(data) ? data : []);
      setErr("");
    } catch (e) {
      setErr(e?.response?.data?.error || e.message || "Failed to load orders");
    } finally {
      setOrdersLoading(false);
    }
  }

  async function deleteOrder(orderId) {
    try {
      setDeletingOrderId(orderId);
      await api.deleteOrder(orderId);
      // Reload orders after successful deletion
      await loadOrders();
    } catch (e) {
      setErr(e?.response?.data?.error || e.message || "Failed to delete order");
    } finally {
      setDeletingOrderId(null);
    }
  }

  const pending = orders.filter((o) => o.status === "pending" || o.status === "processing");
  const history = orders.filter((o) => o.status === "completed" || o.status === "cancelled");

  function OrderCard({ o }) {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200"
    };

    const isPending = o.status === "pending";
    const isDeleting = deletingOrderId === o._id;

    return (
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{o.shopId?.name || "Shop"}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Order #{o._id?.slice(-8) || "N/A"}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              statusColors[o.status] || "bg-gray-100 text-gray-800 border-gray-200"
            }`}
          >
            {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
          </span>
        </div>

        {/* Order Date */}
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Order Date:</span>{" "}
          {new Date(o.orderDate || o.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </div>

        {/* Products */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Items:</h4>
          {Array.isArray(o.products) && o.products.length > 0 ? (
            <div className="space-y-2">
              {o.products.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm bg-gray-50 rounded-md p-3">
                  <div className="flex-grow">
                    <span className="text-gray-900 font-medium">
                      {(it.productId && it.productId.name) || "Product"}
                    </span>
                    <span className="text-gray-500 ml-2">× {it.quantity}</span>
                  </div>
                  <span className="text-gray-900 font-medium">₹{it.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="italic text-gray-400 text-sm">No items</div>
          )}
        </div>

        {/* Total and Delete Button */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            <span className="text-gray-700 font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900 ml-3">₹{o.totalAmount.toFixed(2)}</span>
          </div>
          {isPending && (
            <button
              onClick={() => deleteOrder(o._id)}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Spinner size="sm" color="white" />
                  <span>Deleting...</span>
                </>
              ) : (
                "Cancel Order"
              )}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (ordersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Spinner size="xl" aria-label="Loading orders" color="success" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="mb-10 text-4xl font-bold text-gray-900">My Orders</h1>
        {err && (
          <Alert color="failure" className="mb-6 rounded-lg" onDismiss={() => setErr("")}>
            {err}
          </Alert>
        )}

        {/* Pending Orders Section */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Pending Orders</h2>
            {pending.length > 0 && (
              <span className="ml-3 bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
                {pending.length}
              </span>
            )}
          </div>
          {pending.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">No pending orders</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pending.map((o) => (
                <OrderCard key={o._id} o={o} />
              ))}
            </div>
          )}
        </section>

        {/* Order History Section */}
        <section>
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
            {history.length > 0 && (
              <span className="ml-3 bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                {history.length}
              </span>
            )}
          </div>
          {history.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">No order history</p>
              <button
                onClick={() => nav("/products")}
                className="mt-4 inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((o) => (
                <OrderCard key={o._id} o={o} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
