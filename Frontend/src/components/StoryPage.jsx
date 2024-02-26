import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import CandleBackground from "./CandleBackground";
import socket from "./Utils/Socket";


export default function StoryPage({roomName, username, setUsername}) {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();
  
  
  function handleJoin() {
    socket.emit("frontend_request_existing_rooms_list");
    user.username = username;
    navigate("/rooms");
  }
  
  const handleCreate = (event) => {
    user.username = username
    event.preventDefault();
    socket.emit("frontend_create_room", {name: username})
    if(roomName !== ''){
      navigate(`/rooms/${roomName}`);
    }
  }

  function handleInput(value) {
    setUsername(value);
  }

  // function setUserRole(){
  //   const totalPlayers = users.length;
  //   if (totalPlayers > 0){
  //     const randomIndex = Math.floor(Math.random() * totalPlayers)
  //     console.log(randomIndex);
  //    setUsers((prevUsers) => 
  //    prevUsers.map((user, index) =>
  //    index === randomIndex ? { ...user, isSaboteur: true} : user
  //    )
  //    )
  //   }
  // }

  // useEffect(() => {
  //   setUserRole()
  // }, [users])
    

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
