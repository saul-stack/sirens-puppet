import { useNavigate } from "react-router-dom";

export default function JoinRoom(){
    let navigate = useNavigate();

    function handleClick(room_code){
        navigate(`/rooms/${room_code}`);
    }

    return (
        <main className='room-container'>
             <div className="room-scroll-parent">
                <img src={"../../images/scroll2.png"} className="title-scroll"/>
                    <div className="room-child">
                        <h1> Pick a Ship!</h1>
                    </div>
            </div>
            <div className = 'room-button-container'>
            <li>
                <button onClick={() => handleClick(room_code)}>Ship 1</button>
            </li>
            <li>
                <button onClick={() => handleClick(room_code)}>Ship 2</button>
            </li>
            </div>
        </main>

    )
}

