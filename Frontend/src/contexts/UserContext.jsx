import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usersArray, setUsersArray] = useState([]);
  const [user, setUser] = useState({
    username: "",
    avatarURL: null,
    isSaboteur: false,
  });

  return (
    <UserContext.Provider value={{ usersArray, setUsersArray, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
