import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  label: string;
  options: Option[];
  selected: string[];
  setSelected: (val: string[]) => void;
}

const MultiSelectDropdown = ({
  label,
  options,
  selected,
  setSelected,
}: MultiSelectDropdownProps) => {
  const [open, setOpen] = useState(false);

  const toggleSelection = (val: string) => {
    if (selected.includes(val)) {
      setSelected(selected.filter((s) => s !== val));
    } else {
      setSelected([...selected, val]);
    }
  };

  // Get the labels for the selected values
  const selectedLabels = options
    .filter((opt) => selected.includes(opt.value))
    .map((opt) => opt.label);

  return (
    <div className="mb-4 relative">
      <label className="block text-[#8C6A5D] mb-2 font-semibold">{label}</label>
      <div
        className="w-full px-4 py-2 rounded-xl border border-[#B3927A] bg-[#F5EFE6] cursor-pointer"
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
        onBlur={() => setOpen(false)}
      >
        {selectedLabels.length > 0
          ? selectedLabels.join(", ")
          : `Select ${label}`}
      </div>
      {open && (
        <div className="absolute z-10 bg-white border border-[#B3927A] rounded shadow w-full mt-1 max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-[#F5EFE6] ${
                selected.includes(option.value) ? "font-bold text-[#8C6A5D]" : ""
              }`}
              onMouseDown={() => toggleSelection(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;