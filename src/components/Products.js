// "use client";
// import { useState, useEffect } from "react";
// import { useSearchParams } from 'next/navigation'; 
// import Modal from "@/commons/Modal";
// import Navbar from "@/commons/Navbar";
// import { getProductsData } from "@/services/productsData";
// import { getAllBrands } from "@/services/brandsData";

// const Products = () => {
//   const searchParams = useSearchParams();
//   const brandId = searchParams.get('brandId'); 
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]); 
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const data = await getProductsData();
//       if (data) {
//         setProducts(data);
//       }
//     };

//     const fetchBrands = async () => {
//       const data = await getAllBrands();
//       if (data) {
//         setBrands(data);
//       }
//     };

//     fetchProducts();
//     fetchBrands();
//   }, []);

//   useEffect(() => {
//     if (brandId) {
//       const filtered = products.filter(product => product.brandId === parseInt(brandId));
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts(products);
//     }
//   }, [brandId, products]);


//   const indexOfLastProduct = currentPage * itemsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct); 

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <div className="mt-[95px] mb-[30px]">
//       <Navbar brands={brands} />
//       <h1 className="text-2xl font-bold mb-[50px] text-center">Productos</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-19 justify-items-center">
//         {currentProducts.map((product) => {
//           const productBrand = brands.find((brand) => brand.id === product.brandId);

//           if (!productBrand) {
//             console.warn(`No se encontró marca para el producto con ID: ${product.id}`);  
//           }

//           return (
//             <div
//               key={product.id}
//               className="border p-4 rounded-lg cursor-pointer h-[340px] w-[250px]"
//               onClick={() => setSelectedProduct(product)}
//             >
//               <img
//                 src={product.image_url}
//                 alt={product.name}
//                 className="h-40 w-full object-cover"
//               />
//               <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
//               <p>${product.price}</p>
//               <p>{productBrand ? productBrand.name : "Marca no encontrada"}</p> 
//             </div>
//           );
//         })}
//       </div>

//       {selectedProduct && (
//         <Modal onClose={() => setSelectedProduct(null)}>
//           <div className="h-56 w-full bg-gray-200 rounded-lg mb-4 mt-4">
//             <img
//               src={selectedProduct.image_url}
//               className="h-full w-full object-cover rounded-lg"
//             />
//           </div>
//           <p>${selectedProduct.price}</p>
//           <h2 className="font-semibold">{selectedProduct.name}</h2>
//           <p>
//             {selectedProduct.description}{" "}
//             <span className="font-semibold">
//               {
//                 brands.find((brand) => brand.id === selectedProduct.brandId)?.name ||
//                 "Marca no encontrada"
//               }
//             </span>
//           </p>
//         </Modal>
//       )}

//       <div className="flex justify-center mt-4">
//         {[...Array(Math.ceil(filteredProducts.length / itemsPerPage)).keys()].map(
//           (num) => (
//             <button
//               key={num}
//               className={`mx-2 px-4 py-2 border ${
//                 currentPage === num + 1 ? "bg-gray-300" : "bg-white"
//               }`}
//               onClick={() => handlePageChange(num + 1)}
//             >
//               {num + 1}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;

"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'; 
import Modal from "@/commons/Modal";
import Navbar from "@/commons/Navbar";
import { getProductsData, updateProduct } from "@/services/productsData"; // Importamos la función para actualizar el producto
import { getAllBrands } from "@/services/brandsData";

const Products = () => {
  const searchParams = useSearchParams();
  const brandId = searchParams.get('brandId'); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [isEditing, setIsEditing] = useState(false); // Estado para el modo de edición

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsData();
      if (data) {
        setProducts(data);
      }
    };

    const fetchBrands = async () => {
      const data = await getAllBrands();
      if (data) {
        setBrands(data);
      }
    };

    fetchProducts();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (brandId) {
      const filtered = products.filter(product => product.brandId === parseInt(brandId));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [brandId, products]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct); 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Alternar entre el modo de visualización y edición
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct.id, updatedProduct); 
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setSelectedProduct(updatedProduct);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <div className="mt-[95px] mb-[30px]">
      <Navbar brands={brands} />
      <h1 className="text-2xl font-bold mb-[50px] text-center">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-19 justify-items-center">
        {currentProducts.map((product) => {
          const productBrand = brands.find((brand) => brand.id === product.brandId);

          if (!productBrand) {
            console.warn(`No se encontró marca para el producto con ID: ${product.id}`);  
          }

          return (
            <div
              key={product.id}
              className="border p-4 rounded-lg cursor-pointer h-[340px] w-[250px]"
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="h-40 w-full object-cover"
              />
              <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
              <p>${product.price}</p>
              <p>{productBrand ? productBrand.name : "Marca no encontrada"}</p> 
            </div>
          );
        })}
      </div>

      {selectedProduct && (
        <Modal  product={selectedProduct} onUpdate={handleUpdateProduct} onClose={() => setSelectedProduct(null)}>
          {!isEditing ? (
            <>
              <div className="h-56 w-full bg-gray-200 rounded-lg mb-4 mt-4">
                <img
                  src={selectedProduct.image_url}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <p>${selectedProduct.price}</p>
              <h2 className="font-semibold">{selectedProduct.name}</h2>
              <p>
                {selectedProduct.description}{" "}
                <span className="font-semibold">
                  {brands.find((brand) => brand.id === selectedProduct.brandId)?.name ||
                  "Marca no encontrada"}
                </span>
              </p>
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
                  value={selectedProduct.image_url}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      image_url: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <input
                type="text"
                name="price"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, price: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="name"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, name: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                name="description"
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, description: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              />
              <button
                onClick={() => handleUpdateProduct(selectedProduct)}
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
        </Modal>
      )}

      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(filteredProducts.length / itemsPerPage)).keys()].map(
          (num) => (
            <button
              key={num}
              className={`mx-2 px-4 py-2 border ${
                currentPage === num + 1 ? "bg-gray-300" : "bg-white"
              }`}
              onClick={() => handlePageChange(num + 1)}
            >
              {num + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Products;
