"use client";
import { useState, useEffect } from "react";
import Modal from "@/commons/Modal";
import Navbar from "@/commons/Navbar";
import { getProductsData } from "@/services/productsData";
import { getAllBrands } from "@/services/brandsData";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

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

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  console.log(brands)

  return (
    <div className="mt-[95px] mb-[30px]">
      <Navbar brands={brands} />
      <h1 className="text-2xl font-bold mb-[50px] text-center">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-19 justify-items-center">
        {currentProducts.map((product) => {
          const productBrand = brands.find(
            (brand) => brand.id === product.brandId
          );

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
              <p>{productBrand.name}</p>
            </div>
          );
        })}
      </div>

      {selectedProduct && (
        <Modal onClose={() => setSelectedProduct(null)}>
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
              {
                brands.find((brand) => brand.id === selectedProduct.brandId)
                  ?.name
              }
            </span>
          </p>
        </Modal>
      )}

      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map(
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

// "use client"
// import { useState, useEffect } from 'react';
// import Modal from '@/commons/Modal';
// import Navbar from '@/commons/Navbar';
// import { getProductsData } from '@/services/productsData';
// import { getAllBrands } from '@/services/brandsData';

// const Products = () => {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20;

//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     const data = await getProductsData();
//   //     if (data) {
//   //       setProducts(data);
//   //     }
//   //   };
//   //   fetchProducts();
//   // }, []);
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

//   const indexOfLastProduct = currentPage * itemsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <div className="mt-[95px] mb-[30px]">
//      <Navbar brands={brands}/>
//       <h1 className="text-2xl font-bold mb-[50px] text-center">Productos</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-19 justify-items-center">
//         {currentProducts.map((product) => (
//           <div
//             key={product.id}
//             className="border p-4 rounded-lg cursor-pointer h-[280px] w-[230px]"
//             onClick={() => setSelectedProduct(product)}
//           >
//             <img src={product.image_url} alt={product.name} className="h-40 w-full object-cover" />
//             <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
//             <p>${product.price}</p>
//             <p>${product.brandId}</p>
//           </div>
//         ))}
//       </div>

//       {selectedProduct && (
//         <Modal onClose={() => setSelectedProduct(null)}>
//            <div className="h-56 w-full bg-gray-200 rounded-lg mb-4 mt-4">  <img
//         src={selectedProduct.image_url}

//         className="h-full w-full object-cover rounded-lg"
//       /></div>
//           <h2>{selectedProduct.name}</h2>
//           <p>{selectedProduct.description}</p>
//           <p>${selectedProduct.price}</p>
//         </Modal>
//       )}

//       <div className="flex justify-center mt-4">
//         {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map((num) => (
//           <button
//             key={num}
//             className={`mx-2 px-4 py-2 border ${currentPage === num + 1 ? 'bg-gray-300' : 'bg-white'}`}
//             onClick={() => handlePageChange(num + 1)}
//           >
//             {num + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;
