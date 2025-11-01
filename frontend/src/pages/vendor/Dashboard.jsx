// import React from "react";
// import { Link } from "react-router-dom";
// import { Card, Button } from "flowbite-react";

// export default function VendorDashboard() {
//   return (
//     <div className="mx-auto max-w-6xl px-6 py-12 space-y-10 bg-gradient-to-b from-white to-blue-50 rounded-lg">
//       <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight text-center">
//         Vendor Dashboard
//       </h1>

//       <Card className="bg-white shadow-lg border border-gray-200 p-6">
//         <h2 className="mb-6 text-2xl font-semibold text-gray-700 border-b border-gray-300 pb-3">
//           Quick Actions
//         </h2>
//         <div className="flex flex-wrap justify-center gap-6">
//           <Button
//             as={Link}
//             to="/vendor/stock"
//             color="blue"
//             className="px-8 py-3 text-lg font-medium rounded-md shadow hover:shadow-lg transition-transform hover:-translate-y-0.5"
//           >
//             Manage Stock
//           </Button>
//           <Button
//             as={Link}
//             to="/vendor/shoporders"
//             color="green"
//             className="px-8 py-3 text-lg font-medium rounded-md shadow hover:shadow-lg transition-transform hover:-translate-y-0.5"
//           >
//             Handle Orders
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "flowbite-react";

export default function VendorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Vendor Dashboard
          </h1>
          <p className="text-gray-600">Manage your shop and orders</p>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/vendor/stock"
              className="group bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-lg p-8 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-teal-600 text-white p-3 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <span className="text-teal-600 group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Manage Stock
              </h3>
              <p className="text-gray-600 text-sm">
                Add, edit, or remove products from your inventory
              </p>
            </Link>

            <Link
              to="/vendor/shoporders"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-8 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Handle Orders
              </h3>
              <p className="text-gray-600 text-sm">
                View and manage customer orders for your shop
              </p>
            </Link>
          </div>
        </div>

        {/* Overview Stats (Optional - can be removed if not needed) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Total Products</p>
            <p className="text-3xl font-bold text-gray-900">--</p>
            <p className="text-xs text-gray-500 mt-2">View in Stock Management</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
            <p className="text-3xl font-bold text-gray-900">--</p>
            <p className="text-xs text-gray-500 mt-2">Check Orders page</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Completed Orders</p>
            <p className="text-3xl font-bold text-gray-900">--</p>
            <p className="text-xs text-gray-500 mt-2">Total fulfilled orders</p>
          </div>
        </div>
      </div>
    </div>
  );
}
