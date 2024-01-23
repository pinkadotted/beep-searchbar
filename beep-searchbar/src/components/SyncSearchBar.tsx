import React, { useRef, useState } from "react";
import Data from "../../MOCK_DATA.json";
import Dropdown from "./Dropdown";

interface SyncSearchBarProps {
  label: string;
  description: string;
  disabled?: boolean;
}

const SyncSearchBar: React.FC<SyncSearchBarProps> = ({
  label = "Search",
  description = "Search for a country",
  disabled = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemsList, setSelectedItemsList] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  // const [isInputFocused, setIsInputFocused] = useState(false);
  const countries: any = Data;

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (/^[a-zA-Z0-9]$/.test(e.key)) {
      // Allow typing in the input when a printable character is pressed
      // isFocusedHandler(true);
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
    // setIsInputFocused(isInputFocused);
    ref.current?.focus();
  };

  const selectedItemsHandler = (selectedItems: any) => {
    setSelectedItemsList(selectedItems);
  };

  const isFocusedHandler = (isFocused: boolean) => {
    setIsFocused(isFocused);
    console.log(isFocused);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleSearch: ", e.target.value);
    setSearchTerm(e.target.value);
  };

  const filteredCountries = countries.filter((country: any) => {
    return (
      searchTerm === "" ||
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div
      className="flex flex-col h-20 px-5 relative items-center"
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
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
        onKeyDown={handleKeyDown}
        // onBlur={() => setIsFocused(false)}
      />
      {/* input description */}
      <p className="text-gray-500 text-xs italic">{description}</p>

      {/* input results */}
      {
        // searchTerm !== ""
        isFocused && (
          <div className="absolute mt-20 px-2.5 w-full">
            <Dropdown
              options={filteredCountries}
              selectedItemsHandler={selectedItemsHandler}
              selectedItems={selectedItemsList}
              isFocusedHandler={isFocusedHandler}
              isRefFocusedHandler={isRefFocusedHandler}
              dropdownRef={dropdownRef}
              inputRef={inputRef}
            />
          </div>
        )
      }
    </div>
  );
};

export default SyncSearchBar;
