import { useState, useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export default function AvatarButton({avatar, user, setChosenAvatar, chosenAvatar}) {
    const { setUser, setUsersArray } = useContext(UserContext)
    
    function handleAvatarClick(avatar) {
        setChosenAvatar(avatar);
        setUser((currentUser) => ({
          ...currentUser,
          avatarURL: avatar,
        }));
        setUsersArray((currentUsersArray) =>
      currentUsersArray.map((player) =>
        player.username === user.username
          ? { ...player, avatarURL: avatar }
          : player
      )
    );
  
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