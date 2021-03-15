import React, { useState, useEffect, useMemo } from 'react'
import { LineChart } from 'recharts'
import { PopulationResult } from '../pages/api/population/[prefCode]'

// 人口を表示するグラフコンポーネント
const PopulationGraph: React.FC = () => {
  const [polutaion, setPopulation] = useState<PopulationResult>()

  useEffect(() => {
    // 総人口を取得する
    const getPopulations = async () => {
      const response = await fetch('/api/population/1')
      const result: PopulationResult = await response.json()
      setPopulation(() => result)
    }

    getPopulations()
  }, [])

  const PopulationComponent = useMemo(() => {
    return (
      <>
        <LineChart></LineChart>
      </>
    )
  }, [])

  return <>{PopulationComponent}</>
}

export default PopulationGraph
