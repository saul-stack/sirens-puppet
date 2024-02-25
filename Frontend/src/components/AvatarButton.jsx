import { useState } from "react"

export default function AvatarButton({avatar, setPlayers, user, setChosenAvatar, chosenAvatar}) {
    
    function handleAvatarClick(avatar){
        user.avatarURL = avatar
        setChosenAvatar(avatar)
        setPlayers((currentPlayers) => {
            const updatedPlayers = currentPlayers.map((player) => {
               if(player.username === user.username){
                player.avatarURL = avatar
                } else return player
            })
            return [...updatedPlayers]
        })
    }

    return <img className={chosenAvatar===avatar ? "avatar-clicked" : "avatar"} src={avatar} alt="pirate avatar" onClick={() => handleAvatarClick(avatar)}/>
}