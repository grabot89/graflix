import React from "react";
import PageTemplate from "../components/templateActorListPage";
import { getPopularActors } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import ActorFilterUI, {
  nameFilter,
  adultFilter,
  genderFilter,
} from "../components/actorFilterUI";
import { BaseActorProps, PopularActors } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFollowingIcon from '../components/cardIcons/addToFollowing';

const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};

const adultFiltering = {
  name: "adult",
  value: true,
  condition: adultFilter,
};

const genderFiltering = {
  name: "gender",
  value: "",
  condition: genderFilter,
};

const PopularActorsPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<PopularActors, Error>("popular", getPopularActors);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [nameFiltering, adultFiltering, genderFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string | boolean) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = filterValues.map(filter =>
      filter.name === type ? changedFilter : filter
    );
    setFilterValues(updatedFilterSet);
  };

  const actors = data ? data.results : [];
  const displayedActors = filterFunction(actors);

  return (
    <>
      <PageTemplate
        title="Popular Actors"
        actors={displayedActors}
        action={(actor: BaseActorProps) => {
          return <AddToFollowingIcon {...actor} />
        }}
      />
      <ActorFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        adultFilter={filterValues[1].value as boolean}
        genderFilter={filterValues[2].value as string}
      />
    </>
  );
};
export default PopularActorsPage;
