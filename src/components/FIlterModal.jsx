import React from "react";
import "../style/searchModal.scss";

const FIlterModal = ({
  onClose,
  genreFilter,
  setGenreFilter,
  yearFilter,
  setYearFilter,
  languageFilter,
  setLanguageFilter,
}) => {

  
  return (
    <div>
      <div className="modal_overlay" onClick={onClose}></div>
      <div className="filter_modal">
        <div className="top">
          <h3>Filter</h3>
        </div>
        <div className="selection">
          {/* Genre filter */}
          <div className="media_type">
            <label htmlFor="genre-select">Genre:</label>
            <select
              id="genre-select"
              className="media_select"
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="16">Animation</option>
              <option value="35">Comedy</option>
              <option value="18">Drama</option>
              <option value="53">Thriller</option>
              <option value="80">Crime</option>
              <option value="878">Science Fiction</option>
              <option value="14">Fantasy</option>
              <option value="27">Horror</option>
              <option value="10751">Family</option>
              <option value="10402">Music</option>
              <option value="9648">Mystery</option>
            </select>
          </div>

          {/* Year filter */}
          <div className="media_type year">
            <label htmlFor="year-select">Year</label>
            <select
              id="year-select"
              className="media_select"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
          </div>

          {/* Language */}
          <div className="media_type language">
            <label htmlFor="language-select">Language:</label>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              id="language-select"
              className="media_select"
            >
              <option value="">All</option>
              <option value="en">English</option>
              <option value="ko">Korean</option>
              <option value="zh">Chinese</option>
              <option value="uz">Uzbek</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FIlterModal;
