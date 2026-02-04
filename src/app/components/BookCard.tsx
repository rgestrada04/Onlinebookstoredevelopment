import { Link } from "react-router";
import { ShoppingCart, Star } from "lucide-react";
import { Book } from "@/app/data/books";
import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart(book);
    toast.success(`Added "${book.title}" to cart`);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2">
      <Link to={`/book/${book.id}`} className="block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center space-x-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>4.5</span>
          </span>
        </div>
      </Link>
      <div className="p-5">
        <div className="mb-3">
          <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
            {book.category}
          </span>
        </div>
        <Link to={`/book/${book.id}`}>
          <h3 className="font-bold text-gray-900 mb-2 hover:text-blue-600 line-clamp-2 text-lg transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-4 font-medium">{book.author}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${book.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-110"
            title="Add to cart"
          >
            <ShoppingCart className="w-5 h-5 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
          </button>
        </div>
        {book.stock < 10 && (
          <div className="mt-3 flex items-center space-x-1.5 text-xs">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            <span className="text-orange-600 font-medium">
              Only {book.stock} left in stock!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}