import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Package, BookOpen, Users, TrendingUp, Plus, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { books as initialBooks, categories, Book } from "@/app/data/books";
import { toast } from "sonner";

interface Order {
  id: string;
  items: Array<{
    bookId: string;
    title: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  date: string;
  status: string;
}

export function AdminDashboardPage() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "books" | "orders">("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, [isAdmin, navigate]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order status updated");
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalBooks = books.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your bookstore</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-medium ${
              activeTab === "overview"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <TrendingUp className="w-5 h-5 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("books")}
            className={`px-6 py-3 font-medium ${
              activeTab === "books"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <BookOpen className="w-5 h-5 inline mr-2" />
            Books
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 font-medium ${
              activeTab === "orders"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Package className="w-5 h-5 inline mr-2" />
            Orders
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{totalOrders}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Books</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{totalBooks}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Books Tab */}
      {activeTab === "books" && (
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Manage Books</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Book</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{book.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{book.author}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{book.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">${book.price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{book.stock}</td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => setEditingBook(book)}
                          className="text-blue-600 hover:text-blue-700 mr-3"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Management</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.items.length} items • ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <div className="text-sm text-gray-600">
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      • {item.title} × {item.quantity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
