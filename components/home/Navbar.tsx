'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const items = [
    {
        name: 'Home',
        href: '/',
        active: false
    },
    {
        name: 'About',
        href: '/about',
        active: false
    },
    {
        name: 'Movie',
        href: '/movie',
        active: false
    },
]
const Navbar = () => {
    const pathname = usePathname()
    const active = 'text-teal-500 font-semibold'

    return (
        <header className='px-10 pt-5 flex justify-between'>
            <Link prefetch href={'/'} className='text-3xl font-semibold'>WEB <span className='text-teal-500'>ABC</span></Link>
            <ul className='flex space-x-5'>
                {items.map((item, index) => (
                    <li key={index}>
                        <Link
                            prefetch
                            className={`${pathname === item.href ? active : ''} hover:text-teal-500 `}
                            href={item.href}>{item.name}</Link>
                    </li>
                ))}

            </ul>
        </header>
    )
}

export default Navbar