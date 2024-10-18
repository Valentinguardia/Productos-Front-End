"use client";
import React, { useState } from "react";
import { createProduct } from "@/services/productsData";
import { createBrand } from "@/services/brandsData";

const CreateItemModal = ({ onClose, brands }) => {
  const [itemType, setItemType] = useState("Producto");
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const newItem = {
    //   name: itemType === "Producto" ? productName : selectedBrand,
    //   price: itemType === "Producto" ? price : undefined,
    //   description: itemType === "Producto" ? description : undefined,
    //   image_url: itemType === "Producto" ? imageUrl : undefined,
    //   brandId: selectedBrand,
    //   logo_url: itemType === "Marca" ? logoUrl : undefined,
    // };
    const newItem = {
      // name: itemType === "Producto" ? productName : selectedBrand?.name, 
      name: itemType === "Producto" ? productName : brandName, 
      price: itemType === "Producto" ? price : undefined,
      description: itemType === "Producto" ? description : undefined,
      image_url: itemType === "Producto" ? imageUrl : undefined,
      brandId: itemType === "Producto" ? selectedBrand?.id : undefined, 
      logo_url: itemType === "Marca" ? logoUrl : undefined,
    };
  
    try {
      if (itemType === "Producto") {
        await createProduct(newItem);
        location.reload()
      } else {
        await createBrand(newItem);
        location.reload()
      }
      setProductName("");
      setProductName("")
      setPrice("");
      setDescription("");
      setImageUrl("");
      setSelectedBrand(null);
      setLogoUrl("");
      onClose();
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-lg font-bold">Crear {itemType}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="itemType">Selecciona Tipo:</label>
            <select
              id="itemType"
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              className="block w-full mb-4 "
            >
              <option value="Producto">Producto</option>
              <option value="Marca">Marca</option>
            </select>
          </div>

          <div className="mt-4">
            {itemType === "Producto" && (
              <>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  className="block w-full mb-4 pl-1"
                  maxLength={25}
                />
                <input
                  type="number"
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="block w-full mb-4 pl-1"
                />
                <textarea
                  placeholder="Descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full mb-4 pl-1"
                  maxLength={25}
                />
                <input
                  type="text"
                  placeholder="URL de Imagen"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="block w-full mb-4 pl-1"
                />
   <select
                  value={selectedBrand ? selectedBrand.id : ""}
                  onChange={(e) => {
                    const selected = brands.find(
                      (brand) => brand.id === parseInt(e.target.value)
                    );
                    setSelectedBrand(selected || null);
                  }}
                  className="block w-full mb-4 pl-1"
                >
                  <option value="">Selecciona Marca</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            {itemType === "Marca" && (
              <>
                <input
                  type="text"
                  placeholder="Nombre de Marca"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  required
                  className="block w-full mb-4 pl-1"
                />
                <input
                  type="text"
                  placeholder="URL del Logo"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  required
                  className="block w-full mb-2 pl-1"
                />
              </>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <button type="submit" className="mr-auto">
              Crear
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto text-red-500"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItemModal;

// import React, { useState } from "react";
// import { createProduct } from "@/services/productsData";
// import { createBrand } from "@/services/brandsData";

// const CreateItemModal = ({ onClose, brands }) => {
//   const [itemType, setItemType] = useState("Producto");
//   const [productName, setProductName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   const [logoUrl, setLogoUrl] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newItem = {
//       name: itemType === "Producto" ? productName : selectedBrand?.name,
//       price: itemType === "Producto" ? price : undefined,
//       description: itemType === "Producto" ? description : undefined,
//       brandId: itemType === "Producto" ? selectedBrand?.id : undefined,
//       logo_url: itemType === "Marca" ? logoUrl : undefined,
//     };

//     try {
//       if (itemType === "Producto") {
//         await createProduct(newItem);
//       } else {
//         await createBrand(newItem);
//       }
//       setProductName("");
//       setPrice("");
//       setDescription("");
//       setImageUrl("");
//       setSelectedBrand(null);
//       setLogoUrl("");
//       onClose();
//     } catch (error) {
//       console.error('Error al enviar datos:', error);
//     }
//   };

//   console.log(selectedBrand); // Para depuración

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-4 rounded w-96">
//         <h2 className="text-lg font-bold">Crear {itemType}</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="itemType">Selecciona Tipo:</label>
//             <select
//               id="itemType"
//               value={itemType}
//               onChange={(e) => setItemType(e.target.value)}
//               className="block w-full mb-4"
//             >
//               <option value="Producto">Producto</option>
//               <option value="Marca">Marca</option>
//             </select>
//           </div>

//           <div className="mt-4">
//             {itemType === "Producto" && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Nombre"
//                   value={productName}
//                   onChange={(e) => setProductName(e.target.value)}
//                   required
//                   className="block w-full mb-4 pl-1"
//                   maxLength={25}
//                 />
//                 <input
//                   type="number"
//                   placeholder="Precio"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   required
//                   className="block w-full mb-4 pl-1"
//                 />
//                 <textarea
//                   placeholder="Descripción"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="block w-full mb-4 pl-1"
//                   maxLength={25}
//                 />
//                 <input
//                   type="text"
//                   placeholder="URL de Imagen"
//                   value={imageUrl}
//                   onChange={(e) => setImageUrl(e.target.value)}
//                   className="block w-full mb-4 pl-1"
//                 />
//                 <select
//                   value={selectedBrand ? selectedBrand.id : ""}
//                   onChange={(e) => {
//                     const selectedId = e.target.value;
//                     const selected = brands.find(brand => brand.id === Number(selectedId)); // Convertir a número
//                     setSelectedBrand(selected || null);
//                   }}
//                   className="block w-full mb-4 pl-1"
//                 >
//                   <option value="">Selecciona Marca</option>
//                   {brands.map((brand) => (
//                     <option key={brand.id} value={brand.id}>
//                       {brand.name}
//                     </option>
//                   ))}
//                 </select>
//               </>
//             )}

//             {itemType === "Marca" && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Nombre de Marca"
//                   required
//                   className="block w-full mb-4 pl-1"
//                 />
//                 <input
//                   type="text"
//                   placeholder="URL del Logo"
//                   value={logoUrl}
//                   onChange={(e) => setLogoUrl(e.target.value)}
//                   required
//                   className="block w-full mb-2 pl-1"
//                 />
//               </>
//             )}
//           </div>
//           <div className="flex justify-between mt-4">
//             <button type="submit" className="mr-auto">Crear</button>
//             <button type="button" onClick={onClose} className="ml-auto text-red-500">Cerrar</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateItemModal;
