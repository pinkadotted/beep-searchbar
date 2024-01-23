import React, { useEffect, useState } from "react";

interface DropdownProps {
  component?: React.ComponentType<{ data: any }>;
  options: any;
  selectedItemsHandler: any;
  selectedItems: any;
  isFocusedHandler: any;
  isRefFocusedHandler: any;
  dropdownRef: any;
  inputRef: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  component: FancyItem,
  options,
  selectedItemsHandler,
  selectedItems,
  isFocusedHandler,
  isRefFocusedHandler,
  dropdownRef,
  inputRef,
}) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const clickHandler = (country: any) => {
    if (selectedItems.includes(country)) {
      selectedItemsHandler(
        selectedItems.filter((item: any) => item !== country)
      );
    } else {
      selectedItemsHandler([...selectedItems, country]);
    }
    console.log("selectedItems: ", selectedItems);
  };

  useEffect(() => {
    if (dropdownRef.current) {
      dropdownRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const direction = e.key === "ArrowDown" ? 1 : -1;
      setHighlightedIndex((prevIndex) => {
        if (prevIndex === null) {
          return direction === 1 ? 0 : options.length - 1;
        }
        const nextIndex =
          (prevIndex + direction + options.length) % options.length;

        // Scroll into view if necessary
        const dropdownElement = dropdownRef.current;
        const highlightedElement = dropdownElement?.children[nextIndex] as
          | HTMLElement
          | undefined;
        if (highlightedElement) {
          highlightedElement.scrollIntoView({
            block: "nearest",
          });
        }
        return nextIndex;
      });
    } else if (e.key === "Enter" && highlightedIndex !== null) {
      e.preventDefault();
      clickHandler(options[highlightedIndex]);
    } else if (e.key === "Escape") {
      // Handle the "Escape" key to close the dropdown
      e.preventDefault();
      setHighlightedIndex(null); // Reset highlighted index
      isFocusedHandler(false); // Reset isFocused
    } else {
      // } else if (/^[a-zA-Z0-9]$/.test(e.key)) {
      // Allow typing in the input when a printable character is pressed
      // isFocusedHandler(true);
      isRefFocusedHandler(inputRef);
    }
  };

  return (
    <div
      className="flex flex-col z-40 max-h-80  overflow-y-auto drop-shadow-2xl bg-white rounded-lg border focus:outline-none text-gray-700 text-sm md"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={dropdownRef}
    >
      {
      options.length == 0 && 
        <div className="flex justify-between items-center p-3 m-1 cursor-pointer hover:bg-blue-100">
          <p>No results found</p>
          </div>
          }
      {options.map((country: any, key: any) => (
        // Dropdown item with checkbox
        <div
          key={key}
          className={`flex justify-between items-center p-3 m-1 cursor-pointer hover:bg-blue-100 ${
            highlightedIndex === key ? "bg-blue-100" : ""
          }`}
          onClick={() => clickHandler(country)}
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
        >
          {/* Custom component if provided, else just country.name */}
          {FancyItem ? <FancyItem data={country} /> : <p>{country.name}</p>}
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={selectedItems.includes(country)}
            onChange={() => clickHandler(country)}
          />
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
