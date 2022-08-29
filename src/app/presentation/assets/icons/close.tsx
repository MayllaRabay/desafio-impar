import { Colors } from 'app/presentation/styles'
import React from 'react'
import Styles from './icon-styles.module.scss'

interface Props {
  color?: string
  onClick?: () => void
}

const IconClose: React.FC<Props> = ({ onClick, color = Colors.grayM }) => {
  return (
    <div
      onClick={onClick ? onClick : undefined}
      className={Styles.iconCloseContainer}
      data-style={onClick && 'hasClick'}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 7L7 17"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 7L17 17"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default IconClose
