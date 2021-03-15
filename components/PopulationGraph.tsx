import React, { useState, useEffect, useMemo } from 'react'
import { PopulationResult } from '../pages/api/population/[prefCode]'

const PopulationGraph: React.FC = () => {
  const [polutaion, setPopulation] = useState<PopulationResult>()

  useEffect(() => {
    // 都道府県一覧を取得する
    const getPopulations = async () => {
      const response = await fetch('/api/population/1')
      const result: PopulationResult = await response.json()
      setPopulation(() => result)
    }

    getPopulations()
  }, [])

  const PrefecturesComponent = useMemo(() => {
    return <></>
  }, [])

  return <>{PrefecturesComponent}</>
}

export default PopulationGraph
