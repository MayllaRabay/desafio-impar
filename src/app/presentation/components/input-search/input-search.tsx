/* eslint-disable react-hooks/exhaustive-deps */
import { IconClose, IconSearch } from "app/presentation/assets"
import React, { useRef } from "react"
import Styles from "./input-search-styles.module.scss"

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  state: any
  setState: any
  placeholder?: string
  width?: string
  handleSearch?: () => void
}

const InputSearch: React.FC<Props> = ({
  state,
  setState,
  placeholder,
  width,
  handleSearch,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement>()

  const handleOnFocus = (e: any): void => {
    e.target.readOnly = false
  }

  const handleClearSelection = (): void => {
    if (state[props.name]) {
      setState({ ...state, [props.name]: "" })
    }
  }

  const handleOnChange = (e: any): void => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }

  const handleOnKeyUp = async () => {
    handleSearch()
  }

  return (
    <div className={Styles.inputContainer} style={{ width }}>
      <input
        {...props}
        ref={inputRef}
        value={state[props.name]}
        placeholder={placeholder}
        onFocus={e => handleOnFocus(e)}
        onChange={e => handleOnChange(e)}
        onKeyUp={handleOnKeyUp}
        autoComplete="off"
      />
      <span onClick={handleClearSelection} className={Styles.inputIcon}>
        {state[props.name] ? <IconClose /> : <IconSearch />}
      </span>
    </div>
  )
}

export default InputSearch
