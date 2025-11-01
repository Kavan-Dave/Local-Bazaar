// import React, { useEffect, useState } from "react";
// import api from "../../api/client.js";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAutoAnimate } from "@formkit/auto-animate/react";
// import { Card, Badge, Button } from "flowbite-react";

// export default function OrderActions() {
//   const [orders, setOrders] = useState([]);
//   const [parent] = useAutoAnimate();

//   useEffect(() => {
//     let active = true;
//     async function load() {
//       try {
//         const o = await api.getShopOrders();
//         if (active) setOrders(Array.isArray(o) ? o : []);
//       } catch {
//         toast.error("Failed to load orders");
//       }
//     }
//     load();
//     return () => {
//       active = false;
//     };
//   }, []);

//   const badgeColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "warning";
//       case "completed":
//         return "success";
//       case "cancelled":
//         return "failure";
//       default:
//         return "gray";
//     }
//   };

//   const handleAction = async (id, status) => {
//     try {
//       if (status === "accepted") await api.vendorAccept(id);
//       else await api.vendorSetStatus(id, status);
//       toast.success(`Order updated: ${status}`);
//       const refreshed = await api.getShopOrders();
//       setOrders(Array.isArray(refreshed) ? refreshed : []);
//     } catch (e) {
//       toast.error(e.message || "Action failed");
//     }
//   };

//   return (
//     <div className="mx-auto max-w-6xl px-6 py-8">
//       <ToastContainer position="top-right" autoClose={2500} />
//       <h1 className="mb-8 text-3xl font-bold text-gray-900 text-center">
//         Manage Orders
//       </h1>
//       <div ref={parent} className="space-y-6">
//         {orders.length === 0 ? (
//           <p className="text-center text-gray-500 italic">
//             No orders to manage currently.
//           </p>
//         ) : (
//           orders.map((o) => (
//             <Card
//               key={o._id}
//               className="flex flex-col md:flex-row justify-between items-center hover:shadow-2xl transition-shadow rounded-xl p-5"
//             >
//               <div className="mb-4 md:mb-0 md:w-2/3">
//                 <div className="text-sm text-gray-400 mb-1">
//                   Order ID: <span className="font-mono">{o._id}</span>
//                 </div>
//                 <div className="flex items-center gap-3 mt-1">
//                   <span className="font-semibold text-lg">
//                     {o.customerId?.name || "Unknown"}
//                   </span>
//                   <Badge color={badgeColor(o.status)} className="capitalize px-3 py-1 text-sm">
//                     {o.status}
//                   </Badge>
//                 </div>
//               </div>
//               <div className="flex gap-3 flex-wrap">
//                 <Button
//                   color="blue"
//                   size="md"
//                   onClick={() => handleAction(o._id, "accepted")}
//                   disabled={o.status !== "pending"}
//                   className="min-w-[100px]"
//                 >
//                   Accept
//                 </Button>
//                 <Button
//                   color="success"
//                   size="md"
//                   onClick={() => handleAction(o._id, "completed")}
//                   disabled={o.status === "cancelled" || o.status === "completed"}
//                   className="min-w-[100px]"
//                 >
//                   Complete
//                 </Button>
//                 <Button
//                   color="failure"
//                   size="md"
//                   onClick={() => handleAction(o._id, "cancelled")}
//                   disabled={o.status === "completed" || o.status === "cancelled"}
//                   className="min-w-[100px]"
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </Card>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../../api/client.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card, Badge, Button, Spinner } from "flowbite-react";

export default function OrderActions() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const o = await api.getShopOrders();
        if (active) setOrders(Array.isArray(o) ? o : []);
      } catch {
        toast.error("Failed to load orders");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    processing: "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200"
  };

  const handleAction = async (id, status) => {
    try {
      if (status === "accepted") await api.vendorAccept(id);
      else await api.vendorSetStatus(id, status);
      toast.success(`Order updated: ${status}`);
      const refreshed = await api.getShopOrders();
      setOrders(Array.isArray(refreshed) ? refreshed : []);
    } catch (e) {
      toast.error(e.message || "Action failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Spinner size="xl" color="success" />
      </div>
    );
  }

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const activeOrders = orders.filter((o) => o.status === "processing" || o.status === "accepted");
  const completedOrders = orders.filter((o) => o.status === "completed");
  const cancelledOrders = orders.filter((o) => o.status === "cancelled");

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Orders</h1>
          <p className="text-gray-600">
            {orders.length} total {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600 text-lg">No orders to manage currently</p>
          </div>
        ) : (
          <div ref={parent} className="space-y-8">
            {/* Pending Orders */}
            {pendingOrders.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Pending Orders</h2>
                  <span className="ml-3 bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                    {pendingOrders.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {pendingOrders.map((o) => (
                    <div
                      key={o._id}
                      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 border border-gray-100"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">
                              {o.customerId?.name || "Unknown Customer"}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                statusColors[o.status] || "bg-gray-100 text-gray-800 border-gray-200"
                              }`}
                            >
                              {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">Order ID: {o._id.slice(-8)}</p>
                          <p className="text-xl font-bold text-gray-900 mt-2">
                            ₹{o.totalAmount?.toFixed(2) || "0.00"}
                          </p>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                          <button
                            onClick={() => handleAction(o._id, "accepted")}
                            disabled={o.status !== "pending"}
                            className="px-5 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleAction(o._id, "cancelled")}
                            disabled={o.status === "completed" || o.status === "cancelled"}
                            className="px-5 py-2 bg-white text-red-600 border border-red-300 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Active Orders */}
            {activeOrders.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Active Orders</h2>
                  <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {activeOrders.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {activeOrders.map((o) => (
                    <div
                      key={o._id}
                      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 border border-gray-100"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">
                              {o.customerId?.name || "Unknown Customer"}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                statusColors[o.status] || "bg-gray-100 text-gray-800 border-gray-200"
                              }`}
                            >
                              {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">Order ID: {o._id.slice(-8)}</p>
                          <p className="text-xl font-bold text-gray-900 mt-2">
                            ₹{o.totalAmount?.toFixed(2) || "0.00"}
                          </p>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                          <button
                            onClick={() => handleAction(o._id, "completed")}
                            disabled={o.status === "cancelled" || o.status === "completed"}
                            className="px-5 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Mark Complete
                          </button>
                          <button
                            onClick={() => handleAction(o._id, "cancelled")}
                            disabled={o.status === "completed" || o.status === "cancelled"}
                            className="px-5 py-2 bg-white text-red-600 border border-red-300 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Completed Orders */}
            {completedOrders.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Completed Orders</h2>
                  <span className="ml-3 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {completedOrders.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {completedOrders.map((o) => (
                    <div
                      key={o._id}
                      className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 opacity-75"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {o.customerId?.name || "Unknown Customer"}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[o.status]}`}>
                          Completed
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Order ID: {o._id.slice(-8)}</p>
                      <p className="text-xl font-bold text-gray-900 mt-2">
                        ₹{o.totalAmount?.toFixed(2) || "0.00"}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Cancelled Orders */}
            {cancelledOrders.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Cancelled Orders</h2>
                  <span className="ml-3 bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                    {cancelledOrders.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {cancelledOrders.map((o) => (
                    <div
                      key={o._id}
                      className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 opacity-75"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {o.customerId?.name || "Unknown Customer"}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[o.status]}`}>
                          Cancelled
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Order ID: {o._id.slice(-8)}</p>
                      <p className="text-xl font-bold text-gray-900 mt-2">
                        ₹{o.totalAmount?.toFixed(2) || "0.00"}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
