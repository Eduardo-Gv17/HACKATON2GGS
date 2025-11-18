// src/context/AuthContext.tsx
import {
  createContext,
  useState,
  useEffect,
  useContext, // <-- Importamos el tipo para 'children'
} from "react";

import api from "../services/api";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// 1. DEFINIMOS LOS TIPOS
// Tipo para los datos del usuario (basado en la respuesta de tu API)
interface User {
  id: number;
  username: string;
  email: string;
}

// Tipo para el valor que proveerá nuestro contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
}

// Tipo para las props del Proveedor (solo acepta 'children')
interface AuthProviderProps {
  children: ReactNode;
}

// 2. Creamos el contexto con su TIPO
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// 3. Creamos el Proveedor (tipando las props)
export function AuthProvider({ children }: AuthProviderProps) {
  // 4. Tipamos nuestro estado 'user'
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    // Tipamos la respuesta esperada de la API
    api
      .get<{ user: User }>("/auth/profile") //
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error("Token inválido, haciendo logout:", error);
        localStorage.removeItem("token");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 5. FUNCIÓN DE LOGIN (con parámetros tipados)
  const login = async (username: string, password: string) => {
    try {
      // Tipamos la respuesta esperada del login
      const response = await api.post<{ token: string; user: User }>(
        "/auth/login",
        { username, password }
      ); //

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error: any) {
      // Usamos 'any' para capturar errores de axios
      console.error("Error en el login:", error);
      alert("Error: " + error.response?.data?.error || "Error desconocido");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // 6. FUNCIÓN DE REGISTRO (con parámetros tipados)
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await api.post<{ token: string; user: User }>(
        "/auth/register",
        { username, email, password }
      ); //

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error en el registro:", error);
      alert("Error: " + error.response?.data?.error || "Error desconocido");
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 7. Hook personalizado (con manejo de error si se usa fuera del proveedor)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
