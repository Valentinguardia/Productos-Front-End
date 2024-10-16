import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error.response?.data || "Error en el servidor";
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {email, password}, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error.response?.data || "Error en el servidor";
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/users/logout`, {}, {withCredentials: true});
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error.response?.data || "Error en el servidor";
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/me`, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error.response?.data || "Error en el servidor";
  }
};
