import React from 'react'
import { shallow } from 'enzyme'

import Checkbox from '../Checkbox'

describe('Checkbox', () => {
  it('スナップショットが一致するか', () => {
    const mockFn = jest.fn()
    const props = {
      id: 'checkbox',
      value: '北海道',
      checked: false,
      onChange: mockFn,
    }
    const checkbox = shallow(<Checkbox {...props} />)

    // スナップショット
    expect(checkbox).toMatchSnapshot()
  })
  it('onChangeが呼ばれるか', () => {
    const mockFn = jest.fn()
    const props = {
      id: 'checkbox',
      value: '北海道',
      checked: false,
      onChange: mockFn,
    }
    const checkbox = shallow(<Checkbox {...props} />)

    // onChange が呼ばれるか
    checkbox.find('div').find('input').simulate('change')
    expect(mockFn.mock.calls.length).toEqual(1)
  })
  it('テキストがvalueと一致するか', () => {
    const mockFn = jest.fn()
    const props = {
      id: 'checkbox',
      value: '北海道',
      checked: false,
      onChange: mockFn,
    }
    const checkbox = shallow(<Checkbox {...props} />)

    // テキストが北海道になるか
    expect(checkbox.text()).toBe('北海道')
  })
})
