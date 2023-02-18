import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react'
import {createPortal} from 'react-dom'
import {ModalRef} from './ModalController'
import {useModal} from './useModal'

interface ModalProps {
  children: React.ReactNode
  defaultOpened?: boolean
}

const Modal = forwardRef<ModalRef, ModalProps>(
  ({children, defaultOpened = false}, ref) => {
    const [isOpen, open, close] = useModal(defaultOpened)

    useImperativeHandle(
      ref,
      () => ({
        open,
        close,
      }),
      [],
    )

    const handleEscape = useCallback((e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) close()
    }

    useEffect(() => {
      const modalRoot = document.createElement('div')
      modalRoot.setAttribute('id', 'modal-root')
      document.body.appendChild(modalRoot)

      if (isOpen) document.addEventListener('keydown', handleEscape, false)

      return () => {
        document.body.removeChild(modalRoot)

        document.removeEventListener('keydown', handleEscape, false)
      }
    }, [handleEscape, isOpen])

    const modalContent = useMemo(
      () => (
        <div
          onClick={handleClick}
          className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-75"
        >
          <div className="bg-white max-w-lg mx-auto rounded-lg drop-shadow-xl min-w-[40%] text-center">
            <div className="modal-header flex justify-end px-4 py-2 relative">
              <button
                onClick={() => {
                  close()
                }}
                className="absolute top-0 translate-x-1/3 -translate-y-1/2 right-0 p-1 rounded-full bg-black text-white hover:text-gray-400 focus:outline-none focus:text-gray-400"
              >
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59l-4.88-4.88a1 1 0 1 0-1.42 1.42L10.59 12l-4.88 4.88a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L12 13.41l4.88 4.88a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L13.41 12l4.88-4.88a1 1 0 0 0 0-1.41z" />
                </svg>
              </button>
            </div>
            <div className="modal-body px-20 pb-6 pt-2">{children}</div>
          </div>
        </div>
      ),
      [children, open],
    )

    return isOpen
      ? createPortal(
          modalContent,
          document.getElementById('modal-root') as Element,
        )
      : null
  },
)

Modal.displayName = 'Modal'
export default Modal
