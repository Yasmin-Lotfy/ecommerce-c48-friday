"use client";

import { addProductToCart } from "@/actions/cart.actions";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";


export default function AddToCartBtn({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleCart } = useContext(CartContext)!;
  const router = useRouter()

  async function addToCart(id: string) {
    setIsLoading(true);

    try {
      const response = await addProductToCart(id);
      console.log(response, "response from add");

      if(response.status == "unauthenticated"){
         toast.error(response?.message);
         router.push("/login")
      }

      
      toast.success(response.message);
      handleCart();
      
    } catch (error) {
      // console.log(error.message  , "errrrror");
      // toast.error(error?.message);
      // router.push("/login")
      
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <CardFooter className="mt-auto">
        <Button onClick={() => addToCart(productId)} className="w-full">
          {isLoading ? (
            <span className="flex gap-1">
              Loading ... <Spinner />
            </span>
          ) : (
            "Add To Cart"
          )}
        </Button>
      </CardFooter>
    </>
  );
}
