import { useState } from "react";
import { useParams } from "react-router-dom";
import { otpServices } from "../../services/auth.services";

const Otp = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError("OTP must be 6 digits");
      return;
    }

    setOtpError("");

    try {
      if (!email) {
        console.error("Email param is missing");
        return;
      }
      const response = await otpServices(otp, email);
      console.log("OTP response:", response);
    } catch (error) {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            className="border-2"
            type="text"
            placeholder="Enter OTP"
          />
          <br />
          <small className="text-red-500">{otpError}</small>
          <br />
          <button
            type="submit"
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Otp;
