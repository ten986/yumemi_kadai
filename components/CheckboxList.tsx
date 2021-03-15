import React, {
  useState,
  useEffect,
  ChangeEventHandler,
  useMemo,
  useCallback,
} from 'react'
import { Prefecture } from '../pages/api/prefectures'
import CheckBox from './Checkbox'

type CheckedItemMap = Map<string, boolean>

type Props = {
  // チェックボックスの値を保持する
  checkedItems: CheckedItemMap
  setCheckedItems: React.Dispatch<React.SetStateAction<CheckedItemMap>>
}

const CheckboxList: React.FC<Props> = ({ checkedItems, setCheckedItems }) => {
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
