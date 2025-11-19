// src/pages/Register.tsx
import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

export const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TechFlow</h1>
          <p className="text-gray-600">Crea tu cuenta gratis</p>
        </div>

        {/* Card de Registro */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Registrar Cuenta
          </h2>
          <RegisterForm />

          {/* Link a Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="font-semibold text-purple-600 hover:text-purple-800 transition-colors"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Beneficios */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-1">📊</div>
            <p className="text-xs text-gray-600">Dashboard en tiempo real</p>
          </div>
          <div>
            <div className="text-2xl mb-1">👥</div>
            <p className="text-xs text-gray-600">Colaboración en equipo</p>
          </div>
          <div>
            <div className="text-2xl mb-1">✅</div>
            <p className="text-xs text-gray-600">Gestión de tareas</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          © 2025 TechFlow. Hackathon #2 - CS2031
        </p>
      </div>
    </div>
  );
};
