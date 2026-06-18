'use client';

import Link from 'next/link';
import { siteConfig, whatsappUrl } from '@/lib/site-config';

const t = {
    fr: {
        badge: '404',
        title: 'Page introuvable',
        sub: "La page que vous recherchez n'existe pas ou a été déplacée.",
        cta1: 'Voir nos voitures',
        cta2: "Retour à l'accueil",
        help: 'Besoin d\'aide ?',
    },
    en: {
        badge: '404',
        title: 'Page not found',
        sub: "The page you're looking for doesn't exist or has been moved.",
        cta1: 'Browse our cars',
        cta2: 'Back to home',
        help: 'Need help?',
    },
} as const;

export default function NotFound() {
    const lang = (siteConfig.lang === 'en' ? 'en' : 'fr') as keyof typeof t;
    const c = t[lang];

    return (
        <section className="min-h-[65vh] flex flex-col items-center justify-center px-4 py-20 text-center">
            <div
                className="text-9xl font-black select-none leading-none"
                style={{ color: 'var(--site-primary)', opacity: 0.12 }}
                aria-hidden="true"
            >
                {c.badge}
            </div>
            <h1 className="text-3xl md:text-4xl font-black mt-2 mb-3 text-gray-900">
                {c.title}
            </h1>
            <p className="text-gray-500 mb-10 max-w-sm text-base">{c.sub}</p>

            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/nos-voitures"
                    className="px-7 py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90"
                    style={{ background: 'var(--site-primary)' }}
                >
                    {c.cta1}
                </Link>
                <Link
                    href="/"
                    className="px-7 py-3 rounded-xl font-bold border-2 transition"
                    style={{ borderColor: 'var(--site-primary)', color: 'var(--site-primary)' }}
                >
                    {c.cta2}
                </Link>
            </div>

            <p className="mt-12 text-sm text-gray-400">{c.help}</p>
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 font-semibold hover:underline text-sm"
                style={{ color: 'var(--site-primary)' }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.553 4.106 1.517 5.83L0 24l6.335-1.494A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.81 9.81 0 01-5.002-1.371l-.359-.213-3.724.878.925-3.63-.234-.372A9.789 9.789 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                </svg>
                {siteConfig.contact.phone.display}
            </a>
        </section>
    );
}
