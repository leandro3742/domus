import { useState, useRef, useEffect } from 'react';

interface DirectorFilterProps {
  directors: string[];
  selectedDirector: string;
  onDirectorChange: (director: string) => void;
}

const DirectorFilter = ({
  directors,
  selectedDirector,
  onDirectorChange,
}: DirectorFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredDirectors = directors.filter(director =>
    director.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        if (!searchTerm) {
          setIsSearching(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowSuggestions(term.length > 0);
    setIsSearching(true);
  };

  const handleDirectorSelect = (director: string) => {
    onDirectorChange(director);
    setSearchTerm('');
    setShowSuggestions(false);
    setIsSearching(false);
  };

  const handleClear = () => {
    onDirectorChange('');
    setSearchTerm('');
    setShowSuggestions(false);
    setIsSearching(false);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
    setIsSearching(true);
  };

  const displayValue = isSearching ? searchTerm : selectedDirector;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Buscar director..."
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md shadow-sm p-2 border"
        />
        {selectedDirector && !isSearching && (
          <button
            onClick={handleClear}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      {showSuggestions && filteredDirectors.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredDirectors.map(director => (
            <div
              key={director}
              onClick={() => handleDirectorSelect(director)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {director}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectorFilter;
