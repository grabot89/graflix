import React, { useContext, useState } from "react"
import PageTemplate from "../components/templateMovieListPage";
import { useQueries } from "react-query";
import { getTvShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import useFiltering from "../hooks/useFiltering";
import TvShowFilterUI, {
  nameFilter,
  genreFilter,
} from "../components/tvShowFilterUI";
import { TvShowsContext } from "../contexts/tvShowsContext";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

const nameFiltering = {
  name: "title",
  value: "",
  condition: nameFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const FavouriteTvShowsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tvShowsPerPage] = useState(8);

  const { favourites: tvShowIds } = useContext(TvShowsContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [nameFiltering, genreFiltering]
  );

  // Create an array of queries and run them in parallel.
  const favouriteTvShowQueries = useQueries(
    tvShowIds.map((tvShowId) => {
      return {
        queryKey: ["tvShow", tvShowId],
        queryFn: () => getTvShow(tvShowId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTvShowQueries.find((t) => t.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteTvShowQueries.map((q) => q.data);
  const displayedTvShows = allFavourites
    ? filterFunction(allFavourites)
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "name" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const indexOfLastTvShow = currentPage * tvShowsPerPage;
  const indexOfFirstMovie = indexOfLastTvShow - tvShowsPerPage;
  const currentTvShows = displayedTvShows.slice(indexOfFirstMovie, indexOfLastTvShow);

  const totalPages = Math.ceil(displayedTvShows.length / tvShowsPerPage);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <PageTemplate
        title="Favourite TV Shows"
        movies={currentTvShows}
        action={(tvShow) => {
          return (
            <>
              <RemoveFromFavourites {...tvShow} />
              <WriteReview {...tvShow} />
            </>
          );
        }}
      />
      <TvShowFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
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

export default FavouriteTvShowsPage;