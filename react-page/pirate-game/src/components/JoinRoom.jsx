import { useNavigate } from "react-router-dom";

export default function JoinRoom(){
    let navigate = useNavigate();

    function handleClick(code){
        navigate(`/rooms/${code}`);
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
                <button>Ship 1</button>
            </li>
            <li>
                <button>Ship 2</button>
            </li>
            </div>
        </main>

    )
}

