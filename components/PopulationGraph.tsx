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
import { CheckedItemMap } from './CheckboxList'

type Props = {
  checkedItems: CheckedItemMap
}

// 人口を表示するグラフコンポーネント
const PopulationGraph: React.FC<Props> = ({ checkedItems: checkedItems }) => {
  const [polutaions, setPopulations] = useState<PopulationData[]>()

  useEffect(() => {
    const results: PopulationData[] = []
    // 総人口を取得する
    const getPopulations = async () => {
      // 各チェックボックスについて
      for (const [label, checked] of checkedItems.entries()) {
        // チェックボックスが外れている場合
        if (!checked) {
          continue
        }
        const response = await fetch(`/api/population/${label}`)
        const result: PopulationData = await response.json()
        results.push(result)
      }
      setPopulations(() => results)
    }

    getPopulations()
  }, [checkedItems])

  const PopulationComponent = useMemo(() => {
    return (
      <>
        {polutaions ? (
          <LineChart
            width={730}
            height={250}
            data={polutaions}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis dataKey="value" />
            <Tooltip />
            <Legend />
            {polutaions.map((s) => (
              <Line
                dataKey="value"
                data={s.population}
                name={s.prefCode}
                key={s.prefCode}
              />
            ))}
          </LineChart>
        ) : (
          <></>
        )}
      </>
    )
  }, [polutaions])

  return <>{PopulationComponent}</>
}

export default PopulationGraph
