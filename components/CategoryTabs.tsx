"use client";

type CategoryOption = {
  key: string;
  label: string;
};

export default function CategoryTabs({
  options,
  selected,
  onSelect,
}: {
  options: CategoryOption[];
  selected: string;
  onSelect: (category: string) => void;
}) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-3">
      {options.map((option) => {
        const active = selected === option.key;

        return (
          <button
            key={option.key}
            onClick={() => onSelect(option.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
              active
                ? "bg-green-500 text-white shadow-md"
                : "border bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
