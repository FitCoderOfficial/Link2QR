import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedin, FaCommentDots } from 'react-icons/fa';

const Footer = () => {
    const FOOTER_LINKS = [
        { title: 'Service', links: [{ name: 'Link', href: '/' }, { name: 'WiFi', href: '/wifi' }, { name: 'vCard', href: '/vcard' }] },
        { title: 'Support', links: [{ name: 'Coffee Donation', href: 'https://buymeacoffee.com/fitcoder' }, { name: 'Toss Donation', href: 'https://toss.me/thanks4all' }] },
    ];

    const FOOTER_CONTACT_INFO = {
        title: 'Contact Info',
        email: 'toqur1219@gmail.com',
        kakao: 'https://open.kakao.com/o/siUQ0N0f'
    };

    const SOCIAL_LINKS = [
        { name: 'GitHub', href: 'https://github.com/FitCoderOfficial', icon: <FaGithub className="text-xl" /> },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/fitcoderofficial', icon: <FaLinkedin className="text-xl" /> },
        { name: 'KakaoTalk', href: 'https://open.kakao.com/o/siUQ0N0f', icon: <FaCommentDots className="text-xl" /> }
    ];

    return (
        <footer className="py-20 mt-20">
            <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col gap-14">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="flex flex-wrap justify-between gap-10 md:flex-1">
                        {FOOTER_LINKS.map((column, idx) => (
                            <FooterColumn key={idx} title={column.title}>
                                <ul className="text-sm text-gray-700">
                                    {column.links.map((link, linkIdx) => (
                                        <li key={linkIdx} className="mb-2">
                                            <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </FooterColumn>
                        ))}
                        <FooterColumn title="Social Media">
                            <ul className="text-sm text-gray-700 flex flex-col gap-2">
                                {SOCIAL_LINKS.map((link, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center">
                                            {link.icon}
                                            <span className="ml-2">{link.name}</span>
                                        </a>

                                    </li>
                                ))}
                            </ul>
                        </FooterColumn>

                        <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                            <div className="flex flex-col gap-1">
                                <span className="font-medium text-gray-900">Email</span>
                                <Link href={`mailto:${FOOTER_CONTACT_INFO.email}`} className="text-blue-600 hover:text-blue-700">{FOOTER_CONTACT_INFO.email}</Link>
                            </div>
                        </FooterColumn>
                    </div>
                </div>

                <div className="border-t border-white" />
                <p className="text-sm text-center text-gray-700">&copy; {new Date().getFullYear()} FitCoderOfficial. All rights reserved.</p>
            </div>
        </footer>
    );
}

const FooterColumn = ({ title, children }) => (
    <div className="flex flex-col gap-5">
        <h4 className="text-lg font-semibold">{title}</h4>
        {children}
    </div>
);

export default Footer;