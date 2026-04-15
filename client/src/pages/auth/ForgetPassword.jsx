import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ForgetImg from "../../assets/Images/ForgetPassword.png";
import { forgetPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // For redirecting to Reset Password page

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      setMessage("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const data = await forgetPassword(email);

      setMessage(data.message || "Password reset link sent!");
      setEmail("");

      // Redirect to Reset Password page with token
      // In real scenario, user clicks email link. For demo, we can pass token directly
      navigate(`/reset-password?token=${data.resetToken}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send password reset link"
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
          backgroundImage: `url(${ForgetImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-4xl font-bold mb-4">Forgot Your Password?</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Enter your email address below and we will send you a link to reset
            your password.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-6 max-w-md mx-auto mt-10">
        <div className="bg-white shadow-xl rounded-xl p-8">
          {error && (
            <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
          )}
          {message && (
            <p className="text-green-600 mb-4 text-center font-medium">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
