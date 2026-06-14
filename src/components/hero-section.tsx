'use client';

import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

function HeroOverlay() {
    return (
        <section
            className="relative min-h-[500px] px-6 md:px-12 py-24 flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: 'var(--site-primary)' }}
        >
            <Image
                src="/images/hero-bg.webp"
                alt={siteConfig.content.hero.h1}
                fill
                className="object-cover object-center"
                priority
                quality={85}
            />
            <div className="absolute inset-0 opacity-60" style={{ backgroundColor: 'var(--site-primary)' }} />
            <div
                className="absolute inset-x-0 bottom-0 h-32"
                style={{ background: 'linear-gradient(to top, var(--site-primary), transparent)' }}
            />
            <div className="relative z-10 max-w-5xl text-center">
                <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 uppercase drop-shadow-lg">
                    {siteConfig.content.hero.h1}
                </h1>
                <p className="font-body text-lg md:text-xl font-medium text-white/85 max-w-2xl mx-auto drop-shadow-md">
                    {siteConfig.content.hero.subtitle}
                </p>
                <div className="mt-6 inline-flex items-center gap-3">
                    <span className="h-px w-8 bg-white/50" />
                    <span className="font-headline text-sm md:text-base font-bold tracking-widest text-white uppercase drop-shadow-md">
                        {siteConfig.content.hero.badge}
                    </span>
                    <span className="h-px w-8 bg-white/50" />
                </div>
            </div>
        </section>
    );
}

function HeroSplit() {
    return (
        <section className="relative overflow-hidden flex flex-col md:flex-row min-h-[520px]">
            {/* Left panel — brand gradient with text */}
            <div
                className="relative z-10 flex flex-col justify-center w-full md:w-[55%] px-8 md:px-16 py-20 md:py-24"
                style={{ background: 'linear-gradient(135deg, var(--site-primary) 0%, var(--site-primary-dark) 100%)' }}
            >
                <span className="inline-block mb-5 text-xs font-bold tracking-widest uppercase text-white/70 border border-white/20 px-3 py-1.5 rounded-full w-fit">
                    {siteConfig.content.hero.badge}
                </span>
                <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5 uppercase tracking-tight">
                    {siteConfig.content.hero.h1}
                </h1>
                <p className="font-body text-base md:text-lg text-white/80 max-w-md leading-relaxed">
                    {siteConfig.content.hero.subtitle}
                </p>
            </div>

            {/* Right panel — full-bleed hero image */}
            <div className="relative w-full md:w-[45%] h-64 md:h-auto">
                <Image
                    src="/images/hero-bg.webp"
                    alt={siteConfig.content.hero.h1}
                    fill
                    className="object-cover object-center"
                    priority
                    quality={85}
                />
                {/* Fade to blend with left panel on desktop */}
                <div
                    className="absolute inset-y-0 left-0 w-28 hidden md:block"
                    style={{ background: 'linear-gradient(to right, var(--site-primary-dark), transparent)' }}
                />
            </div>
        </section>
    );
}

export function HeroSection() {
    const variant = siteConfig.theme.heroVariant as string;
    return variant === 'split' ? <HeroSplit /> : <HeroOverlay />;
}
