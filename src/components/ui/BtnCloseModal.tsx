import { useEffect } from "react"


export function BtnCloseModal({isModal, refModal, closeModal}) {

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (isModal && refModal.current && !refModal.current.contains(e.target)) {
        closeModal()
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
      document.body.style.overflow = "auto"
    }
}, [isModal, closeModal])

  return (
    <button
      onClick={() => closeModal(false)}
      className="w-12 h-12 absolute top-0 right-0 border-2 border-red-500 text-red-500 font-bold rounded-s-md transition-all hover:text-white hover:bg-red-500"
    >
      X
    </button>
  )
}