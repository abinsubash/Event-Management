import { useState } from "react";
import loginSchema from "../../validations/loign.schema";
import { login } from "../../services/user.services";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "user";

  const [loginData, setLoginData] = useState({ email: "", password: "", role });
  const [loginError, setLoginError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

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
        const responce = await login(result.data);
        setLoading(false);

        if (responce?.status === 201) {
          dispatch(
            setLogin({
              user: {
                name: responce.data.name,
                email: responce.data.email,
                phone_number: responce.data.phone_number,
                role: responce.data.role,
              },
              accessToken: responce.data.accessToken,
            })
          );
          navigate("/");
        } else if (responce.message) {
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
          } else if (responce.message == "User not found") {
            setToastMsg("User not found , please Enter valid Email");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5EFE6] via-[#D7C5B9] to-[#B3927A]">
      <div className="w-full max-w-6xl h-[650px] mx-auto flex flex-col md:flex-row bg-[#F5EFE6]/90 rounded-3xl shadow-2xl overflow-hidden border border-[#E2CFC3]">
        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2 h-full items-center justify-center bg-gradient-to-br from-[#B3927A] via-[#D7C5B9] to-[#8C6A5D]">
          <img
            src="/login-image.jpg"
            alt="Login Visual"
            className="object-cover w-full h-full opacity-80"
          />
        </div>
        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center p-6 sm:p-10 bg-[#F5EFE6]/95">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8C6A5D] via-[#B3927A] to-[#4B3F36] drop-shadow">
              Login
            </h1>
            <form className="w-full space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Email
                </label>
                <input
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B3927A] transition bg-white/80"
                  type="email"
                  placeholder="Enter your email"
                />
                <small className="text-red-500">{loginError.emailError}</small>
              </div>
              {/* Password */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Password
                </label>
                <input
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B3927A] transition bg-white/80"
                  type="password"
                  placeholder="Enter your password"
                />
                <small className="text-red-500">
                  {loginError.passwordError}
                </small>
              </div>
              {/* Submit Button */}
              <span>Dont have an account ? </span>
              <span
                className="font-bold cursor-pointer"
              >
                create as
                <a
                  onClick={() => {
                    navigate('/signup?role=user');
                  }}
                >
                  User
                </a>
                |
                <a
                  onClick={() => {
                    navigate('/signup?role=owner');
                  }}
                >
                  owner
                </a>
                |
                <a
                  onClick={() => {
                    navigate('/signup?role=employee');
                  }}
                >
                  employee
                </a>
              </span>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#8C6A5D] via-[#B3927A] to-[#4B3F36] text-white font-bold px-6 py-3 w-full rounded-xl shadow-lg hover:from-[#4B3F36] hover:to-[#8C6A5D] transition text-lg"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#D7C5B9]/60 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-[#8C6A5D] border-t-[#B3927A] border-b-[#F5EFE6] rounded-full animate-spin"></div>
            <span className="mt-4 text-[#8C6A5D] font-semibold text-lg">
              Logging In...
            </span>
          </div>
        </div>
      )}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-[9999]">
          <div className="px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 bg-gradient-to-r from-[#B3927A] via-[#D7C5B9] to-[#8C6A5D] text-[#4B3F36] border border-[#E2CFC3]">
            <span className="font-semibold">{toastMsg}</span>
            <button
              className="ml-4 text-lg font-bold text-[#4B3F36] hover:text-[#8C6A5D] transition"
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

export default Login;
