import { createContext, useState } from "react";

export const VotesContext = createContext();

export const VotesProvider = ({children}) => {
    const [votes, setVotes] = useState({})

    return (
        <VotesContext.Provider value={{votes, setVotes}}>{children}</VotesContext.Provider>
    )
}