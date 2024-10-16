"use client"
const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <button onClick={onClose} className="text-red-500">Cerrar</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
