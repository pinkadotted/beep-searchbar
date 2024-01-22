import React, { useState } from "react";
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
  const countries: any = Data;

  const selectedItemsHandler = (selectedItems: any) => {
    setSelectedItemsList(selectedItems);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCountries = countries.filter((country: any) => {
    return (
      searchTerm === "" ||
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col border-2 border-green-300"
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
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        // onBlur={() => setIsFocused(false)}
      />
      {/* input description */}
      <p className="text-gray-500 text-xs italic">{description}</p>

      {/* input results */}
      {
      // searchTerm !== ""
      isFocused
       && 
       <Dropdown options={filteredCountries} selectedItemsHandler={selectedItemsHandler} selectedItems={selectedItemsList} />}
    </div>
  );
};

export default SyncSearchBar;
