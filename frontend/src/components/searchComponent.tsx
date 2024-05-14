"use client"
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const SearchComponent: React.FC = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Function to handle search operation
  const handleSearch = async () => {
    try {
      const response = await axios.get("/search", {
        params: { search: searchQuery }, // Pass search query as a parameter
      });
      // Update search results state
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div className="flex-1">
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
            onClick={handleSearch} // Bind search function to onClick event
            className="bg-customTeal hover:bg-buttonHover border rounded-xl text-white font-bold text-sm py-2 px-3 mr-2 focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </div>
      </div>

      {/* Display search results */}
      <div>
        {searchResults.map((result) => (
          <div key={result.id}>{
            <p>{result.productName}</p>
          }</div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
