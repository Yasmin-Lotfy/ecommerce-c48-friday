"use client"
import React from 'react'
import { Toaster } from "sonner";
import AuthContextProvider from "@/context/AuthContext";
import CartContextProvider from "@/context/CartContext";
import { Provider } from 'react-redux'
import { store } from "@/redux/store";
import Navbar from '../common/navbar/navbar';
export default function LayoutProvider({children} : {children : React.ReactNode}) {
  return (
    <>
    
     <AuthContextProvider>
          <CartContextProvider>
            <Provider  store = {store}>
            <Navbar />
            {children}
            <Toaster richColors position="top-center" />
            </Provider>
          </CartContextProvider>
        </AuthContextProvider>
    </>
  )
}
