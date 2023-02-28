import {useState, useCallback} from 'react'

export type UseModalResult = [boolean, () => void, () => void]

export function useModal(defaultOpened = false): UseModalResult {
  const [isOpen, setIsOpen] = useState(defaultOpened)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return [isOpen, open, close]
}
