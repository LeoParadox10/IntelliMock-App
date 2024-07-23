'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path = usePathname();
    useEffect(() => {
        console.log(path)
    }, [])
    const router = useRouter();
    const onDashboard = () => {
        router.push('/dashboard')
    }
    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
            <Image src={'/logo.png'} width={160} height={100} alt='logo' />
            <ul className='hidden md:flex gap-6'>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == '/dashboard' && 'text-primary font-bold'}`} onClick={onDashboard}>Dashboard</li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == '/dashboard/questions' && 'text-primary font-bold'}`}>Upgrade</li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}>FAQs</li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == '/dashboard/working' && 'text-primary font-bold'}`}>How it works?</li>
            </ul>
            <UserButton />
        </div>
    )
}

export default Header