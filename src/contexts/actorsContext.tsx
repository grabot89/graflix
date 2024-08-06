import React, { useState, useCallback } from "react";
import { BaseActorProps } from "../types/interfaces";

interface ActorContextInterface {
    follows: number[];
    addToFollows: ((movie: BaseActorProps) => void);
    removeFromFollows: ((movie: BaseActorProps) => void);
}

const initialContextState: ActorContextInterface = {
    follows: [],
    addToFollows: () => {},
    removeFromFollows: () => {}
};

export const ActorsContext = React.createContext<ActorContextInterface>(initialContextState);

const ActorsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [follows, setFollows] = useState<number[]>([]);

    const addToFollows = useCallback((actor: BaseActorProps) => {
        setFollows((prevFollows) => {
            if (!prevFollows.includes(actor.id)) {
                return [...prevFollows, actor.id];
            }
            return prevFollows;
        });
    }, []);

    const removeFromFollows = useCallback((actor: BaseActorProps) => {
        setFollows((prevFollows) => prevFollows.filter((aId) => aId !== actor.id));
    }, []);

    return (
        <ActorsContext.Provider
            value={{
                follows,
                addToFollows,
                removeFromFollows,
            }}
        >
            {children}
        </ActorsContext.Provider>
    );
};

export default ActorsContextProvider;