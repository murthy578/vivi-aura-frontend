"use client";

interface SidebarProps {
  category: string;
  setCategory: (value: string) => void;
}

export default function Sidebar({
  category,
  setCategory,
}: SidebarProps) {
  return (
    <aside className="w-[280px] bg-[#111] rounded-3xl p-8 h-fit sticky top-36">

      <h2 className="text-white text-2xl font-bold mb-8">
        FILTERS
      </h2>

      {/* CATEGORY */}

      <div className="mb-10">

        <h3 className="text-white font-semibold mb-5">
          CATEGORY
        </h3>

        <div className="space-y-3">

          {["All", "Men", "Women", "Kids"].map((item) => (

            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`block w-full text-left px-4 py-3 rounded-xl transition ${
                category === item
                  ? "bg-white text-black"
                  : "bg-[#1a1a1a] text-gray-400 hover:bg-[#222]"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      {/* SIZE */}

      <div className="mb-10">

        <h3 className="text-white font-semibold mb-5">
          SIZE
        </h3>

        <div className="grid grid-cols-4 gap-3">

          {["S", "M", "L", "XL"].map((size) => (

            <button
              key={size}
              className="border border-gray-600 rounded-xl py-3 text-white hover:bg-white hover:text-black transition"
            >
              {size}
            </button>

          ))}

        </div>

      </div>

      {/* PRICE */}

      <div>

        <h3 className="text-white font-semibold mb-5">
          PRICE
        </h3>

        <input
          type="range"
          min="500"
          max="5000"
          className="w-full"
        />

        <div className="flex justify-between text-gray-400 mt-4">

          <span>₹500</span>

          <span>₹5000</span>

        </div>

      </div>

    </aside>
  );
}