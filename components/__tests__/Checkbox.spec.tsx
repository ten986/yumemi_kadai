import React from 'react'
import { shallow } from 'enzyme'

import Checkbox from '../Checkbox'

describe('Checkbox', () => {
  it('北海道でrenderする', () => {
    let checked = false
    const handleChange = () => {
      checked = !checked
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
  })
})
