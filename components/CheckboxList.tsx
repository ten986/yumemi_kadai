import React, { ChangeEventHandler, useMemo, useCallback } from 'react'
import { Prefecture } from '../pages/api/prefectures'
import CheckBox from './Checkbox'

type CheckedItemMap = Map<number, boolean>

type Props = {
  // チェックボックスの値を保持する
  prefectures: Prefecture[]
  checkedItems: CheckedItemMap
  setCheckedItems: React.Dispatch<React.SetStateAction<CheckedItemMap>>
}

type PrefectureDictItem = {
  prefecture: Prefecture
  id: string
}

const CheckboxList: React.FC<Props> = ({
  prefectures,
  checkedItems,
  setCheckedItems,
}) => {
  // チェックボックスと都道府県の対応
  const prefectureDict: PrefectureDictItem[] = prefectures.map((p) => {
    return {
      prefecture: p,
      id: `checkbox_${p.prefCode}`,
    }
  })

  // チェックボックスが押された時の挙動
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      // チェックボックスの状態を更新
      setCheckedItems((prevMap) => {
        // チェックボックスから都道府県の情報を取得
        const prefectureDictItem = prefectureDict.find(
          (p) => p.id == e.target.id,
        )
        // ない場合
        if (!prefectureDictItem) {
          return new Map(prevMap)
        }
        // チェックボックスの状態を更新
        return new Map(
          prevMap.set(prefectureDictItem.prefecture.prefCode, e.target.checked),
        )
      })
    },
    [setCheckedItems, prefectureDict],
  )

  const PrefecturesComponent = useMemo(() => {
    return prefectureDict.map((item, index) => {
      return (
        <CheckBox
          key={index}
          id={item.id}
          value={item.prefecture.prefName}
          onChange={handleChange}
          checked={checkedItems.get(item.prefecture.prefCode) ?? false}
        />
      )
    })
  }, [prefectureDict, handleChange, checkedItems])

  return <>{PrefecturesComponent}</>
}

export default CheckboxList

export type { CheckedItemMap }
