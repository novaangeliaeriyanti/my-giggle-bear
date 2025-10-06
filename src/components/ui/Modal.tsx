"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 lg:p-12 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 lg:top-12 lg:right-12 text-gray-500 hover:text-pink-400"
        >
          <X className="w-6 h-6" />
        </button>

        {title && (
          <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-4">
            {title}
          </h3>
        )}
        <div className="text-gray-600 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
