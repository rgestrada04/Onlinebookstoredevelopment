import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "@/app/contexts/AuthContext";
import { CartProvider } from "@/app/contexts/CartContext";
import { router } from "@/app/routes";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </CartProvider>
    </AuthProvider>
  );
}