import { MdMusicOff } from "react-icons/md"
import { MdMusicNote } from "react-icons/md"

export default function Mute({ setIsMute, isMute, stopMusic}) {

  function handleClick() {
    setIsMute((prevIsMute) => !prevIsMute);  
    if (isMute){
    stopMusic()
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
