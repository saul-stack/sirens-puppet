import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getAvatars } from "../utils";
import PlayerCard from "./PlayerCard";
import AvatarButton from "./AvatarButton";

export default function LobbyPage() {
  const [chosenAvatar, setChosenAvatar] = useState(null)
  const { user } = useContext(UserContext);
  const { room_code } = useParams();
  const [players, setPlayers] = useState([
    { username: "player1" },
    { username: "player2" },
    { username: "player3" },
    { username: "player4" },
    { username: "player5" },
  ]);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    getAvatars().then((data) => {
        const {Avatars} = data
        setAvatars(Avatars)
    });
  }, []);


  return (
    <>
      <h2>{room_code}</h2>
      <PlayerCard key={user.username} player={user}/>
      {players.map((player) => {
        if(player.username !== user.username){
          return <PlayerCard key={player.username} player={player} />;
        }
      })}
      <div className="avatar-buttons">
        <h3>Choose an avatar:</h3>
        {avatars.map((avatar, index) => {
           return <AvatarButton key={index} avatar={avatar} setPlayers={setPlayers} user={user} setChosenAvatar={setChosenAvatar} chosenAvatar={chosenAvatar}/>
        })}
        <br/>
      </div>
      <button>Start Game!</button>
    </>
  );
}
