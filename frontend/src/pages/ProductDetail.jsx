// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/client.js";
// import { useAuth } from "../hooks/AuthContext.jsx";
// import { Card, Button, TextInput, Spinner, Alert } from "flowbite-react";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const { user, loading } = useAuth();
//   const nav = useNavigate();
//   const [p, setP] = useState(null);
//   const [qty, setQty] = useState(1);
//   const [msg, setMsg] = useState("");
//   const [busy, setBusy] = useState(false);

//   useEffect(() => {
//     if (loading) return;
//     if (!user) nav("/login", { state: { from: { pathname: `/products/${id}` } } });
//   }, [user, loading, id, nav]);

//   useEffect(() => {
//     let active = true;
//     async function load() {
//       try { const prod = await api.getProduct(id); if (active) setP(prod); }
//       catch (e) { if (active) setMsg(e?.response?.data?.error || e.message); }
//     }
//     if (user && !loading) load();
//     return () => { active = false; };
//   }, [id, user, loading]);

//   async function add() {
//     setMsg("");
//     if (!id) return setMsg("Invalid product");
//     if (user?.role !== "customer") return setMsg("Only customers can add items to cart");

//     const available = Number.isFinite(p?.stock) ? p.stock : 0;
//     const desired = Math.max(1, qty);
//     if (desired > available) return setMsg(`Only ${available} in stock.`);

//     try { setBusy(true); await api.addToCart({ productId: id, quantity: desired }); setMsg("Added to cart"); }
//     catch (e) { setMsg(e?.response?.data?.error || e.message); }
//     finally { setBusy(false); }
//   }

//   if (loading || !user) return <div className="p-6 flex justify-center items-center min-h-screen"><Spinner size="xl" /></div>;
//   if (!p) return <div className="p-6 flex justify-center items-center min-h-screen"><Spinner size="xl" /></div>;

//   return (
//     <div className="mx-auto max-w-6xl px-6 py-8 grid gap-8 sm:grid-cols-2">
//       <Card className="h-64 bg-slate-200 rounded-lg shadow-md flex items-center justify-center text-gray-500 text-lg font-semibold">
//         Image / Media Placeholder
//       </Card>

//       <div>
//         <div className="text-sm text-slate-500 mb-2">{p.shopId?.name || "Unknown Shop"}</div>
//         <h1 className="text-3xl font-semibold mb-3 leading-tight">{p.name}</h1>
//         <p className="text-slate-700 mb-5">{p.description}</p>
//         <div className="text-lg font-semibold mb-1">${p.price.toFixed(2)}</div>
//         <div className="text-sm text-slate-600">In stock: {Number.isFinite(p.stock) ? p.stock : 0}</div>

//         {user?.role === "customer" && (
//           <div className="mt-6 flex items-center gap-3">
//             <TextInput type="number" min="1" value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1", 10)))} className="w-24" disabled={busy} />
//             <Button disabled={busy} onClick={add} color="blue">{busy ? "Adding..." : "Add to Cart"}</Button>
//           </div>
//         )}

//         {msg && <Alert className="mt-4" color={msg.includes("Added") ? "success" : "failure"} onDismiss={() => setMsg("")}>{msg}</Alert>}
//       </div>
//     </div>
//   );
// // }
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/client.js";
// import { useAuth } from "../hooks/AuthContext.jsx";
// import { Card, Button, TextInput, Spinner, Alert } from "flowbite-react";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const { user, loading } = useAuth();
//   const nav = useNavigate();
//   const [p, setP] = useState(null);
//   const [qty, setQty] = useState(1);
//   const [msg, setMsg] = useState("");
//   const [busy, setBusy] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const accessKey = import.meta.env.VITE_ACCESS_KEY;;

//   useEffect(() => {
//     if (loading) return;
//     if (!user)
//       nav("/login", { state: { from: { pathname: `/products/${id}` } } });
//   }, [user, loading, id, nav]);

//   useEffect(() => {
//     let active = true;

//     async function fetchImage(productName) {
//       if (!productName) return;
//       try {
//         const response = await fetch(
//           `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
//             productName
//           )}&client_id=${accessKey}&per_page=1`
//         );
//         const data = await response.json();
//         if (active && data.results && data.results.length > 0) {
//           setImageUrl(data.results[0].urls.small);
//         }
//       } catch {
//         if (active) setImageUrl("");
//       }
//     }

//     async function load() {
//       try {
//         const prod = await api.getProduct(id);
//         if (active) {
//           setP(prod);
//           fetchImage(prod.name);
//         }
//       } catch (e) {
//         if (active) setMsg(e?.response?.data?.error || e.message);
//       }
//     }
//     if (user && !loading) load();

//     return () => {
//       active = false;
//     };
//   }, [id, user, loading, accessKey]);

//   async function add() {
//     setMsg("");
//     if (!id) return setMsg("Invalid product");
//     if (user?.role !== "customer") return setMsg("Only customers can add items to cart");

//     const available = Number.isFinite(p?.stock) ? p.stock : 0;
//     const desired = Math.max(1, qty);
//     if (desired > available) return setMsg(`Only ${available} in stock.`);

//     try {
//       setBusy(true);
//       await api.addToCart({ productId: id, quantity: desired });
//       setMsg("Added to cart");
//     } catch (e) {
//       setMsg(e?.response?.data?.error || e.message);
//     } finally {
//       setBusy(false);
//     }
//   }

