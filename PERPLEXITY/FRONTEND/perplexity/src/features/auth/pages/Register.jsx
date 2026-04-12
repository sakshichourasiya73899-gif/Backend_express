import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid =
    username.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "";

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isValid) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 🔹 Simulate API call (replace with real backend later)
      await new Promise((res) => setTimeout(res, 1500));

      console.log({ username, email, password });

      // optional reset
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-[360px] bg-[#1a1a1a]/90 text-white rounded-2xl p-6 shadow-2xl border border-gray-700">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/perplexity-icon.svg"
            alt="logo"
            className="w-8 h-8 invert brightness-200"
          />
        </div>

        <h2 className="text-lg font-semibold text-center">
          Create your account
        </h2>

        <p className="text-sm text-gray-400 text-center mb-5">
          Join us and get started
        </p>

        {/* FORM */}
        <form onSubmit={handleRegister}>

          {/* Username */}
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#2a2a2a] px-3 py-2 rounded-lg outline-none mb-3 
            focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#2a2a2a] px-3 py-2 rounded-lg outline-none mb-3 
            focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Password */}
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#2a2a2a] px-3 py-2 rounded-lg outline-none pr-12
              focus:ring-2 focus:ring-blue-500 transition"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 cursor-pointer hover:text-white transition"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm mb-3 animate-pulse">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-2 rounded-lg font-medium transition-all duration-200
            ${
              isValid && !loading
                ? "bg-white text-black hover:opacity-90 active:scale-95"
                : "bg-[#2a2a2a] text-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "⏳ Creating..." : "Create Account"}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-sm text-center mt-5 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}