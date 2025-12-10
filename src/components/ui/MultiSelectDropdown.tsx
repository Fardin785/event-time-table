import { useState, useRef, useEffect } from "react";

type Option = {
  id: string;
  label: string;
};

type Props = {
  options: Option[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
};

export const MultiSelectDropdown: React.FC<Props> = ({ options, selectedIds, onChange, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((v) => v !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full border rounded px-3 py-2 text-left flex justify-between items-center focus:outline-none focus:ring focus:ring-blue-200"
      >
        {selectedIds.length === 0
          ? placeholder
          : selectedIds
              .map((id) => options.find((o) => o.id === id)?.label)
              .filter(Boolean)
              .join(", ")}
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-auto border rounded bg-white shadow-lg z-50">
          {options.map((o) => (
            <label key={o.id} className="flex items-center gap-2 px-3 py-1 hover:bg-blue-50 cursor-pointer">
              <input type="checkbox" checked={selectedIds.includes(o.id)} onChange={() => toggleOption(o.id)} />
              {o.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
