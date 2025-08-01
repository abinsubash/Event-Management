import { useState } from "react";
import signupSchema from "../../validations/signup.schema";
import { signupServices } from "../../services/user.services";
import { useLocation, useNavigate } from "react-router-dom";
import CustomToast from "../../components/CustomToast";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "user"; 
  const [signupData, setSignupData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
    role,
  });

  const [signupError, setSignupError] = useState({
    nameError: "",
    phoneError: "",
    emailError: "",
    passwordError: "",
    confirm_passwordError: "",
  });

  const handleSubmit = async () => {
    const result = signupSchema.safeParse(signupData);

    if (!result.success) {
      const newErrors: any = {
        nameError: "",
        phoneError: "",
        emailError: "",
        passwordError: "",
        confirm_passwordError: "",
      };

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        const message = issue.message;

        if (field === "name") newErrors.nameError = message;
        if (field === "phone_number") newErrors.phoneError = message;
        if (field === "email") newErrors.emailError = message;
        if (field === "password") newErrors.passwordError = message;
        if (field === "confirm_password")
          newErrors.confirm_passwordError = message;
      });

      setSignupError(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await signupServices(result.data);
      setLoading(false);

      if (response.status === 201) {
        navigate(`/Otp/${response.data.email}`);
      } else if (response.message) {
        const msg = response.message.toLowerCase(); 

        const newErrors = {
          nameError: "",
          phoneError: "",
          emailError: "",
          passwordError: "",
          confirm_passwordError: "",
        };

        if (msg.includes("email")) {
          newErrors.emailError = response.message;
          setSignupError(newErrors);
        } else if (msg.includes("phone")) {
          newErrors.phoneError = response.message;
          setSignupError(newErrors);
        } else {
          setToastMsg(response.message);
        }
      } else {
        setToastMsg("Something went wrong");
      }
    } catch (err) {
      setLoading(false);
      setToastMsg("Unexpected error occurred");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5EFE6] via-[#D7C5B9] to-[#B3927A]">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row bg-[#F5EFE6]/90 rounded-3xl shadow-2xl overflow-hidden border border-[#E2CFC3]">
          {/* Left Side - Image */}
          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#B3927A] via-[#D7C5B9] to-[#8C6A5D]">
            <img
              src="/your-image.jpg"
              alt="Signup"
              className="object-cover w-full h-full opacity-80"
            />
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 bg-[#F5EFE6]/95">
            <div className="w-full max-w-md">
              <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8C6A5D] via-[#B3927A] to-[#4B3F36] drop-shadow">
                Sign Up
              </h1>
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">
                    Name
                  </label>
                  <input
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white/80"
                    type="text"
                    placeholder="Enter your name"
                  />
                  <small className="text-red-500">{signupError.nameError}</small>
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">
                    Phone Number
                  </label>
                  <input
                    value={signupData.phone_number}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        phone_number: e.target.value,
                      })
                    }
                    className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white/80"
                    type="text"
                    placeholder="Enter your phone number"
                  />
                  <small className="text-red-500">{signupError.phoneError}</small>
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">
                    Email
                  </label>
                  <input
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white/80"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <small className="text-red-500">{signupError.emailError}</small>
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">
                    Password
                  </label>
                  <input
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white/80"
                    type="password"
                    placeholder="Enter your password"
                  />
                  <small className="text-red-500">
                    {signupError.passwordError}
                  </small>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">
                    Confirm Password
                  </label>
                  <input
                    value={signupData.confirm_password}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirm_password: e.target.value,
                      })
                    }
                    className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white/80"
                    type="password"
                    placeholder="Confirm your password"
                  />
                  <small className="text-red-500">
                    {signupError.confirm_passwordError}
                  </small>
                </div>
                <span>Already have an account</span>
                <span
                className="font-bold cursor-pointer"
              >
                login as
                <a
                  onClick={() => {
                    navigate('/login?role=user');
                  }}
                >
                  User
                </a>
                |
                <a
                  onClick={() => {
                    navigate('/login?role=owner');
                  }}
                >
                  owner
                </a>
                |
                <a
                  onClick={() => {
                    navigate('/login?role=employee');
                  }}
                >
                  employee
                </a>
              </span>
                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-[#8C6A5D] via-[#B3927A] to-[#4B3F36] text-white font-bold px-6 py-3 w-full rounded-xl shadow-lg hover:from-[#4B3F36] hover:to-[#8C6A5D] transition text-lg"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#D7C5B9]/60 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-[#8C6A5D] border-t-[#B3927A] border-b-[#F5EFE6] rounded-full animate-spin"></div>
              <span className="mt-4 text-[#8C6A5D] font-semibold text-lg">
                Signing Up...
              </span>
            </div>
          </div>
        )}
      </div>
      {toastMsg && (
        <CustomToast
          message={toastMsg}
          type="error"
          onClose={() => setToastMsg(null)}
        />
      )}
    </>
  );
};

export default Signup;
