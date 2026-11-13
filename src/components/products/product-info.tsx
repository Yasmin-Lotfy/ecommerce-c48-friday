"use client"

import { useState } from "react"
import {
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  StarHalf,
  Truck,
  Zap,
} from "lucide-react"
import { ProductDetailsI } from "@/types/productDetails.type"

const features = [
  { icon: Truck, title: "Free Delivery", subtitle: "Orders over $50" },
  { icon: RotateCcw, title: "30 Days Return", subtitle: "Money back" },
  { icon: ShieldCheck, title: "Secure Payment", subtitle: "100% Protected" },
]

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const value = rating - i
        if (value >= 1) {
          return <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
        }
        if (value >= 0.5) {
          return (
            <span key={i} className="relative">
              <Star className="size-5 text-yellow-400" />
              <StarHalf className="absolute inset-0 size-5 fill-yellow-400 text-yellow-400" />
            </span>
          )
        }
        return <Star key={i} className="size-5 text-yellow-400" />
      })}
    </div>
  )
}

export default function ProductInfo({ product }: { product: ProductDetailsI }) {
  const [count, setCount] = useState(1)
  const inStock = product.quantity > 0

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-green-50 px-4 py-1.5 text-sm text-green-700">
          {product.category?.name}
        </span>
        <span className="rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-700">
          {product.brand?.name}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">{product.title}</h1>

      <div className="mt-3 flex items-center gap-3">
        <RatingStars rating={product.ratingsAverage} />
        <span className="text-gray-600">
          {product.ratingsAverage} ({product.ratingsQuantity} reviews)
        </span>
      </div>

      <p className="mt-5 text-4xl font-bold text-gray-900">{product.price} EGP</p>

      <span
        className={`mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 ${
          inStock ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
        }`}
      >
        <span className={`size-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
        {inStock ? "In Stock" : "Out of Stock"}
      </span>

      <hr className="my-6" />

      <p className="text-gray-600">{product.description}</p>

      <div className="mt-6">
        <p className="mb-2 text-gray-700">Quantity</p>
        <div className="flex items-center gap-6">
          <div className="flex w-36 items-center justify-between rounded-lg border-2 px-4 py-3">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setCount((c) => Math.max(1, c - 1))}
              disabled={count <= 1}
              className="text-gray-500 hover:text-gray-900 disabled:opacity-40"
            >
              <Minus className="size-5" />
            </button>
            <span className="text-lg">{count}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setCount((c) => Math.min(product.quantity, c + 1))}
              disabled={count >= product.quantity}
              className="text-gray-700 hover:text-gray-900 disabled:opacity-40"
            >
              <Plus className="size-5" />
            </button>
          </div>
          <span className="text-gray-500">{product.quantity} available</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 px-6 py-6">
        <span className="text-lg text-gray-600">Total Price:</span>
        <span className="text-3xl font-bold text-green-600">
          {(product.price * count).toFixed(2)} EGP
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          type="button"
          disabled={!inStock}
          className="flex items-center justify-center gap-3 rounded-xl bg-green-600 py-4 text-lg font-medium text-white shadow-lg shadow-green-600/20 hover:bg-green-700 disabled:opacity-50"
        >
          <ShoppingCart className="size-6" />
          Add to Cart
        </button>
        <button
          type="button"
          disabled={!inStock}
          className="flex items-center justify-center gap-3 rounded-xl bg-gray-900 py-4 text-lg font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          <Zap className="size-6 fill-white" />
          Buy Now
        </button>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-3 rounded-xl border-2 py-4 text-lg text-gray-700 hover:bg-gray-50"
        >
          <Heart className="size-5" />
          Add to Wishlist
        </button>
        <button
          type="button"
          aria-label="Share"
          className="flex w-20 items-center justify-center rounded-xl border-2 text-gray-700 hover:bg-gray-50"
        >
          <Share2 className="size-5" />
        </button>
      </div>

      <hr className="my-8" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
              <Icon className="size-6" />
            </span>
            <div>
              <p className="text-gray-900">{title}</p>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
