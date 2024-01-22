import React from 'react'

interface DropdownProps {
    options: any
}

const Dropdown: React.FC<DropdownProps> = ({options}) => {
  return (
    <div className="flex flex-col mt-5 z-40">
      {options.map((country: any, key: any) => (
        <div key={key} className="border-2 border-blue-500">
          <p>{country.country}</p>
        </div>
      ))}
  </div>
  )
}

export default Dropdown