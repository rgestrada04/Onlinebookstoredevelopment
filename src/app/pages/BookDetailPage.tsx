import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, ShoppingCart, Package } from "lucide-react";
import { books } from "@/app/data/books";
import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";

export function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    addToCart(book);
    toast.success(`Added "${book.title}" to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Book Image */}
        <div>
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Book Details */}
        <div>
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
              {book.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

          <div className="mb-6">
            <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">${book.price.toFixed(2)}</span>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>

          <div className="mb-6 flex items-center space-x-2">
            <Package className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">
              {book.stock > 0 ? (
                <>
                  <span className="text-green-600 font-semibold">In Stock</span>
                  {book.stock < 10 && ` - Only ${book.stock} left!`}
                </>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={book.stock === 0}
            className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors ${
              book.stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{book.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
          </button>

          {book.stock > 0 && (
            <p className="text-sm text-gray-500 mt-4 text-center">
              Free shipping on orders over $50
            </p>
          )}
        </div>
      </div>

      {/* Related Books Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">More from {book.category}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {books
            .filter((b) => b.category === book.category && b.id !== book.id)
            .slice(0, 4)
            .map((relatedBook) => (
              <Link
                key={relatedBook.id}
                to={`/book/${relatedBook.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={relatedBook.coverImage}
                    alt={relatedBook.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 line-clamp-2">
                      {relatedBook.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">{relatedBook.author}</p>
                    <p className="text-sm font-bold text-gray-900 mt-2">
                      ${relatedBook.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
