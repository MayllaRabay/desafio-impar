import React from 'react'
import Styles from './header-styles.module.scss'

export interface Props {
  title?: string
  icon?: string
}

const Header: React.FC<Props> = ({ title, icon }) => {
  return (
    <header>
      {icon && (
        <div className={Styles.headerIcon}>
          <img src={icon} alt="" />
        </div>
      )}
      {title && <div className={Styles.headerTitle}>{title}</div>}
    </header>
  )
}

export default Header
