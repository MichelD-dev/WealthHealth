import {useState, useCallback} from 'react'

export type UseModalResult = [boolean, () => void, () => void]

export function useModal(defaultOpened = false): UseModalResult {
  const [isOpen, setIsOpen] = useState(defaultOpened)

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return [isOpen, openModal, closeModal]
}
