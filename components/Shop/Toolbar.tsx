"use client";

interface ToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
  total: number;
}

export default function Toolbar({
  search,
  setSearch,
  sort,
  setSort,
  total,
}: ToolbarProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

      <div className="flex-1">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111] rounded-2xl px-6 py-4 text-white outline-none border border-gray-700"
        />

      </div>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="bg-[#111] border border-gray-700 rounded-2xl px-6 py-4 text-white"
      >
        <option value="new">Newest</option>
        <option value="low">Price: Low → High</option>
        <option value="high">Price: High → Low</option>
      </select>

      <p className="text-gray-400">
        {total} Products
      </p>

    </div>
  );
}