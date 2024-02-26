import { useEffect, useState } from "react";
import ComponentTimer from "./Utils.js/ComponentTimer";
import PlayerDesignation from "./PlayerDesignation";
import RoundPage from "./RoundPage";
import CanvasTestPage from "./CanvasTestPage";


export default function GameRoom() {
    const { component: componentOne, useTrigger: firstComponent } = ComponentTimer({
      defaultState: false,
    });
    const { component: componentTwo, useTrigger: secondComponent } = ComponentTimer({
      defaultState: false,
    });
    const { component: componentThree, useTrigger: thirdComponent } = ComponentTimer({
      defaultState: false,
    });
    const { component: componentFour, useTrigger: fourthComponent} = ComponentTimer({
        defaultState: false
    })
    const { component: componentFive, useTrigger: fifthComponent} = ComponentTimer({
        defaultState: false
    })
    const { component: componentSix, useTrigger: sixthComponent} = ComponentTimer({
        defaultState: false
    }) 
    const { component: componentSeven, useTrigger: seventhComponent} = ComponentTimer({
        defaultState: false
    }) 


    const [round, setRound] = useState(0);

    const triggerFirst = firstComponent({ duration: 3000 });
    const triggerSecond = secondComponent({ duration: 3000 });
    const triggerThird = thirdComponent({ duration : 3000})
    const triggerForth = fourthComponent({ duration: 3000})
    const triggerFifth = fifthComponent({ duration: 3000})
    const triggerSixth = sixthComponent({ duration: 3000 })
    const triggerSeventh = seventhComponent({ duration: 3000 })
  
    useEffect(() => {
      setTimeout(() => {
        triggerFirst();
        setTimeout(() => {
          triggerSecond();
          setTimeout(() => {
            triggerThird()
            setTimeout(() => {
                triggerForth()
                setTimeout(() => {
                    triggerFifth()
                    setTimeout(() => {
                        triggerSixth()
                        setTimeout(() => {
                            triggerSeventh()
                        }, 3000)
                    }, 3000)
                }, 3000)
            }, 3000)
          }, 3000)
        }, 3000);
      }, 0);
    }, []);

    return (
      <main>
        {componentOne && <PlayerDesignation />}
        {componentTwo && <RoundPage round={round} setRound={setRound}/>}
        {componentThree && <CanvasTestPage />}
        {componentFour && <RoundPage round={round} setRound={setRound}/>}
        {componentFive && <CanvasTestPage />}
        {componentSix && <RoundPage round={round} setRound={setRound}/>}
        {componentSeven && <CanvasTestPage />}
      </main>
    );
  }

