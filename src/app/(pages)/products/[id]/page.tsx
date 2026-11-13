import { getProductDetails } from "@/services/products.services";
import { ProductDetailsI } from "@/types/productDetails.type";
import ProductInfo from "@/components/products/product-info";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ProductSlider from "@/components/products/product-slider";
export default async function ProductDetails({params}: {params : Promise<{ id: string }>}) {

    const {id} =await  params;

    const response = await getProductDetails(id);
    const product :ProductDetailsI = response.data;


    console.log(product ,"response")
  
  return (
    <>
    <div className="container mx-auto">

        <div className="bread-crumb mt-5">
              <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">{product.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
        </div>

        <div className="grid grid-cols-12 mt-7 gap-4">

            <div className="col-span-12 lg:col-span-4">
                {/*  slider */}
                <ProductSlider images = {product.images} />


            </div>
            <div className="col-span-12 lg:col-span-8 details">
                <ProductInfo product={product} />
            </div>

        </div>

    </div>
    </>
  )
}
