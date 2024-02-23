export default function Mute({setIsMute, stop}){

    function handleClick(){
            setIsMute(true)
            stop()
        } 
         
    return (
     <button onClick={handleClick} className='mute'>
    Mute
    </button>
    )
}