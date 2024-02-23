import { MdMusicOff } from "react-icons/md"
import { MdMusicNote } from "react-icons/md"

export default function Mute({ setIsMute, isMute, playMusic, setMusicPlaying }) {

  function handleClick() {
    setIsMute((prevIsMute) => !prevIsMute);
    if (isMute){
      setMusicPlaying(false)
    }
    else{
      setMusicPlaying((prevMusicPlaying) => !prevMusicPlaying)
    }
    playMusic()
  }

  return (
    <>
      {isMute ? (
        <MdMusicOff size={30}onClick={handleClick} className='mute' />
      ) : (
        <MdMusicNote size={30}onClick={handleClick} className='mute' />
      )}
    </>
  );
}
