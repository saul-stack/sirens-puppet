export default function Mute({setIsMute, stop, isMute, playMusic, setMusicPlaying}){

    function handleMute(){
            setMusicPlaying(false)
            setIsMute(true)
            stop()
        } 

    function handleUnmute(){
        setIsMute(false)
        playMusic()
    }
         
    return (
        <>
        <button onClick={handleMute} className='mute'>
          Mute
        </button>
        {isMute && (
          <button onClick={(handleUnmute)} className='mute'>
            Unmute
          </button>
        )}
      </>
    );
  }