/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

// APIの返り値の型
type PopulationResponse = {
  message: string
  result: PopulationResult
}

// APIの返り値の型
type PopulationResult = {
  boundaryYear: number
  data: PopulationResultData[]
}

// APIの返り値の型
type PopulationResultData = {
  label: string
  data: Population[]
}

// APIの返り値の型
type Population = {
  year: number
  value: number
}

const handler = async (
  { query: { prefCode } }: NextApiRequest,
  res: NextApiResponse<PopulationResult>,
) => {
  const result = await axios
    .get<PopulationResponse>(
      'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear',
      {
        params: {
          prefCode: prefCode,
        },
        headers: {
          'X-API-KEY': process.env.X_API_KEY,
        },
      },
    )
    .then((value) => {
      const result = value.data.result
      // 総人口を取得
      result.data = result.data.filter((r) => r.label == '総人口')
      return result
    })
  res.status(200).json(result)
}

export default handler
export type { PopulationResult }
