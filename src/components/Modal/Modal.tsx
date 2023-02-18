import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import {createPortal} from 'react-dom'
import './Modal.css'

const modalRoot = document.createElement('div')
modalRoot.setAttribute('id', 'modal-root')
document.body.appendChild(modalRoot)

const Modal = ({children, defaultOpened = false}, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpened)

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [close],
  )

  const handleEscape = useCallback(e => {
    if (e.keyCode === 27) setIsOpen(false)
  }, [])

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])

  return createPortal(
    isOpen ? (
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
        <div className="bg-gray-900 max-w-lg mx-auto rounded-lg overflow-hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-400 focus:outline-none focus:text-gray-400 absolute top-0 right-0 p-2"
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59l-4.88-4.88a1 1 0 1 0-1.42 1.42L10.59 12l-4.88 4.88a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L12 13.41l4.88 4.88a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L13.41 12l4.88-4.88a1 1 0 0 0 0-1.41z" />
            </svg>
          </button>
          <div className="modal-body p-6">{children}</div>
        </div>
      </div>
    ) : null,
    modalRoot,
  )
}

export default forwardRef(Modal)
