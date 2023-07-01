import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='flex items-center justify-between py-6'>
        <Link href="/">
            <div className='flex items-center cursor-pointer'>
                <Image alt='Logo' src="/images/logo.jpg" className='rounded-full w-14 bg-cover h-14' width={100} height={100}/>
                <span className='font-bold ml-2 text-primary'>Coder&apos;s Blog</span>
            </div>
        </Link>
        <ul className='flex items-center'>
            <li className='mr-8 font-medium text-gray-600'>
                <a href="#">Products</a>
            </li>
            <li className='mr-8 font-medium text-gray-600'>
                <a href="#">Pricing</a>
            </li>
            <li className='mr-8 font-medium text-gray-600'>
                <a href="#">Docs</a>
            </li>
            <li className='mr-8 font-medium text-gray-600'>
                <a href="#">Company</a>
            </li>
        </ul>
        <ul className='flex items-center'>
            <li className='mr-6 font-medium text-gray-600 '>
                <a href="#" className='hover:text-gray-400'>Log in</a>
            </li>
            <li className='font-medium text-gray-600 '>
                <a href="#" className='bg-primary py-2 px-4 rounded-sm text-white hover:bg-primary-dark transition-all'>Sign up</a>
            </li>
        </ul>
    </nav>
  )
}
export default Navbar;