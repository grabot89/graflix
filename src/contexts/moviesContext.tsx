import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    addToFavourites: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    addReview: ((movie: BaseMovieProps, review: Review) => void);  // NEW
    playlist: number[];
    addToPlaylist: ((movie: BaseMovieProps) => void);
    removeFromPlaylist: ((movie: BaseMovieProps) => void);
    themedPlaylists: Record<string, number[]>;
    addToThemedPlaylist: (movie: BaseMovieProps) => void;
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (movie, review) => { movie.id, review},  // NEW
    playlist: [],
    addToPlaylist: () => {},
    removeFromPlaylist: () => {},
    themedPlaylists: {},
    addToThemedPlaylist: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>( [] );
    const [playlist, setPlaylist] = useState<number[]>([]);
    const [themedPlaylists, setThemedPlaylists] = useState<Record<string, number[]>>({});

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    const addReview = (movie:BaseMovieProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
    };

    const addToPlaylist = useCallback((movie: BaseMovieProps) => {
        setPlaylist((prevPlaylist) => {
            if (!prevPlaylist.includes(movie.id)) {
                return [...prevPlaylist, movie.id];
            }
            return prevPlaylist;
        });
    }, []);

    const removeFromPlaylist = useCallback((movie: BaseMovieProps) => {
        setPlaylist((prevPlaylist) => prevPlaylist.filter((mId) => mId !== movie.id));
    }, []);

    const addToThemedPlaylist = (movie: BaseMovieProps) => {
        const { genre_ids } = movie;
    
        // @ts-ignore
        genre_ids.forEach((genre) => {
          setThemedPlaylists((prev) => ({
            ...prev,
            [genre]: prev[genre] ? [...prev[genre], movie.id] : [movie.id],
          }));
        });
      };

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                playlist,
                addToPlaylist,
                removeFromPlaylist,
                themedPlaylists,
                addToThemedPlaylist
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;