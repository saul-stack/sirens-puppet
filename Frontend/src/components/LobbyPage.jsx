import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getAvatars } from "./Utils/utils";
import PlayerCard from "./PlayerCard";
import AvatarButton from "./AvatarButton";
import socket from "./Utils/Socket";
import Timer from "./Timer";

export default function LobbyPage({ users, setUsers, roomName }) {
  const minimumPlayers = 4;

  const navigate = useNavigate();
  const [chosenAvatar, setChosenAvatar] = useState(null);
  const { user } = useContext(UserContext);
  const { room_code } = useParams();
  const [avatars, setAvatars] = useState([]);

  const playerList = [];
  users.flat().map((user) => {
    if (!playerList.some((player) => player.username === user)) {
      playerList.push({ username: user });
    }
  });

  let totalPlayers = users.length;

  const [totalPLayers, setTotalPlayers] = useState(users.length);
  console.log("in the beginning, totalPLayers = ", totalPlayers);
  console.log("in the beginning, users.length = ", users.length);

  const [players, setPlayers] = useState(() => [...playerList]);

  //totalPlayers should refresh to reflect number of players in room

  useEffect(() => {
    setTotalPlayers(users.length);
    console.log("inside useEffect, users.length =", users.length);
    console.log("inside useEffect, totalPlayers=", totalPLayers);
  }, [users.length]);

  useEffect(() => {
    socket.emit("frontend_send_users", { room: room_code });

    getAvatars()
      .then((data) => {
        const { Avatars } = data;
        setAvatars(Avatars);
      })
      .catch((err) => {
        setIsError(true);
        setError(err);
      });
  }, []);

  function handleStart() {
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
      <main
        style={{
          // backgroundColor: "rgba(32, 178, 170, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.9)",
        }}
      >
        <h2 style={{ fontSize: "5vw" }}>{room_code}</h2>

        <PlayerCard key={user.username} player={user} />
        {playerList.map((player) => {
          if (player.username !== user.username) {
            return <PlayerCard key={player.username} player={player} />;
          }
        })}
        <div className="avatar-buttons">
          <h3 style={{ fontSize: "2vw" }}>Choose an avatar:</h3>

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

        {totalPlayers < minimumPlayers && (
          <p className="error-message">Not enough players</p>
        )}
        <button onClick={handleStart} disabled={totalPlayers < minimumPlayers}>
          Start Game!
        </button>
      </main>
    </>
  );
}
