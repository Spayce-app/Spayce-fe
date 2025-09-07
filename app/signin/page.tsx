'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
export default function Page() {
    const [formData, setFormdata] = useState({
        email: '',
        password: '',
    })

    const [createAccountModal, setCraeteAccountModal] = useState(false)


    const handleToggleCreateAccountModal = () => {
        setCraeteAccountModal(!createAccountModal)
        setFormdata({ email: '', password: '' })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormdata({ ...formData, [name]: value })
    }

    return (
        <div className='h-[100vh] w-screen flex-col gap-4 flex justify-center items-center'>
            <div className='cursor-pointer  flex items-center top-0 w-full  fixed z-50 md:bg-transaparent bg-[#f4f4f0] md:h-[10%] h-[15%]  justify-center flex' onClick={() => setCraeteAccountModal(false)}>
                <Image src={'/images/gote-logo-removebg.png'} alt='Logo' sizes='' objectFit='cover' width={180} height={100} priority={true} className='fixed   z-50 md:left-10 left-20  top-5  md:top-10' />
            </div>
            <div><Toaster /></div>
            <div className='xl:w-[39%] mx-auto flex flex-col gap-2 items-center text-center xl:items-start'>
                <div className='md:text-[2.5rem] text-[2rem]'>
                    <strong> Welcome</strong> <span className='font-light'>Back</span>
                </div>
                <div>
                    <div>Please enter your login details to access your account.</div>
                </div>
            </div>
            <div className='w-full flex justify-center  items-center'>
                <form className='w-full justify-center gap-10 flex flex-col items-center' >
                    <div className='w-[60%] justify-center flex flex-col gap-4 items-center'>
                        <Input type='email' className='border-2' width='xl:w-[40%] w-[80%]' name='email' placeholder='E.g Bendee@gmail.com' value={formData.email} onChange={handleInputChange} />
                        <Input type='password' width='xl:w-[40%] w-[80%]' name='password' placeholder='E.g Steword12#$%' value={formData.password} onChange={handleInputChange} />
                    </div>
                    <div className='w-full  items-center  justify-center  flex text-white'>
                        <Button>Submit</Button>
                    </div>
                    <div>New account? <span className='underline cursor-pointer leading-0 tracking-0' onClick={handleToggleCreateAccountModal}>Sign Up</span> </div>
                </form>
            </div>
            {/* <AnimatePresence>
                {
                    createAccountModal &&
                    <motion.div
                        initial={{ opacity: 0, y: 300 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', damping: 10, stiffness: 50 }}
                        exit={{ opacity: 0, y: 300 }}
                        className='flex flex-col gap-2 overflow-auto xl:pt-32  md:pt-[13rem] pt-[8rem] Account_slide  h-full inset-0 absolute md:fixed w-full  bg-[#f4f4f0] justify-center items-center text-center mx-auto' >
                        <Signup setCraeteAccountModal={setCraeteAccountModal} />
                    </motion.div>
                }
            </AnimatePresence> */}
        </div>
    )
}
