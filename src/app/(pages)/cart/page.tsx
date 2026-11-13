"use client";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import CartItem from "../../../components/cart/cartItem";
import OrderSummary from "../../../components/cart/orderSummary";
import {
  clearProductFromCart,
  getLoggedUserCart,
} from "@/actions/cart.actions";
import { useContext, useEffect, useState } from "react";
import { CartDataI, CartProducts } from "@/types/cart.type";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { CartContext } from "@/context/CartContext";

export default function CartPage() {
  const [products, setproducts] = useState<CartProducts[] | []>([]);
  const [cartData, setcartData] = useState<CartDataI | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const {handleCart} = useContext(CartContext)!

  async function getCart() {
    setIsLoading(true);
    try {
      const response: CartDataI = await getLoggedUserCart();
      console.log(response);
      setcartData(response)
      setproducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function clearCart() {
    setIsLoading(true);
    try {
      const response: CartDataI = await clearProductFromCart();
      console.log(response);
      setproducts(response.data.products);
      handleCart()
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getCart();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <Spinner className="size-11" />
        </div>
      </>
    );
  }
  if (products.length == 0) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <Link href="/products">Go Shopping</Link>
        </div>
      </>
    );
  }

  return (
    <div className="container mx-auto my-6 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Shopping Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-6">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShoppingCart className="size-6" />
          </span>
          <h1 className="font-heading text-3xl font-bold">Shopping Cart</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          You have <span className="font-semibold text-primary">1 item</span> in
          your cart
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-4 lg:col-span-8">
          {/* Cart items */}
          {products.map((product) => (
            <CartItem
              setproducts={setproducts}
              key={product._id}
              product={product}
            />
          ))}

          <Separator />

          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="size-4" />
              Continue Shopping
            </Link>
            <Button
              onClick={clearCart}
              variant="ghost"
              className="text-muted-foreground"
            >
              <Trash2 />
              Clear all items
            </Button>
          </div>
        </div>

        {/* Order summary */}
        <OrderSummary cartData={cartData!} isCheckOut = {false} />
      </div>
    </div>
  );
}
