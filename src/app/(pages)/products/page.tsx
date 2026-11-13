import { getAllProducts } from "@/services/products.services";
import { ProductI } from "@/types/product.type";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import AddToCartBtn from "@/components/cart/AddToCartBtn";

export default async function Products() {
  const response = await getAllProducts();
  const products: ProductI[] = response.data;

  return (
    <>
      <div className="container mx-auto my-10">
          <h2 className="text-chart-5 text-3xl font-bold">All Products:{products.length}</h2>
        <div className="grid gap-2 grid-cols-12">
        
          {products.map((product) => {
            return (
              <React.Fragment key={product._id}>
                <div className="col-span-3 mt-6">
                  <Card className="relative mx-auto w-full max-w-sm pt-0 h-full">
                    <div  />
                    
                    <Link href={`/products/${product._id}`}>
                    
                  
                      <Image
                      src={product.imageCover}
                      alt={product.title}
                      width={400}
                      height={400}
                      className="relative z-20 aspect-video w-full object-cover "
                    />
                

                    <CardHeader>
                      <CardTitle>{product.title}</CardTitle>
                      <CardDescription title={product.description}>
                        {product.description.split(" ").slice(0, 10).join(" ")}
                      </CardDescription>
                      <h2 className="text-xl font-semibold">
                        {product.price} EGP
                      </h2>
                      <div className="flex items-center gap-0.5">
                        {[0, 1, 2, 3, 4].map((star, index) => {
                          const fillledStar =
                            star < Math.floor(product.ratingsAverage);
                          return (
                            <React.Fragment key={index}>
                              <Star
                                className={
                                  fillledStar
                                    ? "text-yellow-500 fill-yellow-400"
                                    : "text-gray-300 fill-gray-300"
                                }
                              />
                            </React.Fragment>
                          );
                        })}
                        <span className="text-lg font-semibold">
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </CardHeader>
                    </Link>

                  <AddToCartBtn productId = {product._id}/>

                  </Card>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
