import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@/app/contexts/AuthContext";
import { Mail, Lock, Sparkles } from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="relative">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="mt-3 text-gray-600 text-lg">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-5 py-4 rounded-2xl shadow-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-2xl transition-all duration-200 font-semibold text-lg hover:scale-[1.02]"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign up
              </Link>
            </div>

            <div className="mt-8 p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <p className="text-xs text-gray-600 mb-3 font-semibold">Demo Credentials:</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs bg-white/60 px-3 py-2 rounded-lg">
                  <span className="text-gray-700 font-medium">User:</span>
                  <code className="text-gray-900 font-mono">user@bookstore.com / user123</code>
                </div>
                <div className="flex items-center justify-between text-xs bg-white/60 px-3 py-2 rounded-lg">
                  <span className="text-gray-700 font-medium">Admin:</span>
                  <code className="text-gray-900 font-mono">admin@bookstore.com / admin123</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}