import { createChart } from 'lightweight-charts';
import { dataMarket } from "./dataMarket.ts";
import { parse } from "date-fns";

window.addEventListener('DOMContentLoaded', () => {
  console.log("entre");
  const container = document.getElementById('firstContainer');

  if (container) {
    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight,
      timeScale: {
        timeVisible: true,
      }
    });

    // Configuración de la serie de velas japonesas
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
      wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    });

    // Adaptamos los datos de las velas
    const candlestickData = dataMarket
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map(element => {
          const parsedDate = parse(element.date, 'yyyy-MM-dd HH:mm:ss', new Date());
          const unixTimestamp = Math.floor(parsedDate.getTime() / 1000);

          return {
            time: unixTimestamp,
            open: element.open,
            close: element.close,
            high: element.high,
            low: element.low,
            volume: element.volume
          };
        });

    // Establece los datos de las velas japonesas en la serie
    candlestickSeries.setData(candlestickData);

    // Configuración de la serie de la EMA
    const emaSeries = chart.addLineSeries({
      color: '#FF9800', // Color de la línea de la EMA
      lineWidth: 2
    });

    // Adaptamos los datos de la EMA
    const emaData = dataMarket.map(element => {
      const parsedDate = parse(element.date, 'yyyy-MM-dd HH:mm:ss', new Date());
      const unixTimestamp = Math.floor(parsedDate.getTime() / 1000);

      return {
        time: unixTimestamp,
        value: element.ema // Valor de la EMA
      };
    });

    // Establece los datos de la EMA en la serie de línea
    emaSeries.setData(emaData);

    // Ajusta el contenido de la escala de tiempo para que se ajuste al gráfico
    chart.timeScale().fitContent();

    // Redimensiona el gráfico automáticamente si el tamaño de la ventana cambia
    window.addEventListener('resize', () => {
      chart.resize(container.clientWidth, container.clientHeight);
    });
  }
});
