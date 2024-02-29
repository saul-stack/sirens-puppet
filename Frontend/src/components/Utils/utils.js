import axios from 'axios'

export function getAvatars() {
    return axios.get("https://pirate-game-y566.onrender.com/avatars").then((response) => {
        return response.data
    })
}

export function getPictonaryPrompts() {
    return axios.get("https://pirate-game-y566.onrender.com/pictionaryPrompts").then((response) => {
        return response.data
    })
}

export function getMost(votes){
    return Object.keys(votes).filter((x) => {
        return votes[x] == Math.max.apply(null, Object.values(votes))
    })
}