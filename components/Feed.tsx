"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from 'qrcode.react';
import CustomQR from "./CustomQR";


const Feed = () => {
    const [input, setInput] = useState("");
    const [selectedIcon, setSelectedIcon] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    };


    return (
        <section className='feed'>

            <form className='relative w-full flex-center flex-col gap-5' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='링크를 넣어보세요 ex) https://myqr.link'
                    value={input}
                    onChange={handleInputChange}
                    className='search_input peer'
                />
            </form>


            {input ? (
                <div className="feed">
                    {/* <QRCode value={input} size={256} errorLevel="H" icon={selectedIcon} iconSize={80} className="object-contain" /> */}
                    <QRCodeSVG 
                        value={input} 
                        size={256} 
                        level={"L"}
                        {...(selectedIcon && {
                            imageSettings: {
                                src: selectedIcon,
                                x: undefined,
                                y: undefined,
                                height: 50,
                                width: 50,
                                excavate: true,
                            }
                        })}
                        className="object-contain" />

                </div>

            ) :
                (
                    <div className="feed">
                        {/* <QRCode value="myqr.com" size={256} errorLevel="H" icon={selectedIcon} iconSize={80} /> */}
                        <QRCodeSVG 
                        value="myqr.com" 
                        size={256} 
                        level={"L"}
                        {...(selectedIcon && {
                            imageSettings: {
                                src: selectedIcon,
                                x: undefined,
                                y: undefined,
                                height: 80,
                                width: 80,
                                excavate: true,
                            }
                        })}
                        className="object-contain" />
                    </div>
                )}


            <CustomQR onIconSelect={setSelectedIcon} />
        </section>
    )
}

export default Feed 