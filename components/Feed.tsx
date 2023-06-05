"use client";

import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import QRCodeStyling from "qr-code-styling";
import CustomQR from "./CustomQR";


const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg", // Set to SVG
});

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
        const qrOptions = {
            data: input || "https://link2qr.com",
            image: selectedIcon,
            dotsOptions: {
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
        };


        qrCode.update(qrOptions);
        if (qrRef.current) {
            qrCode.append(qrRef.current);
        }
    }, [input, selectedIcon, foregroundColor, backgroundColor, dotStyle, cornerStyle, gradientData]);


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
        qrCode.download({ extension: fileExt });
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