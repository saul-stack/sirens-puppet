import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null)

    return (
        <UserContext.Provider value={{users, setUsers, user, setUser}}>{children}</UserContext.Provider>
    )
}