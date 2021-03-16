import React from 'react'
import fetchMock from 'fetch-mock'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'

import IndexPage from 'pages/index'
import { Prefecture } from 'pages/api/prefectures'

const prefectures: Prefecture[] = [
  {
    prefCode: 1,
    prefName: '北海道',
  },
  {
    prefCode: 2,
    prefName: '青森県',
  },
  {
    prefCode: 3,
    prefName: '岩手県',
  },
  {
    prefCode: 4,
    prefName: '宮城県',
  },
]

describe('IndexPage', () => {
  beforeEach(() => {
    // mock の設定
    fetchMock.get(
      // リクエスト
      '/api/prefectures',
      // レスポンス
      {
        status: 200,
        body: prefectures,
      },
    )
  })
  afterEach(() => {
    // mock をリセット
    fetchMock.restore()
  })
  it('スナップショットが一致するか', async () => {
    const component = mount(<IndexPage />)
    // waitForComponentToPaint
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
      component.update()
    })

    // スナップショットの一致
    expect(component).toMatchSnapshot()
  })
})
