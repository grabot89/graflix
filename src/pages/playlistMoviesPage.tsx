import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  qualityFilter,
} from "../components/movieFilterUI";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { GenreContext } from "../contexts/genresContext";

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

const PlaylistMoviesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);

  const { playlist, themedPlaylists } = useContext(MoviesContext);
  const { genres } = useContext(GenreContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering, qualityFiltering]
  );

  const getGenreName = (genreId: number) => {
    const genre = genres.find((g) => g.id === genreId);
    return genre ? genre.name : `Genre ${genreId}`;
  };

  const movieIds = id === "original" ? playlist : themedPlaylists[id] || [];
  
  const playlistMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  const isLoading = playlistMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allPlaylist = playlistMovieQueries.map((q) => q.data);
  const displayedMovies = allPlaylist
    ? filterFunction(allPlaylist)
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = filterValues.map(filter =>
      filter.name === type ? changedFilter : filter
    );
    setFilterValues(updatedFilterSet);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = displayedMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(displayedMovies.length / moviesPerPage);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <PageTemplate
        title={`Playlist: ${id === "original" ? "My Playlist" : `${getGenreName(Number(id))} Playlist`}`}
        movies={currentMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromPlaylist {...movie} />
            </>
          );
        }}
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

export default PlaylistMoviesPage;
