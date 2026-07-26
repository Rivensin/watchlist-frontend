'use client'
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modals from '@/components/shared/Modals';

function AddProduct() {
  const [isClosing, setIsClosing] = useState(false);

  // Add Product Tab
  
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  return (
    <Modals>
      <div        
        className='bg-[#F6F3E7] w-full md:w-[404px] lg:w-[484px] xl:w-[504px] 2xl:w-[624px] h-full px-16 fixed left-1/2 -translate-x-1/2 pt-11 pb-10'>  
        <div className='flex justify-between items-center font-cormorant text-3xl md:text-2xl 2xl:text-3xl pb-32'>
          <div className=''>Reserve</div>
          <button onClick={handleClose}>
            <div className='hover:border-b hover:border-gray-500 h-[38px]'>Close</div>
          </button>
        </div>
                   
      </div>
    </Modals>
  )
}

export default AddProduct