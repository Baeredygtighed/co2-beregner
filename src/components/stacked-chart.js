import { Chart } from "chart.js";
import { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

export default function StackedChart({labels = null, datasets = null}) {
    const element = useRef(null);

    const options = { 
        scales: { x: { stacked: true }, y: { stacked: true } },
        plugins: {
            title: {
              display: true,
              text: 'kg CO₂ eq/ton',
            },
        }
    };

    const data = { labels, datasets };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

    return (
        <Bar data={data} options={options} />
    )
}