import { PiUserCircle } from "react-icons/pi";

export default function PlayerCard({player, chosenAvatar}){
    return(
        <div className="player-card">
            {player.avatarURL ? (<img width="80" src={player.avatarURL}/>) : (<PiUserCircle />)}
            <h3>{player.username}</h3>
        </div>
    )
}