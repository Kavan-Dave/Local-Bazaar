// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../api/client.js";
// // import { Card, Spinner, Alert } from "flowbite-react";

// // export default function PublicProducts() {
// //   const [items, setItems] = useState([]);
// //   const [err, setErr] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const nav = useNavigate();

// //   useEffect(() => {
// //     let active = true;
// //     async function load() {
// //       setLoading(true);
// //       try {
// //         const data = await api.listProducts();
// //         if (active) setItems(data);
// //         if (active) setErr("");
// //       } catch (e) {
// //         if (active) setErr(e.message || "Failed to load products");
// //       } finally {
// //         if (active) setLoading(false);
// //       }
// //     }
// //     load();
// //     return () => {
// //       active = false;
// //     };
// //   }, []);

// //   function viewProduct(id) {
// //     nav("/login", { state: { from: { pathname: `/products/${id}` } } });
// //   }

// //   if (loading)
// //     return (
// //       <div className="p-6 flex justify-center items-center min-h-screen">
// //         <Spinner size="xl" aria-label="Loading products" color="blue" />
// //       </div>
// //     );

// //   return (
// //     <div className="mx-auto max-w-6xl px-6 py-8">
// //       <h1 className="mb-8 text-3xl font-bold text-gray-900 tracking-wide">
// //         Products
// //       </h1>
// //       {err && (
// //         <Alert color="failure" className="mb-6" onDismiss={() => setErr("")}>
// //           {err}
// //         </Alert>
// //       )}
// //       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
// //         {items.map((p) => (
// //           <Card
// //             key={p._id}
// //             onClick={() => viewProduct(p._id)}
// //             className="cursor-pointer hover:shadow-xl transition-shadow rounded-lg"
// //             role="button"
// //             tabIndex={0}
// //             onKeyDown={(e) => {
// //               if (e.key === "Enter" || e.key === " ") {
// //                 viewProduct(p._id);
// //               }
// //             }}
// //             aria-label={`Login to view details of ${p.name}`}
// //           >
// //             <div className="h-36 w-full rounded bg-slate-100 flex items-center justify-center text-gray-400 text-lg select-none">
// //               Image Placeholder
// //             </div>
// //             <div className="mt-4 font-semibold text-lg truncate">{p.name}</div>
// //             <div className="text-sm text-gray-600 mt-1">${p.price.toFixed(2)}</div>
// //             <div className="mt-2 text-xs text-gray-500 italic">
// //               Login to view details
// //             </div>
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/client.js";
// import { Card, Spinner, Alert } from "flowbite-react";

// export default function PublicProducts() {
//   const [items, setItems] = useState([]);
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(true);
//   const nav = useNavigate();
//   const [imageUrls, setImageUrls] = useState({});
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
//         const data = await api.listProducts();
//         if (!active) return;
//         setItems(data);
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
//   }, [accessKey]);

//   function viewProduct(id) {
//     nav("/login", { state: { from: { pathname: `/products/${id}` } } });
//   }

//   if (loading)
//     return (
//       <div className="p-6 flex justify-center items-center min-h-screen">
//         <Spinner size="xl" aria-label="Loading products" color="blue" />
//       </div>
//     );

//   return (
//     <div className="mx-auto max-w-6xl px-6 py-8">
//       <h1 className="mb-8 text-3xl font-bold text-gray-900 tracking-wide">Products</h1>
//       {err && (
//         <Alert color="failure" className="mb-6" onDismiss={() => setErr("")}>
//           {err}
//         </Alert>
//       )}
//       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {items.map((p) => (
//           <Card
//             key={p._id}
//             onClick={() => viewProduct(p._id)}
//             className="cursor-pointer hover:shadow-xl transition-shadow rounded-lg"
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" || e.key === " ") {
//                 viewProduct(p._id);
//               }
//             }}
//             aria-label={`Login to view details of ${p.name}`}
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
//             <div className="mt-4 font-semibold text-lg truncate">{p.name}</div>
//             <div className="text-sm text-gray-600 mt-1">${p.price.toFixed(2)}</div>
//             <div className="mt-2 text-xs text-gray-500 italic">Login to view details</div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client.js";
import { Card, Spinner, Alert } from "flowbite-react";

export default function PublicProducts() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
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
        const data = await api.listProducts();
        if (!active) return;
        setItems(data);
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
  }, [accessKey]);

  function viewProduct(id) {
    nav("/login", { state: { from: { pathname: `/products/${id}` } } });
  }

  if (loading)
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
        <Spinner size="xl" aria-label="Loading products" color="success" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-10 text-4xl font-bold text-gray-900">
          Browse Products
        </h1>
        {err && (
          <Alert color="failure" className="mb-6 rounded-lg" onDismiss={() => setErr("")}>
            {err}
          </Alert>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <div
              key={p._id}
              onClick={() => viewProduct(p._id)}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  viewProduct(p._id);
                }
              }}
              aria-label={`Login to view details of ${p.name}`}
            >
              {imageUrls[p._id] ? (
                <img
                  src={imageUrls[p._id]}
                  alt={p.name}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 truncate mb-2">{p.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-teal-600 font-bold text-xl">₹{p.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-500 italic">Login to view</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
