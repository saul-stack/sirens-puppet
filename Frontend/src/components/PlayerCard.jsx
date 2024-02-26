import { PiUserCircle } from "react-icons/pi";

export default function PlayerCard({player}){
    return(
        <div className="player-card">
            {console.log(player)}
            {player.avatarURL ? (<img width="80" src={player.avatarURL}/>) : (<PiUserCircle />)}
            <h3>{player.username}</h3>
        </div>
    )
}