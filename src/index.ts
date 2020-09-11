import React from 'react'

type HTMLTextInputElement = HTMLInputElement | HTMLTextAreaElement

export type UseMimicPasswordProps<T extends HTMLTextInputElement> = {
  readonly mask?: string
  readonly delay?: number
  readonly handleChange?: (e: React.ChangeEvent<T>) => void
  readonly mode?: 'persymbol' | 'delayed'
}

const defaults: UseMimicPasswordProps<HTMLTextInputElement> = {
  mask: '•',
  delay: 1000,
  mode: 'delayed',
}

export type UseMimicReturn<T extends HTMLTextInputElement> = [
  string, string, (e: React.ChangeEvent<T>) => void,
]

export const useMimicPassword = <T extends HTMLTextInputElement>(
  props?: UseMimicPasswordProps<T>,
): UseMimicReturn<T> => {
  const {
    mask,
    delay,
    mode,
    handleChange,
  } = React.useMemo(
    () => ({ ...defaults, ...props }),
    [props],
  )

  const timer = React.useRef<number | undefined>()
  const cursorPos = React.useRef<number>(0)
  const inputRef = React.useRef<T | null>(null)

  const [value, setValue] = React.useState('')
  const [presentation, setPresentation] = React.useState('')

  const onChange = React.useCallback((e: React.ChangeEvent<T>) => {
    clearTimeout(timer.current)

    inputRef.current = e.target

    cursorPos.current = inputRef.current.selectionEnd || 0
    const inputValue = inputRef.current.value

    // This is going to be the new original value (unmasked)
    const newValue = inputValue.replace(new RegExp(`${cursorPos.current ? `(^\\${mask}{1,${cursorPos.current}})|` : ''}(\\${mask}+)`, 'g'), (match, _, offset) => {
      if (!offset && cursorPos.current) {
        return value.substr(0, match.length)
      }

      return value.substr(-match.length)
    })

    // Mask the value leaving the last character entered intact

    let maskedValue = ''

    if (mode === 'persymbol') {
      maskedValue = inputValue.split('').map((c, index) => (index === cursorPos.current - 1 ? c : mask)).join('')
    } else {
      maskedValue = inputValue
    }

    setValue(newValue)
    setPresentation(maskedValue)

    timer.current = setTimeout(() => {
      cursorPos.current = inputRef?.current?.selectionEnd || 0
      setPresentation(new Array(inputValue.length + 1).join(mask))
    }, delay)

    if (typeof handleChange === 'function') {
      handleChange(e)
    }
  }, [handleChange, setValue, setPresentation, timer, delay, mask, presentation, value, cursorPos])

  // Restore cursor position once presentation has changed
  React.useEffect(() => {
    inputRef.current?.setSelectionRange(cursorPos.current, cursorPos.current)
  }, [presentation, inputRef])

  return [value, presentation, onChange]
}
