export default function Mute({musicPlaying, setMusicPlaying}){

    function handleClick(){
        setMusicPlaying((prevMusicPlaying) => !prevMusicPlaying)
    }

    return (
     <button onClick={handleClick} className='mute'>
    {musicPlaying ? 'Unmute' : 'Mute'}
    </button>
    )
}