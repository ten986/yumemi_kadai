import React, { useState, useEffect, useMemo } from 'react'
import {
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts'
import { Population, PopulationData } from '../pages/api/population/[prefCode]'
import { Prefecture } from '../pages/api/prefectures'
import { CheckedItemMap } from './CheckboxList'
import distinctColors from 'distinct-colors'

import styles from './PopulationGraph.module.css'

type GraphData = {
  prefCode: number
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
  const [colors, setColors] = useState<chroma.Color[]>()

  // 47都道府県分の異なる色を取得
  useEffect(() => {
    const color = distinctColors({ count: 47 })
    setColors(color)
  }, [])

  useEffect(() => {
    // 現在のグラフ用データを取得
    let results: GraphData[] = polutaions?.concat() ?? []
    // 総人口を取得する
    const getPopulations = async () => {
      // 各チェックボックスについて
      for (const [label, checked] of checkedItems.entries()) {
        if (!checked) {
          // チェックボックスが外れている場合、削除
          results = results.filter((f) => f.prefCode != label)
        } else {
          // 既に存在する場合は取得しない
          if (results.find((f) => f.prefCode == label)) {
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
            prefCode: prefecture.prefCode,
            prefName: prefecture.prefName,
            population: result.population,
          })
        }
      }
      setPopulations(() => results)
    }

    getPopulations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItems, prefectures])

  const PopulationComponent = useMemo(() => {
    return (
      <>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            className={styles.graph}
            data={polutaions}
            margin={{ top: 5, right: 15, left: 15, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              type="number"
              domain={[1970, 2020]}
              allowDataOverflow
            />
            <YAxis dataKey="value" />
            <Tooltip />
            <Legend layout="vertical" verticalAlign="top" align="right" />
            {polutaions && polutaions.length > 0 ? (
              polutaions.map((s, index) => (
                <Line
                  dataKey="value"
                  data={s.population}
                  name={s.prefName}
                  key={s.prefName}
                  stroke={colors?.[index]?.hex('rgb') ?? '#000000'}
                />
              ))
            ) : (
              <></>
            )}
          </LineChart>
        </ResponsiveContainer>
      </>
    )
  }, [colors, polutaions])

  return <div className={styles.wrapper}>{PopulationComponent}</div>
}

export default PopulationGraph
