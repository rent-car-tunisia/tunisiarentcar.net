import type { Metadata } from "next";
import { Raleway, Lato } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CurrencyProvider } from "@/context/currency-context";
import { siteConfig, ogImageUrl } from "@/lib/site-config";
import { getSiteConfig } from "@/lib/get-site-data";

const raleway = Raleway({
    subsets: ["latin"],
    weight: ["700", "800"],
    variable: "--font-headline",
    display: "swap",
});

const lato = Lato({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-body",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: siteConfig.seo.titleDefault,
        template: siteConfig.seo.titleTemplate,
    },
    description: siteConfig.seo.description,
    keywords: siteConfig.seo.keywords as unknown as string[],
    authors: [{ name: siteConfig.brand.name }],
    creator: siteConfig.brand.name,
    publisher: siteConfig.brand.name,
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: siteConfig.url.baseUrl,
        languages: {
            [`${siteConfig.seo.language}-TN`]: siteConfig.url.baseUrl,
        },
    },
    openGraph: {
        title: siteConfig.content.meta.ogTitle,
        description: siteConfig.content.meta.ogDesc,
        type: "website",
        locale: siteConfig.seo.locale,
        url: siteConfig.url.baseUrl,
        siteName: siteConfig.brand.name,
        images: [
            {
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: siteConfig.content.meta.ogImageAlt,
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.content.meta.ogTitle,
        description: siteConfig.content.meta.ogDesc,
        images: [ogImageUrl],
    },
    verification: {
        google: siteConfig.seo.googleVerification,
    },
    category: "travel",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dbConfig = await getSiteConfig();
    const phoneDisplay: string = (dbConfig?.phoneDisplay as string | null | undefined) ?? siteConfig.contact.phone.display;
    const phoneWhatsapp: string = (dbConfig?.whatsapp as string | null | undefined) ?? siteConfig.contact.phone.whatsapp;
    const phoneWhatsappUrl: string = `https://wa.me/${phoneWhatsapp}`;
    return (
        <html lang={siteConfig.lang} suppressHydrationWarning>
            <head>
                {/* Site brand CSS variables — drives all themed colors */}
                <style>{`
                    :root {
                        --site-primary: ${siteConfig.theme.primary};
                        --site-primary-dark: ${siteConfig.theme.primaryContainer};
                        --site-accent: ${siteConfig.theme.accent};
                        --site-footer-bg: ${siteConfig.theme.footerBg};
                        --site-icon-tint: ${siteConfig.theme.onPrimaryContainer};
                    }
                `}</style>
                {/* Preconnect to Google Fonts for faster loading */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    rel="preload"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
                    as="style"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
                    media="print"
                    data-onload="all"
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `document.querySelectorAll('link[data-onload]').forEach(function(l){l.media=l.dataset.onload})`,
                    }}
                />
                <noscript>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
                    />
                </noscript>
            </head>
            <body className={`${raleway.variable} ${lato.variable} font-body`}>
                <CurrencyProvider>
                    <Navbar phoneDisplay={phoneDisplay} phoneWhatsappUrl={phoneWhatsappUrl} />
                    <main>{children}</main>
                    <Footer phoneDisplay={phoneDisplay} phoneWhatsappUrl={phoneWhatsappUrl} />
                </CurrencyProvider>
            </body>
        </html>
    );
}
