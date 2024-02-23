import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getAvatars } from "../utils";
import PlayerCard from "./PlayerCard";
import AvatarButton from "./AvatarButton";

export default function LobbyPage() {
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
      {players.map((player) => {
        return <PlayerCard key={player.username} player={player} />;
      })}
      <div className="avatar-buttons">
        {avatars.map((avatar, index) => {
           return <AvatarButton key={index} avatar={avatar} setPlayers={setPlayers} user={user}/>
        })}
        <br/>
        </div>
    </>
  );
}
