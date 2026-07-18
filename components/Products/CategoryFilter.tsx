"use client";

interface Category {
  id: number;
  name: string;
}

interface Props {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-10">

      <button
        onClick={() => setSelectedCategory("All")}
        className={`px-6 py-3 rounded-full font-semibold transition ${
          selectedCategory === "All"
            ? "bg-white text-black"
            : "bg-[#111] text-white hover:bg-[#222]"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() =>
            setSelectedCategory(category.name)
          }
          className={`px-6 py-3 rounded-full font-semibold transition ${
            selectedCategory === category.name
              ? "bg-white text-black"
              : "bg-[#111] text-white hover:bg-[#222]"
          }`}
        >
          {category.name}
        </button>
      ))}

    </div>
  );
}