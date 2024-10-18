"use client"
const Modal = ({ children, onClose }) => {
  // return (
  //   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  //     <div className="bg-white p-4 rounded-lg">
  //       <button onClick={onClose} className="text-red-500">Cerrar</button>
  //       {children}
  //     </div>
  //   </div>
  // );
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="border p-4 rounded-lg bg-white w-[90%] max-w-[400px] h-[80%] max-h-[450px]">
        <button
          onClick={onClose}
          className="top-2 right-2 text-red-500 hover:text-red-700"
        >
          Cerrar
        </button>
        {/* <div className="h-56 w-full bg-gray-200 rounded-lg mb-4 mt-4"></div>  */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
