import FancyItem from "./FancyItem";
import SearchBar from "./SearchBar";
import Data from "../../data/countries.json";

const countries: any = Data;

const Card = () => {
  return (
    <div className="flex flex-col w-1/4 h-1/2">
      <SearchBar
        label="Country search"
        description="Search for a country"
        isAsync={true}
        // disabled={true}
      />
      <SearchBar
        label="Country search"
        description="Search for a country"
        isAsync={false}
        component={FancyItem}
      />
    </div>
  );
};

export default Card;
