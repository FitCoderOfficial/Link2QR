"use client";

import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import QRCodeStyling from "qr-code-styling";
import { DotType, Options, CornerSquareType, CornerDotType } from 'qr-code-styling'; // Import the necessary types
import CustomQR from "./CustomQR";


const Feed = () => {
    const [input, setInput] = useState<string>("");
    const [selectedIcon, setSelectedIcon] = useState<string>('');
    const [foregroundColor, setForegroundColor] = useState<string>('#000000');
    const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');
    const [dotStyle, setDotStyle] = useState<string>('square'); // Default dot style
    const [cornerStyle, setCornerStyle] = useState<{ cornersSquareOptions: { type: string }; cornersDotOptions: { type: string } }>({
        cornersSquareOptions: { type: 'square' },
        cornersDotOptions: { type: 'square' },
    });
    const [gradientData, setGradientData] = useState<{ startColor: string; endColor: string; direction: number }>({
        startColor: '',
        endColor: '',
        direction: 0,
    });
    const qrRef = useRef<HTMLDivElement | null>(null);
    const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null); // QRCodeStyling 인스턴스를 위한 state


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleForegroundColorChange = (color: string) => {
        setForegroundColor(color);
    };

    const handleBackgroundColorChange = (color: string) => {
        setBackgroundColor(color);
    };


    const handleDotStyleChange = (style: string) => {
        setDotStyle(style);
    };

    const handleCornerStyleChange = (newCornerStyle: {
        cornersSquareOptions: { type: string };
        cornersDotOptions: { type: string };
    }) => {
        setCornerStyle(newCornerStyle);
    };

    const handleGradientChange = (gradient: { startColor: string; endColor: string; direction: number }) => {
        setGradientData(gradient);
    };

    useEffect(() => {
        // 클라이언트 측에서만 QRCodeStyling 모듈을 동적으로 가져오기
        if (typeof window !== "undefined" && !qrCode) {
            import("qr-code-styling")
                .then(({ default: QRCodeStyling }) => {
                    const newQrCode = new QRCodeStyling({
                        width: 300,
                        height: 300,
                        type: "svg",
                        data: "https://link2qr.com", // 기본 데이터 설정
                    });

                    setQrCode(newQrCode);
                    // QR 코드 인스턴스를 DOM 요소에 추가
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
            data: input || "https://link2qr.com",
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
    }, [qrCode, input, selectedIcon, foregroundColor, backgroundColor, dotStyle, cornerStyle, gradientData]);



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



    return (
        <section className='feed'>

            <form className='relative w-full flex-center flex-col gap-5' onSubmit={(e: FormEvent) => e.preventDefault()}>
                <input
                    type='text'
                    placeholder='링크를 넣어보세요 ex) https://link2qr.com'
                    value={input}
                    onChange={handleInputChange}
                    className='search_input peer'
                />
            </form>

            <div className="feed" ref={qrRef} />

            <div className="button-group mt-4 flex justify-center gap-2">
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
                onForegroundColorChange={handleForegroundColorChange}
                onBackgroundColorChange={handleBackgroundColorChange}
                onDotStyleChange={handleDotStyleChange}
                onCornerStyleChange={handleCornerStyleChange}
                onGradientChange={handleGradientChange}
            />
        </section>
    )
}

export default Feed 