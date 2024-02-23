import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"

export default function PlayerDesignation(){
    const { user } = useContext(UserContext)
    return (
        <main>
            <h2>You are...</h2>
            {user.isSaboteur && (<h1>The Siren's Thrall</h1>)}
            {!user.isSaboteur && (<h1> Part of the crew</h1>)}
        </main>
    )
}