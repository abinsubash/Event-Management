import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { otpServices, resendOtp } from "../../services/user.services";

const OTP_EXPIRY_KEY = "otp_expiry_time";

const Otp = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const startTimer = (expiry: number) => {
    if (intervalId) clearInterval(intervalId);

    const id = setInterval(() => {
      const remaining = Math.floor((expiry - Date.now()) / 1000);
      if (remaining <= 0) {
        setSecondsLeft(0);
        clearInterval(id);
      } else {
        setSecondsLeft(remaining);
      }
    }, 1000);

    setIntervalId(id);
  };

  useEffect(() => {
    const storedExpiry = localStorage.getItem(OTP_EXPIRY_KEY);
    let expiry: number;

    if (storedExpiry && parseInt(storedExpiry) > Date.now()) {
      expiry = parseInt(storedExpiry);
    } else {
      expiry = Date.now() + 60 * 1000;
      localStorage.setItem(OTP_EXPIRY_KEY, expiry.toString());
    }

    startTimer(expiry);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setOtpError("OTP must be 6 digits");
      return;
    }

    setOtpError("");

    try {
      setLoading(true);
      if (!email) { 
        console.error("Email param is missing");
        return;
      }
      const response = await otpServices(otp, email);
      setLoading(false);

      if (response.status === 200) {
        navigate('/login')
      } else if (response.message) {
        setOtpError(response.message); 
      } else {
        setOtpError("Something went wrong");
      }
    } catch (error) {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = () => {
    if (!email) return;

    resendOtp(email)    
    const newExpiry = Date.now() + 60 * 1000;
    localStorage.setItem(OTP_EXPIRY_KEY, newExpiry.toString());
    startTimer(newExpiry);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5EFE6] via-[#D7C5B9] to-[#B3927A]">
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl border border-[#E2CFC3] px-6 py-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-[#8C6A5D] mb-2">OTP Verification</h2>
        <p className="text-gray-600 mb-6 text-center text-sm">
          Enter the 6-digit code sent to <span className="font-semibold text-[#4B3F36]">{email}</span>
        </p>
        <div className="mb-4 text-sm text-gray-700 flex items-center gap-2">
          OTP expires in:
          <span className="font-bold text-red-500">
            {secondsLeft > 0 ? `${secondsLeft}s` : "Expired"}
          </span>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div className="flex gap-2 mb-2">
            {[...Array(6)].map((_, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center text-2xl border-2 border-[#B3927A] rounded-xl bg-[#F5EFE6] focus:outline-none focus:ring-2 focus:ring-[#8C6A5D] transition"
                value={otp[idx] || ""}
                onChange={e => {
                  let val = e.target.value.replace(/[^0-9]/g, "");
                  if (!val) val = "";
                  const otpArr = otp.split("");
                  otpArr[idx] = val;
                  setOtp(otpArr.join("").slice(0, 6));
                  // Move focus
                  if (val && idx < 5) {
                    const next = document.getElementById(`otp-${idx + 1}`);
                    if (next) (next as HTMLInputElement).focus();
                  }
                }}
                onKeyDown={e => {
                  if (e.key === "Backspace" && !otp[idx] && idx > 0) {
                    const prev = document.getElementById(`otp-${idx - 1}`);
                    if (prev) (prev as HTMLInputElement).focus();
                  }
                }}
                id={`otp-${idx}`}
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <small className="text-red-500 mb-2">{otpError}</small>
          <button
            type="submit"
            className="mt-2 px-6 py-2 bg-gradient-to-r from-[#8C6A5D] via-[#B3927A] to-[#4B3F36] text-white font-bold rounded-xl shadow-lg hover:from-[#4B3F36] hover:to-[#8C6A5D] transition text-lg w-full disabled:opacity-50"
            disabled={secondsLeft === 0 || loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <div className="mt-6 text-center w-full">
          <span
            className={`font-semibold text-[#8C6A5D] cursor-pointer transition ${
              secondsLeft > 0
                ? "opacity-50 pointer-events-none select-none"
                : "hover:underline"
            }`}
            onClick={() => {
              if (secondsLeft === 0) handleResendOtp();
            }}
          >
            Resend OTP
          </span>
        </div>
      </div>
    </div>
  );
};

export default Otp;
