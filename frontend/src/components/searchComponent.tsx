import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface SearchComponentProps {
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Specify the type as string

  const handleSearch = async () => {
    try {
      const token = Cookies.get("jwtToken");
      const response = await axios.get("/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { search: searchQuery },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div className="flex justify-end mt-3">
      <div className="flex items-center w-3/10">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="appearance-none border rounded-xl w-full py-2 px-3 mr-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-customTeal hover:bg-buttonHover border rounded-xl text-white font-bold text-sm py-2 px-3 mr-2 focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
