import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    // Admin credentials: admin@bookstore.com / admin123
    // User credentials: user@bookstore.com / user123
    if (email === "admin@bookstore.com" && password === "admin123") {
      const adminUser = {
        id: "admin-1",
        name: "Admin User",
        email: "admin@bookstore.com",
        role: "admin" as const,
      };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return true;
    } else if (email === "user@bookstore.com" && password === "user123") {
      const regularUser = {
        id: "user-1",
        name: "John Doe",
        email: "user@bookstore.com",
        role: "user" as const,
      };
      setUser(regularUser);
      localStorage.setItem("user", JSON.stringify(regularUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration - in real app, this would call an API
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: "user" as const,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
