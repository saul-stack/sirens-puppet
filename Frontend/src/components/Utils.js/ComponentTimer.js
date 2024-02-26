import { useState } from "react";


const ComponentTimer = ({ defaultState = false }) => {
  const [component, setComponent] = useState(defaultState);

  const useTrigger = ({ duration }) => () => {
    setComponent(!defaultState);
    setTimeout(() => {
      setComponent(defaultState);
    }, duration);
  };
  return {
    component,
    useTrigger
  };
};

export default ComponentTimer;
