import React, { useState } from 'react';
import Image from 'next/image'

const CustomQR = ({ onIconSelect }) => {
    const [showIcons, setShowIcons] = useState(false);
    const logoNames = [
        "appstore",
        "bitcoin",
        "discord",
        "facebook",
        "github",
        "gmail",
        "google",
        "googledrive",
        "googleplay",
        "imessage",
        "instagram2",
        "instagram3",
        "KakaoTalk",
        "kakaostory",
        "kakaopage",
        "kakaobank",
        "kakaofavicon",
        "iwifi",
        "linkedin",
        "linktree",
        "messanger",
        "onlyfans",
        "patreon",
        "paypal",
        "qq",
        "reddit",

    ];

    const logos = logoNames.map(name => ({ name, url: `/assets/logos/${name}.svg` }));



    const [activeMenu, setActiveMenu] = useState('');

    const toggleMenu = (menuName) => {
        setActiveMenu(activeMenu === menuName ? '' : menuName);
    };

    return (
        <div className="dropdown-menu feed ">
            <div className="w-full bg-white rounded-lg shadow-xl flex justify-between items-center px-10 py-3">
                {['로고', '모양', '전경색', '배경색'].map((item) => (
                    <div key={item} onClick={() => toggleMenu(item)} className="cursor-pointer">
                        <div className="text-gray-400 text-base">{item}</div>
                    </div>
                ))}
            </div>

            {activeMenu === '로고' && (
                <div className="menufeed">
                    {logos.map((logo, index) => (
                        <button key={index} onClick={() => onIconSelect(logo.url)} className="icon-button">
                            <Image
                                width={50}
                                height={50}
                                src={logo.url}
                                loading="lazy"
                                alt={`Logo ${logo.name}`}
                                className='object-contain' />
                        </button>
                    ))}
                </div>
            )}

            {activeMenu === '모양' && (
                <div className="bg-white rounded-lg shadow-xl px-4 py-6 mt-1">
                    {/* Status Dropdown Content */}
                </div>
            )}

            {/* ... Similarly for Notifications and Sign Out */}
        </div>
    )
}

export default CustomQR