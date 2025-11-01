// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/client.js";
// import { Card, Alert, Badge } from "flowbite-react";

// export default function ShopOrders() {
//   const { shopId } = useParams();
//   const [orders, setOrders] = useState([]);
//   const [err, setErr] = useState("");

//   useEffect(() => {
//     let active = true;

//     async function loadOrders() {
//       try {
//         const res = await api.shopHistory(shopId);
//         if (!active) return;
//         setOrders(Array.isArray(res) ? res : []);
//         setErr("");
//       } catch (e) {
//         if (active) setErr(e.message || "Failed to load orders");
//       }
//     }

//     loadOrders();
//     return () => { active = false; };
//   }, [shopId]);

//   return (
//     <div className="mx-auto max-w-4xl px-6 py-8">
//       <h1 className="mb-6 text-3xl font-bold text-gray-900">Shop Orders</h1>

//       {err && <Alert color="failure" className="mb-6" onDismiss={() => setErr("")}>{err}</Alert>}

//       {orders.length === 0 ? (
//         <p className="text-gray-600 italic text-lg">No orders available.</p>
//       ) : (
//         <div className="space-y-5">
//           {orders.map((o) => (
//             <Card
//               key={o._id}
//               className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow"
//             >
//               <div className="flex justify-between items-center mb-3">
//                 <div className="font-semibold text-lg truncate">Order {o._id}</div>
//                 <Badge
//                   color={
//                     o.status === "pending"
//                       ? "warning"
//                       : o.status === "completed"
//                       ? "success"
//                       : o.status === "cancelled"
//                       ? "failure"
//                       : "gray"
//                   }
//                   className="capitalize"
//                 >
//                   {o.status}
//                 </Badge>
//               </div>
//               <div className="text-gray-700 text-base font-medium">
//                 Total: ${o.totalAmount.toFixed(2)}
//               </div>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client.js";
import { Card, Alert, Badge, Spinner } from "flowbite-react";

export default function ShopOrders() {
  const { shopId } = useParams();
  const [orders, setOrders] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadOrders() {
      setLoading(true);
      try {
        const res = await api.shopHistory(shopId);
        if (!active) return;
        setOrders(Array.isArray(res) ? res : []);
        setErr("");
      } catch (e) {
        if (active) setErr(e.message || "Failed to load orders");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadOrders();
    return () => {
      active = false;
    };
  }, [shopId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Spinner size="xl" color="success" />
      </div>
    );
  }

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    processing: "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200"
  };

  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing");
  const completedOrders = orders.filter((o) => o.status === "completed");
  const cancelledOrders = orders.filter((o) => o.status === "cancelled");

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop Orders</h1>
          <p className="text-gray-600">
            {orders.length} total {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>

        {err && (
          <Alert color="failure" className="mb-6 rounded-lg" onDismiss={() => setErr("")}>
            {err}
          </Alert>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600 text-lg">No orders available yet</p>
          </div>
        ) : (
          <div className="space-y-8">
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
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            Order #{o._id.slice(-8)}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(o.orderDate || o.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}
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
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-gray-600 font-medium">Order Total</span>
                        <span className="text-2xl font-bold text-gray-900">
                          ${o.totalAmount.toFixed(2)}
                        </span>
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
                      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 border border-gray-100"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            Order #{o._id.slice(-8)}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(o.orderDate || o.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}
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
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-gray-600 font-medium">Order Total</span>
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{o.totalAmount.toFixed(2)}
                        </span>
                      </div>
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
                      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 border border-gray-100"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            Order #{o._id.slice(-8)}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(o.orderDate || o.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}
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
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-gray-600 font-medium">Order Total</span>
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{o.totalAmount.toFixed(2)}
                        </span>
                      </div>
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
