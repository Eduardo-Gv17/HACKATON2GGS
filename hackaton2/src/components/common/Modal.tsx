// src/components/common/Modal.tsx

import { type ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Manejar cierre con la tecla ESC
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  // Manejar el clic fuera del contenido del modal
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    // Overlay: Oscurece el fondo
    <div
      ref={modalRef}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={handleOverlayClick}
    >
      {/* Contenedor del Modal */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto transform transition-transform duration-300 scale-100 max-h-[90vh] overflow-y-auto">
        {/* Encabezado del Modal */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Contenido del Modal (Aquí se inyectan los formularios) */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
