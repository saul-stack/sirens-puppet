import "../CandleBackground.css";

export default function CandleBackground() {
  return (
    <>
      <div
        style={{
          // on the top left corner of the screen
          position: "absolute",
          top: "1%",
          left: "1%",
          width: "0%",
          height: "0%",
        }}
        className="holder"
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
          // on the top right corner of the screen when screen is resized
          position: "absolute",
          top: "1%",
          right: "8%",
          width: "0%",
          height: "0%",
        }}
        className="holder"
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
          // on the bottom left corner of the screen
          position: "absolute",
          bottom: "-13%",
          left: "1%",
          width: "%",
          height: "1%",
        }}
        className="holder"
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
          // on the right bottom corner of the screen
          position: "absolute",
          bottom: "-13%",
          right: "-2%",
          width: "10%",
          height: "1%",
        }}
        className="holder"
      >
        <div className="candle">
          <div className="blinking-glow"></div>
          <div className="thread"></div>
          <div className="glow"></div>
          <div className="flame"></div>
        </div>
      </div>
    </>
  );
}
