/* eslint-disable jsx-a11y/aria-role */
import '@testing-library/jest-dom'

import { UseMimicPasswordProps, useMimicPassword } from './index'
import {
  act,
  cleanup,
  render,
  screen,
} from '@testing-library/react'
import { cleanup as cleanHook, renderHook } from '@testing-library/react-hooks'

import React from 'react'
import userEvent from '@testing-library/user-event'

const Component = (props: UseMimicPasswordProps<HTMLInputElement>) => {
  const [value, presentation, onChange] = useMimicPassword(props)

  return (
    <div>
      <input
        value={presentation}
        onChange={onChange}
        role="input"
      />
      <p role="value">{value}</p>
    </div>
  )
}

describe('useMimicPassword', () => {
  const delay = 900
  const mask = '*'

  afterEach(() => {
    cleanHook()
    cleanup()
    jest.useFakeTimers()
  })

  it('should return array with value, presentation and onChange', () => {
    const { result } = renderHook(() => useMimicPassword())

    expect(result?.current.length).toBe(3)
    expect(result?.current[0]).toBe('')
    expect(result?.current[1]).toBe('')
    expect(result?.current[2]).toBeInstanceOf(Function)
  })

  it('should hide input after delay', async () => {
    const text = 'secretText123'

    render(<Component delay={delay} mask={mask} />)

    const input = screen.getByRole('input') as HTMLInputElement

    await userEvent.type(input, text)

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), delay)

    act(() => {
      jest.advanceTimersByTime(delay * 0.9)
    })

    expect(screen.getByRole('input')).toHaveValue(text)

    act(() => {
      jest.advanceTimersByTime(delay)
    })

    expect(screen.getByRole('input')).toHaveValue(new Array(text.length + 1).join(mask))
  })

  it('should run handleChange', async () => {
    const handleChange = jest.fn((n: string, e: React.ChangeEvent<HTMLInputElement>) => e.persist())

    render(<Component delay={delay} handleChange={handleChange} mask={mask} />)

    const input = screen.getByRole('input') as HTMLInputElement
    const text = 'mySuperSecret'

    await userEvent.type(input, text)

    act(() => {
      jest.advanceTimersByTime(delay + 100)
    })

    expect(handleChange).toHaveBeenCalledTimes(text.length)
    expect(handleChange).toHaveBeenLastCalledWith<[string, React.SyntheticEvent]>(text, expect.objectContaining({
      target: expect.objectContaining({ value: (new Array(text.length + 1).join(mask)) }),
    }))
  })

  it('should instantly hide typed symbols for `persymbol` mode', async () => {
    render(<Component delay={delay} mask={mask} mode="persymbol" />)

    const input = screen.getByRole('input') as HTMLInputElement
    const text = 'mySuperSecret' 

    await userEvent.type(input, text)

    expect(input).toHaveValue(new Array(text.length).join(mask) + text[text.length - 1])

    act(() => {
      jest.advanceTimersByTime(delay + 100)
    })

    expect(input).toHaveValue(new Array(text.length + 1).join(mask))
  })

  it('should correctly process selection and paste in input', async () => {
    render(<Component delay={delay} mask={mask} />)

    const input = screen.getByRole('input') as HTMLInputElement
    const text = 'another#124KindOfSecret'
    const selectionStart = 3
    const selectionEnd = 9
    const paste = 'NEWCONTENT'
    
    await userEvent.type(input, text)

    act(() => {
      jest.advanceTimersByTime(delay + 100)
      input.setSelectionRange(selectionStart, selectionEnd)
    })

    userEvent.paste(input, paste)

    const masked = new Array(text.length + 1).join(mask)
    const expected = masked.slice(0, selectionStart) + paste + masked.slice(selectionEnd)

    expect(input).toHaveValue(expected)
  })
})
