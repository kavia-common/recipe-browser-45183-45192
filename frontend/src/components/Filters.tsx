"use client";

interface Props {
  tags: string[];
  value: string;
  onChange: (value: string) => void;
}

// PUBLIC_INTERFACE
export default function Filters({ tags, value, onChange }: Props) {
  /** Simple category filter dropdown. */
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="category" className="text-sm text-gray-700">
        Category
      </label>
      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-black/10 bg-white/90 px-3 py-2 shadow-sm focus:ring-4 focus:ring-[rgba(37,99,235,0.25)] focus:outline-none"
        aria-label="Filter by category"
      >
        <option value="All">All</option>
        {tags.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
