import axios from 'axios'
import React, { useState, useEffect, ChangeEventHandler } from 'react'

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
              'X-API-KEY': '',
            },
          },
        )
        .then((value) => {
          return value.data.result
        })
      console.log(result)
      setPrefectures(result)
    }

    getPrefectures()
  }, [])

  // チェックボックスが押された時の挙動
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e)
  }

  return (
    <>
      {prefectures.map((item, index) => {
        return (
          <CheckBox
            key={index}
            id={`checkbox_${index}`}
            value={item.prefName}
            onChange={handleChange}
            checked={false}
          />
        )
      })}
    </>
  )
}

export default CheckboxList
