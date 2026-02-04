import { Outlet } from "react-router";
import { Header } from "@/app/components/Header";

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}