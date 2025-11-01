// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/AuthContext.jsx";
// import { Card, Button, TextInput, Label, Select, Alert, Spinner } from "flowbite-react";

// export default function Register() {
//   const { register } = useAuth();
//   const nav = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "customer",
//     shopName: "",
//   });
//   const [err, setErr] = useState("");
//   const [busy, setBusy] = useState(false);

//   async function submit(e) {
//     e.preventDefault();
//     setErr("");

//     if (form.role === "vendor" && !form.shopName.trim()) {
//       setErr("Shop name is required for vendor");
//       return;
//     }

//     try {
//       setBusy(true);
//       await register(form);
//       nav("/login", {
//         replace: true,
//         state: { notice: "Account created. Please sign in." },
//       });
//     } catch (e) {
//       setErr(e?.response?.data?.error || e.message || "Registration failed");
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <Card className="w-full max-w-md p-8 shadow-xl rounded-xl">
//         <h1 className="mb-8 text-3xl font-bold text-center text-gray-900">Create Account</h1>

//         {err && <Alert color="failure" className="mb-6" onDismiss={() => setErr("")}>{err}</Alert>}

//         <form className="space-y-6" onSubmit={submit} noValidate>
//           <div>
//             <Label htmlFor="name" value="Name" className="mb-1" />
//             <TextInput
//               id="name"
//               placeholder="Your Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//               disabled={busy}
//               className="mt-1"
//             />
//           </div>

//           <div>
//             <Label htmlFor="email" value="Email" className="mb-1" />
//             <TextInput
//               id="email"
//               placeholder="Your Email"
//               type="email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//               disabled={busy}
//               className="mt-1"
//             />
//           </div>

//           <div>
//             <Label htmlFor="password" value="Password" className="mb-1" />
//             <TextInput
//               id="password"
//               placeholder="Password"
//               type="password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               required
//               disabled={busy}
//               className="mt-1"
//             />
//           </div>

//           <div>
//             <Label htmlFor="role" value="Role" className="mb-1" />
//             <Select
//               id="role"
//               value={form.role}
//               onChange={(e) => setForm({ ...form, role: e.target.value })}
//               disabled={busy}
//             >
//               <option value="customer">Customer</option>
//               <option value="vendor">Vendor</option>
//             </Select>
//           </div>

//           {form.role === "vendor" && (
//             <div>
//               <Label htmlFor="shopName" value="Shop Name" className="mb-1" />
//               <TextInput
//                 id="shopName"
//                 placeholder="Your Shop Name"
//                 value={form.shopName}
//                 onChange={(e) => setForm({ ...form, shopName: e.target.value })}
//                 required
//                 disabled={busy}
//                 className="mt-1"
//               />
//             </div>
//           )}

//           <Button
//             type="submit"
//             disabled={busy}
//             className="w-full py-3 text-lg font-semibold"
//             color="blue"
//           >
//             {busy ? <Spinner size="sm" color="white" /> : "Register"}
//           </Button>
//         </form>
//       </Card>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";
import { Card, Button, TextInput, Label, Select, Alert, Spinner } from "flowbite-react";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    shopName: "",
  });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");

    if (form.role === "vendor" && !form.shopName.trim()) {
      setErr("Shop name is required for vendor");
      return;
    }

    try {
      setBusy(true);
      await register(form);
      nav("/login", {
        replace: true,
        state: { notice: "Account created. Please sign in." },
      });
    } catch (e) {
      setErr(e?.response?.data?.error || e.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md p-8 shadow-sm rounded-lg bg-white">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-900">Create Account</h1>

        {err && <Alert color="failure" className="mb-6 rounded-lg" onDismiss={() => setErr("")}>{err}</Alert>}

        <form className="space-y-5" onSubmit={submit} noValidate>
          <div>
            <Label htmlFor="name" value="Name" className="mb-2 text-sm font-medium text-gray-700" />
            <TextInput
              id="name"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              disabled={busy}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email" value="Email" className="mb-2 text-sm font-medium text-gray-700" />
            <TextInput
              id="email"
              placeholder="Your Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              disabled={busy}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password" value="Password" className="mb-2 text-sm font-medium text-gray-700" />
            <TextInput
              id="password"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              disabled={busy}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="role" value="Role" className="mb-2 text-sm font-medium text-gray-700" />
            <Select
              id="role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              disabled={busy}
              className="mt-1"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </Select>
          </div>

          {form.role === "vendor" && (
            <div>
              <Label htmlFor="shopName" value="Shop Name" className="mb-2 text-sm font-medium text-gray-700" />
              <TextInput
                id="shopName"
                placeholder="Your Shop Name"
                value={form.shopName}
                onChange={(e) => setForm({ ...form, shopName: e.target.value })}
                required
                disabled={busy}
                className="mt-1"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 mt-6 text-base font-semibold bg-teal-600 text-white rounded-lg shadow-sm hover:bg-teal-700 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {busy ? <Spinner size="sm" color="white" /> : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => nav("/login")}
            className="text-teal-600 font-medium hover:text-teal-700 transition-colors duration-200"
          >
            Sign in
          </button>
        </p>
      </Card>
    </div>
  );
}
