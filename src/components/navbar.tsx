"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { siteConfig, telUrl, whatsappUrl } from "@/lib/site-config";
import { CurrencyToggle } from "@/components/currency-toggle";

interface NavbarProps {
    phoneDisplay?: string;
    phoneWhatsappUrl?: string;
    logoSrc?: string;
}

export function Navbar({ phoneDisplay, phoneWhatsappUrl, logoSrc }: NavbarProps = {}) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const displayPhone = phoneDisplay ?? siteConfig.contact.phone.display;
    const callUrl = phoneWhatsappUrl ?? whatsappUrl;
    const logo = logoSrc ?? siteConfig.logo.main;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = siteConfig.content.nav.links as readonly { href: string; label: string }[];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
                    scrolled
                        ? "bg-white/85 backdrop-blur-xl shadow-sm"
                        : "bg-white/85 backdrop-blur-xl"
                }`}
            >
                <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                    <div className="flex items-center justify-between h-20">
                        {/* Brand Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <Image
                                src={logo}
                                alt={siteConfig.brand.name}
                                width={160}
                                height={56}
                                className="h-14 w-auto"
                                priority
                            />
                        </Link>

                        {/* Center Nav Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="font-headline text-sm font-semibold text-slate-600 transition-colors duration-300 hover:opacity-80" style={{ '--tw-hover-color': 'var(--site-primary)' } as React.CSSProperties}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Currency Toggle + Phone (right) */}
                        <div className="hidden md:flex items-center gap-4">
                            <CurrencyToggle />
                            <a
                                href={callUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 font-semibold" style={{ color: 'var(--site-primary)' }}
                            >
                                <span className="material-symbols-outlined text-xl">call</span>
                                {displayPhone}
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 -mr-2 text-slate-600"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Menu"
                        >
                            <span className="material-symbols-outlined text-2xl">
                                {isOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-white md:hidden animate-fade-in">
                    <div className="pt-24 px-6 space-y-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block font-headline text-2xl font-bold text-[#191c1e] py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-6 border-t border-[#e0e3e6]">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-sm text-gray-500">{siteConfig.content.nav.currencyLabel}</span>
                                <CurrencyToggle />
                            </div>
                            <a
                                href={callUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-lg font-semibold" style={{ color: 'var(--site-primary)' }}
                            >
                                <span className="material-symbols-outlined">call</span>
                                {displayPhone}
                            </a>
                            <p className="text-[#444651] text-sm mt-2">
                                {siteConfig.content.nav.mobileAvailability}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Spacer for fixed navbar */}
            <div className="h-20" />
        </>
    );
}
