import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getAvatars } from "../utils";
import PlayerCard from "./PlayerCard";
import AvatarButton from "./AvatarButton";

export default function LobbyPage() {

  const navigate = useNavigate()
  const [chosenAvatar, setChosenAvatar] = useState(null)
  const { users, user } = useContext(UserContext);
  const { room_code } = useParams();


  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    getAvatars().then((data) => {
        const {Avatars} = data
        setAvatars(Avatars)
    });
  }, []);

  function handleStart(){
    navigate(`/rooms/${room_code}/play`)
  }

  return (
    <>
    <main>
      <h2>{room_code}</h2>
      {users.map((player) => (
        <PlayerCard key={player.username} player={player}/>
      ))}

      <div className="avatar-buttons">
        <h3>Choose an avatar:</h3>
        {avatars.map((avatar, index) => {
           return <AvatarButton key={index} avatar={avatar} user={user} setChosenAvatar={setChosenAvatar} chosenAvatar={chosenAvatar}/>
        })}
        <br/>
      </div>
      <button onClick={handleStart}>Start Game!</button>
    </main>
    </>
  );
}
