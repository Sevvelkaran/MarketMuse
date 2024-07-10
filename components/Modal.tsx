"use client"

import React, { FormEvent, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useState } from 'react'
import Image from 'next/image'
import { addUserEmailToProduct } from '@/lib'

interface Props{
    productId: string
}




const Modal = ({productId}: Props) => {
    let [isOpen, setIsOpen] = useState(true)
    const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await addUserEmailToProduct(productId, email);

    setIsSubmitting(false)
    setEmail('')
    closeModal()
  }

  return (
    <>
      <button type="button" className="btn" onClick={openModal}>
Track
    </button>



    <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" onClose={closeModal} className="dialog-container">
    <div className="min-h-screen px-4 text-center">
        <span className="inline-block h-screen align-middle" aria-hidden = "true"
        />
            
        <div className="dialog-content">
            <div className="flex -flex-col">
                <div className="flex justify-between">
                    <div className="p-3 border border-gray-50 rounded-10">
                    <Image
                        src="/assets/icons/x-close.svg"
                        alt="close"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                        onClick={closeModal}
                        
                        />
                        </div>
                        <h4 className="dialog-head_text">
                    Stay updated with product pricing alerts right in your inbox!
                  </h4>
                 
                        

                </div>
                
               

            </div>
            
            <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-sm font-medium text-gray-600">
Email Address
                    </label>
                    <div className="dialog-input_container">
                    <Image
                    src="/assets/icons/mail.svg"
                    alt='mail'
                    width={18}
                    height={18}
                    
                    />
                    <input
                    
                    required
                    type='email'
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Your Mail Address'
                    className='dialog-input'
                    />
                    </div>
                    <button type="submit"
                    className="dialog-btn"
                  >
                    {isSubmitting ? 'Submitting...' : 'Track'}
                  </button>

                </form>
        </div>


        </div>
      </Dialog>
    </Transition>
    </>
  )
}

export default Modal