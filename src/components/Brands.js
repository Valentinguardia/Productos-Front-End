"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getAllBrands, deleteBrand } from "@/services/brandsData"; 

const Brands = () => {
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getAllBrands();
      if (data) {
        setBrands(data);
      }
    };

    fetchBrands();
  }, []);

  const indexOfLastBrand = currentPage * itemsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - itemsPerPage;
  const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleBrandClick = (brandId) => {
    router.push(`/?brandId=${brandId}`);
  };

  const handleDeleteBrand = async (brandId) => {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar esta marca?");
    if (confirmed) {
      try {
        const response = await deleteBrand(brandId);
        setBrands(brands.filter(brand => brand.id !== brandId));
        alert(response.message); 
      } catch (error) {
        alert(error.response?.data?.message || "Error al eliminar la marca.");
      }
    }
  };
  

  return (
    <div className="mt-[95px] mb-[30px]">
      <h1 className="text-2xl font-bold mb-[50px] text-center">Marcas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-19 justify-items-center">
        {currentBrands.map((brand) => (
          <div
            key={brand.id}
            className="cursor-pointer flex flex-col items-center justify-center text-center w-[250px] h-[300px] transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={brand.logo_url}
              alt={brand.name}
              className="h-40 w-40 object-contain mb-4"
              onClick={() => handleBrandClick(brand.id)}
            />
            <h2 className="text-lg font-semibold"  onClick={() => handleBrandClick(brand.id)}>{brand.name}</h2>
            {user.isLoggedIn && (
              <button
                onClick={() => handleDeleteBrand(brand.id)}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(brands.length / itemsPerPage)).keys()].map(
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

export default Brands;
