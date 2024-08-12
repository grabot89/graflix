import React, { useContext } from "react"
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

const nameFiltering = {
  name: "title",
  value: "",
  condition: nameFilter,
};

const FavouriteActorsPage: React.FC = () => {
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

  return (
    <>
      <PageTemplate
        title="Favourite Actors"
        actors={displayedActors}
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
    </>
  );
};

export default FavouriteActorsPage;