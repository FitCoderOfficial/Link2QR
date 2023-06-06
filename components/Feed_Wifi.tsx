"use client";

import React, { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import { DotType, Options, CornerSquareType, CornerDotType } from 'qr-code-styling'; // Import the necessary types
import CustomQR from "./CustomQR";



const WifiFeed = () => {
    const [ssid, setSsid] = useState("");
    const [password, setPassword] = useState("");
    const [security, setSecurity] = useState("WPA");
    const [selectedIcon, setSelectedIcon] = useState('');
    const [foregroundColor, setForegroundColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    const [dotStyle, setDotStyle] = useState<string>('square'); // Default dot style
    const [cornerStyle, setCornerStyle] = useState<{ cornersSquareOptions: { type: string }; cornersDotOptions: { type: string } }>({
        cornersSquareOptions: { type: 'square' },
        cornersDotOptions: { type: 'square' },
    });
    const [gradientData, setGradientData] = useState({ startColor: '', endColor: '', direction: 0 });
    const qrRef = useRef<HTMLDivElement | null>(null);
    const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null); // QRCodeStyling 인스턴스를 위한 state

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지 Prevents form submission from reloading the page
    };

    const generateWifiQRCodeValue = () => {
        // 와이파이 QR 코드 포맷: WIFI:S:<SSID>;T:<Security>;P:<Password>;;
        return `WIFI:S:${ssid};T:${security};P:${password};;`;
    };


    // Define the type for file extensions
    type FileExtension = 'png' | 'jpeg' | 'webp' | 'svg';

    // 기타 state 선언
    const [fileExt, setFileExt] = useState<FileExtension>('png'); // 파일 확장자 상태

    // 파일 확장자 변경 핸들러
    const onExtensionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as FileExtension;
        setFileExt(value);
    };

    // 다운로드 버튼 클릭 핸들러
    const onDownloadClick = () => {
        qrCode?.download({ extension: fileExt });
    };

    useEffect(() => {
        // 클라이언트 측에서만 QRCodeStyling 모듈을 동적으로 가져오기
        if (typeof window !== "undefined") {
            import("qr-code-styling")
                .then(({ default: QRCodeStyling }) => {
                    const newQrCode = new QRCodeStyling({
                        width: 300,
                        height: 300,
                        type: "svg",
                        data: "https://link2qr.com", // 기본 데이터 설정
                    });

                    setQrCode(newQrCode);
                    if (qrRef.current) {
                        newQrCode.append(qrRef.current);
                        console.log("QR Code appended to the DOM");
                    }
                });
        }
    }, []);

    useEffect(() => {
        if (!qrCode) return;
        const qrOptions: Partial<Options> = {
            data: generateWifiQRCodeValue() || "https://link2qr.com",
            image: selectedIcon,
            dotsOptions: {
                type: dotStyle as DotType, // Ensure dotStyle is of type DotType
                gradient: {
                    type: "linear",
                    rotation: gradientData.direction,
                    colorStops: [
                        { offset: 0, color: gradientData.startColor || foregroundColor },
                        { offset: 1, color: gradientData.endColor || '#000000' }
                    ],
                },
            },
            backgroundOptions: {
                color: backgroundColor,
            },
            cornersSquareOptions: {
                type: cornerStyle.cornersSquareOptions.type as CornerSquareType, // Ensure type is of type CornerSquareType
            },
            cornersDotOptions: {
                type: cornerStyle.cornersDotOptions.type as CornerDotType, // Ensure type is of type CornerDotType
            },
        };

        qrCode.update(qrOptions);
    }, [qrCode, ssid, password, security, selectedIcon, foregroundColor, backgroundColor, dotStyle, cornerStyle, gradientData]);


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