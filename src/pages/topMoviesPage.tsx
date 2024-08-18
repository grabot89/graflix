import React, { useState } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { BaseMovieProps } from "../types/interfaces";
import { getBestMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
    qualityFilter,
  } from "../components/movieFilterUI";
import { DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Fuse from "fuse.js";
import AddToThemedPlaylistIcon from "../components/cardIcons/addToThemedPlaylist";
import { useAuth } from "../hooks/useAuth";

const titleFiltering = {
    name: "title",
    value: "",
    condition: titleFilter,
  };
  
  const genreFiltering = {
    name: "genre",
    value: "0",
    condition: genreFilter,
  };

  const qualityFiltering = {
    name: "quality",
    value: "",
    condition: qualityFilter,
  };

const TopMoviesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);
  const { session } = useAuth();
  
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("top", getBestMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering, qualityFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = filterValues.map(filter =>
      filter.name === type ? changedFilter : filter
    );
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];

  const fuse = new Fuse(movies, {
    keys: ['title'],
    threshold: 0.5,
  });
  
  const displayedMovies = filterFunction(movies);

  const filteredMovies = filterValues[0].value ? 
    fuse.search(filterValues[0].value).map(result => result.item) : 
    displayedMovies;

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <PageTemplate
        title='Discover the best rated movies'
        movies={currentMovies}
        action={(movie: BaseMovieProps) => (
          <>
            <AddToPlaylistIcon {...movie} />
            {session && <AddToThemedPlaylistIcon {...movie} />}
          </>
        )}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        qualityFilter={filterValues[2].value}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ 
            backgroundColor: 'maroon',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        />
      </Box>
    </>
  );
};
export default TopMoviesPage;