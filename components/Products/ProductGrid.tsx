"use client";

import ProductCard from "./ProductCard";

interface Product {
  id: number;
  product_name: string;
  product_description: string;
  price: number;
  mrp: number;
  image: string;
  category_name: string;
  featured: number;
  new_arrival: number;
  bestseller: number;
  trending: number;
}

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="py-20 md:py-28 text-center">
        <h2 className="text-2xl md:text-4xl font-black text-white">
          No Products Found
        </h2>

        <p className="text-gray-400 mt-3 md:mt-4 text-sm md:text-base">
          Try another search or category.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      grid
      grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      gap-4
      md:gap-6
      lg:gap-8
    "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}