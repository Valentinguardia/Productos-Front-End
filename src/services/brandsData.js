import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllBrands = async () => {
  try {
    const response = await axios.get(`${API_URL}/brands`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las marcas:", error.response?.data?.message || error.message);
    return null;
  }
};
export const getBrandById = async (brandId) => {
  try {
    const response = await axios.get(`${API_URL}/brands/${brandId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles de la marca:", error.response?.data?.message || error.message);
    throw error;
  }
};
export const createBrand = async (brandData) => {
  try {
    const response = await axios.post(`${API_URL}/brands`, brandData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la marca:", error.response?.data?.message || error.message);
    throw error;
  }
};
export const updateBrand = async (brandId, brandData) => {
  try {
    const response = await axios.put(`${API_URL}/brands/${brandId}`, brandData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la marca:", error.response?.data?.message || error.message);
    throw error;
  }
};
export const deleteBrand = async (brandId) => {
  try {
    const response = await axios.delete(`${API_URL}/brands/${brandId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la marca:", error.response?.data?.message || error.message);
    throw error;
  }
};
