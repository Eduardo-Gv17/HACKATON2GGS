// src/components/common/Card.tsx

import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

/**
 * Componente genérico para crear tarjetas con estilos base de Tailwind.
 */
export const Card = ({ children, className = "", ...props }: CardProps) => {
  const baseStyles =
    "bg-white shadow-lg rounded-lg p-6 transition duration-300";

  return (
    <div className={`${baseStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
