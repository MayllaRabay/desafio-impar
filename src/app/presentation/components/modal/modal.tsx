import React, { useEffect } from "react"
import Styles from "./modal-styles.module.scss"

interface Props {
  id?: string
  children: React.ReactNode
  isOpen: boolean
  onClose: (e?: any) => void
  width?: string
}

const Modal: React.FC<Props> = ({ id, children, isOpen, onClose, width = "35rem" }) => {
  const handleStopPropagationClose = (e: any) => {
    e.stopPropagation()
    onClose()
  }

  useEffect(() => {
    if (isOpen) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden"
    } else {
      document.getElementsByTagName("html")[0].style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <div
      id={id}
      data-style={isOpen && "isOpen"}
      onClick={onClose && onClose}
      className={Styles.modalContainer}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: width }}
        className={Styles.modalContent}
      >
        <div onClick={e => handleStopPropagationClose(e)} className={Styles.modalCloseIcon}>
          <span>X</span>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
