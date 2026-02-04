import { useState, useEffect } from "react";
import { Package, Clock, CheckCircle, Truck } from "lucide-react";

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

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders).reverse()); // Show newest first
    }
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "Shipped":
        return <Truck className="w-5 h-5 text-blue-500" />;
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Package className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900">Order {order.id}</h3>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="border-t border-b py-4 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between py-2">
                  <span className="text-gray-700">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="text-gray-900 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
              </div>
            </div>

            {order.status === "Shipped" && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Tracking:</strong> Your order is on its way! Expected delivery in 3-5 business days.
                </p>
              </div>
            )}

            {order.status === "Delivered" && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-900">
                  <strong>Delivered:</strong> Your order has been delivered. Thank you for shopping with us!
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
