import AsyncSearchBar from "./AsyncSearchBar"
import SyncSearchBar from "./SyncSearchBar"

const Card = () => {
  return (
    <div className="flex flex-col w-1/4 h-1/2">
        <AsyncSearchBar label='Async Country search' description='Async Search for a country' />
        <SyncSearchBar label='Country search' description='Search for a country' />
    </div>
  )
}

export default Card