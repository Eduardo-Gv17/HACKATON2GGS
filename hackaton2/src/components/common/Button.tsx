// src/components/common/Button.tsx

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  let baseStyles =
    "px-4 py-2 font-semibold rounded-lg transition duration-150 ease-in-out ";

  switch (variant) {
    case "primary":
      // Estilos para el botón principal (indigo)
      baseStyles +=
        "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50";
      break;
    case "secondary":
      // Estilos para el botón secundario (gris claro)
      baseStyles +=
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50";
      break;
    case "danger":
      // Estilos para el botón de peligro (rojo)
      baseStyles +=
        "bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50";
      break;
  }

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};
