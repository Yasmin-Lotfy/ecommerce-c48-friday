"use client";
import { getLoggedUserCart } from "@/actions/cart.actions";
import { CartDataI } from "@/types/cart.type";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

type CartContextType = {
  noOfCartItems: number;
  handleCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [noOfCartItems, setNoOfCartItems] = useState(0);

  const { status } = useSession();

  async function handleCart() {
    try {
      const response: CartDataI = await getLoggedUserCart();
     
      const totalItems = response.data.products.reduce(
        (acc, product) => product.count + acc,
        0,
      );
      setNoOfCartItems(totalItems);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (status == "authenticated") {
      handleCart();
    }
  }, [status]);

  return (
    <>
      <CartContext.Provider value={{ noOfCartItems, handleCart }}>
        {children}
      </CartContext.Provider>
    </>
  );
}
