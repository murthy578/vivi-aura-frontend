"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function ProductSearch({
  search,
  setSearch,
}: Props) {
  return (
    <div className="mb-10">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#111] border border-[#222] rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-white transition"
      />
    </div>
  );
}