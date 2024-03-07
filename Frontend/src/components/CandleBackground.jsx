import React, { useState, useEffect } from "react";
import "../CandleBackground.css";

export default function CandleBackground() {
  const [blowOut, setBlowOut] = useState(false);
  const [darkOverlayOpacity, setDarkOverlayOpacity] = useState(0);

  const handleBlowOut = () => {
    setBlowOut(!blowOut);
  };

  useEffect(() => {
    let intervalId;
    if (blowOut && darkOverlayOpacity < 0.7) {
      intervalId = setInterval(() => {
        setDarkOverlayOpacity((prevOpacity) => {
          const newOpacity = prevOpacity + 0.1;
          return newOpacity >= 0.7 ? 0.7 : newOpacity;
        });
      }, 500);
    } else if (!blowOut && darkOverlayOpacity > 0) {
      intervalId = setInterval(() => {
        setDarkOverlayOpacity((prevOpacity) => {
          const newOpacity = prevOpacity - 0.5;
          return newOpacity <= 0 ? 0 : newOpacity;
        });
      }, 500);
    }

    return () => clearInterval(intervalId);
  }, [blowOut, darkOverlayOpacity]);

  return (
    <>
      <div
        className={`holder ${blowOut ? "blow-out" : ""}`}
        style={{
          position: "absolute",
          top: "1%",
          left: "1%",
          width: "0%",
          height: "0%",
        }}
      >
        <div className="candle">
          <div className="blinking-glow"></div>
          <div className="thread"></div>
          <div className="glow"></div>
          <div className="flame"></div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "1%",
          right: "8%",
          width: "0%",
          height: "0%",
        }}
        className={`holder ${blowOut ? "blow-out" : ""}`}
      >
        <div className="candle">
          <div className="blinking-glow"></div>
          <div className="thread"></div>
          <div className="glow"></div>
          <div className="flame"></div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "-13%",
          left: "1%",
          width: "%",
          height: "1%",
        }}
        className={`holder ${blowOut ? "blow-out" : ""}`}
      >
        <div className="candle">
          <div className="blinking-glow"></div>
          <div className="thread"></div>
          <div className="glow"></div>
          <div className="flame"></div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "-13%",
          right: "-2%",
          width: "10%",
          height: "1%",
        }}
        className={`holder ${blowOut ? "blow-out" : ""}`}
      >
        <div className="candle">
          <div className="blinking-glow"></div>
          <div className="thread"></div>
          <div className="glow"></div>
          <div className="flame"></div>
        </div>
      </div>

      {blowOut && (
        <div
          className="dark-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: `rgba(0, 0, 0, ${darkOverlayOpacity})`,
            zIndex: 999,
          }}
        ></div>
      )}

      <button
        onClick={handleBlowOut}
        style={{
          position: "fixed",
          top: "10%",
          left: "10px",
          outline: "none",
          border: "none",
          backgroundColor: "transparent",
          zIndex: 1000,
        }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSi0Iqv1BnlP0TbscmOSV116GmUwuFkDZC5KQLkv1HKl2gEFxLFfhvNdXzn3UEnDPUJ74&usqp=CAU"
          alt={blowOut ? "Turn On Candle" : "Blow Out Candle"}
          style={{ width: "10mm", height: "10mm" }}
        />
      </button>
    </>
  );
}
