import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import CandleBackground from "./CandleBackground";
import socket from "../utils/Socket";


export default function StoryPage({roomName, username, setUsername}) {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();
  

  function handleJoin() {
    user.username = username;
    navigate("/rooms");
  }
  
  const handleCreate = (event) => {
    user.username = username
    event.preventDefault();
    socket.emit("frontend_create_room", {name: username})
    console.log(roomName);
    if(roomName !== ''){
      navigate(`/rooms/${roomName}`);
    }
  }

  function handleInput(value) {
    setUsername(value);
  }

  return (
  <div className="container">
    <div className="parent">
      <img src={"../../images/scroll.png"} className="story-scroll" />
      <div className="child">
        <p>
          An infamous crew of fearsome pirates sail the seven seas, plundering
          and pillaging all in their wake.
          <br />
          <br />
          Unbeknownst to the rest of the crew, one of the pirates is seduced by
          The Siren, who longs to bring the ship to its watery demise.
          <br />
          <br />
          Will the crew make it to land, or will they be united with The Siren
          for all eternity?
        </p>
      </div>
    </div>
    <form>
      <label htmlFor="username">Enter Username</label>
      <br />
      <input
        value={username}
        onChange={(event) => handleInput(event.target.value)}
        id="username"
        type="text"
        placeholder="Username"
      />

      <br />
      <button onClick={handleJoin}>Join Room</button>
      <button onClick={handleCreate}>Create Room</button>
    </form>
  </div>
  );
}

// (
//       <main className="container">
//         <div className="wrapper">
//           <img src={"../../images/scroll.png"} className="story-scroll" />
//           <div className="story-text">
//            <p>
//              An infamous crew of fearsome pirates sail the seven seas, plundering and pillaging all in their wake.
//              <br />
//              <br />
//              Unbeknownst to the rest of the crew, one of the pirates is seduced by The Siren, who longs to bring the ship to its watery demise.
//              <br />
//              <br />
//              Will the crew make it to land, or will they be united with The Siren for all eternity?
//             </p>
//           </div>
//         <center>
//           <form>
//             <label htmlFor="username">Enter Username</label>
//             <br />
//             <input
//               value={username}
//               onChange={(event) => handleInput(event.target.value)}
//               id="username"
//               type="text"
//               placeholder="Username"
//               />
//               <br />
//               <button onClick={handleJoin}>Join Room</button>
//               <button onClick={handleCreate}>Create Room</button>
//             </form>
//           </center>
//         </div>
//       </main>
//   );
// }
