"use client";

import RegisterForm from '@/app/components/RegisterForm';
import { useState } from 'react';

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white p-2 rounded">
        Ouvrir le formulaire
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsOpen(false)}></div>
          <div className="bg-white p-6 rounded-lg shadow-xl relative z-50">
            {children}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <RegisterForm />
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;