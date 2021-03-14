import axios from 'axios'
import React, { useState, useEffect } from 'react'

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

  return <></>
}

export default CheckboxList
