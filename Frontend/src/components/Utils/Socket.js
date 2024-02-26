import { io } from "socket.io-client";

const URL = "https://pirate-game-react.onrender.com/";
const socket = io(URL);

export default socket;
