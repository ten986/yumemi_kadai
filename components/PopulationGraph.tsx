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
import { Population, PopulationData } from '../pages/api/population/[prefCode]'
import { Prefecture } from '../pages/api/prefectures'
import { CheckedItemMap } from './CheckboxList'

type GraphData = {
  prefName: string
  population: Population[]
}

type Props = {
  checkedItems: CheckedItemMap
  prefectures: Prefecture[]
}

// 人口を表示するグラフコンポーネント
const PopulationGraph: React.FC<Props> = ({ checkedItems, prefectures }) => {
  const [polutaions, setPopulations] = useState<GraphData[]>()

  useEffect(() => {
    const results: GraphData[] = []
    // 総人口を取得する
    const getPopulations = async () => {
      // 各チェックボックスについて
      for (const [label, checked] of checkedItems.entries()) {
        // チェックボックスが外れている場合
        if (!checked) {
          continue
        }
        // 総人口を取得する
        const response = await fetch(`/api/population/${label}`)
        const result: PopulationData = await response.json()

        // 都道府県を取得
        const prefecture = prefectures.find(
          (p) => p.prefCode.toString() == result.prefCode,
        )
        if (!prefecture) {
          continue
        }
        // グラフ表示用に変換
        results.push({
          prefName: prefecture.prefName,
          population: result.population,
        })
      }
      setPopulations(() => results)
    }

    getPopulations()
  }, [checkedItems, prefectures])

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
            <XAxis dataKey="year" type="number" domain={['auto', 'auto']} />
            <YAxis dataKey="value" />
            <Tooltip />
            <Legend layout="vertical" verticalAlign="top" align="right" />
            {polutaions.map((s) => (
              <Line
                dataKey="value"
                data={s.population}
                name={s.prefName}
                key={s.prefName}
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
