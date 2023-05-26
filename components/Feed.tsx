"use client";

import { useState, useEffect } from "react";
import QRCode from 'react-qr-code'
import Image from "next/image";

const Feed = () => {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    };


    return (
        <section className='feed'>
            <form className='relative w-full flex-center' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='링크를 넣어보세요 ex) https://myqr.link'
                    value={input}
                    onChange={handleInputChange}
                    required
                    className='search_input peer'
                />


            </form>

            {input && (
                <div className="feed">
                    <QRCode value={input} size={256} level="H" />
                </div>
            )}

        </section>
    )
}

export default Feed