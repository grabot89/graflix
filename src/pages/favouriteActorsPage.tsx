import React, { useContext, useState } from "react"
import PageTemplate from "../components/templateActorListPage";
import { useQueries } from "react-query";
import { getMovieActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFollowing from "../components/cardIcons/removeFromFollowing";
import useFiltering from "../hooks/useFiltering";
import ActorFilterUI, {
  nameFilter,
} from "../components/actorFilterUI";
import { ActorsContext } from "../contexts/actorsContext";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const nameFiltering = {
  name: "title",
  value: "",
  condition: nameFilter,
};

const FavouriteActorsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [actorsPerPage] = useState(8);

  const { follows: actorIds } = useContext(ActorsContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [nameFiltering]
  );

  // Create an array of queries and run them in parallel.
  const favouriteActorsQueries = useQueries(
    actorIds.map((actorId) => {
      return {
        queryKey: ["actor", actorId],
        queryFn: () => getMovieActor(actorId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteActorsQueries.find((a) => a.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteActorsQueries.map((q) => q.data);
  const displayedActors = allFavourites
    ? filterFunction(allFavourites)
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = [changedFilter, filterValues[1]]
      setFilterValues(updatedFilterSet);
  };

  const indexOfLastActor = currentPage * actorsPerPage;
  const indexOfFirstActor = indexOfLastActor - actorsPerPage;
  const currentActors = displayedActors.slice(indexOfFirstActor, indexOfLastActor);

  const totalPages = Math.ceil(displayedActors.length / actorsPerPage);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <PageTemplate
        title="Favourite Actors"
        actors={currentActors}
        action={(actor) => {
          return (
            <>
              <RemoveFromFollowing {...actor} />
            </>
          );
        }}
      />
      <ActorFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
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

export default FavouriteActorsPage;