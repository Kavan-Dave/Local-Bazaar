// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/client.js";
// import { useAuth } from "../hooks/AuthContext.jsx";
// import { Card, Spinner, Alert } from "flowbite-react";

// export default function Products() {
//   const { user } = useAuth();
//   const nav = useNavigate();
//   const [items, setItems] = useState([]);
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let active = true;
//     async function load() {
//       setLoading(true);
//       try {
//         const data = user?.role === "vendor" ? await api.listMyProducts() : await api.listProducts();
//         if (active) setItems(Array.isArray(data) ? data : []);
//         if (active) setErr("");
//       } catch (e) { if (active) setErr(e.message || "Failed to load products"); }
//       finally { if (active) setLoading(false); }
//     }
//     load();
//     return () => { active = false; };
//   }, [user]);

//   function openProduct(id) {
//     const target = `/products/${id}`;
//     if (!user) nav("/login", { state: { from: { pathname: target } } });
//     else nav(target);
//   }

//   if (loading) return <div className="p-6 flex justify-center items-center min-h-screen"><Spinner size="xl" /></div>;

//   return (
//     <div className="mx-auto max-w-6xl px-6 py-8">
//       <h1 className="mb-8 text-3xl font-bold text-gray-900 tracking-wide">Products</h1>

//       {err && <Alert color="failure" className="mb-6" onDismiss={() => setErr("")}>{err}</Alert>}

//       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {items.map((p) => (
//           <Card key={p._id} onClick={() => openProduct(p._id)} className="cursor-pointer hover:shadow-xl transition-shadow rounded-lg">
//             <div className="h-36 w-full rounded bg-slate-100 flex items-center justify-center text-gray-400 text-lg select-none">
//               Image Placeholder
//             </div>
//             <div className="mt-4 text-sm text-gray-500">{p.shopId?.name || "Unknown shop"}</div>
//             <div className="font-semibold truncate text-lg">{p.name}</div>
//             <div className="text-sm text-gray-600 mt-1">${p.price.toFixed(2)}</div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// // }
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/client.js";
// import { useAuth } from "../hooks/AuthContext.jsx";
// import { Card, Spinner, Alert } from "flowbite-react";

// export default function Products() {
//   const { user } = useAuth();
//   const nav = useNavigate();
//   const [items, setItems] = useState([]);
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [imageUrls, setImageUrls] = useState({}); // productId => image URL
//   const accessKey = import.meta.env.VITE_ACCESS_KEY;

//   useEffect(() => {
//     let active = true;

//     async function fetchImage(productName) {
//       if (!productName) return "";
//       try {
//         const response = await fetch(
//           `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
//             productName
//           )}&client_id=${accessKey}&per_page=1`
//         );
//         const data = await response.json();
//         if (data.results && data.results.length > 0) {
//           return data.results[0].urls.small;
//         }
//       } catch {}
//       return "";
//     }

//     async function load() {
//       setLoading(true);
//       try {
//         const data =
//           user?.role === "vendor"
//             ? await api.listMyProducts()
//             : await api.listProducts();
//         if (!active) return;
//         setItems(Array.isArray(data) ? data : []);
//         setErr("");

//         // Fetch images dynamically for all products
//         const promises = (Array.isArray(data) ? data : []).map(async (p) => {
//           const url = await fetchImage(p.name);
//           return { id: p._id, url };
//         });
//         const results = await Promise.all(promises);
//         if (!active) return;

//         const urlMap = {};
//         results.forEach(({ id, url }) => {
//           if (url) urlMap[id] = url;
//         });
//         setImageUrls(urlMap);
//       } catch (e) {
//         if (!active) return;
//         setErr(e.message || "Failed to load products");
//       } finally {
//         if (active) setLoading(false);
//       }
//     }

//     load();

//     return () => {
//       active = false;
//     };
//   }, [user, accessKey]);

//   function openProduct(id) {
//     const target = `/products/${id}`;
//     if (!user) nav("/login", { state: { from: { pathname: target } } });
//     else nav(target);
//   }

//   if (loading)
//     return (
//       <div className="p-6 flex justify-center items-center min-h-screen">
//         <Spinner size="xl" />
//       </div>
//     );

//   return (
//     <div className="mx-auto max-w-6xl px-6 py-8">
//       <h1 className="mb-8 text-3xl font-bold text-gray-900 tracking-wide">
//         Products
//       </h1>

//       {err && (
//         <Alert color="failure" className="mb-6" onDismiss={() => setErr("")}>
//           {err}
//         </Alert>
//       )}

//       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {items.map((p) => (
//           <Card
//             key={p._id}
//             onClick={() => openProduct(p._id)}
//             className="cursor-pointer hover:shadow-xl transition-shadow rounded-lg"
//           >
//             {imageUrls[p._id] ? (
//               <img
//                 src={imageUrls[p._id]}
//                 alt={p.name}
//                 className="h-36 w-full rounded object-cover"
//               />
//             ) : (
//               <div className="h-36 w-full rounded bg-slate-100 flex items-center justify-center text-gray-400 text-lg select-none">
//                 Image Placeholder
//               </div>
//             )}
//             <div className="mt-4 text-sm text-gray-500">
//               {p.shopId?.name || "Unknown shop"}
//             </div>
//             <div className="font-semibold truncate text-lg">{p.name}</div>
//             <div className="text-sm text-gray-600 mt-1">${p.price.toFixed(2)}</div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client.js";
import { useAuth } from "../hooks/AuthContext.jsx";
import { Card, Spinner, Alert } from "flowbite-react";

export default function Products() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState({});
  const accessKey = import.meta.env.VITE_ACCESS_KEY;

  useEffect(() => {
    let active = true;

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
      setLoading(true);
      try {
        const data =
          user?.role === "vendor"
            ? await api.listMyProducts()
            : await api.listProducts();
        if (!active) return;
        setItems(Array.isArray(data) ? data : []);
        setErr("");

        // Fetch images dynamically for all products
        const promises = (Array.isArray(data) ? data : []).map(async (p) => {
          const url = await fetchImage(p.name);
          return { id: p._id, url };
        });
        const results = await Promise.all(promises);
        if (!active) return;

        const urlMap = {};
        results.forEach(({ id, url }) => {
          if (url) urlMap[id] = url;
        });
        setImageUrls(urlMap);
      } catch (e) {
        if (!active) return;
        setErr(e.message || "Failed to load products");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [user, accessKey]);

  function openProduct(id) {
    const target = `/products/${id}`;
    if (!user) nav("/login", { state: { from: { pathname: target } } });
    else nav(target);
  }

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Spinner size="xl" color="success" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {user?.role === "vendor" ? "My Products" : "Explore Products"}
          </h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? "product" : "products"} available
          </p>
        </div>

        {err && (
          <Alert color="failure" className="mb-6 rounded-lg" onDismiss={() => setErr("")}>
            {err}
          </Alert>
        )}

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No products available</p>
            {user?.role === "vendor" && (
              <button
                onClick={() => nav("/vendor/stock")}
                className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
              >
                Add Your First Product
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
              <div
                key={p._id}
                onClick={() => openProduct(p._id)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  {imageUrls[p._id] ? (
                    <img
                      src={imageUrls[p._id]}
                      alt={p.name}
                      className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-56 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}
                  {/* Shop Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <p className="text-xs font-medium text-gray-700">
                      {p.shopId?.name || "Unknown shop"}
                    </p>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 truncate mb-2 group-hover:text-teal-600 transition-colors duration-200">
                    {p.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-600 font-bold text-xl">
                      ₹{p.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 group-hover:text-teal-600 transition-colors duration-200">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
