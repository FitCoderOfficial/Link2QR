"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import CustomQR from "./CustomQR";


const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg", // Set to SVG
});

const Feed = () => {
    const [input, setInput] = useState("");
    const [selectedIcon, setSelectedIcon] = useState('');
    const [foregroundColor, setForegroundColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    const [dotStyle, setDotStyle] = useState('square'); // Default dot style
    const [cornerStyle, setCornerStyle] = useState({ cornersSquareOptions: { type: 'square' }, cornersDotOptions: { type: 'square' } });
    const [gradientData, setGradientData] = useState({ startColor: '', endColor: '', direction: 0 });
    const qrRef = useRef(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleForegroundColorChange = (color) => {
        setForegroundColor(color);
    };

    const handleBackgroundColorChange = (color) => {
        setBackgroundColor(color);
    };


    const handleDotStyleChange = (style) => {
        setDotStyle(style);
    };

    const handleCornerStyleChange = (newCornerStyle) => {
        setCornerStyle(newCornerStyle);
    };

    const handleGradientChange = (gradient) => {
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


    return (
        <section className='feed'>

            <form className='relative w-full flex-center flex-col gap-5' onSubmit={e => e.preventDefault()}>
                <input
                    type='text'
                    placeholder='링크를 넣어보세요 ex) https://link2qr.com'
                    value={input}
                    onChange={handleInputChange}
                    className='search_input peer'
                />
            </form>

            <div className="feed" ref={qrRef} />

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