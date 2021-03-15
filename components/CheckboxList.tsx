import axios from 'axios'
import React, {
  useState,
  useEffect,
  ChangeEventHandler,
  useMemo,
  useCallback,
} from 'react'

// APIの返り値の型
type PrefectureResponse = {
  message: string
  result: Prefecture[]
}

// APIの返り値の型
type Prefecture = {
  prefCode: number
  prefName: string
}

type CheckBoxProps = {
  id: string
  value: string
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}

// チェックボックス
const CheckBox: React.FC<CheckBoxProps> = ({
  id,
  value,
  checked,
  onChange,
}) => {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        name="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={id}>{value}</label>
    </>
  )
}

const CheckboxList: React.FC = () => {
  // チェックボックスの状態を保持する
  const [checkedItems, setCheckedItems] = useState<Map<string, boolean>>(
    new Map<string, boolean>(),
  )
  // 都道府県一覧
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])

  useEffect(() => {
    // 都道府県一覧を取得する
    const getPrefectures = async () => {
      const result = await axios
        .get<PrefectureResponse>(
          'https://opendata.resas-portal.go.jp/api/v1/prefectures',
          {
            headers: {
              'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY,
            },
          },
        )
        .then((value) => {
          return value.data.result
        })
      console.log(result)
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
      console.log(checkedItems)
    },
    [checkedItems],
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