//   if (loading || !user)
//     return (
//       <div className="p-6 flex justify-center items-center min-h-screen">
//         <Spinner size="xl" />
//       </div>
//     );
//   if (!p)
//     return (
//       <div className="p-6 flex justify-center items-center min-h-screen">
//         <Spinner size="xl" />
//       </div>
//     );

//   return (
//     <div className="mx-auto max-w-6xl px-6 py-8 grid gap-8 sm:grid-cols-2">
//       {imageUrl ? (
//         <img
//           src={imageUrl}
//           alt={p.name}
//           className="h-64 w-full rounded-lg shadow-md object-cover"
//         />
//       ) : (
//         <Card className="h-64 bg-slate-200 rounded-lg shadow-md flex items-center justify-center text-gray-500 text-lg font-semibold">
//           Image / Media Placeholder
//         </Card>
//       )}

//       <div>
//         <div className="text-sm text-slate-500 mb-2">{p.shopId?.name || "Unknown Shop"}</div>
//         <h1 className="text-3xl font-semibold mb-3 leading-tight">{p.name}</h1>
//         <p className="text-slate-700 mb-5">{p.description}</p>
//         <div className="text-lg font-semibold mb-1">${p.price.toFixed(2)}</div>
//         <div className="text-sm text-slate-600">In stock: {Number.isFinite(p.stock) ? p.stock : 0}</div>

//         {user?.role === "customer" && (
//           <div className="mt-6 flex items-center gap-3">
//             <TextInput
//               type="number"
//               min="1"
//               value={qty}
//               onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1", 10)))}
//               className="w-24"
//               disabled={busy}
//             />
//             <Button disabled={busy} onClick={add} color="blue">
//               {busy ? "Adding..." : "Add to Cart"}
//             </Button>
//           </div>
//         )}

//         {msg && (
//           <Alert className="mt-4" color={msg.includes("Added") ? "success" : "failure"} onDismiss={() => setMsg("")}>
//             {msg}
//           </Alert>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client.js";
import { useAuth } from "../hooks/AuthContext.jsx";
import { Card, Button, TextInput, Spinner, Alert } from "flowbite-react";

export default function ProductDetail() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const accessKey = import.meta.env.VITE_ACCESS_KEY;

  useEffect(() => {
    if (loading) return;
    if (!user)
      nav("/login", { state: { from: { pathname: `/products/${id}` } } });
  }, [user, loading, id, nav]);

  useEffect(() => {
    let active = true;

    async function fetchImage(productName) {
      if (!productName) return;
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            productName
          )}&client_id=${accessKey}&per_page=1`
        );
        const data = await response.json();
        if (active && data.results && data.results.length > 0) {
          setImageUrl(data.results[0].urls.small);
        }
      } catch {
        if (active) setImageUrl("");
      }
    }

    async function load() {
      try {
        const prod = await api.getProduct(id);
        if (active) {
          setP(prod);
          fetchImage(prod.name);
        }
      } catch (e) {
        if (active) setMsg(e?.response?.data?.error || e.message);
      }
    }
    if (user && !loading) load();

    return () => {
      active = false;
    };
  }, [id, user, loading, accessKey]);

  async function add() {
    setMsg("");
    if (!id) return setMsg("Invalid product");
    if (user?.role !== "customer") return setMsg("Only customers can add items to cart");

    const available = Number.isFinite(p?.stock) ? p.stock : 0;
    const desired = Math.max(1, qty);
    if (desired > available) return setMsg(`Only ${available} in stock.`);

    try {
      setBusy(true);
      await api.addToCart({ productId: id, quantity: desired });
      setMsg("Added to cart");
    } catch (e) {
      setMsg(e?.response?.data?.error || e.message);
    } finally {
      setBusy(false);
    }
  }

  if (loading || !user)
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Spinner size="xl" color="success" />
      </div>
    );
  if (!p)
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Spinner size="xl" color="success" />
      </div>
    );

  const stockStatus = Number.isFinite(p.stock) ? p.stock : 0;
  const isInStock = stockStatus > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => nav("/products")}
            className="text-gray-600 hover:text-teal-600 font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Products</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={p.name}
                className="w-full h-96 rounded-lg object-cover shadow-md"
              />
            ) : (
              <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-lg">
                No Image Available
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Shop Name */}
              <p className="text-sm text-gray-500 mb-2">{p.shopId?.name || "Unknown Shop"}</p>

              {/* Product Name */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{p.name}</h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-teal-600">₹{p.price.toFixed(2)}</span>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {isInStock ? (
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="text-green-700 font-medium">In Stock ({stockStatus} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="text-red-700 font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {p.description || "No description available for this product."}
                </p>
              </div>
            </div>

            {/* Add to Cart Section */}
            {user?.role === "customer" && (
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      max={stockStatus}
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1", 10)))}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      disabled={busy || !isInStock}
                    />
                  </div>
                  <div className="flex-grow">
                    <label className="text-sm font-medium text-gray-700 mb-2 block opacity-0">Action</label>
                    <button
                      disabled={busy || !isInStock}
                      onClick={add}
                      className="w-full px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {busy ? "Adding..." : "Add to Cart"}
                    </button>
                  </div>
                </div>

                {msg && (
                  <Alert
                    className="mt-4 rounded-lg"
                    color={msg.includes("Added") ? "success" : "failure"}
                    onDismiss={() => setMsg("")}
                  >
                    {msg}
                  </Alert>
                )}
              </div>
            )}

            {user?.role === "vendor" && (
              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-600 italic">Vendors cannot purchase products</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
