"use client";

import React, { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import CustomQR from "./CustomQR";

const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
});

const WifiFeed = () => {
    const [ssid, setSsid] = useState("");
    const [password, setPassword] = useState("");
    const [security, setSecurity] = useState("WPA");
    const [selectedIcon, setSelectedIcon] = useState('');
    const [foregroundColor, setForegroundColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    const [dotStyle, setDotStyle] = useState('square');
    const [cornerStyle, setCornerStyle] = useState({ cornersSquareOptions: { type: 'square' }, cornersDotOptions: { type: 'square' } });
    const [gradientData, setGradientData] = useState({ startColor: '', endColor: '', direction: 0 });
    const qrRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지 Prevents form submission from reloading the page
    };

    const generateWifiQRCodeValue = () => {
        // 와이파이 QR 코드 포맷: WIFI:S:<SSID>;T:<Security>;P:<Password>;;
        return `WIFI:S:${ssid};T:${security};P:${password};;`;
    };


    // 기타 state 선언
    const [fileExt, setFileExt] = useState("png"); // 파일 확장자 상태

    // 파일 확장자 변경 핸들러
    const onExtensionChange = (event) => {
        setFileExt(event.target.value);
    };

    // 다운로드 버튼 클릭 핸들러
    const onDownloadClick = () => {
        qrCode.download({ extension: fileExt });
    };

    useEffect(() => {
        qrCode.update({
            data: generateWifiQRCodeValue(),
            image: selectedIcon,
            dotsOptions: {
                color: foregroundColor,
                type: dotStyle,
                gradient: {
                    type: "linear",
                    rotation: gradientData.direction, // Assuming you have a state for gradient direction
                    colorStops: [
                        { offset: 0, color: gradientData.startColor || foregroundColor },
                        { offset: 1, color: gradientData.endColor || '#000000' } // Default to white if no end color
                    ]
                }
            },
            backgroundOptions: {
                color: backgroundColor,
            },
            cornersSquareOptions: cornerStyle.cornersSquareOptions,
            cornersDotOptions: cornerStyle.cornersDotOptions,
        });

        if (qrRef.current) {
            qrCode.append(qrRef.current);
        }
    }, [ssid, password, security, selectedIcon, foregroundColor, backgroundColor, dotStyle, cornerStyle, gradientData]);

    return (
        <section className='feed'>
            <form className='relative w-full flex-center flex-col gap-5' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='와이파이 아이디'
                    value={ssid}
                    onChange={(e) => setSsid(e.target.value)}
                    className='search_input peer'
                />
                <input
                    type='password'
                    placeholder='와이파이 비밀번호'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='search_input peer'
                />
                <select
                    value={security}
                    onChange={(e) => setSecurity(e.target.value)}
                    className='search_input peer'
                >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No Password</option>
                </select>
            </form>

            <div className="feed" ref={qrRef} />

            <div className="button-group mt-4 flex justify-center gap-4">
                <select onChange={onExtensionChange} value={fileExt} className="bg-blue-500 text-white rounded-lg p-2 outline-none hover:bg-blue-600 focus:bg-blue-700 transition duration-300">
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WEBP</option>
                    <option value="svg">SVG</option>
                </select>
                <button onClick={onDownloadClick} className="bg-blue-500 text-white rounded-lg px-4 py-2 outline-none hover:bg-blue-600 focus:bg-blue-700 transition duration-300">QR 코드 다운받기</button>
            </div>

            <CustomQR
                onIconSelect={setSelectedIcon}
                onForegroundColorChange={setForegroundColor}
                onBackgroundColorChange={setBackgroundColor}
                onDotStyleChange={setDotStyle}
                onCornerStyleChange={setCornerStyle}
                onGradientChange={setGradientData}
            />
        </section>
    );
}

export default WifiFeed