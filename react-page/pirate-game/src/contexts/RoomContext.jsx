import { createContext, useState } from "react";

/*not entirely set on if we'd need this or what for yet but made it just in case,
might be handy for something room/url related*/

export const RoomContext = createContext()

export const RoomProvider = ({children}) => {
    const [room, setRoom] = useState("")

    return (
        <RoomContext.Provider value={{room, setRoom}}>{children}</RoomContext.Provider>
    )
}