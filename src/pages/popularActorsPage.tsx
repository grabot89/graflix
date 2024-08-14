import React, { useState } from "react";
import PageTemplate from "../components/templateActorListPage";
import { getPopularActors } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import ActorFilterUI, {
  nameFilter,
} from "../components/actorFilterUI";
import { BaseActorProps, PopularActors } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFollowingIcon from '../components/cardIcons/addToFollowing';
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};

const PopularActorsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [actorsPerPage] = useState(8);

  const { data, error, isLoading, isError } = useQuery<PopularActors, Error>("popularActors", getPopularActors);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [nameFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = [changedFilter, filterValues[1]]
    setFilterValues(updatedFilterSet);
  };

  const actors = data ? data.results : [];
  const displayedActors = filterFunction(actors);

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
        title="Popular Actors"
        actors={currentActors}
        action={(actor: BaseActorProps) => {
          return <AddToFollowingIcon {...actor} />
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
export default PopularActorsPage;
