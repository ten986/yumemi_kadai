import axios from 'axios'
import React, { useState, useEffect } from 'react'

type PrefectureResponse = {
  message: string
  result: Prefecture[]
}

type Prefecture = {
  prefCode: number
  prefName: string
}

const CheckboxList: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])

  useEffect(() => {
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
