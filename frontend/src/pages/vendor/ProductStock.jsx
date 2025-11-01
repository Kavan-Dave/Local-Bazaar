// // import React, { useEffect, useState } from "react";
// // import api from "../../api/client.js";
// // import { useAuth } from "../../hooks/AuthContext.jsx";
// // import { Card, Button, TextInput, Textarea, Label, Spinner, Alert } from "flowbite-react";

// // export default function ProductStock() {
// //   const { user } = useAuth();
// //   const [items, setItems] = useState([]);
// //   const [busyId, setBusyId] = useState("");
// //   const [err, setErr] = useState("");
// //   const [ok, setOk] = useState("");
// //   const [newProduct, setNewProduct] = useState({
// //     name: "",
// //     price: "",
// //     description: "",
// //     quantity: "",
// //   });

// //   async function load() {
// //     setErr(""); setOk("");
// //     try {
// //       const data = await api.listMyProducts();
// //       const normalized = (Array.isArray(data) ? data : []).map((p) => ({
// //         ...p,
// //         stock: typeof p.stock === "number" ? p.stock : typeof p.quantity === "number" ? p.quantity : 0,
// //       }));
// //       setItems(normalized);
// //     } catch (e) {
// //       setErr(e?.response?.data?.error || e.message || "Failed to load products");
// //     }
// //   }

// //   useEffect(() => { if (user) load(); }, [user]);

// //   async function addProduct(e) {
// //     e.preventDefault(); setErr(""); setOk("");
// //     try {
// //       const payload = {
// //         name: newProduct.name?.trim(),
// //         price: Number(newProduct.price) || 0,
// //         description: newProduct.description?.trim() || "",
// //         quantity: Number.isFinite(+newProduct.quantity) ? +newProduct.quantity : 0,
// //       };
// //       if (!payload.name) { setErr("Name is required"); return; }
// //       const created = await api.addProduct(payload);
// //       const createdStock = typeof created.stock === "number" ? created.stock : created.quantity ?? payload.quantity ?? 0;
// //       setItems((prev) => [...prev, { ...created, stock: createdStock }]);
// //       setNewProduct({ name: "", price: "", description: "", quantity: "" });
// //       setOk("Product added");
// //     } catch (e) {
// //       setErr(e?.response?.data?.error || e.message || "Add product failed");
// //     }
// //   }

// //   function editLocal(id, value) {
// //     const parsed = Number.isFinite(+value) ? Math.max(0, parseInt(value, 10)) : 0;
// //     setItems((prev) => prev.map((x) => (x._id === id ? { ...x, stock: parsed } : x)));
// //   }

// //   async function saveStock(p) {
// //     try {
// //       setErr(""); setOk(""); setBusyId(p._id);
// //       const qty = Number(p.stock);
// //       if (!Number.isFinite(qty) || qty < 0) { setErr("Stock must be non-negative"); setBusyId(""); return; }
// //       await api.updateProduct(p._id, { quantity: qty });
// //       setOk("Stock updated"); await load();
// //     } catch (e) {
// //       setErr(e?.response?.data?.error || e.message || "Update failed");
// //     } finally { setBusyId(""); }
// //   }

// //   return (
// //     <div className="mx-auto max-w-6xl px-6 py-8">
// //       <h1 className="mb-8 text-3xl font-bold text-gray-900 text-center tracking-wide">Stock Management</h1>

// //       {err && <Alert color="failure" className="mb-6" onDismiss={() => setErr("")}>{err}</Alert>}
// //       {ok && <Alert color="success" className="mb-6" onDismiss={() => setOk("")}>{ok}</Alert>}

// //       {/* Add Product Form */}
// //       <Card className="mb-8 p-6 bg-white shadow-lg rounded-lg">
// //         <h2 className="font-semibold text-2xl mb-5">Add New Product</h2>
// //         <form onSubmit={addProduct} className="space-y-5">
// //           <div><Label htmlFor="name" value="Name" /><TextInput id="name" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required className="mt-1" /></div>
// //           <div><Label htmlFor="price" value="Price" /><TextInput id="price" type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required min={0} step="0.01" className="mt-1" /></div>
// //           <div><Label htmlFor="description" value="Description" /><Textarea id="description" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="mt-1" rows={3} /></div>
// //           <div><Label htmlFor="quantity" value="Quantity" /><TextInput id="quantity" type="number" placeholder="Quantity" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} min={0} className="mt-1" /></div>
// //           <Button type="submit" color="primary" className="mt-2 px-6 py-2 text-lg font-semibold">Add Product</Button>
// //         </form>
// //       </Card>

