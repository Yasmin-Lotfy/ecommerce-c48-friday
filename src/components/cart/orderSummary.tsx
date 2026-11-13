import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lock, ShoppingBag, Tag, Truck } from "lucide-react";
import { CartDataI } from "@/types/cart.type";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
export default function OrderSummary({
  cartData,
  isCheckOut,
}: {
  cartData: CartDataI;
  isCheckOut: boolean;
}) {
  const { noOfCartItems } = useContext(CartContext)!;
  return (
    <>
      <div className="col-span-12 lg:col-span-4">
        <Card className="gap-0 overflow-hidden rounded-2xl py-0 shadow-sm">
          <div className="bg-primary p-5 text-primary-foreground">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShoppingBag className="size-5" />
              Order Summary
            </h2>
            <p className="mt-1 text-sm">{noOfCartItems} item in your cart</p>
          </div>

          <CardContent className="space-y-4 p-5">
            {isCheckOut ? (
              <>
                <div className="h-[300px] overflow-y-auto px-5">
                  {cartData.data.products.map((product) => (
                    <React.Fragment key={product._id}>
                      <div className="flex justify-between items-center">
                        <Image
                          className="w-[20%] "
                          src={product.product.imageCover}
                          width={200}
                          height={200}
                          alt=""
                        />
                        <div className="flex flex-col ">
                          <p>
                            {product.product.title
                              .split(" ")
                              .slice(0, 2)
                              .join(" ")}
                          </p>
                          <p>
                            {product.count} x {product.price}
                          </p>
                        </div>
                        <p className="font-bold">
                          {product.count * product.price}
                        </p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-2 rounded-xl bg-orange-50 p-4">
                <p className="flex items-center gap-2 text-sm">
                  <Truck className="size-4 text-orange-500" />
                  free shipping
                </p>
                <div className="h-2 rounded-full bg-orange-100">
                  <div className="h-full w-full rounded-full bg-orange-500" />
                </div>
              </div>
            )}

            {/*  cart */}

            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{cartData?.data?.totalCartPrice} EGP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free EGP</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold">
                {cartData?.data?.totalCartPrice}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  EGP
                </span>
              </span>
            </div>

            <Button variant="outline" className="h-12 w-full border-dashed">
              <Tag />
              Apply Promo Code
            </Button>
            {isCheckOut ? (
              <>
                <Button size="lg" className="h-12 w-full">
                  <Lock />
                  Place Order
                </Button>
              </>
            ) : (
              <Button size="lg" className="h-12 w-full">
                <Link href="/checkout" className="flex gap-2">
                  <Lock />
                  Secure Checkout
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
