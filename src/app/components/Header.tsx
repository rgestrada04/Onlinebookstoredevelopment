import { Link, useNavigate } from "react-router";
import { ShoppingCart, User, LogOut, LayoutDashboard, Sparkles } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useCart } from "@/app/contexts/CartContext";

export function Header() {
  const { user, logout, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BookStore
            </span>
          </Link>

          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium relative group"
            >
              <span>Browse</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {user ? (
              <>
                <Link
                  to="/cart"
                  className="relative text-gray-700 hover:text-blue-600 transition-all duration-200"
                >
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg animate-pulse">
                        {getTotalItems()}
                      </span>
                    )}
                  </div>
                </Link>

                <Link
                  to="/orders"
                  className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium relative group"
                >
                  <span>Orders</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="font-medium">Admin</span>
                  </Link>
                )}

                <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}