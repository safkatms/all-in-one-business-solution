import React, { useEffect } from "react";

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onClose }) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).classList.contains('bg-opacity-75')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <p className="text-lg text-green-600">{message}</p>
      </div>
    </div>
  );
};

export default SuccessMessage;
