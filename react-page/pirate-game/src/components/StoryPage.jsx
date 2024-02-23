import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import CandleBackground from "./CandleBackground";

export default function StoryPage() {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();
  const [username, setUsername] = useState("");

  function handleJoin() {
    user.username = username;
    navigate("/rooms");
  }
  function handleCreate() {
    user.username = username;
    navigate("/newRoom");
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
    <CandleBackground />
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
