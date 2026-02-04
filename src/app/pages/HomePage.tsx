import { useState } from "react";
import { Link } from "react-router";
import { Search, TrendingUp, Sparkles } from "lucide-react";
import { books, categories } from "@/app/data/books";
import { BookCard } from "@/app/components/BookCard";

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-12 md:p-16 mb-12 shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            <span className="text-yellow-300 font-semibold text-sm tracking-wide uppercase">Featured Collection</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Discover Your Next<br />Great Read
          </h1>
          <p className="text-2xl text-blue-100 mb-8 max-w-2xl">
            Browse thousands of books across all genres
          </p>
          <div className="relative max-w-2xl">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-6 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-2xl text-gray-900 bg-white shadow-2xl focus:ring-4 focus:ring-white/50 focus:outline-none text-lg placeholder:text-gray-400 transition-all"
              />
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Category Filter */}
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              selectedCategory === "All"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg hover:scale-105"
            }`}
          >
            All Books
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg hover:scale-105"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-8">
        <p className="text-gray-600 font-medium text-lg">
          Showing <span className="text-blue-600 font-bold">{filteredBooks.length}</span> {filteredBooks.length === 1 ? "book" : "books"}
        </p>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-6">
            <Search className="w-12 h-12 text-blue-600" />
          </div>
          <p className="text-gray-500 text-xl mb-6">No books found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium hover:scale-105"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}