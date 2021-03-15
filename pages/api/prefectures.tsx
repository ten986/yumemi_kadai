/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

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

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse<Prefecture[]>,
) => {
  const result = await axios
    .get<PrefectureResponse>(
      'https://opendata.resas-portal.go.jp/api/v1/prefectures',
      {
        headers: {
          'X-API-KEY': process.env.X_API_KEY,
        },
      },
    )
    .then((value) => {
      return value.data.result
    })
  res.status(200).json(result)
}

export default handler
export type { Prefecture }
