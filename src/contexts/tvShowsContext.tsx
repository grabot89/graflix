import React, { useState, useCallback } from "react";
import { BaseTvShowProps, Review } from "../types/interfaces";

interface TvShowContextInterface {
    favourites: number[];
    addToFavourites: ((tvShow: BaseTvShowProps) => void);
    removeFromFavourites: ((tvShow: BaseTvShowProps) => void);
    addReview: ((tvShow: BaseTvShowProps, review: Review) => void);
    playlist: number[];
    addToPlaylist: ((tvShow: BaseTvShowProps) => void);
}

const initialContextState: TvShowContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (tvShow, review) => { tvShow.id, review},
    playlist: [],
    addToPlaylist: () => {},
};

export const TvShowsContext = React.createContext<TvShowContextInterface>(initialContextState);

const TvShowsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>( [] )
    const [playlist, setPlaylist] = useState<number[]>([]);

    const addToFavourites = useCallback((tvShow: BaseTvShowProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(tvShow.id)) {
                return [...prevFavourites, tvShow.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((tvShow: BaseTvShowProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((tId) => tId !== tvShow.id));
    }, []);

    const addReview = (tvShow:BaseTvShowProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [tvShow.id]: review } )
    };

    const addToPlaylist = useCallback((tvShow: BaseTvShowProps) => {
        setPlaylist((prevPlaylist) => {
            if (!prevPlaylist.includes(tvShow.id)) {
                return [...prevPlaylist, tvShow.id];
            }
            return prevPlaylist;
        });
    }, []);

    return (
        <TvShowsContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                playlist,
                addToPlaylist,
            }}
        >
            {children}
        </TvShowsContext.Provider>
    );
};

export default TvShowsContextProvider;