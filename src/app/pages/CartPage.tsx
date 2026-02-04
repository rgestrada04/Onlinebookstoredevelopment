import { Link, useNavigate } from "react-router";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/app/contexts/CartContext";

export function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-8">
            <ShoppingBag className="w-16 h-16 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 text-lg mb-10">Add some books to get started!</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-200 font-semibold hover:scale-105"
          >
            <span>Browse Books</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-3 mb-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <ShoppingBag className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.book.id}
              className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200"
            >
              <img
                src={item.book.coverImage}
                alt={item.book.title}
                className="w-24 h-32 object-cover rounded-xl shadow-md"
              />
              <div className="flex-1">
                <Link
                  to={`/book/${item.book.id}`}
                  className="font-bold text-gray-900 hover:text-blue-600 text-lg transition-colors"
                >
                  {item.book.title}
                </Link>
                <p className="text-sm text-gray-600 mt-1 font-medium">{item.book.author}</p>
                <div className="flex items-center space-x-2 mt-3">
                  <span className="text-sm text-gray-500">Price:</span>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${item.book.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-4">
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
                  <button
                    onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                    className="p-2 rounded-lg hover:bg-white transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                    disabled={item.quantity >= item.book.stock}
                    className="p-2 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    ${(item.book.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.book.id)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 mt-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Tax (10%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              {subtotal < 50 && shipping > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <p className="text-sm text-blue-900">
                    💡 Add <span className="font-bold">${(50 - subtotal).toFixed(2)}</span> more for free shipping!
                  </p>
                </div>
              )}
              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="font-bold text-xl text-gray-900">Total</span>
                  <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-2xl transition-all duration-200 font-semibold text-lg hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link
              to="/"
              className="block text-center text-blue-600 hover:text-blue-700 mt-4 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