// //       {/* Existing Products */}
// //       <div className="space-y-6">
// //         {items.length === 0 ? (
// //           <p className="text-center text-gray-500 italic">No products yet.</p>
// //         ) : (
// //           items.map((p) => (
// //             <Card key={p._id} className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-xl p-5 hover:shadow-2xl transition-shadow">
// //               <div className="mb-4 md:mb-0 md:w-2/3">
// //                 <div className="text-xs text-gray-400 mb-1">{p.shopId?.name || "Unknown Shop"}</div>
// //                 <div className="text-xl font-semibold">{p.name}</div>
// //                 <div className="text-lg text-gray-700">${p.price.toFixed(2)}</div>
// //                 <div className="text-sm text-gray-500 mt-1">Saved Stock: {p.stock}</div>
// //               </div>
// //               <div className="flex items-center gap-3">
// //                 <TextInput type="number" min={0} className="w-28" value={p.stock} onChange={(e) => editLocal(p._id, e.target.value)} disabled={busyId === p._id} />
// //                 <Button onClick={() => saveStock(p)} disabled={busyId === p._id} color="primary">
// //                   {busyId === p._id ? <Spinner size="sm" color="white" /> : "Set"}
// //                 </Button>
// //               </div>
// //             </Card>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import api from "../../api/client.js";
// import { useAuth } from "../../hooks/AuthContext.jsx";
// import { Card, Button, TextInput, Textarea, Label, Spinner, Alert } from "flowbite-react";

// export default function ProductStock() {
//   const { user } = useAuth();
//   const [items, setItems] = useState([]);
//   const [busyId, setBusyId] = useState("");
//   const [err, setErr] = useState("");
//   const [ok, setOk] = useState("");
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     description: "",
//     quantity: "",
//     imageUrl: "", // new state for image URL
//   });
//   const [loadingImage, setLoadingImage] = useState(false);
//   const accessKey = import.meta.env.VITE_ACCESS_KEY;

//   async function load() {
//     setErr("");
//     setOk("");
//     try {
//       const data = await api.listMyProducts();
//       const normalized = (Array.isArray(data) ? data : []).map((p) => ({
//         ...p,
//         stock:
//           typeof p.stock === "number"
//             ? p.stock
//             : typeof p.quantity === "number"
//             ? p.quantity
//             : 0,
//       }));
//       setItems(normalized);
//     } catch (e) {
//       setErr(e?.response?.data?.error || e.message || "Failed to load products");
//     }
//   }

//   useEffect(() => {
//     if (user) load();
//   }, [user]);

