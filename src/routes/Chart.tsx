import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
  theme: "light" | "dark";
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: number;
  market_cap: number;
}

interface IHistoricalError {
  error: string;
}

function Chart({ coinId, theme }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[] & IHistoricalError>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : data?.error ? (
        "No Chart Data Available"
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.map((price) => {
                  return {
                    x: new Date(price.time_close * 1000),
                    y: [
                      parseFloat(price.open),
                      parseFloat(price.high),
                      parseFloat(price.low),
                      parseFloat(price.close),
                    ],
                  };
                }) ?? [],
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 500,
              width: 300,
              toolbar: { show: false },
            },
            grid: {
              show: false,
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#EE4B2B",
                  downward: "#0096FF",
                },
              },
            },
            yaxis: { show: false },
            xaxis: {
              labels: { show: true },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories:
                data?.map((price) =>
                  new Date(price.time_close * 1000).toLocaleDateString("ko-KR")
                ) ?? [],
            },
            tooltip: {
              y: { formatter: (value) => `$${value.toFixed(2)}` },
            },
            theme: {
              mode: theme,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
