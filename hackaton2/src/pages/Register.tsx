// src/pages/Register.tsx

import { Link } from "react-router-dom";
// Nota: Asume que crearás el componente RegisterForm.tsx en src/components/auth/

export const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Registrar Cuenta
        </h2>

        {/* Placeholder: Aquí iría el componente RegisterForm.tsx */}
        <div className="py-8 border border-dashed border-gray-300 text-center text-sm text-gray-500">
          Formulario de Registro
        </div>

        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 font-medium ml-1"
          >
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
