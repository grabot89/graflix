import React, { useEffect, useState, createContext } from "react";
import { getMovieGenres } from "../api/tmdb-api";
import { Genre, GenreData } from "../types/interfaces";

interface GenreContextType {
  genres: Genre[];
}

export const GenreContext = createContext<GenreContextType>({ genres: [] });

export const GenreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreData: GenreData = await getMovieGenres();
        setGenres(genreData.genres);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <GenreContext.Provider value={{ genres }}>
      {children}
    </GenreContext.Provider>
  );
};
