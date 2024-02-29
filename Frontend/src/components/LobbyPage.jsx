import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getAvatars } from "./Utils/utils";
import PlayerCard from "./PlayerCard";
import AvatarButton from "./AvatarButton";
import socket from "./Utils/Socket";
import Timer from "./Timer";

export default function LobbyPage({ users, setUsers, roomName, playerList }) {
  const { usersArray, setUsersArray } = useContext(UserContext);
  const minimumPlayers = 1;

  const navigate = useNavigate();
  const [chosenAvatar, setChosenAvatar] = useState(null);
  const { user } = useContext(UserContext);
  const { room_code } = useParams();
  const [avatars, setAvatars] = useState([]);

  users.flat().map((user) => {
    if (!playerList.some((player) => player.username === user)) {
      playerList.push({ username: user });
    }
  });

  const totalPlayers = playerList.length;

  const [players, setPlayers] = useState(() => [...playerList]);

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

    function onStartGame() {
      //start a countdown of 5 secs and the navigate
      navigate(`/rooms/${room_code}/role`);
    }

    socket.on("backend_start_game", onStartGame);
  }, []);

  const [saboteur, setSaboteur] = useState();

  function handleStart() {
    if (totalPlayers > 0) {
      const randomIndex = Math.floor(Math.random() * totalPlayers);
      setSaboteur(playerList[randomIndex]);
      if (playerList[randomIndex].username === user.username) {
        user.isSaboteur = true;
        playerList[randomIndex].isSaboteur = true;
        socket.emit("frontend_saboteur", {
          saboteur: playerList[randomIndex].username,
        });
      }
    }

    socket.emit("frontend_start_game");
  }

  useEffect(() => {
    function allPlayers(data) {
      const username = data.saboteur;

      playerList.map((player) => {
        if (player.username !== username) {
          player.isSaboteur = false;
        } else {
          player.isSaboteur = true;
        }
      });
    }

    socket.on("backend_saboteur", allPlayers);

    return () => {
      socket.off("backend_saboteur", allPlayers);
    };
  }, []);

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
