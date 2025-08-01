import { useState } from "react";
import loginSchema from "../../validations/loign.schema";
import { adminLogin } from "../../services/admin.services";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState({ emailError: "", passwordError: "" });
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(loginData);

    if (!result.success) {
      const newErrors = {
        emailError: "",
        passwordError: "",
      };

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        const message = issue.message;

        if (field === "email") newErrors.emailError = message;
        if (field === "password") newErrors.passwordError = message;
      });
      setLoginError(newErrors);
    } else {
      try {
        setLoading(true);
        const responce = await adminLogin(result.data);
        setLoading(false);

        if (responce?.status === 201) {
          setToastMsg("Admin login successful");
          navigate('/admin/home')
        } else if (responce && responce.message) {
          const msg = responce.message.toLowerCase();
          const newErrors = {
            emailError: "",
            passwordError: "",
          };

          if (msg.includes("email")) {
            newErrors.emailError = responce.message;
            setLoginError(newErrors);
          } else if (msg.includes("password")) {
            newErrors.passwordError = responce.message;
            setLoginError(newErrors);
          } else if (responce.message === "Admin not found") {
            setToastMsg("Admin not found, please enter a valid Email");
          } else {
            setToastMsg(responce.message);
          }
        } else {
          setToastMsg("Something went wrong");
        }
      } catch (err) {
        setLoading(false);
        setToastMsg("Unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-[#181818] rounded-3xl shadow-2xl border border-gray-800 px-8 py-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-500 to-gray-900 drop-shadow">
          Admin Login
        </h1>
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block mb-2 text-gray-300 font-semibold">
              Email
            </label>
            <input
              value={loginData.email}
              onChange={e =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="border border-gray-700 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition bg-black text-white"
              type="email"
              placeholder="Enter your email"
            />
            <small className="text-red-500">{loginError.emailError}</small>
          </div>
          {/* Password */}
          <div>
            <label className="block mb-2 text-gray-300 font-semibold">
              Password
            </label>
            <input
              value={loginData.password}
              onChange={e =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="border border-gray-700 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition bg-black text-white"
              type="password"
              placeholder="Enter your password"
            />
            <small className="text-red-500">{loginError.passwordError}</small>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white font-bold px-6 py-3 w-full rounded-xl shadow-lg hover:from-gray-900 hover:to-gray-700 transition text-lg"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-gray-700 border-t-gray-900 border-b-gray-500 rounded-full animate-spin"></div>
            <span className="mt-4 text-gray-300 font-semibold text-lg">
              Logging In...
            </span>
          </div>
        </div>
      )}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-[9999]">
          <div className="px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white border border-gray-800">
            <span className="font-semibold">{toastMsg}</span>
            <button
              className="ml-4 text-lg font-bold text-white hover:text-gray-400 transition"
              onClick={() => setToastMsg(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;