import React, { ChangeEventHandler } from 'react'

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

export default CheckBox
