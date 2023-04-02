'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Nav = () => {

    const isUserLoggedIn = true

    const [providers, setproviders] = useState(null)
    const [ToggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders()
            setproviders(response)
        }

        setproviders();
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className='flex gap-2 flex-center'>
                <Image src="/assets/images/logo.svg" alt='logo' width={30} height={30} className='object-contain' />
                <p className="logo_text">
                    GreenFitAi
                </p>
            </Link>
            {/* Desktop Nav */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create"
                            className="black_btn">
                            질문하기
                        </Link>
                        <button type="button" onClick={signOut} className="outline_btn">
                            로그아웃
                        </button>

                        <Link href="profile">
                            <Image src="/assets/images/logo.svg" width={37} height={37} className="rounded-full" alt="profile" />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                로그인
                            </button>
                        ))}
                    </>
                )}
            </div>

            {/* Mobile Nav */}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Image src="/assets/images/logo.svg" alt='logo' width={30} height={30} className='object-contain' onClick={() => setToggleDropdown((prev)=> !prev)} />

                        {ToggleDropdown && (
                            <div className="dropdown">
                                <Link href="/profile" className="dropdown_link" onClick={() => {setToggleDropdown(false)}}>
                                    프로필
                                </Link>
                                <Link href="/ai" className="dropdown_link" onClick={() => {setToggleDropdown(false)}}>
                                    AI 상담
                                </Link>
                                <button type="button" className="mt-5 w-full black_btn" onClick={() => {setToggleDropdown(false); signOut()}}>
                                    로그아웃
                                </button>
                            </div>
                            )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                로그인
                            </button>
                        ))}
                    </>
                )}
            </div>


        </nav>

    )
}

export default Nav