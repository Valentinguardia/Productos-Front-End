// "use client"
// const Modal = ({ children, onClose }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="border p-4 rounded-lg bg-white w-[90%] max-w-[400px] h-[80%] max-h-[450px]">
//         <button
//           onClick={onClose}
//           className="top-2 right-2 text-red-500 hover:text-red-700"
//         >
//           Cerrar
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;

"use client";
import { useState } from "react";
import { updateProduct } from "@/services/productsData"; // Importa tu servicio para actualizar

const Modal = ({ product, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Alternar entre visualización y edición
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProduct(product.id, updatedProduct); // Llama a la API para actualizar
      onUpdate(updatedProduct); // Actualiza la información en el componente padre
      setIsEditing(false); // Sal del modo de edición
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="border p-4 rounded-lg bg-white w-[90%] max-w-[400px] h-[80%] max-h-[450px]">
        <button
          onClick={onClose}
          className="top-2 right-2 text-red-500 hover:text-red-700"
        >
          Cerrar
        </button>

        {!isEditing ? (
          <>
            <div className="h-56 w-full bg-gray-200 rounded-lg mb-4 mt-4">
              <img src={product.image_url} className="h-full w-full object-cover rounded-lg" />
            </div>
            <p>${product.price}</p>
            <h2 className="font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <button
              onClick={handleEditToggle}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Editar
            </button>
          </>
        ) : (
          <>
            <div className="h-56 w-full bg-gray-200 rounded-lg mb-4 mt-4">
              <input
                type="text"
                name="image_url"
                value={updatedProduct.image_url}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <input
              type="text"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              className="w-full p-1 border rounded mb-2"
            />
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              name="description"
              value={updatedProduct.description}
              onChange={handleChange}
              className="w-full h-5p-2 border rounded mb-2"
            />
            <button
              onClick={handleSave}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Guardar
            </button>
            <button
              onClick={handleEditToggle}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;

