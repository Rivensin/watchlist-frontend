'use client'
import { useRouter } from "next/navigation"
import { MouseEventHandler, useRef } from "react"

export default function Modals({children} : {children:React.ReactNode}){
  const overlay = useRef(null)
  const router = useRouter()

  const close : MouseEventHandler = e => {
    if(e.target === overlay.current){
      router.back()
    }
  }

  return ( 
    <div ref={overlay}
      className="fixed inset-0 z-9999 bg-black/60 backdrop-blur-sm"
      onClick={close}>      
        <div 
        className="h-full w-fit" 
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}