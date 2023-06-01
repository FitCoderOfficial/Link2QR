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

    useEffect(() => {
        qrCode.update({
            data: input || "https://link2qr.com",
            image: selectedIcon,
            dotsOptions: {
                color: foregroundColor,
                type: dotStyle,
                gradient: {
                    type: "linear", // 'radial'도 가능
                    rotation: 0,
                    colorStops: [
                      { offset: 0, color: "#FFB6C1" },
                      { offset: 1, color: "#FF69B4" }
                    ]
                  }
                
            },
            backgroundOptions: {
                color: backgroundColor,
            },
            cornersSquareOptions: cornerStyle.cornersSquareOptions,
            cornersDotOptions: cornerStyle.cornersDotOptions,
            // ... Other QR code options
        });
        if (qrRef.current) {
            qrCode.append(qrRef.current);
        }
    }, [input, selectedIcon, foregroundColor, backgroundColor, dotStyle, cornerStyle]);


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
            />
        </section>
    )
}

export default Feed 