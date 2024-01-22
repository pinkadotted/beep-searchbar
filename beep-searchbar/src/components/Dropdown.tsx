import React, { useEffect } from "react";

interface DropdownProps {
  options: any;
  selectedItemsHandler: any;
  selectedItems: any
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedItemsHandler, selectedItems }) => {

  const clickHandler = (country: any) => {
    if (selectedItems.includes(country)) {
      selectedItemsHandler(selectedItems.filter((item: any) => item !== country));
    } else {
      selectedItemsHandler([...selectedItems, country]);
    }
  }

  return (
    <div className="flex flex-col mt-5 z-40 h-40 overflow-y-auto border-2 border-blue-500">
      {options.map((country: any, key: any) => (
        // Dropdown item with checkbox
        <div
          key={key}
          className="flex justify-between p-3 m-1 cursor-pointer hover:bg-blue-100"
          onClick={() => clickHandler(country.name)}
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
        >
          <p>{country.name}</p>
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={selectedItems.includes(country.name)}
            onChange={() => clickHandler(country.name)}
          />
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
