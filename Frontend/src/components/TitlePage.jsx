import { useNavigate } from "react-router-dom";

export default function TitlePage({isMute, playMusic, setMusicPlaying}) {
  const navigate = useNavigate()

  function handleClick(){
    navigate("/story")
    setMusicPlaying(true)
    if (isMute){
    playMusic()
    }
  }

  return (
    <>
    <center>
      <div className="parent">
        <img src={"../../images/scroll2.png"} className="title-scroll"/>
        <div className="scroll-child">
          <h1>The Siren's Wrath</h1>
        </div>
      </div>
      <button onClick={handleClick}>Start Game</button>
    </center>
    </>
  );
}
