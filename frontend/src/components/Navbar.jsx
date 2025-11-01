// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../hooks/AuthContext.jsx";
// import { Navbar as FlowNavbar, Button, Dropdown } from "flowbite-react";

// export default function AppNavbar() {
//   const { user, logout } = useAuth();

//   return (
//     <FlowNavbar fluid rounded className="bg-white shadow-lg border-b border-gray-200">
//       <div className="px-6 py-3 font-extrabold text-blue-600 text-lg tracking-wide select-none">
//         <Link to="/" className="hover:text-blue-700 transition-colors duration-300">
//           Local Bazaar
//         </Link>
//       </div>

//       <div className="flex md:order-2 items-center gap-4">
//         {!user ? (
//           <>
//             <Button
//               as={Link}
//               to="/login"
//               color="light"
//               className="px-5 py-2 text-sm font-medium transition hover:bg-gray-100 focus:ring-2 focus:ring-blue-400"
//             >
//               Login
//             </Button>
//             <Button
//               as={Link}
//               to="/register"
//               color="dark"
//               outline
//               className="px-5 py-2 text-sm font-medium transition hover:bg-gray-800 focus:ring-2 focus:ring-blue-600"
//             >
//               Register
//             </Button>
//           </>
//         ) : (
//           <Dropdown
//             inline
//             label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//             arrowIcon={true}
//             className="text-sm font-medium rounded-md focus:ring-2 focus:ring-blue-500"
//           >
//             {user.role === "customer" && (
//               <>
//                 <Dropdown.Item as={Link} to="/cart" className="hover:text-blue-600">
//                   Cart
//                 </Dropdown.Item>
//                 <Dropdown.Item as={Link} to="/orders" className="hover:text-blue-600">
//                   Orders
//                 </Dropdown.Item>
//               </>
//             )}
//             {user.role === "vendor" && (
//               <>
//                 <Dropdown.Item as={Link} to="/vendor" className="hover:text-blue-600">
//                   Vendor Dashboard
//                 </Dropdown.Item>
//                 <Dropdown.Item as={Link} to="/vendor/stock" className="hover:text-blue-600">
//                   Manage Stock
//                 </Dropdown.Item>
//                 <Dropdown.Item as={Link} to="/vendor/shoporders" className="hover:text-blue-600">
//                   Manage Orders
//                 </Dropdown.Item>
//               </>
//             )}
//             <hr className="my-1 border-t border-gray-300" />
//             <Dropdown.Item
//               onClick={() => {
//                 logout();
//                 window.location.href = "/";
//               }}
//               className="text-red-600 hover:bg-red-100"
//             >
//               Logout
//             </Dropdown.Item>
//           </Dropdown>
//         )}
//       </div>

//       <div className="md:order-1 hidden md:flex space-x-4 px-4 items-center">
//         {user && (
//           <Link
//             to="/products"
//             className="block py-2 px-4 text-slate-700 rounded-md hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//           >
//             Products
//           </Link>
//         )}
//       </div>
//     </FlowNavbar>
//   );
// // }import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../hooks/AuthContext.jsx";

// export default function Navbar() {
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     window.location.href = "/";
//   };

//   return (
//     <nav className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
//       <div>
//         <Link to="/" className="text-blue-600 font-bold text-lg">
//           Local Bazaar
//         </Link>
//       </div>

//       <div className="flex items-center space-x-4">
//         {/* Show Products link to all logged in users */}
//         {user && (
//           <Link to="/products" className="text-gray-700 hover:text-blue-600">
//             Products
//           </Link>
//         )}

//         {/* Customer role links */}
//         {user?.role === "customer" && (
//           <>
//             <Link to="/cart" className="text-gray-700 hover:text-blue-600">
//               Cart
//             </Link>
//             <Link to="/orders" className="text-gray-700 hover:text-blue-600">
//               Orders
//             </Link>
//           </>
//         )}

//         {/* Vendor role links */}
//         {user?.role === "vendor" && (
//           <>
//             <Link to="/vendor" className="text-gray-700 hover:text-blue-600">
//               Vendor Dashboard
//             </Link>
//             <Link to="/vendor/stock" className="text-gray-700 hover:text-blue-600">
//               Manage Stock
//             </Link>
//             <Link to="/vendor/shoporders" className="text-gray-700 hover:text-blue-600">
//               Manage Orders
//             </Link>
//           </>
//         )}

//         {/* Authentication links */}
//         {user ? (
//           <button
//             onClick={handleLogout}
//             className="text-red-500 hover:text-red-700 font-semibold"
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link to="/login" className="text-gray-700 hover:text-blue-600">
//               Login
//             </Link>
//             <Link to="/register" className="text-gray-700 hover:text-blue-600">
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-semibold text-gray-900 hover:text-teal-600 transition-colors duration-200">
            Local Bazaar
          </Link>
        </div>

        <div className="flex items-center space-x-8">
          {/* Show Products link to all logged in users */}
          {user && (
            <Link to="/products" className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200">
              Products
            </Link>
          )}

          {/* Customer role links */}
          {user?.role === "customer" && (
            <>
              <Link to="/cart" className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200">
                Cart
              </Link>
              <Link to="/orders" className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200">
                Orders
              </Link>
            </>
          )}

          {/* Vendor role links */}
          {user?.role === "vendor" && (
            <>
              <Link to="/vendor" className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200">
                Dashboard
              </Link>
              <Link to="/vendor/stock" className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200">
                Stock
              </Link>
              <Link to="/vendor/shoporders" className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200">
                Orders
              </Link>
            </>
          )}

          {/* Authentication links */}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-200"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200">
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 font-medium transition-all duration-200 shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
