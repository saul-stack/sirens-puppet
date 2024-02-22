import * as candleStyles from "./Candle.module.css"

export default function Candles() {

  return (
    <>
    <div style={{ position: 'absolute', top: 0, left: 15 }}>
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
    </div>
    <div style={{ position: 'absolute', top: 0, right: 15 }}>
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
    </div>
    <div style={{ position: 'absolute', bottom:45, right: 15 }}>
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
    </div>
    <div style={{ position: 'absolute', bottom:45, left: 15 }}>
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
    </div>
    </>
  );
}