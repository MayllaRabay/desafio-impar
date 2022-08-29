import { Colors } from 'app/presentation/styles'
import React from 'react'

interface Props {
  color?: string
}

const IconSearch: React.FC<Props> = ({ color = Colors.grayM }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.3846 15.7692C13.3585 15.7692 15.7692 13.3585 15.7692 10.3846C15.7692 7.41077 13.3585 5 10.3846 5C7.41077 5 5 7.41077 5 10.3846C5 13.3585 7.41077 15.7692 10.3846 15.7692Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.6923 14.6923L19 19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default IconSearch
