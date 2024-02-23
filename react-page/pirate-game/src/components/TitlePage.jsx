import { useNavigate } from "react-router-dom";

export default function TitlePage({playMusic, setMusicPlaying}) {
  const navigate = useNavigate()

  function handleClick(){
    navigate("/story")
    setMusicPlaying(true)
    playMusic()
  }

  function handleTesting(){
    navigate("/testing")
  }

  return (
    <>
    <center>
      <div className="parent">
        <img src={"../../images/scroll2.png"} className="title-scroll"/>
        <div className="scroll-child">
          <h1>The Sirens Wrath</h1>
        </div>
      </div>
      <button onClick={handleClick}>Start Game</button>
      <button onClick={handleTesting}>Testing</button>
    </center>
    </>
  );
}
