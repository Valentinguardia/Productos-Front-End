import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProductsData = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`, 
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error.response?.data?.message || error.message);
    return null;
  }
};
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`, 
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles del producto:", error.response?.data?.message || error.message);
    throw error;
  }
};
export const createProduct = async (productData) => {
  console.log("SERVICE",productData);
  try {
    const response = await axios.post(`${API_URL}/products/`, productData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error.response?.data?.message || error.message);
    throw error;
  }
};
export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${productId}`, productData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto:", error.response?.data?.message || error.message);
    throw error;
  }
};
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${productId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error.response?.data?.message || error.message);
    throw error;
  }
};