//   // Fetch image from Unsplash based on product name
//   async function fetchImage(productName) {
//     if (!productName) {
//       setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
//       return;
//     }
//     setLoadingImage(true);
//     try {
//       const response = await fetch(
//         `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
//           productName
//         )}&client_id=${accessKey}&per_page=1`
//       );
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         setNewProduct((prev) => ({
//           ...prev,
//           imageUrl: data.results[0].urls.small,
//         }));
//       } else {
//         setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
//       }
//     } catch {
//       setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
//     }
//     setLoadingImage(false);
//   }

//   async function addProduct(e) {
//     e.preventDefault();
//     setErr("");
//     setOk("");
//     try {
//       const payload = {
//         name: newProduct.name?.trim(),
//         price: Number(newProduct.price) || 0,
//         description: newProduct.description?.trim() || "",
//         quantity: Number.isFinite(+newProduct.quantity) ? +newProduct.quantity : 0,
//         imageUrl: newProduct.imageUrl || "", // send image URL to backend
//       };
//       if (!payload.name) {
//         setErr("Name is required");
//         return;
//       }
//       const created = await api.addProduct(payload);
//       const createdStock =
//         typeof created.stock === "number"
//           ? created.stock
//           : created.quantity ?? payload.quantity ?? 0;
//       setItems((prev) => [...prev, { ...created, stock: createdStock }]);
//       setNewProduct({ name: "", price: "", description: "", quantity: "", imageUrl: "" });
//       setOk("Product added");
//     } catch (e) {
//       setErr(e?.response?.data?.error || e.message || "Add product failed");
//     }
//   }

//   function editLocal(id, value) {
//     const parsed = Number.isFinite(+value) ? Math.max(0, parseInt(value, 10)) : 0;
//     setItems((prev) => prev.map((x) => (x._id === id ? { ...x, stock: parsed } : x)));
//   }

//   async function saveStock(p) {
//     try {
//       setErr("");
//       setOk("");
//       setBusyId(p._id);
//       const qty = Number(p.stock);
//       if (!Number.isFinite(qty) || qty < 0) {
//         setErr("Stock must be non-negative");
//         setBusyId("");
//         return;
//       }
//       await api.updateProduct(p._id, { quantity: qty });
//       setOk("Stock updated");
//       await load();
//     } catch (e) {
//       setErr(e?.response?.data?.error || e.message || "Update failed");
//     } finally {
//       setBusyId("");
//     }
//   }

//   // Fetch image whenever product name changes, with debouncing to limit API calls
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchImage(newProduct.name);
//     }, 700);
//     return () => clearTimeout(timer);
//   }, [newProduct.name]);

//   return (
//     <div className="mx-auto max-w-6xl px-6 py-8">
//       <h1 className="mb-8 text-3xl font-bold text-gray-900 text-center tracking-wide">
//         Stock Management
//       </h1>

//       {err && (
//         <Alert color="failure" className="mb-6" onDismiss={() => setErr("")}>
//           {err}
//         </Alert>
//       )}
//       {ok && (
//         <Alert color="success" className="mb-6" onDismiss={() => setOk("")}>
//           {ok}
//         </Alert>
//       )}

//       {/* Add Product Form */}
// <Card className="mb-8 p-6 bg-white shadow-lg rounded-lg">
//   <h2 className="font-semibold text-2xl mb-5">Add New Product</h2>
//   <form onSubmit={addProduct} className="space-y-5">
//     <div>
//       <Label htmlFor="name" value="Name" />
//       <TextInput
//         id="name"
//         placeholder="Product Name"
//         value={newProduct.name}
//         onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//         required
//         className="mt-1"
//       />
//     </div>
//     {/* Image preview */}
//     {loadingImage ? (
//       <div>Loading image preview...</div>
//     ) : newProduct.imageUrl ? (
//       <img
//         src={newProduct.imageUrl}
//         alt="Product Preview"
//         className="w-48 h-32 object-cover rounded-md mb-3"
//       />
//     ) : (
//       <div className="text-gray-400 italic mb-3">No image preview available</div>
//     )}
//     <div>
//       <Label htmlFor="price" value="Price" />
//       <TextInput
//         id="price"
//         type="number"
//         placeholder="Price"
//         value={newProduct.price}
//         onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//         required
//         min={0}
//         step="0.01"
//         className="mt-1"
//       />
//     </div>
//     <div>
//       <Label htmlFor="description" value="Description" />
//       <Textarea
//         id="description"
//         placeholder="Description"
//         value={newProduct.description}
//         onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//         className="mt-1"
//         rows={3}
//       />
//     </div>
//     <div>
//       <Label htmlFor="quantity" value="Quantity" />
//       <TextInput
//         id="quantity"
//         type="number"
//         placeholder="Quantity"
//         value={newProduct.quantity}
//         onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
//         min={0}
//         className="mt-1"
//       />
//     </div>
//     <Button
//       type="submit"
//       color="light"
//       className="mt-2 px-6 py-2 text-lg font-semibold"
//     >
//       Add Product
//     </Button>
//   </form>
// </Card>


//       {/* Existing Products */}
//       <div className="space-y-6">
//         {items.length === 0 ? (
//           <p className="text-center text-gray-500 italic">No products yet.</p>
//         ) : (
//           items.map((p) => (
//             <Card
//               key={p._id}
//               className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-xl p-5 hover:shadow-2xl transition-shadow"
//             >
//               <div className="mb-4 md:mb-0 md:w-2/3">
//                 <div className="text-xs text-gray-400 mb-1">{p.shopId?.name || "Unknown Shop"}</div>
//                 <div className="text-xl font-semibold">{p.name}</div>
//                 <div className="text-lg text-gray-700">${p.price.toFixed(2)}</div>
//                 <div className="text-sm text-gray-500 mt-1">Saved Stock: {p.stock}</div>
//                 {p.imageUrl && (
//                   <img
//                     src={p.imageUrl}
//                     alt={p.name}
//                     className="mt-2 w-48 h-32 object-cover rounded-md"
//                   />
//                 )}
//               </div>
//               <div className="flex items-center gap-3">
//                 <TextInput
//                   type="number"
//                   min={0}
//                   className="w-28"
//                   value={p.stock}
//                   onChange={(e) => editLocal(p._id, e.target.value)}
//                   disabled={busyId === p._id}
//                 />
//                 <Button
//                   onClick={() => saveStock(p)}
//                   disabled={busyId === p._id}
//                   color="light"
//                   className="px-4 py-2 font-semibold"
//                 >
//                   {busyId === p._id ? <Spinner size="sm" color="gray" /> : "Set"}
//                 </Button>
//               </div>
//             </Card>
//           ))
//         )}
//       </div>
//     </div>
//   );
// // }
// import React, { useEffect, useState } from "react";
// import api from "../../api/client.js";
// import { useAuth } from "../../hooks/AuthContext.jsx";
// import { Card, Button, TextInput, Textarea, Label, Spinner, Alert } from "flowbite-react";

// export default function ProductStock() {
//   const { user } = useAuth();
//   const [items, setItems] = useState([]);
//   const [busyId, setBusyId] = useState("");
//   const [err, setErr] = useState("");
//   const [ok, setOk] = useState("");
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     description: "",
//     quantity: "",
//     imageUrl: "",
//   });
//   const [loadingImage, setLoadingImage] = useState(false);
//   const accessKey = import.meta.env.VITE_ACCESS_KEY;

//   async function load() {
//     setErr("");
//     setOk("");
//     try {
//       const data = await api.listMyProducts();
//       const normalized = (Array.isArray(data) ? data : []).map((p) => ({
//         ...p,
//         stock:
//           typeof p.stock === "number"
//             ? p.stock
//             : typeof p.quantity === "number"
//             ? p.quantity
//             : 0,
//       }));
//       setItems(normalized);
//     } catch (e) {
//       setErr(e?.response?.data?.error || e.message || "Failed to load products");
//     }
//   }

//   useEffect(() => {
//     if (user) load();
//   }, [user]);

//   async function fetchImage(productName) {
//     if (!productName) {
//       setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
//       return;
//     }
//     setLoadingImage(true);
//     try {
//       const response = await fetch(
//         `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
//           productName
//         )}&client_id=${accessKey}&per_page=1`
//       );
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         setNewProduct((prev) => ({
//           ...prev,
//           imageUrl: data.results[0].urls.small,
//         }));
//       } else {
//         setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
//       }
//     } catch {
//       setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
//     }
//     setLoadingImage(false);
//   }

//   async function addProduct(e) {
//     e.preventDefault();
//     setErr("");
//     setOk("");
//     try {
//       const payload = {
//         name: newProduct.name?.trim(),
//         price: Number(newProduct.price) || 0,
//         description: newProduct.description?.trim() || "",
//         quantity: Number.isFinite(+newProduct.quantity) ? +newProduct.quantity : 0,
//         imageUrl: newProduct.imageUrl || "",
//       };
//       if (!payload.name) {
//         setErr("Name is required");
//         return;
//       }
//       const created = await api.addProduct(payload);
//       const createdStock =
//         typeof created.stock === "number"
//           ? created.stock
//           : created.quantity ?? payload.quantity ?? 0;
//       setItems((prev) => [...prev, { ...created, stock: createdStock }]);
//       setNewProduct({ name: "", price: "", description: "", quantity: "", imageUrl: "" });
//       setOk("Product added successfully");
//     } catch (e) {
//       setErr(e?.response?.data?.error || e.message || "Add product failed");
//     }
//   }

//   function editLocal(id, value) {
//     const parsed = Number.isFinite(+value) ? Math.max(0, parseInt(value, 10)) : 0;
//     setItems((prev) => prev.map((x) => (x._id === id ? { ...x, stock: parsed } : x)));
//   }

//   async function saveStock(p) {
//     try {
//       setErr("");
//       setOk("");
//       setBusyId(p._id);
//       const qty = Number(p.stock);
//       if (!Number.isFinite(qty) || qty < 0) {
//         setErr("Stock must be non-negative");
//         setBusyId("");
//         return;
//       }
//       await api.updateProduct(p._id, { quantity: qty });
//       setOk("Stock updated successfully");
//       await load();
//     } catch (e) {
//       setErr(e?.response?.data?.error || e.message || "Update failed");
//     } finally {
//       setBusyId("");
//     }
//   }

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchImage(newProduct.name);
//     }, 700);
//     return () => clearTimeout(timer);
//   }, [newProduct.name]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="mx-auto max-w-6xl px-6">
//         <div className="mb-10">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Stock Management</h1>
//           <p className="text-gray-600">{items.length} products in inventory</p>
//         </div>

//         {err && (
//           <Alert color="failure" className="mb-6 rounded-lg" onDismiss={() => setErr("")}>
//             {err}
//           </Alert>
//         )}
//         {ok && (
//           <Alert color="success" className="mb-6 rounded-lg" onDismiss={() => setOk("")}>
//             {ok}
//           </Alert>
//         )}

//         {/* Add Product Form */}
//         <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Product</h2>
//           <form onSubmit={addProduct} className="space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div>
//                 <Label htmlFor="name" value="Product Name" className="mb-2 text-sm font-medium text-gray-700" />
//                 <TextInput
//                   id="name"
//                   placeholder="Enter product name"
//                   value={newProduct.name}
//                   onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//                   required
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="price" value="Price ($)" className="mb-2 text-sm font-medium text-gray-700" />
//                 <TextInput
//                   id="price"
//                   type="number"
//                   placeholder="0.00"
//                   value={newProduct.price}
//                   onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//                   required
//                   min={0}
//                   step="0.01"
//                   className="mt-1"
//                 />
//               </div>
//             </div>

//             {/* Image Preview */}
//             <div>
//               <Label value="Product Image Preview" className="mb-2 text-sm font-medium text-gray-700" />
//               {loadingImage ? (
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Spinner size="sm" />
//                   <span className="text-sm">Loading image preview...</span>
//                 </div>
//               ) : newProduct.imageUrl ? (
//                 <img
//                   src={newProduct.imageUrl}
//                   alt="Product Preview"
//                   className="w-full max-w-xs h-48 object-cover rounded-lg border border-gray-200"
//                 />
//               ) : (
//                 <div className="w-full max-w-xs h-48 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 text-sm">
//                   No image preview available
//                 </div>
//               )}
//             </div>

//             <div>
//               <Label htmlFor="description" value="Description" className="mb-2 text-sm font-medium text-gray-700" />
//               <Textarea
//                 id="description"
//                 placeholder="Enter product description"
//                 value={newProduct.description}
//                 onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//                 className="mt-1"
//                 rows={3}
//               />
//             </div>

//             <div>
//               <Label htmlFor="quantity" value="Initial Stock Quantity" className="mb-2 text-sm font-medium text-gray-700" />
//               <TextInput
//                 id="quantity"
//                 type="number"
//                 placeholder="0"
//                 value={newProduct.quantity}
//                 onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
//                 min={0}
//                 className="mt-1"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full md:w-auto px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 shadow-sm hover:shadow-md"
//             >
//               Add Product
//             </button>
//           </form>
//         </div>

//         {/* Existing Products */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-900 mb-6">Current Inventory</h2>
//           {items.length === 0 ? (
//             <div className="bg-white rounded-lg shadow-sm p-12 text-center">
//               <p className="text-gray-600 text-lg">No products in inventory yet</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-4">
//               {items.map((p) => (
//                 <div
//                   key={p._id}
//                   className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 border border-gray-100"
//                 >
//                   <div className="flex flex-col lg:flex-row gap-6">
//                     {/* Product Image */}
//                     <div className="flex-shrink-0">
//                       {p.imageUrl ? (
//                         <img
//                           src={p.imageUrl}
//                           alt={p.name}
//                           className="w-32 h-32 object-cover rounded-lg"
//                         />
//                       ) : (
//                         <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
//                           No Image
//                         </div>
//                       )}
//                     </div>

//                     {/* Product Details */}
//                     <div className="flex-grow">
//                       <div className="flex items-start justify-between mb-3">
//                         <div>
//                           <h3 className="text-xl font-semibold text-gray-900 mb-1">{p.name}</h3>
//                           <p className="text-sm text-gray-500">{p.shopId?.name || "Your Shop"}</p>
//                         </div>
//                         <span className="text-2xl font-bold text-teal-600">${p.price.toFixed(2)}</span>
//                       </div>
//                       <p className="text-gray-600 text-sm mb-4">{p.description || "No description"}</p>
//                       <div className="flex items-center gap-4">
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm text-gray-600 font-medium">Current Stock:</span>
//                           <span className="text-lg font-bold text-gray-900">{p.stock} units</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Stock Update Controls */}
//                     <div className="flex-shrink-0 flex flex-col gap-3 lg:items-end justify-center">
//                       <div className="flex items-center gap-3">
//                         <input
//                           type="number"
//                           min={0}
//                           className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                           value={p.stock}
//                           onChange={(e) => editLocal(p._id, e.target.value)}
//                           disabled={busyId === p._id}
//                         />
//                         <button
//                           onClick={() => saveStock(p)}
//                           disabled={busyId === p._id}
//                           className="px-5 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
//                         >
//                           {busyId === p._id ? <Spinner size="sm" color="white" /> : "Update"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../../api/client.js";
import { useAuth } from "../../hooks/AuthContext.jsx";
import { Card, Button, TextInput, Textarea, Label, Spinner, Alert } from "flowbite-react";

export default function ProductStock() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [busyId, setBusyId] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    imageUrl: "",
  });
  const [loadingImage, setLoadingImage] = useState(false);
  const [productImages, setProductImages] = useState({});
  const accessKey = import.meta.env.VITE_ACCESS_KEY;

  async function fetchImageForProduct(productName, productId) {
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
    setErr("");
    setOk("");
    try {
      const data = await api.listMyProducts();
      const normalized = (Array.isArray(data) ? data : []).map((p) => ({
        ...p,
        stock:
          typeof p.stock === "number"
            ? p.stock
            : typeof p.quantity === "number"
            ? p.quantity
            : 0,
      }));
      setItems(normalized);

      // Fetch images for all existing products
      const imagePromises = normalized.map(async (p) => {
        const url = await fetchImageForProduct(p.name, p._id);
        return { id: p._id, url };
      });
      const imageResults = await Promise.all(imagePromises);
      const imageMap = {};
      imageResults.forEach(({ id, url }) => {
        if (url) imageMap[id] = url;
      });
      setProductImages(imageMap);
    } catch (e) {
      setErr(e?.response?.data?.error || e.message || "Failed to load products");
    }
  }

  useEffect(() => {
    if (user) load();
  }, [user]);

  async function fetchImage(productName) {
    if (!productName) {
      setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
      return;
    }
    setLoadingImage(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          productName
        )}&client_id=${accessKey}&per_page=1`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setNewProduct((prev) => ({
          ...prev,
          imageUrl: data.results[0].urls.small,
        }));
      } else {
        setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
      }
    } catch {
      setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
    }
    setLoadingImage(false);
  }

  async function addProduct(e) {
    e.preventDefault();
    setErr("");
    setOk("");
    try {
      const payload = {
        name: newProduct.name?.trim(),
        price: Number(newProduct.price) || 0,
        description: newProduct.description?.trim() || "",
        quantity: Number.isFinite(+newProduct.quantity) ? +newProduct.quantity : 0,
        imageUrl: newProduct.imageUrl || "",
      };
      if (!payload.name) {
        setErr("Name is required");
        return;
      }
      const created = await api.addProduct(payload);
      const createdStock =
        typeof created.stock === "number"
          ? created.stock
          : created.quantity ?? payload.quantity ?? 0;
      setItems((prev) => [...prev, { ...created, stock: createdStock }]);
      setNewProduct({ name: "", price: "", description: "", quantity: "", imageUrl: "" });
      setOk("Product added successfully");
    } catch (e) {
      setErr(e?.response?.data?.error || e.message || "Add product failed");
    }
  }

  function editLocal(id, value) {
    const parsed = Number.isFinite(+value) ? Math.max(0, parseInt(value, 10)) : 0;
    setItems((prev) => prev.map((x) => (x._id === id ? { ...x, stock: parsed } : x)));
  }

  async function saveStock(p) {
    try {
      setErr("");
      setOk("");
      setBusyId(p._id);
      const qty = Number(p.stock);
      if (!Number.isFinite(qty) || qty < 0) {
        setErr("Stock must be non-negative");
        setBusyId("");
        return;
      }
      await api.updateProduct(p._id, { quantity: qty });
      setOk("Stock updated successfully");
      await load();
    } catch (e) {
      setErr(e?.response?.data?.error || e.message || "Update failed");
    } finally {
      setBusyId("");
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchImage(newProduct.name);
    }, 700);
    return () => clearTimeout(timer);
  }, [newProduct.name]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Stock Management</h1>
          <p className="text-gray-600">{items.length} products in inventory</p>
        </div>

        {err && (
          <Alert color="failure" className="mb-6 rounded-lg" onDismiss={() => setErr("")}>
            {err}
          </Alert>
        )}
        {ok && (
          <Alert color="success" className="mb-6 rounded-lg" onDismiss={() => setOk("")}>
            {ok}
          </Alert>
        )}

        {/* Add Product Form */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Product</h2>
          <form onSubmit={addProduct} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name" value="Product Name" className="mb-2 text-sm font-medium text-gray-700" />
                <TextInput
                  id="name"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price" value="Price (₹)" className="mb-2 text-sm font-medium text-gray-700" />
                <TextInput
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                  min={0}
                  step="0.01"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Image Preview */}
            <div>
              <Label value="Product Image Preview" className="mb-2 text-sm font-medium text-gray-700" />
              {loadingImage ? (
                <div className="flex items-center gap-2 text-gray-600">
                  <Spinner size="sm" />
                  <span className="text-sm">Loading image preview...</span>
                </div>
              ) : newProduct.imageUrl ? (
                <img
                  src={newProduct.imageUrl}
                  alt="Product Preview"
                  className="w-full max-w-xs h-48 object-cover rounded-lg border border-gray-200"
                />
              ) : (
                <div className="w-full max-w-xs h-48 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  No image preview available
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="description" value="Description" className="mb-2 text-sm font-medium text-gray-700" />
              <Textarea
                id="description"
                placeholder="Enter product description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="quantity" value="Initial Stock Quantity" className="mb-2 text-sm font-medium text-gray-700" />
              <TextInput
                id="quantity"
                type="number"
                placeholder="0"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                min={0}
                className="mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Existing Products */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Current Inventory</h2>
          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-600 text-lg">No products in inventory yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {items.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 border border-gray-100"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      {productImages[p._id] ? (
                        <img
                          src={productImages[p._id]}
                          alt={p.name}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{p.name}</h3>
                          <p className="text-sm text-gray-500">{p.shopId?.name || "Your Shop"}</p>
                        </div>
                        <span className="text-2xl font-bold text-teal-600">₹{p.price.toFixed(2)}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{p.description || "No description"}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 font-medium">Current Stock:</span>
                          <span className="text-lg font-bold text-gray-900">{p.stock} units</span>
                        </div>
                      </div>
                    </div>

                    {/* Stock Update Controls */}
                    <div className="flex-shrink-0 flex flex-col gap-3 lg:items-end justify-center">
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min={0}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          value={p.stock}
                          onChange={(e) => editLocal(p._id, e.target.value)}
                          disabled={busyId === p._id}
                        />
                        <button
                          onClick={() => saveStock(p)}
                          disabled={busyId === p._id}
                          className="px-5 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
                        >
                          {busyId === p._id ? <Spinner size="sm" color="white" /> : "Update"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
