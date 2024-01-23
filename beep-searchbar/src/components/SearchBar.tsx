import React, { useCallback, useRef, useState } from "react";
import Data from "../../MOCK_DATA.json";
import CountryData from "../../countries.json";
import Dropdown from "./Dropdown";

interface SearchBarProps {
  component?: any;
  label: string;
  description: string;
  disabled?: boolean;
  isAsync: boolean; // New prop to determine async or sync behavior
//   props: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  label = "Search",
  description = "Search for a country",
  disabled = false,
  isAsync = false,
//   props
  component
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemsList, setSelectedItemsList] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dropdownDisplayConditions = isAsync
    ? showDropdown && isFocused
    : isFocused;

//   const countries: any = Data;
    const countries: any = CountryData;

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (/^[a-zA-Z0-9]$/.test(e.key)) {
      isRefFocusedHandler(inputRef);
    } else if (
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.key === "Escape"
    ) {
      isRefFocusedHandler(dropdownRef);
    }
  };

  const isRefFocusedHandler = (ref: React.RefObject<any>) => {
    ref.current?.focus();
  };

  const selectedItemsHandler = (selectedItems: any) => {
    setSelectedItemsList(selectedItems);
  };

  const isFocusedHandler = (isFocused: boolean) => {
    setIsFocused(isFocused);
  };

  const isLoadingHandler = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const filterCountries = (countries: any) => {
    setShowDropdown(true);
    return countries.filter((country: any) => {
      return (
        searchTerm === "" ||
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const filteredCountries = countries.filter((country: any) => {
    return (
      searchTerm === "" ||
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // debounce function
  const debounce = (func: any, wait: number) => {
    let timeout: any;
    return function executedFunction(...args: any) {
      isLoadingHandler(true);
      const later = () => {
        clearTimeout(timeout);
        func(...args);
        isLoadingHandler(false);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debouncedFilterCountries = useCallback(
    debounce(filterCountries, 1000),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (isAsync) {
      // If async, perform async operations here
      setShowDropdown(false);
      setSearchTerm(e.target.value);

      debouncedFilterCountries(countries);
    } else {
      // If sync, perform sync operations here
      setSearchTerm(e.target.value);
    }
  };

  return (
    <div
      className="flex flex-col h-20 px-5 relative items-center"
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onKeyDown={handleKeyDown}
    >
      {/* input label */}
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor="search"
      >
        {label}
      </label>
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      {/* only if async */}
      {isAsync && isLoading && (
        <div className="absolute inset-y-0 right-0 flex items-center mr-7 pointer-events-none">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500 border-opacity-50"></div>
        </div>
      )}

      {/* input description */}
      <p className="text-gray-500 text-xs italic">{description}</p>

      {/* input results */}
      {dropdownDisplayConditions && (
        <div className="absolute mt-20 px-2.5 w-full z-10">
          <Dropdown
            component={component}
            options={filteredCountries}
            selectedItemsHandler={selectedItemsHandler}
            selectedItems={selectedItemsList}
            isFocusedHandler={isFocusedHandler}
            isRefFocusedHandler={isRefFocusedHandler}
            dropdownRef={dropdownRef}
            inputRef={inputRef}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
