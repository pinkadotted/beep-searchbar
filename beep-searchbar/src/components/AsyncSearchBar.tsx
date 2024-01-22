import { useCallback, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import Data from "../../MOCK_DATA.json";

interface AsyncSearchBarProps {
  label: string;
  description: string;
  disabled?: boolean;
}

const AsyncSearchBar: React.FC<AsyncSearchBarProps> = ({
  label = "Search",
  description = "Search for a country",
  disabled = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemsList, setSelectedItemsList] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const countries: any = Data;

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // debounce function
  const debounce = (func: any, wait: number) => {
    let timeout: any;
    return function executedFunction(...args: any) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Escape") {
      isRefFocusedHandler(dropdownRef);
    } else {
      isRefFocusedHandler(inputRef);
    }
  };

  const isRefFocusedHandler = (ref: React.RefObject<any>) => {
    // setIsInputFocused(isInputFocused);
    ref.current?.focus();
  }

  const selectedItemsHandler = (selectedItems: any) => {
    setSelectedItemsList(selectedItems);
  };

  const isFocusedHandler = (isFocused: boolean) => {
    setIsFocused(isFocused);
    console.log(isFocused);
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleSearch: ", e.target.value);
    setShowDropdown(false);
    setSearchTerm(e.target.value);
    
    debouncedFilterCountries(countries);
  };

  const filteredCountries = countries.filter((country: any) => {
    return (
      searchTerm === "" ||
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filterCountries = (countries: any) => {
    console.log("filterCountries: ", countries);
    setShowDropdown(true);
    return countries.filter((country: any) => {
      return (
        searchTerm === "" ||
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  const debouncedFilterCountries = useCallback(debounce(filterCountries, 1000), [])


  return (
    <div className="flex flex-col"
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
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none "
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        ref={inputRef}
        // onKeyDown={handleKeyDown}
        // onBlur={() => setIsFocused(false)}
      />
      {/* input description */}
      <p className="text-gray-500 text-xs italic">{description}</p>

      {/* input results */}
      {
      // searchTerm !== ""
      (showDropdown && isFocused)
       && 
       <Dropdown 
       options={filteredCountries} 
       selectedItemsHandler={selectedItemsHandler} 
       selectedItems={selectedItemsList} 
       isFocusedHandler={isFocusedHandler} 
       isRefFocusedHandler={isRefFocusedHandler}
       dropdownRef={dropdownRef}
       inputRef={inputRef}
       />}
    </div>
  );
};


export default AsyncSearchBar