import { useState } from "react"

export default function AvatarButton({avatar, setPlayers, user}) {
    const [chosenAvatar, setChosenAvatar] = useState(null)

    function handleAvatarClick(avatar){
        setChosenAvatar(null)
        setChosenAvatar(avatar)
        setPlayers((currentPlayers) => {
            const updatedPlayers = currentPlayers.map((player) => {
               if(player.username === user.username){
                player.avatar = avatar
                } else return player
            })
            return [...updatedPlayers]
        })
    }

    return <img className={chosenAvatar===avatar ? "avatar-clicked" : "avatar"} src={avatar} alt="pirate avatar" onClick={() => handleAvatarClick(avatar)}/>
}