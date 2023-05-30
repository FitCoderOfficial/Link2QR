import React, { useState, useRef } from 'react';
import Image from 'next/image'

const CustomQR = ({ onIconSelect, onForegroundColorChange, onBackgroundColorChange }) => {
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
        "naver",
        "naver_1",
        "naver_band",
        "naver_band1",
        "naver_blog",
        "naver_cafe",
        "naver_line",
        "onlyfans",
        "patreon",
        "paypal",
        "qq",
        "reddit",
        "skype",
        "snap",
        "spotify",
        "telegram",
        "tiktok",
        "tinder",
        "toss",
        "tripadvisor",
        "twitch",
        "twitter",
        "wechat",
        "whatsapp",
        "wifi",
        "wifiblack",
        "x",
        "youtube",
        "youtube2",
        "zoom",

    ];

    const logos = logoNames.map(name => ({ name, url: `/assets/logos/${name}.svg` }));



    const [activeMenu, setActiveMenu] = useState('');
    
    const toggleMenu = (menuName) => {
        if (menuName === '전경색') {
            // 전경색 메뉴를 클릭할 경우 컬러 픽커에 포커스
            colorPickerRef.current?.focus();
        }
        setActiveMenu(activeMenu === menuName ? '' : menuName);
    };
    
    
    const [selectedForegroundColor, setSelectedForegroundColor] = useState('##000000'); // 전경색 상태
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('#FFFFFF'); // 배경색 상태
    const foregroundColorPickerRef = useRef<HTMLInputElement>(null);
    const backgroundColorPickerRef = useRef<HTMLInputElement>(null);

    const handleForegroundColorChange = (e) => {
        const newColor = e.target.value;
        setSelectedForegroundColor(newColor);
        onForegroundColorChange(newColor); // 부모 컴포넌트에 전경색 변경 알림
    };

    const handleBackgroundColorChange = (e) => {
        const newColor = e.target.value;
        setSelectedBackgroundColor(newColor);
        onBackgroundColorChange(newColor); // 부모 컴포넌트에 배경색 변경 알림
    };

    const openForegroundColorPicker = () => {
        foregroundColorPickerRef.current?.click();
    };

    const openBackgroundColorPicker = () => {
        backgroundColorPickerRef.current?.click();
    };


    return (
        <div className="dropdown-menu feed ">
            <div className="w-full bg-white rounded-lg shadow-xl flex justify-between items-center px-10 py-3">
                {['로고', '모양'].map((item) => (
                    <div key={item} onClick={() => toggleMenu(item)} className="cursor-pointer">
                        <div className="text-gray-400 text-base">{item}</div>
                    </div>
                ))}
                <div className="cursor-pointer">
                    <div className="flex items-center text-gray-400 text-base">
                        <input
                            ref={foregroundColorPickerRef}
                            type="color"
                            value={selectedForegroundColor}
                            onChange={handleForegroundColorChange}
                            className='w-7 h-7 rounded-full border-2 border-gray-300 appearance-none'
                        />
                        <span className="text-gray-400 text-base ml-2" onClick={openForegroundColorPicker}>전경색</span>
                    </div>
                </div>
                <div className="cursor-pointer">
                    <div className="flex items-center text-gray-400 text-base">
                        <input
                            type="color"
                            value={selectedBackgroundColor}
                            onChange={handleBackgroundColorChange}
                            className='w-7 h-7 rounded-full border-2 border-gray-300 left-4 appearance-none'
                        />
                        <span className="text-gray-400 text-base ml-2" onClick={openBackgroundColorPicker}>배경색</span>
                    </div>
                </div>
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

        </div>
    )
}

export default CustomQR