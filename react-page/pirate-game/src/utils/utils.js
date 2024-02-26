import axios from 'axios'

export function getAvatars(){
    return axios.get("https://pirate-game-y566.onrender.com/avatars").then((response) => {
        return response.data
    })
}
