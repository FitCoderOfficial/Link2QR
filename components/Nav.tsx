'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu"

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className='flex-between w-full mb-16 pt-5'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/link2qr_small.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Link2QR</p>
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
          <Link href='/vcard' className='menu_btn'>
            연락처 (vCard)
          </Link>
          {/* Buy Me a Coffee Link */}
          <a href='https://buymeacoffee.com/fitcoder' className='black_btn' target="_blank" rel="noopener noreferrer">
            후원하기
          </a>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        <div className='flex'></div>
        <LuMenu className="menuicon" onClick={() => setToggleDropdown(!toggleDropdown)} />


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
            <Link
              href='/vcard'
              className='dropdown_link'
              onClick={() => setToggleDropdown(false)}
            >
              연락처로 QR 생성
            </Link>
            <a href='https://buymeacoffee.com/fitcoder' className='dropdown_link' target="_blank" rel="noopener noreferrer">
              후원하기
            </a>
          </div>
        )}
      </div>


    </nav>

  )
}

export default Nav