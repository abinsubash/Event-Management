import { useState } from "react";
import signupSchema from "../../validations/signup.schema";
import { signupServices } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
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
    } else {
      console.log("Valid signup data:", result.data);
      const responce = await signupServices(result.data);
      console.log("This is responce ", responce);
      if (responce?.status == 201) {
        navigate(`/Otp/${responce.data.email}`);
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <div className="space-y-4">
        <div>
          <label>Name</label>
          <input
            value={signupData.name}
            onChange={(e) =>
              setSignupData({ ...signupData, name: e.target.value })
            }
            className="border-2 w-full p-1"
            type="text"
          />
          <small className="text-red-500">{signupError.nameError}</small>
        </div>

        <div>
          <label>Phone Number</label>
          <input
            value={signupData.phone_number}
            onChange={(e) =>
              setSignupData({ ...signupData, phone_number: e.target.value })
            }
            className="border-2 w-full p-1"
            type="text"
          />
          <small className="text-red-500">{signupError.phoneError}</small>
        </div>

        <div>
          <label>Email</label>
          <input
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
            className="border-2 w-full p-1"
            type="email"
          />
          <small className="text-red-500">{signupError.emailError}</small>
        </div>

        <div>
          <label>Password</label>
          <input
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
            className="border-2 w-full p-1"
            type="password"
          />
          <small className="text-red-500">{signupError.passwordError}</small>
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            value={signupData.confirm_password}
            onChange={(e) =>
              setSignupData({ ...signupData, confirm_password: e.target.value })
            }
            className="border-2 w-full p-1"
            type="password"
          />
          <small className="text-red-500">
            {signupError.confirm_passwordError}
          </small>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Signup;
