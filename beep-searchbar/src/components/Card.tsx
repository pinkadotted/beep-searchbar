import AsyncSearchBar from "./AsyncSearchBar"
import SyncSearchBar from "./SyncSearchBar"

const Card = () => {
  return (
    <div className="flex flex-col border-2 border-blue-500 w-1/4 h-1/2">
        <AsyncSearchBar />
        <SyncSearchBar label='Country search' description='Search for a country' />
    </div>
  )
}

export default Card