import React, { useState, useEffect, useRef } from "react";

let handleInputChange;
const DropdownInput = ({
  defaultValue = '',
  options = [],
  placeholder = "Type to search...",
  isMultiple = false, // Renamed allowMultiple to isMultiple for clarity
  selectedOptions = [],
  onChange = () => {},
  register = {
    onChange: (e)=> handleInputChange(e)
  },
  customStyles = {},
  handleManualChange = () => {}

}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selected, setSelected] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    console.log(defaultValue)
    setInputValue(defaultValue);
  }, [defaultValue]);
  // useEffect(() => {
  //   if (!isMultiple) {
  //     register.onChange
  //   }
  // }, [selected]);

  useEffect(() => {
    // Close dropdown on outside click
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  handleInputChange = (e) => {
    const { value } = e.target;
    console.log(value)
    onChange(e);
    setInputValue(value);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsDropdownVisible(true);
  };

  const handleOptionSelect = (option) => {
    const {name} = register
    console.log(name, option)
    if (isMultiple) {
      if (!selected.includes(option)) {
        const updatedSelection = [...selected, option];
        setSelected(updatedSelection);
        onChange({ target: { name, value: updatedSelection } });
        setInputValue(""); // Clear the input after selection
      }
    } else {
      setSelected(option);
      onChange({target: { name, value: option }});
      setInputValue(option); // Set the input value to the selected option
    }

    setIsDropdownVisible(false);
    setFilteredOptions(options);
  };

  const handleRemoveOption = (option) => {
    const updatedSelection = selected.filter((item) => item !== option);
    setSelected(updatedSelection);
    onChange(updatedSelection);
  };

  return (
    <div
      ref={containerRef}
      className={`
        relative border border-gray-300 rounded-md
        ${customStyles.wrapper || ""}
      `}
    >
      {isMultiple && selected.length > 0 && (
        // <div className="flex flex-wrap gap-2 mb-2">
        <div className="flex flex-wrap gap-2 w-full py-1 px-2 border-b">
          {selected.map((option, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium text-white bg-main_color rounded-md flex justify-between items-center gap-1"
            >
              {option}
              <button
                type="button"
                onClick={() => handleRemoveOption(option)}
                className="text-white"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        // </div>
      )}

      <input
        type="text"
        {...register}
        
        value={inputValue}
        // onChange={(e)=>{
        //   handleInputChange(e)
        //   handleManualChange(e)
        // }}
        onFocus={() => setIsDropdownVisible(true)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 !outline-none rounded-lg border-none ${
          customStyles.input || ""
        }`}
      />

      {isDropdownVisible && filteredOptions.length > 0 && (
        <div
          className={`absolute divide-y divide-gray-300 z-10 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-300 max-h-[300px] overflow-y-auto ${
            customStyles.dropdown || ""
          }`}
        >
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
