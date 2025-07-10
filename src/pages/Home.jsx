import React, { use } from "react";
import { useState, useEffect } from "react";

// Components
import MovieCard from "../components/MovieCard";
import SearchFilter from "../components/SearchFilter";

// Styles
import "../style/home.scss";

const Home = () => {
  const [moveis, setMovies] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [error, setError] = useState(null);
  const moviesPerPage = 10;

  // Getting data
  useEffect(() => {
    fetch("/data/combined_data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP error: ${response.status} ${response.statusText}`
          );
        }

        return response.text();
      })
      .then((text) => {
        try {
          const data = JSON.parse(text);

          if (data.results && Array.isArray(data.results)) {
            setMovies(data.results);

            setError(null);
          } else {
            throw new Error('"result" array is not found on JSON file');
          }
        } catch (error) {
          throw new Error(
            `JSON parse error: ${error.message}. Returned value: ${text.slice(
              0,
              50
            )}...`
          );
        }
      })
      .catch((error) => {
        console.error("Error on uploading JSON:", error);
        setError(error.message);
      });
  }, []);

  // Searching
  const filteredMovies = moveis.filter((movie) => {
    const matchesSearch = movie.title
      ?.toLowerCase()
      .includes(searchItem.toLowerCase());

    const matchesSearch1 = searchItem
      ? movie.title?.toLowerCase().includes(searchItem.toLowerCase())
      : false;

    const matchesGenre = genreFilter
      ? movie.genre_ids?.includes(parseInt(genreFilter))
      : true;

    const matchesYear = yearFilter
      ? movie.release_date?.startsWith(yearFilter)
      : true;

    return matchesSearch && matchesGenre && matchesYear;
  });

  console.log(filteredMovies);

  // Pagination logic
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Sahifa o'zgarganda yuqoriga skroll qilish
  };

  // The list of the Genres
  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 53, name: "Thriller" },
    { id: 80, name: "Crime" },
    { id: 878, name: "Science Fiction" },
    { id: 14, name: "Fantasy" },
    { id: 27, name: "Horror" },
    { id: 10751, name: "Family" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
  ];

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
          />
        </div>

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
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`page-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
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
