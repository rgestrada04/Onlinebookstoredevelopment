import { createBrowserRouter } from "react-router";
import { Layout } from "@/app/components/Layout";
import { HomePage } from "@/app/pages/HomePage";
import { LoginPage } from "@/app/pages/LoginPage";
import { RegisterPage } from "@/app/pages/RegisterPage";
import { BookDetailPage } from "@/app/pages/BookDetailPage";
import { CartPage } from "@/app/pages/CartPage";
import { CheckoutPage } from "@/app/pages/CheckoutPage";
import { OrdersPage } from "@/app/pages/OrdersPage";
import { AdminDashboardPage } from "@/app/pages/AdminDashboardPage";
import { NotFoundPage } from "@/app/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "book/:id", Component: BookDetailPage },
      { path: "cart", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "orders", Component: OrdersPage },
      { path: "admin", Component: AdminDashboardPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
