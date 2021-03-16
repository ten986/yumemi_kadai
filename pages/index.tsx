import React, { useEffect, useState } from 'react'
import CheckboxList from '../components/CheckboxList'
import Header from '../components/Header'
import PopulationGraph from '../components/PopulationGraph'
import { Prefecture } from './api/prefectures'

import styles from './index.module.css'

const IndexPage: React.FC = () => {
  // 都道府県一覧
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])

  useEffect(() => {
    // 都道府県一覧を取得する
    const getPrefectures = async () => {
      const response = await fetch('/api/prefectures')
      const result: Prefecture[] = await response.json()
      setPrefectures(() => result)
    }

    getPrefectures()
  }, [])

  // チェックボックスの状態を保持する
  const [checkedItems, setCheckedItems] = useState<Map<number, boolean>>(
    new Map<number, boolean>(),
  )

  return (
    <>
      <Header />
      <div className={styles.page}>
        <div>
          <h1>都道府県</h1>
          <CheckboxList
            prefectures={prefectures}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
        </div>
        <PopulationGraph
          checkedItems={checkedItems}
          prefectures={prefectures}
        />
      </div>
    </>
  )
}

export default IndexPage
