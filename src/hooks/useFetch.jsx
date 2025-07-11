import React from "react";
import { useState, useEffect } from "react";

const useFetch = (searchItem = "") => {
  const [moveis, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //   Getting data
  useEffect(() => {
    fetch("/data/combined_data.json")
      .then((response) => {
        setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { moveis, loading, error };
};

export default useFetch;
