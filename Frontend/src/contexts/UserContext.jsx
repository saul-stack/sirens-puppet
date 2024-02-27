import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({username : '', avatarURL: null, isSaboteur: false})
    const [lives, setLives] = useState(3)

    return (
        <UserContext.Provider value={{ users, setUsers, user, setUser, lives, setLives }}>{children}</UserContext.Provider>
    )
}