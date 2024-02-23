import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"

export default function WalkThePlank(){
    const { user } = useContext(UserContext)
    return(
        <main>
            <h1>{user.userName}, you must walk the plank...</h1>
        </main>
    )
}