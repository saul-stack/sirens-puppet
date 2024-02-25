import { io } from "socket.io-client";

const URL = "https://pirate-game-react-nser.onrender.com"
const socket = io(URL);

export default socket