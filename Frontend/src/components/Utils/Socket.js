import { io } from "socket.io-client";

// const URL = "https://pirate-game-react.onrender.com";
const URL = "https://team-pirate-game-1.onrender.com"
const socket = io(URL);

export default socket;
