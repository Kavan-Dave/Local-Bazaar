// import React from "react";
// import { Link } from "react-router-dom";
// import { Button } from "flowbite-react";

// export default function PublicHome() {
//   return (
//     <div className="flex flex-col items-center justify-center text-center px-6 py-20 min-h-[80vh] bg-gradient-to-b from-blue-50 via-white to-blue-100">
//       <div className="max-w-3xl">
//         <h1 className="text-5xl font-extrabold mb-6 text-gray-900 tracking-tight leading-tight">
//           Welcome to <span className="text-blue-600">Local Bazaar</span>
//         </h1>
//         <p className="text-gray-700 mb-10 text-lg leading-relaxed">
//           Discover unique products from local vendors near you.  
//           Sign in to explore, add to cart, and place your orders easily.
//         </p>

//         <div className="flex flex-wrap justify-center gap-5">
//           <Button
//             color="blue"
//             as={Link}
//             to="/login"
//             className="px-8 py-3 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
//           >
//             Login
//           </Button>
//           <Button
//             outline
//             color="blue"
//             as={Link}
//             to="/register"
//             className="px-8 py-3 text-lg font-semibold border-2 shadow-sm hover:bg-blue-600 hover:text-white transition-all duration-200"
//           >
//             Register
//           </Button>
//           <Button
//             color="gray"
//             as={Link}
//             to="/browse"
//             className="px-8 py-3 text-lg font-semibold shadow-sm hover:bg-gray-800 hover:text-white transition-all duration-200"
//           >
//             Browse Products
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

export default function PublicHome() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-24 min-h-[85vh] bg-gray-50">
      <div className="max-w-4xl">
        <h1 className="text-6xl font-bold mb-6 text-gray-900 tracking-tight leading-tight">
          Welcome to <span className="text-teal-600">Local Bazaar</span>
        </h1>
        <p className="text-gray-600 mb-12 text-xl leading-relaxed max-w-2xl mx-auto">
          Discover unique products from local vendors near you.  
          Sign in to explore, add to cart, and place your orders easily.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="px-8 py-3 text-base font-medium bg-teal-600 text-white rounded-lg shadow-sm hover:bg-teal-700 hover:shadow-md transition-all duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 text-base font-medium bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
          >
            Register
          </Link>
          <Link
            to="/browse"
            className="px-8 py-3 text-base font-medium bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
