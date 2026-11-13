import { BrandI } from "./brands.type"
import { CategoryI } from "./category.type"
import { SubcategoryI } from "./subCategory.type"


export interface ProductI {
  sold: number
  images: string[]
  subcategory: SubcategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryI
  brand: BrandI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: number[]
}


