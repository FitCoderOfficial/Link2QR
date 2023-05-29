"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from 'qrcode.react';
import CustomQR from "./CustomQR";

const Feed_Vcard = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [selectedIcon, setSelectedIcon] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents form submission from reloading the page
    };

    const generateVCardQRCodeValue = () => {
        // VCard QR code format: BEGIN:VCARD\nVERSION:3.0\nN:[Name]\nTEL:[Phone]\nEMAIL:[Email]\nADR:[Address]\nEND:VCARD
        return `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nADR:${address}\nEND:VCARD`;
    };

    return (
        <section className='feed'>
            <form className='relative w-full flex-center flex-col gap-5' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='이름'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='search_input peer'
                />
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='search_input peer'
                />
                <input
                    type='text'
                    placeholder='핸드폰번호'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className='search_input peer'
                />
                <input
                    type='text'
                    placeholder='주소'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className='search_input peer'
                />

            </form>

            {name && email && phone && address ? (
                <div className="feed">
                    <QRCodeSVG
                        value={generateVCardQRCodeValue()}
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
            )
                : (
                        <div className="feed">
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
                                })} />
                        </div>
                )
            }
            <CustomQR onIconSelect={setSelectedIcon} />
        </section>

    );
}

export default Feed_Vcard