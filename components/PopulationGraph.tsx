import React, { useState, useEffect, useMemo } from 'react'
import {
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts'
import { PopulationData } from '../pages/api/population/[prefCode]'

// 人口を表示するグラフコンポーネント
const PopulationGraph: React.FC = () => {
  const [polutaion, setPopulation] = useState<PopulationData>()

  useEffect(() => {
    // 総人口を取得する
    const getPopulations = async () => {
      const response = await fetch('/api/population/1')
      const result: PopulationData = await response.json()
      setPopulation(() => result)
    }

    getPopulations()
  }, [])

  const PopulationComponent = useMemo(() => {
    return (
      <>
        {polutaion ? (
          <LineChart
            width={730}
            height={250}
            data={polutaion.population}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        ) : (
          <></>
        )}
      </>
    )
  }, [polutaion])

  return <>{PopulationComponent}</>
}

export default PopulationGraph
