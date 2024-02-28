import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function WalkThePlank() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  return (
    <div className="parent">
      <img src={"../../images/scroll2.png"} className="title-scroll" />
      <div className="scroll-child">
        <h2>
          (player) <br />
          must walk the plank...
        </h2>
        <button
          onClick={() => {
            navigate("/rooms");
          }}
        >
          Return to port
        </button>
      </div>
    </div>
  );
}
