import React from 'react'

import styles from './Header.module.css'

// チェックボックス
const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>各都道府県の人口を表示するアプリ</div>
    </header>
  )
}

export default Header
