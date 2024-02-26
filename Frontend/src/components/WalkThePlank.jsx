import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"

export default function WalkThePlank(){
    const { user } = useContext(UserContext)
    return(
        <div className="parent">
        <img src={"../../images/scroll2.png"} className="title-scroll"/>
        <div className="scroll-child">   
          <h2>(player) <br/>
          must walk the plank...</h2>
        </div>
        </div>
    )
}