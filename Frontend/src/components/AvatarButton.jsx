import { useState, useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export default function AvatarButton({avatar, user, setChosenAvatar, chosenAvatar}) {
    const { users, setUsers } = useContext(UserContext)
    
    function handleAvatarClick(avatar) {
        setChosenAvatar(avatar);
        setUsers((currentUsers) => {
          const updatedUsers = currentUsers.map((player) =>
            player.username === user.username
              ? { ...player, avatarURL: avatar }
              : player
          );
          return updatedUsers;
        });
      }
    
      return (
        <img
          className={chosenAvatar === avatar ? "avatar-clicked" : "avatar"}
          src={avatar}
          alt="pirate avatar"
          onClick={() => handleAvatarClick(avatar)}
        />
      );
    }