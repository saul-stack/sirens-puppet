import { useNavigate } from "react-router-dom";

export default function TitlePage({playMusic, setMusicPlaying}) {
  const navigate = useNavigate()

  function handleClick(){
    navigate("/story")
    setMusicPlaying(true)
    playMusic()
  }

  return (
    <>
    <center>
      <div className="parent">
        <img src={"../../images/scroll2.png"} className="title-scroll"/>
        <div className="child">
          <h1>(Game Title)</h1>
        </div>
      </div>
      <button onClick={handleClick}>Start Game</button>
    </center>
    </>
  );
}
