import React, { useState } from 'react'
import CheckboxList from '../components/CheckboxList'
import PopulationGraph from '../components/PopulationGraph'

const IndexPage: React.FC = () => {
  // チェックボックスの状態を保持する
  const [checkedItems, setCheckedItems] = useState<Map<string, boolean>>(
    new Map<string, boolean>(),
  )

  return (
    <>
      <CheckboxList
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />
      <PopulationGraph />
    </>
  )
}

export default IndexPage
