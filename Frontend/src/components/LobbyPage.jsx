import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getAvatars } from "./Utils/utils";
import PlayerCard from "./PlayerCard";
import AvatarButton from "./AvatarButton";
import socket from "./Utils/Socket";

export default function LobbyPage({ users, setUsers, roomName }) {
  const navigate = useNavigate();
  const [chosenAvatar, setChosenAvatar] = useState(null);
  const { user } = useContext(UserContext);
  const { room_code } = useParams();

  console.log(room_code);

  const playerList = [];
  users.flat().map((user) => {
    playerList.push({username: user})
})
console.log(users, '<<users');
console.log(playerList);


  const [players, setPlayers] = useState(() => [...playerList]);

  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    socket.emit("frontend_send_users", { room: room_code });
    console.log("inside use effect");
    getAvatars()
      .then((data) => {
        const { Avatars } = data;
        setAvatars(Avatars);
      })
      .catch((err) => {
        setIsError(true);
        setError(err);
      });
  }, [players]);

  function handleStart() {
    const totalPlayers = users.length;
    if (totalPlayers > 0) {
      const randomIndex = Math.floor(Math.random() * totalPlayers);
      setUsers((prevUsers) =>
        prevUsers.map((prevUser, index) =>
          index === randomIndex ? { ...prevUser, isSaboteur: true } : prevUser
        )
      );
      if (users[randomIndex].username === user.username) {
        user.isSaboteur = true;
      }
    }
    navigate(`/rooms/${room_code}/role`);
  }

  return (
    <>
      <main>
        <h2>{room_code}</h2>
        {console.log(playerList)}
        <PlayerCard key={user.username} player={user} />
        {playerList.map((player) => {
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
      </main>
    </>
  );
}
