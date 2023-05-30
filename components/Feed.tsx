"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
// import { QRCodeSVG } from 'qrcode.react';
import CustomQR from "./CustomQR";
  

const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg", // Set to SVG
    // Define other properties and styles
});


const Feed = () => {
    const [input, setInput] = useState("");
    const [selectedIcon, setSelectedIcon] = useState('');
    const [foregroundColor, setForegroundColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
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

    useEffect(() => {
        qrCode.update({
            data: input || "https://example.com",
            image: selectedIcon,
            dotsOptions: {
                color: foregroundColor,
            },
            backgroundOptions: {
                color: backgroundColor,
            },
            // Other options and styles
        });
        if (qrRef.current) {
            qrCode.append(qrRef.current);
        }
    }, [input, selectedIcon, foregroundColor, backgroundColor]);

    return (
        <section className='feed'>

            <form className='relative w-full flex-center flex-col gap-5' onSubmit={e => e.preventDefault()}>
                <input
                    type='text'
                    placeholder='링크를 넣어보세요 ex) https://myqr.link'
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
            />
        </section>
    )
}

export default Feed 