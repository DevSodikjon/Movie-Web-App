import React, { use } from "react";
import { useState, useEffect } from "react";

// Hooks
import useFetch from "../hooks/useFetch";

// Components
import MovieCard from "../components/MovieCard";
import SearchFilter from "../components/SearchFilter";

// Styles
import "../style/home.scss";

const Home = () => {
  const { moveis, loading, error } = useFetch();
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const moviesPerPage = 10;

  // Searching
  const filteredMovies = moveis.filter((movie) => {
    const matchesSearch = searchItem
      ? movie.title?.toLowerCase().includes(searchItem.toLowerCase())
      : true;

    const matchesGenre = genreFilter
      ? movie.genre_ids?.includes(parseInt(genreFilter))
      : true;

    const matchesYear = yearFilter
      ? movie.release_date?.startsWith(yearFilter)
      : true;

    const matchesLanguage = languageFilter
      ? movie.original_language === languageFilter
      : true;

    return matchesSearch && matchesGenre && matchesYear && matchesLanguage;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  // Changing the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="container">
        <div className="title">
          <h1>Movie Finder</h1>
        </div>

        <div className="searchAndFilter">
          <SearchFilter
            searchItem={searchItem}
            setSearchItem={setSearchItem}
            genreFilter={genreFilter}
            setGenreFilter={setGenreFilter}
            yearFilter={yearFilter}
            setYearFilter={setYearFilter}
            languageFilter={languageFilter}
            setLanguageFilter={setLanguageFilter}
          />
        </div>

        {/* Rendering cards */}
        <div className="movie_list">
          {error ? (
            <div className="error">
              <p>Error: {error}</p>
            </div>
          ) : (
            <div className="movie_list">
              {filteredMovies.length > 0 ? (
                currentMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              ) : (
                <p>No movies found.</p>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn"
          >
            Previous
          </button>
          {totalPages > 1 && (
            <>
              {currentPage > 2 && (
                <>
                  <button
                    onClick={() => handlePageChange(1)}
                    className="page-btn"
                  >
                    1
                  </button>
                  {currentPage > 3 && <span className="ellipsis">...</span>}
                </>
              )}
              {Array.from({ length: 4 }, (_, index) => {
                const pageNum = currentPage - 1 + index;
                if (pageNum > 0 && pageNum <= totalPages) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`page-btn ${
                        currentPage === pageNum ? "active" : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}
              {currentPage < totalPages - 1 && (
                <>
                  {currentPage < totalPages - 2 && (
                    <span className="ellipsis">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="page-btn"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </>
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
