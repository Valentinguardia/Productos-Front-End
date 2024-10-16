"use client"
import { useState, useEffect } from 'react';
import Modal from '@/commons/Modal';
import Navbar from '@/commons/Navbar';
import { getProductsData } from '@/services/productsData';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsData();
      if (data) {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);
  console.log(products)

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="mt-[95px] mb-[30px]">
     <Navbar/> 
      <h1 className="text-2xl font-bold mb-[50px] text-center">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mx-20 justify-items-center">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg cursor-pointer h-[280px] w-[230px]"
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image_url} alt={product.name} className="h-40 w-full object-cover" />
            <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <Modal onClose={() => setSelectedProduct(null)}>
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <p>{selectedProduct.price} Pesos argentinos</p>
        </Modal>
      )}
      
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map((num) => (
          <button
            key={num}
            className={`mx-2 px-4 py-2 border ${currentPage === num + 1 ? 'bg-gray-300' : 'bg-white'}`}
            onClick={() => handlePageChange(num + 1)}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;


