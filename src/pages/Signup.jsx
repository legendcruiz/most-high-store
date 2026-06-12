import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      setLoading(false);

      if (signupError) {
        setError(signupError.message);
        return;
      }

      setMessage("Account created. You can login now.");
      setTimeout(() => navigate("/login"), 800);
    } catch {
      setLoading(false);
      setError(
        "Signup service cannot be reached. Please check your Supabase URL and internet connection."
      );
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Create Account</h1>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border p-3 mb-4 rounded"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 mb-4 rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 mb-4 rounded"
            required
            minLength="6"
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && (
            <p className="text-green-600 text-sm mb-4">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white w-full py-3 rounded font-bold hover:bg-gray-800"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-orange-500">
            Login
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export default Signup;
