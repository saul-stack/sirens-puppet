import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({username : '', avatarURL: null, isSaboteur: false})

    const setIsSaboteur = (value) => {
        setUser((prevUser) => ({
          ...prevUser,
          isSaboteur: value,
        }));
      };
    

    return (
        <UserContext.Provider value={{users, setUsers, user, setUser, setIsSaboteur}}>{children}</UserContext.Provider>
    )
}