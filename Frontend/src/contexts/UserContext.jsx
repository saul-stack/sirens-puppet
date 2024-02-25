import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({username: "", isSaboteur: false, avatarURL: null})

    return (
        <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
    )
}