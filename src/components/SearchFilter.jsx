import React, { useState } from "react";

// Components
import FIlterModal from "./FIlterModal";

// Styles
import "../style/searchFilter.scss";

const SearchFilter = ({
   searchItem,
  setSearchItem,
  genreFilter,
  setGenreFilter,
  yearFilter,
  setYearFilter,
  languageFilter,
  setLanguageFilter,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="searchFilter_box">
      <input
        type="text"
        className="searchInput"
        placeholder="Search movies..."
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />

      <button className="filterBtn" onClick={() => setIsModalOpen(true)}>
        Filter
      </button>

      {isModalOpen && (
        <FIlterModal
          onClose={() => setIsModalOpen(false)}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          languageFilter={languageFilter}
          setLanguageFilter={setLanguageFilter}
        />
      )}
    </div>
  );
};

export default SearchFilter;
