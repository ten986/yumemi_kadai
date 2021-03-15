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

// このAPIでの返り値
type PopulationData = {
  prefCode: string
  population: Population[]
}

const handler = async (
  { query: { prefCode } }: NextApiRequest,
  res: NextApiResponse<PopulationData>,
) => {
  // クエリはstringである必要がある
  if (!(typeof prefCode === 'string')) {
    res.status(400)
    return
  }

  const result: PopulationData | undefined = await axios
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
      const population = result.data.find((r) => r.label == '総人口')?.data
      if (!population) {
        res.status(400)
        return undefined
      }
      // APIの返り値に直す
      return {
        prefCode: prefCode,
        population: population,
      }
    })

  // 結果が正しくない場合
  if (!result) {
    res.status(400)
    return
  }

  res.status(200).json(result)
}

export default handler
export type { PopulationData, Population }
