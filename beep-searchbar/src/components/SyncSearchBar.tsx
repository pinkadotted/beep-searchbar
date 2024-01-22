import { useState } from "react"

const SyncSearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        console.log(searchTerm)
    }

  return (
    <>
        <input
            className='border-2 border-blue-500'
            type='text'
            placeholder='Search...'
            onInput={handleSearch}
        />
    </>
  )
}

export default SyncSearchBar