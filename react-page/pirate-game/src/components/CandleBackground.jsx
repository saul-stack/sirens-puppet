import "../CandleBackground.css";

export default function CandleBackground() {
  return (
    <>
      <div
        style={{
          // on the top left corner of the screen
          position: "absolute",
          top: "0vw",
          left: "1vw",
          width: "10vw",
          height: "5vw",
        }}
        class="holder"
      >
        <div class="candle">
          <div class="blinking-glow"></div>
          <div class="thread"></div>
          <div class="glow"></div>
          <div class="flame"></div>
        </div>
      </div>

      <div
        style={{
          // on the top right corner of the screen when screen is resized
          position: "absolute",
          top: "0vw",
          right: "1vw",
          width: "10vw",
          height: "5vw",
        }}
        class="holder"
      >
        <div class="candle">
          <div class="blinking-glow"></div>
          <div class="thread"></div>
          <div class="glow"></div>
          <div class="flame"></div>
        </div>
      </div>

      <div
        style={{
          // on the bottom left corner of the screen
          position: "absolute",
          bottom: "5vw",
          left: "1vw",
          width: "10vw",
          height: "5vw",
        }}
        class="holder"
      >
        <div class="candle">
          <div class="blinking-glow"></div>
          <div class="thread"></div>
          <div class="glow"></div>
          <div class="flame"></div>
        </div>
      </div>

      <div
        style={{
          // on the right bottom corner of the screen
          position: "absolute",
          bottom: "5vw",
          right: "1vw",
          width: "10vw",
          height: "100px",
        }}
        class="holder"
      >
        <div class="candle">
          <div class="blinking-glow"></div>
          <div class="thread"></div>
          <div class="glow"></div>
          <div class="flame"></div>
        </div>
      </div>
    </>
  );
}
