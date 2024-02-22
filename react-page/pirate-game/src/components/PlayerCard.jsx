export default function PlayerCard({player}){
    return(
        <div className="player-card">
            {player.avatar ? (<img src={player.avatar}/>) : null}
            <h3>{player.username}</h3>
        </div>
    )
}