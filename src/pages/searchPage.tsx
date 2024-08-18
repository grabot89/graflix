import React, { useState } from "react";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import SearchBar from "../components/searchBar";
import { getMoviesBySearch, getTvShowsBySearch, getActorsBySearch } from "../api/tmdb-api";
import MovieListPageTemplate from "../components/templateMovieListPage";
import { BaseActorProps, BaseMovieProps, BaseTvShowProps } from "../types/interfaces";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import TvShowListPageTemplate from "../components/templateTvShowListPage";
import ActorListPageTemplate from "../components/templateActorListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToTVFavourites";
import AddToFollowingIcon from "../components/cardIcons/addToFollowing";

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [currentTvShowPage, setCurrentTvShowPage] = useState(1);
  const [currentActorPage, setCurrentActorPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const {
    data: movieData,
    error: movieError,
    isLoading: movieLoading,
  } = useQuery(["moviesSearch", searchTerm], () =>
    getMoviesBySearch(searchTerm)
  );

  const {
    data: tvData,
    error: tvError,
    isLoading: tvLoading,
  } = useQuery(["tvSearch", searchTerm], () =>
    getTvShowsBySearch(searchTerm)
  );

  const {
    data: actorData,
    error: actorError,
    isLoading: actorLoading,
  } = useQuery(["actorsSearch", searchTerm], () =>
    getActorsBySearch(searchTerm)
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentMoviePage(1);
    setCurrentTvShowPage(1);
    setCurrentActorPage(1);
  };

  if (movieLoading || tvLoading || actorLoading) return <Spinner />;
  // @ts-ignore
  if (movieError) return <h1>{movieError.message}</h1>;
  // @ts-ignore
  if (tvError) return <h1>{tvError.message}</h1>;
  // @ts-ignore
  if (actorError) return <h1>{actorError.message}</h1>;

  const movies = movieData?.results || [];

  const indexOfLastMovie = currentMoviePage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalMoviePages = Math.ceil(movies.length / itemsPerPage);

  const tvShows = tvData?.results || [];

  const indexOfLastTvShow = currentTvShowPage * itemsPerPage;
  const indexOfFirstTvShow = indexOfLastTvShow - itemsPerPage;
  const currentTvShows = tvShows.slice(indexOfFirstTvShow, indexOfLastTvShow);
  const totalTvShowPages = Math.ceil(tvShows.length / itemsPerPage);

  const actors = actorData?.results || [];

  const indexOfLastActor = currentActorPage * itemsPerPage;
  const indexOfFirstActor = indexOfLastActor - itemsPerPage;
  const currentActors = actors.slice(indexOfFirstActor, indexOfLastActor);
  const totalActorPages = Math.ceil(actors.length / itemsPerPage);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      
      <MovieListPageTemplate
        title="Movies"
        movies={currentMovies}
        action={(movie: BaseMovieProps) => <AddToPlaylistIcon {...movie} />}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalMoviePages}
          page={currentMoviePage}
          onChange={(_e, value) => setCurrentMoviePage(value)}
          color="primary"
        />
      </Box>

      <TvShowListPageTemplate
        title="TV Shows"
        tvShows={currentTvShows}
        action={(tvShow: BaseTvShowProps) => <AddToFavouritesIcon {...tvShow} />}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalTvShowPages}
          page={currentTvShowPage}
          onChange={(_e, value) => setCurrentTvShowPage(value)}
          color="primary"
        />
      </Box>

      <ActorListPageTemplate
        title="Actors"
        actors={currentActors}
        action={(actor: BaseActorProps) => <AddToFollowingIcon {...actor} />}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalActorPages}
          page={currentActorPage}
          onChange={(_e, value) => setCurrentActorPage(value)}
          color="primary"
        />
      </Box>
    </>
  );
};

export default SearchPage;
