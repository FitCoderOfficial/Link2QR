import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import { CiCirclePlus } from "react-icons/ci"
import { FaTrash } from "react-icons/fa";


interface CustomQRProps {
    onIconSelect: (icon: string) => void;
    onForegroundColorChange: (color: string) => void;
    onBackgroundColorChange: (color: string) => void;
    onDotStyleChange: (style: string) => void;
    onCornerStyleChange: (cornerStyle: { cornersSquareOptions: { type: string }, cornersDotOptions: { type: string } }) => void;
    onGradientChange: (gradientData: { startColor: string, endColor: string, direction: number }) => void;
}


const CustomQR: React.FC<CustomQRProps> = ({ onIconSelect, onForegroundColorChange, onBackgroundColorChange, onDotStyleChange, onCornerStyleChange, onGradientChange }) => {
    const logoNames = [
        "link2qr",
        "bitcoin",
        "discord",
        "facebook",
        "github",
        "gmail",
        "google",
        "googledrive",
        "imessage",
        "instagram2",
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
        "instagram3",
        "zoom",
        "appstore",
        "googleplay",
    ];


    const dotStyles = [
        { style: 'rounded', imageUrl: '/assets/dotstyles/rounded.svg' },
        { style: 'dots', imageUrl: '/assets/dotstyles/dots.svg' },
        { style: 'classy', imageUrl: '/assets/dotstyles/classy.svg' },
        { style: 'classy-rounded', imageUrl: '/assets/dotstyles/classy-rounded.svg' },
        { style: 'square', imageUrl: '/assets/dotstyles/square.svg' },
        { style: 'extra-rounded', imageUrl: '/assets/dotstyles/extra-rounded.svg' }
    ];

    const cornerStyles = [
        { label: 'square', imageUrl: '/assets/corners/square.svg', cornersSquareOptions: { type: 'square' }, cornersDotOptions: { type: 'square' } },
        { label: 'fewRounded', imageUrl: '/assets/corners/fewRounded.svg', cornersSquareOptions: { type: 'extra-rounded' }, cornersDotOptions: { type: 'square' } },
        { label: 'rounded2', imageUrl: '/assets/corners/rounded2.svg', cornersSquareOptions: { type: 'dot' }, cornersDotOptions: { type: 'square' } },
        { label: 'rounded', imageUrl: '/assets/corners/rounded.svg', cornersSquareOptions: { type: 'extra-rounded' }, cornersDotOptions: { type: 'dot' } },
        { label: 'dot', imageUrl: '/assets/corners/dot.svg', cornersSquareOptions: { type: 'dot' }, cornersDotOptions: { type: 'dot' } }
    ];


    const logos = logoNames.map(name => ({ name, url: `/assets/logos/${name}.svg` }));



    const toggleMenu = (menuName) => {
        if (menuName === '전경색') {
            // 전경색 메뉴를 클릭할 경우 컬러 픽커에 포커스
            colorPickerRef.current?.focus();
        }
        setActiveMenu(activeMenu === menuName ? '' : menuName);
    };

    const [activeMenu, setActiveMenu] = useState('');
    const [selectedForegroundColor, setSelectedForegroundColor] = useState('##000000'); // 전경색 상태
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('#FFFFFF'); // 배경색 상태
    const foregroundColorPickerRef = useRef<HTMLInputElement>(null);
    const backgroundColorPickerRef = useRef<HTMLInputElement>(null);
    const gradientColorPickerRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef(null);
    const [selectedDotStyle, setSelectedDotStyle] = useState(dotStyles[0]);
    const [selectedCornerStyle, setSelectedCornerStyle] = useState(cornerStyles[0].label);
    const [selectedGradientData, setSelectedGradientData] = useState({ startColor: '', endColor: '', direction: 0 });
    const [trackForegroundColor, setTrackForegroundColor] = useState(true);

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

    const openGradientColorPicker = () => {
        gradientColorPickerRef.current?.click();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onIconSelect(event.target?.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDotStyleChange = (dotStyle: string) => {
        setSelectedDotStyle(dotStyle);
        onDotStyleChange(dotStyle);
        // 메뉴가 닫히지 않음 (커스텀 QR 코드 생성을 위해)
    };

    const handleCornerStyleChange = (cornerStyle) => {
        setSelectedCornerStyle(cornerStyle.label);
        onCornerStyleChange(cornerStyle);
    };

    const handleGradientEndColorChange = (e) => {
        const newGradientData = { ...selectedGradientData, endColor: e.target.value };
        setSelectedGradientData(newGradientData);
        onGradientChange(newGradientData);
        setTrackForegroundColor(false); // 그라데이션 색상 선택시 추적 해제
    };

    const handleGradientDirectionChange = (e) => {
        const newGradientData = { ...selectedGradientData, direction: parseFloat(e.target.value) };
        setSelectedGradientData(newGradientData);
        onGradientChange(newGradientData);
    };

    const handleResetGradient = () => {
        setTrackForegroundColor(true); // 전경색 추적 활성화
    };

    useEffect(() => {
        if (trackForegroundColor) {
            const updatedGradientData = { ...selectedGradientData, endColor: selectedForegroundColor };
            setSelectedGradientData(updatedGradientData);
            onGradientChange(updatedGradientData);
        }
    }, [selectedForegroundColor, trackForegroundColor]);


    return (
        <div className="dropdown-menu feed ">
            <div className="w-full bg-white rounded-lg shadow-xl flex justify-between items-center px-10 py-3">
                {['로고', '모양',].map((item) => (
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
                            ref={backgroundColorPickerRef}
                            type="color"
                            value={selectedBackgroundColor}
                            onChange={handleBackgroundColorChange}
                            className='w-7 h-7 rounded-full border-2 border-gray-300 left-4 appearance-none'
                        />
                        <span className="text-gray-400 text-base ml-2" onClick={openBackgroundColorPicker}>배경색</span>
                    </div>
                </div>
                <div onClick={() => toggleMenu('그라데이션')} className="cursor-pointer">
                    <div className="flex items-center text-gray-400 text-base">
                        <div className="relative w-7 h-7 rounded-full border-2 border-gray-300">
                        <div className={`absolute top-0 left-0 w-full h-full rounded-full ${trackForegroundColor ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" : ""}`}
                 style={{ background: trackForegroundColor ? "" : selectedGradientData.endColor }} />
                            <input
                                ref={gradientColorPickerRef}
                                type="color"
                                value={selectedGradientData.endColor}
                                onChange={handleGradientEndColorChange}
                                className='w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer'
                            />
                        </div>
                        <span className="text-gray-400 text-base ml-2" onClick={openGradientColorPicker}>그라데이션</span>
                    </div>
                </div>
            </div>

            {activeMenu === '로고' && (
                <div className="menufeed">
                    <button onClick={() => fileInputRef.current.click()} className="icon-button">
                        <CiCirclePlus className="w-16 h-16" />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".png, .svg"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
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
                <div className="menufeed">
                    {dotStyles.map(({ style, imageUrl }, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotStyleChange(style)}
                            className={`shape-button mt-4 ${style === selectedDotStyle ? 'ring-4 ring-blue-600 rounded-md' : ''}`}
                        >
                            <Image
                                src={imageUrl}
                                alt={`Dot style ${style}`}
                                width={50}
                                height={50}
                                className='object-contain'
                            />
                        </button>
                    ))}


                    <div className="mt-4 px-4 py-6 flex flex-wrap justify-center gap-8">
                        {cornerStyles.map(({ label, imageUrl, cornersSquareOptions, cornersDotOptions }, index) => (
                            <button
                                key={index}
                                onClick={() => handleCornerStyleChange({ cornersSquareOptions, cornersDotOptions, label })}
                                className={`corner-button ${label === selectedCornerStyle ? 'ring-4 ring-blue-600 rounded-md' : ''}`}
                            >
                                <Image
                                    src={imageUrl}
                                    alt={`Corner style ${label}`}
                                    width={50}
                                    height={50}
                                    className='object-contain'
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {activeMenu === '그라데이션' && !trackForegroundColor && (
                <div className="menufeed">
                    {/* 그라데이션 설정 UI */}
                    <div className="flex flex-col items-center">
                        <input
                            type="range"
                            min="0"
                            max="30"
                            value={selectedGradientData.direction}
                            onChange={handleGradientDirectionChange}
                            className='w-full '
                        />
                        {/* 휴지통 아이콘 추가 및 클릭 이벤트 핸들러 연결 */}
                        <FaTrash className="w-6 h-6 mt-2" onClick={handleResetGradient} />
                    </div>
                </div>
            )}

        </div>
    )
}

export default CustomQR