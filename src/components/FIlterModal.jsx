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
  // Genres
  const genres = [
    { id: "", name: "All" },
    { id: "28", name: "Action" },
    { id: "12", name: "Adventure" },
    { id: "16", name: "Animation" },
    { id: "35", name: "Comedy" },
    { id: "18", name: "Drama" },
    { id: "53", name: "Thriller" },
    { id: "80", name: "Crime" },
    { id: "878", name: "Science Fiction" },
    { id: "14", name: "Fantasy" },
    { id: "27", name: "Horror" },
    { id: "10751", name: "Family" },
    { id: "10402", name: "Music" },
    { id: "9648", name: "Mystery" },
  ];

  // Years
  const years = [
    { id: "", name: "All" },
    { id: "2024", name: "2024" },
    { id: "2023", name: "2023" },
    { id: "2022", name: "2022" },
    { id: "2021", name: "2021" },
    { id: "2020", name: "2020" },
    { id: "2019", name: "2019" },
  ];

  // Languages
  const languages = [
    { id: "", name: "All" },
    { id: "en", name: "English" },
    { id: "ko", name: "Korean" },
    { id: "zh", name: "Chinese" },
    { id: "uz", name: "Uzbek" },
    { id: "fr", name: "French" },
    { id: "es", name: "Spanish" },
  ];

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
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
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
              {years.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.name}
                </option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div className="media_type language">
            <label htmlFor="language-select">Language:</label>
            <select
              id="language-select"
              className="media_select"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FIlterModal;
