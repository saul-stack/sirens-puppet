import { useContext } from "react";
import { LivesContext } from "../contexts/LivesContext";

export default function Lives(){
    const { lives } = useContext(LivesContext)
    const steeringWheel = () => {
        const steeringWheels = [];
        for (let i = 0; i < lives; i++) {
            steeringWheels.push(
            <img
            className='steering-wheel'
              key={i}
              src="../../images/steering-wheel.png" 
              alt={`|`}
            />
          );
        }
        return steeringWheels;
      };
    
      return <div>{steeringWheel()}</div>;
    }