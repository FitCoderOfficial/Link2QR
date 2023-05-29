import React, { useState, useRef } from 'react';
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
    const [selectedColor, setSelectedColor] = useState('#6590D5'); // 선택된 색상 상태


    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
        // 필요한 경우 색상 변경 로직 추가
    };

    const toggleMenu = (menuName) => {
        if (menuName === '전경색') {
            // 전경색 메뉴를 클릭할 경우 컬러 픽커에 포커스
            colorPickerRef.current?.focus();
        }
        setActiveMenu(activeMenu === menuName ? '' : menuName);
    };



    const colorPickerRef = useRef<HTMLInputElement>(null); // 컬러 픽커에 대한 ref 생성

    const openColorPicker = () => {
        colorPickerRef.current?.click(); // 컬러 픽커의 클릭 이벤트 발생
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
                            ref={colorPickerRef}
                            type="color"
                            value={selectedColor}
                            onChange={handleColorChange}
                            className='w-6 h-6 rounded-full appearance-none' // 적절한 스타일 조정
                        />
                        <span className="text-gray-400 text-base ml-2" onClick={openColorPicker}>전경색</span>
                    </div>
                </div>
                <div className="cursor-pointer">
                    <div className="flex items-center text-gray-400 text-base">
                        <input
                            type="color"
                            value={selectedColor}
                            onChange={handleColorChange}
                            className='w-6 h-6 rounded-full left-4 appearance-none'
                            style={{ WebkitAppearance: 'none' }}  // 적절한 스타일 조정
                        />
                        <span className="text-gray-400 text-base ml-2" onClick={openColorPicker}>배경색</span>
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