"use client";
import React, { useEffect } from "react";
//import Products from "@/components/Products";
import ProductsWithSuspense from "@/components/Products.js";
import { checkAuth } from "@/services/userData";
import { useDispatch } from "react-redux";
import { set } from "../state/userState.js";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const userData = await checkAuth();
        if (userData) {
          dispatch(
            set({
              ...userData,
              isLoggedIn: true,
            })
          );
        }
      } catch (error) {
        console.error("Error al traer datos de usuario:", error);
      }
    };

    authenticateUser();
  }, []);
  return (
    <div>
      <ProductsWithSuspense />
    </div>
  );
}
