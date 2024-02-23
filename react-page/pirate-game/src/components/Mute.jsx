export default function Mute({setIsMute, stop, isMute}){

    function handleClick(){
            setIsMute(true)
            stop()
        } 
         
    return (
        <>
        <button onClick={handleClick} className='mute'>
          Mute
        </button>
        {isMute && (
          <button onClick={() => setIsMute(false)} className='unmute'>
            Unmute
          </button>
        )}
      </>
    );
  }