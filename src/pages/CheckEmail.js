import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckEmail() {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60); // 60-second countdown
  const [resendDisabled, setResendDisabled] = useState(true);
  const navigate = useNavigate();

  // Countdown logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleVerify = (e) => {
    e.preventDefault();

    // Dummy verification
    if (code === "123456") { // Replace with API verification
      alert("Code verified! You can now reset your password.");
      navigate("/reset-password");
    } else {
      alert("Invalid code. Try again.");
    }
  };

  const handleResend = () => {
    // Dummy resend action
    alert("Verification code resent to your email!");
    setTimer(60);
    setResendDisabled(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Enter Verification Code</h1>
        <p className="text-gray-600 mb-6">
          A verification code was sent to your email. Please enter it below to proceed.
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          {/* Code Input */}
          <div className="relative">
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
              required
              className="peer block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label
              htmlFor="code"
              className="absolute left-4 top-3 text-gray-500 text-base transition-all 
                         peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 
                         peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600 
                         bg-white px-1 -mt-2 pointer-events-none"
            >
              Verification Code
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md"
          >
            Verify Code
          </button>
        </form>

        {/* Resend Section */}
        <div className="mt-6 text-sm text-gray-600">
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={resendDisabled}
            className={`font-medium ml-1 ${
              resendDisabled ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:text-blue-500"
            }`}
          >
            Resend {resendDisabled && `(${timer}s)`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckEmail;
