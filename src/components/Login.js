"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/userData";
import { useSelector } from "react-redux";

const Login = () => {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user && user.isLogged) {
      router.push("/");
    }
  }, [user]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData.email, formData.password); 
      router.push("/"); 
    } catch (error) {
      setError("Error al iniciar sesión. Revisa tus credenciales.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   return (
//     <div className="max-w-md mx-auto my-[10%] bg-custom-white p-4 rounded-md shadow-md">
//     <h2 className="text-2xl font-semibold text-center">Iniciar Sesión</h2>
//     <form onSubmit={handleSubmit} className="mt-4">
//       <div className="mb-4">
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="mt-1 p-2 w-full border rounded-md"
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//           Contraseña
//         </label>
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="mt-1 p-2 w-full border rounded-md"
//           />
//           <button
//             type="button"
//             onClick={togglePasswordVisibility}
//             className="absolute right-2 top-3 text-gray-600"
//           >
//             {showPassword ? "Ocultar" : "Mostrar"}
//           </button>
//         </div>
//       </div>
//       <button
//         type="submit"
//         className="w-full p-2 bg-blue-500 text-white font-bold rounded-md"
//       >
//         Iniciar Sesión
//       </button>
//     </form>
//   </div>
// );

return (
  <div className="max-w-md w-full bg-custom-white p-6 rounded-md shadow-md">
    <h2 className="text-2xl font-semibold text-center">Iniciar Sesión</h2>
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-3 text-gray-600"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white font-bold rounded-md"
      >
        Iniciar Sesión
      </button>
    </form>
  </div>
);
};

export default Login
