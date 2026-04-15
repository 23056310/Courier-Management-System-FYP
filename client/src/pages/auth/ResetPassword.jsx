import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ResetImg from "../../assets/Images/ResetPassword.png"; // Replace with your image
import { resetPassword } from "../../services/authService";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Get token from URL

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token. Please request a new reset link.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in both fields");
      setMessage("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setMessage("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      // Call backend API
      await resetPassword({ token, newPassword: password });

      setMessage("Your password has been reset successfully! Redirecting to login...");
      setPassword("");
      setConfirmPassword("");

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/account"); // Login page
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to reset password or token expired"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-80 flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${ResetImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-4xl font-bold mb-4">Reset Your Password</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Enter a new password and confirm it to reset your account password.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-6 max-w-md mx-auto mt-10">
        <div className="bg-white shadow-xl rounded-xl p-8">
          {error && <p className="text-red-600 mb-4 text-center font-medium">{error}</p>}
          {message && <p className="text-green-600 mb-4 text-center font-medium">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading || !token}
              className={`w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition ${
                loading || !token ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Remembered your password?{" "}
            <a href="/account" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
