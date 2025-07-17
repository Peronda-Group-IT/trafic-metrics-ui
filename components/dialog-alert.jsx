"use client"; // Required for useState and event handlers

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './ui/button';

// Define default props or use PropTypes if needed for validation in JS
// For simplicity, we'll rely on usage context here.
// JSDoc can be used for documentation:
/**
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - The element(s) that will trigger the dialog opening
 * @param {string} props.title - Title text for the dialog header
 * @param {string} props.description - Descriptive text for the dialog body
 * @param {string} props.buttonText - Text for the confirmation button
 * @param {() => void} props.onConfirm - Function to call when the confirmation button is clicked
 */
export default function NativeDialogAlert({
  children,
  title,
  description,
  buttonText,
  onConfirm,
  extraActions
}) {
  // State to manage whether the dialog is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the dialog
  const handleOpen = () => setIsOpen(true);

  // Function to close the dialog
  const handleClose = () => setIsOpen(false);

  // Function to handle confirmation: calls the passed function and then closes
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      {/* Trigger Element: Wrap the children in a clickable element */}
      <div onClick={handleOpen} className="inline-block cursor-pointer w-full">
        {children}
      </div>

      {/* Render the dialog only if isOpen is true */}
      {isOpen && typeof window === 'object' && createPortal(
        <div className="fixed inset-0 z-[9998]">
          <div 
            className="absolute inset-0 bg-black/60"
            onClick={handleClose}
          />
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-fit animate-scale-in pointer-events-auto">
              {/* Header Section */}
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {title}
                </h2>
              </div>

              {/* Body Section */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              </div>

              {/* Footer Section - Action Buttons */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                {/* Close Button (Footer) */}
                <Button
                  type="button"
                  onClick={handleClose}
                  variant="outline"
                >
                  Cerrar
                </Button>
                {/* Confirmation Button (Footer) */}
                <Button
                  type="button"
                  onClick={handleConfirm}
                  variant="default"
                >
                  {buttonText}
                </Button>
                {(extraActions.map((action) => action) )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Simple CSS Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.2s ease-out forwards; }
      `}</style>
    </>
  );
}