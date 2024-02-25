import { MdMusicOff } from "react-icons/md"
import { MdMusicNote } from "react-icons/md"

export default function Mute({ setIsMute, isMute, stopMusic, musicPlaying, playMusic}) {

  function handleClick() {
    setIsMute((prevIsMute) => !prevIsMute);  
    if (!isMute){
    stopMusic()
    } else if (musicPlaying){
      playMusic()
    }
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
