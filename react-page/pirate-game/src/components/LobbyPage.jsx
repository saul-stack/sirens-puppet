import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getAvatars } from "../utils/utils";
import PlayerCard from "./PlayerCard";
import AvatarButton from "./AvatarButton";
import socket from "../utils/Socket";

export default function LobbyPage({ users, roomName }) {
  const navigate = useNavigate();
  const [chosenAvatar, setChosenAvatar] = useState(null);
  const { user } = useContext(UserContext);
  const { room_code } = useParams();

  const playerList = []
    users.map((user) => {
      if(!playerList.includes(user)){

        playerList.push( {username: user})
      }
    })

  console.log(users, '<<users');
  console.log(playerList, '<<playerList');
  console.log(roomName);

  const [players, setPlayers] = useState(() => [...playerList]);
  console.log(players, '<<players');

  // const players = users
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    socket.emit("frontend_send_users", {room: roomName})
    getAvatars().then((data) => {
      const { Avatars } = data;
      setAvatars(Avatars);
    });
  }, []);

  function handleStart() {
    navigate(`/rooms/${room_code}/play`);
  }

  return (
    <>
      <h2>{room_code}</h2>
      <PlayerCard key={user.username} player={user} />
      {playerList.map((player) => {
        {console.log(player, '<<player', user.username)}
        if (player.username !== user.username) {
          return <PlayerCard key={player.username} player={player} />;
        }
      })}
      <div className="avatar-buttons">
        <h3>Choose an avatar:</h3>
        {avatars.map((avatar, index) => {
          return (
            <AvatarButton
              key={index}
              avatar={avatar}
              setPlayers={setPlayers}
              user={user}
              setChosenAvatar={setChosenAvatar}
              chosenAvatar={chosenAvatar}
            />
          );
        })}
        <br />
      </div>
      <button onClick={handleStart}>Start Game!</button>
    </>
  );
}
