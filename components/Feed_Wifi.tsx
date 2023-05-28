"use client";

import { useState, useEffect } from "react";
import { QRCode } from 'antd';
import CustomQR from "./CustomQR";

const WifiFeed = () => {
    const [ssid, setSsid] = useState("");
    const [password, setPassword] = useState("");
    const [security, setSecurity] = useState("WPA");

    const [selectedIcon, setSelectedIcon] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    };

    const generateWifiQRCodeValue = () => {
        // 와이파이 QR 코드 포맷: WIFI:S:<SSID>;T:<Security>;P:<Password>;;
        return `WIFI:S:${ssid};T:${security};P:${password};;`;
    };

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
                <CustomQR selectedIcon={selectedIcon} onIconSelect={setSelectedIcon} />
            </form>

            {ssid && password ? (
                <div className="feed">
                    <QRCode value={generateWifiQRCodeValue()} icon={selectedIcon} iconSize={80} size={256} errorLevel="H"/>
                </div>
            )
                : (
                    <div className="feed">
                        <QRCode value="myqr.com" size={256} errorLevel="H" icon={selectedIcon} iconSize={80} />
                    </div>
                )
            }
        </section>
    );
}

export default WifiFeed