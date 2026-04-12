import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
export default function Login() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector(state=>(state.auth.user))
  const loading = useSelector(state=>(state.auth.loading))

  const navigate = useNavigate();

  //  get login function from hook
  const {handleLogin} = useAuth();

  if(!loading && user){
    return <Navigate to = "/" replace/>
  }

  const isTyping = email.length > 0 && password.length > 0;

  // 🔹 Google
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  // 🔹 Apple
  const handleAppleLogin = () => {
    console.log("Apple login clicked");
  };

  // 🔹 Email Login (FORM SUBMIT)
  const handleEmailLogin = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT

    console.log(" Email login clicked");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const payload = { 
        email, 
        password };

      console.log("Payload:", payload);

      const success = await handleLogin(payload);

      console.log("✅ Success:", success);

      if (success) {
        navigate("/");
      } else {
        console.log(" Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80">
      <div className="w-[360px] bg-[#1a1a1a] text-white rounded-2xl p-6 shadow-xl">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/perplexity-icon.svg"
            alt="logo"
            className="w-8 h-8 invert brightness-200"
          />
        </div>

        <h2 className="text-lg font-semibold text-center">
          Sign in or create an account
        </h2>

        <p className="text-sm text-gray-400 text-center mb-5">
          Save and sync your searches
        </p>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg font-medium 
          hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-transform duration-150"
        >
          <img src="/google-icon.svg" className="w-4 h-4" />
          Continue with Google
        </button>

        {/* Apple */}
        <button
          onClick={handleAppleLogin}
          className="w-full flex items-center justify-center gap-2 bg-[#2a2a2a] py-2 rounded-lg font-medium mt-3 
          hover:bg-[#333] hover:scale-[1.02] active:scale-95 transition-transform duration-150"
        >
          <img src="/apple-icon.svg" className="w-4 h-4 invert" />
          Continue with Apple
        </button>

        {/* Divider */}
        <div className="my-4 border-t border-gray-700"></div>

        {/* ✅ FORM START */}
        <form onSubmit={handleEmailLogin}>
          {/* Email */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#2a2a2a] px-3 py-2 rounded-lg outline-none mb-3 focus:ring-2 focus:ring-white/20"
          />

          {/* Password */}
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#2a2a2a] px-3 py-2 rounded-lg outline-none pr-12 focus:ring-2 focus:ring-white/20"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 cursor-pointer hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isTyping}
            className={`w-full py-2 rounded-lg font-medium transition-transform duration-150 ${
              isTyping
                ? "bg-white text-black hover:opacity-90 hover:scale-[1.02] active:scale-95 cursor-pointer"
                : "bg-[#2a2a2a] text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue with Email
          </button>
        </form>
        {/* ✅ FORM END */}

        {/* Register */}
        <p className="text-sm text-center mt-5 text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-white hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}