'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>My QR</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        <div className='flex gap-3 md:gap-3'>
          <Link href='/' className='menu_btn'>
            링크
          </Link>
          <Link href='/wifi' className='menu_btn'>
            와이파이
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
          <div className='flex'></div>
          <Image
              src='/assets/images/logo.svg'
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  링크로 QR 생성
                </Link>
                <Link
                  href='/wifi'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  와이파이로 QR 생성
                </Link>
              </div>
            )}
          </div>


    </nav>

  )
}

export default Nav