import React, { ChangeEventHandler, useMemo, useCallback } from 'react'
import { Prefecture } from '../pages/api/prefectures'
import CheckBox from './Checkbox'

type CheckedItemMap = Map<string, boolean>

type Props = {
  // チェックボックスの値を保持する
  prefectures: Prefecture[]
  checkedItems: CheckedItemMap
  setCheckedItems: React.Dispatch<React.SetStateAction<CheckedItemMap>>
}

const CheckboxList: React.FC<Props> = ({
  prefectures,
  checkedItems,
  setCheckedItems,
}) => {
  // チェックボックスが押された時の挙動
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      // チェックボックスの状態を更新
      setCheckedItems((prevMap) => {
        return new Map(prevMap.set(e.target.id, e.target.checked))
      })
    },
    [setCheckedItems],
  )

  const PrefecturesComponent = useMemo(() => {
    return prefectures.map((item, index) => {
      const id = `checkbox_${index}`
      return (
        <CheckBox
          key={index}
          id={id}
          value={item.prefName}
          onChange={handleChange}
          checked={checkedItems.get(id) ?? false}
        />
      )
    })
  }, [prefectures, handleChange, checkedItems])

  return <>{PrefecturesComponent}</>
}

export default CheckboxList

export type { CheckedItemMap }
