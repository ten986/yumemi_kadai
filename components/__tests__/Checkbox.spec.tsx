import React from 'react'
import { shallow } from 'enzyme'

import Checkbox from '../Checkbox'

describe('Checkbox', () => {
  it('北海道でrenderする', () => {
    const checked = false
    const handleChange = () => {
      checked
    }
    const checkbox = shallow(
      <Checkbox
        id="checkbox"
        value="北海道"
        checked={checked}
        onChange={handleChange}
      />,
    )

    expect(checkbox).toMatchSnapshot()
    expect(checkbox.text()).toBe('北海道')
  })
})
