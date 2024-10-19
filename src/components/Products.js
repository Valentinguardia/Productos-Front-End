import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'; 
import Modal from "@/commons/Modal";
import Navbar from "@/commons/Navbar";
import { getProductsData, updateProduct, deleteProduct } from "@/services/productsData"; 
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

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct.id, updatedProduct); 
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setSelectedProduct(updatedProduct); 
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      setSelectedProduct(null); 
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
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
        <Modal  
          product={selectedProduct} 
          onUpdate={handleUpdateProduct} 
          onDelete={handleDeleteProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
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
