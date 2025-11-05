import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function SectionChart({ sections }) {
  const labels = (sections || []).map((s, i) => s.title ? s.title.slice(0,12) : `S${i+1}`)
  const data = (sections || []).map(s => s.text.length)
  const chartData = {
    labels,
    datasets: [{ label: 'chars', data }]
  }

  return <div className="bg-white p-3 rounded"><Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} /></div>
}
