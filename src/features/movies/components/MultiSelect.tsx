import React, { useState, useRef, useEffect } from 'react';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  label?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = 'Seleccionar...',
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(item => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeOption = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    onChange(selected.filter(item => item !== value));
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div
        className="min-h-[38px] w-full border border-gray-300 rounded-md shadow-sm bg-white cursor-pointer flex flex-wrap items-center p-1 gap-1 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 && (
          <span className="text-gray-400 text-sm px-2">{placeholder}</span>
        )}
        {selected.map(value => {
          return (
            <div
              key={value}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1"
            >
              {value}
              <button
                onClick={(e) => removeOption(e, value)}
                className="hover:text-blue-600 focus:outline-none"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => (
            <div
              key={option}
              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 ${
                selected.includes(option) ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
              }`}
              onClick={() => handleSelect(option)}
            >
              <span className={`block truncate ${selected.includes(option) ? 'font-semibold' : 'font-normal'}`}>
                {option}
              </span>
              {selected.includes(option) && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                  ✓
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
