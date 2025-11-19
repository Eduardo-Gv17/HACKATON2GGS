// src/components/common/Input.tsx

import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) => {
  const inputId = id || props.name;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 text-left"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600 text-left">{error}</p>}
    </div>
  );
};
