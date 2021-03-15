import React, { ChangeEventHandler } from 'react'

import styles from './Checkbox.module.css'

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
    <div className={styles.wrapper}>
      <input
        id={id}
        type="checkbox"
        name="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  )
}

export default CheckBox
