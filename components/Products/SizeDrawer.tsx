"use client";

import { X } from "lucide-react";

interface Size {
  id: number;
  size: string;
  stock: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  sizes: Size[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
  onAddToCart: () => void;
  loading: boolean;
}

export default function SizeDrawer({
  open,
  onClose,
  sizes,
  selectedSize,
  onSelectSize,
  onAddToCart,
  loading,
}: Props) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
      />

      {/* Drawer */}

      <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-t-[30px] animate-slide-up shadow-2xl">

        <div className="max-w-2xl mx-auto p-8">

          {/* Header */}

          <div className="flex items-start justify-between">

            <div>

              <h2 className="text-3xl font-bold text-black">
                Select Size
              </h2>

              <p className="text-gray-500 mt-2">
                Choose your preferred size
              </p>

            </div>

            <div className="flex items-center gap-5">

              <button
                className="text-sm text-pink-600 font-semibold hover:underline"
              >
                Size Guide
              </button>

              <button
                onClick={onClose}
                className="text-gray-600 hover:text-black"
              >
                <X size={28} />
              </button>

            </div>

          </div>

          {/* Loading */}

          {loading ? (

            <div className="py-16 text-center text-gray-500">
              Loading sizes...
            </div>

          ) : (

            <>

              {/* Sizes */}

              <div className="grid grid-cols-4 gap-5 mt-10">

                {sizes.map((item) => {

                  const selected = selectedSize === item.size;
                  const outOfStock = item.stock === 0;

                  return (

                    <button
                      key={item.id}
                      disabled={outOfStock}
                      onClick={() => onSelectSize(item.size)}
                      className={`
                        h-24 rounded-2xl border transition-all duration-300
                        flex flex-col items-center justify-center

                        ${
                          selected
                            ? "bg-pink-600 border-pink-600 text-white"
                            : "bg-white border-gray-300 text-black"
                        }

                        ${
                          outOfStock
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:border-pink-600 hover:shadow-lg"
                        }
                      `}
                    >

                      <span className="text-lg font-bold">
                        {item.size}
                      </span>

                      <span className="text-xs mt-2">

                        {outOfStock
                          ? "Sold Out"
                          : item.stock <= 5
                          ? `${item.stock} Left`
                          : "In Stock"}

                      </span>

                    </button>

                  );

                })}

              </div>

              {/* Stock */}

              {selectedSize && (

                <div className="mt-8 rounded-2xl bg-gray-100 p-5">

                  {sizes
                    .filter((s) => s.size === selectedSize)
                    .map((s) => (

                      <div key={s.id}>

                        <p className="font-semibold text-green-600">

                          {s.stock === 0
                            ? "Out of Stock"
                            : s.stock === 1
                            ? "Only 1 left in stock"
                            : s.stock <= 5
                            ? `Only ${s.stock} left`
                            : `${s.stock} available`}

                        </p>

                        <p className="text-gray-500 text-sm mt-1">
                          Delivery in 2-4 business days
                        </p>

                      </div>

                    ))}

                </div>

              )}

              {/* Info */}

              <div className="mt-8 space-y-3">

                <div className="flex items-center gap-3">

                  <span className="text-green-600">
                    ✓
                  </span>

                  <p className="text-gray-700">
                    Easy 7 Days Return & Exchange
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <span className="text-green-600">
                    ✓
                  </span>

                  <p className="text-gray-700">
                    100% Original Product
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <span className="text-green-600">
                    ✓
                  </span>

                  <p className="text-gray-700">
                    Free Shipping on prepaid orders
                  </p>

                </div>

              </div>

              {/* Add to Bag */}

              <button
                disabled={!selectedSize}
                onClick={onAddToCart}
                className="w-full mt-10 h-16 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-lg font-bold transition-all disabled:opacity-40"
              >
                ADD TO BAG
              </button>

            </>

          )}

        </div>

      </div>

    </>
  );
}
