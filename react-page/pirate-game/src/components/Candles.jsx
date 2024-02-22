import * as candleStyles from "./Candle.module.css"

export default function Candles() {
  return (
    <section className={candleStyles.candle}>
      <div className={candleStyles.flame}>
        <div className={candleStyles.shadows}></div>
        <div className={candleStyles.top}></div>
        <div className={candleStyles.middle}></div>
        <div className={candleStyles.bottom}></div>
      </div>
      <div className={candleStyles.wick}></div>
      <div className={candleStyles.wax}></div>
    </section>
  );
}