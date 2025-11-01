// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../hooks/AuthContext.jsx";
// import { Card, Button, TextInput, Label, Spinner, Alert } from "flowbite-react";

// export default function Login() {
//   const { login } = useAuth();
//   const nav = useNavigate();
//   const loc = useLocation();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [err, setErr] = useState("");
//   const [busy, setBusy] = useState(false);

//   async function submit(e) {
//     e.preventDefault();
//     setErr("");
//     setBusy(true);
//     try {
//       await login(form);
//       const from = loc.state?.from?.pathname;
//       const dest = typeof from === "string" && from.startsWith("/") ? from : "/";
//       setTimeout(() => nav(dest, { replace: true }), 0);
//     } catch (e) {
//       setErr(e?.response?.data?.error || e.message || "Login failed");
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <div className="mx-auto max-w-sm p-6 bg-white rounded-lg shadow-md mt-20">
//       <Card>
//         <h1 className="mb-6 text-3xl font-bold text-gray-900 text-center">Sign In</h1>
//         {loc.state?.notice && (
//           <Alert color="success" className="mb-4" onDismiss={() => {}}>
//             {loc.state.notice}
//           </Alert>
//         )}
//         <form className="space-y-5" onSubmit={submit}>
//           <div>
//             <Label htmlFor="email" value="Email" className="mb-1" />
//             <TextInput
//               id="email"
//               placeholder="Email"
//               type="email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//               className="mt-1"
//               autoComplete="email"
//               disabled={busy}
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
//               className="mt-1"
//               autoComplete="current-password"
//               disabled={busy}
//             />
//           </div>
//           {err && (
//             <Alert color="failure" className="mt-2">
//               {err}
//             </Alert>
//           )}
//           <Button
//             type="submit"
//             disabled={busy}
//             className="w-full py-3 text-lg font-semibold"
//             color="blue"
//             size="lg"
//           >
//             {busy ? <Spinner size="sm" color="white" /> : "Login"}
//           </Button>
//         </form>
//       </Card>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";
import { Card, Button, TextInput, Label, Spinner, Alert } from "flowbite-react";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await login(form);
      const from = loc.state?.from?.pathname;
      const dest = typeof from === "string" && from.startsWith("/") ? from : "/";
      setTimeout(() => nav(dest, { replace: true }), 0);
    } catch (e) {
      setErr(e?.response?.data?.error || e.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md p-8 shadow-sm rounded-lg bg-white">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 text-center">Sign In</h1>
        {loc.state?.notice && (
          <Alert color="success" className="mb-6 rounded-lg" onDismiss={() => {}}>
            {loc.state.notice}
          </Alert>
        )}
        <form className="space-y-5" onSubmit={submit}>
          <div>
            <Label htmlFor="email" value="Email" className="mb-2 text-sm font-medium text-gray-700" />
            <TextInput
              id="email"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="mt-1"
              autoComplete="email"
              disabled={busy}
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
              className="mt-1"
              autoComplete="current-password"
              disabled={busy}
            />
          </div>
          {err && (
            <Alert color="failure" className="mt-2 rounded-lg">
              {err}
            </Alert>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 mt-6 text-base font-semibold bg-teal-600 text-white rounded-lg shadow-sm hover:bg-teal-700 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {busy ? <Spinner size="sm" color="white" /> : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => nav("/register")}
            className="text-teal-600 font-medium hover:text-teal-700 transition-colors duration-200"
          >
            Register
          </button>
        </p>
      </Card>
    </div>
  );
}
