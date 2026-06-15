import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CurrencyProvider } from "@/context/currency-context";
import { siteConfig, ogImageUrl } from "@/lib/site-config";
import { getSiteConfig } from "@/lib/get-site-data";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["700", "800"],
    variable: "--font-headline",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-body",
    display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
    const dbConfig = await getSiteConfig();
    const dynamicOgImg = (dbConfig?.ogImage as string | null) ?? ogImageUrl;
    const brandName = (dbConfig?.brandName as string | null) ?? siteConfig.brand.name;
    return {
        title: {
            default: (dbConfig?.seoTitleDefault as string | null) ?? siteConfig.seo.titleDefault,
            template: (dbConfig?.seoTitleTemplate as string | null) ?? siteConfig.seo.titleTemplate,
        },
        description: (dbConfig?.seoDescription as string | null) ?? siteConfig.seo.description,
        keywords: ((dbConfig?.seoKeywords as string[] | null) ?? siteConfig.seo.keywords) as unknown as string[],
        authors: [{ name: brandName }],
        creator: brandName,
        publisher: brandName,
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
            locale: (dbConfig?.seoLocale as string | null) ?? siteConfig.seo.locale,
            url: siteConfig.url.baseUrl,
            siteName: brandName,
            images: [
                {
                    url: dynamicOgImg,
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
            images: [dynamicOgImg],
        },
        verification: {
            google: (dbConfig?.seoGoogleVerification as string | null) ?? siteConfig.seo.googleVerification,
        },
        category: "travel",
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dbConfig = await getSiteConfig();
    const phoneDisplay: string = (dbConfig?.phoneDisplay as string | null | undefined) ?? siteConfig.contact.phone.display;
    const phoneWhatsapp: string = (dbConfig?.whatsapp as string | null | undefined) ?? siteConfig.contact.phone.whatsapp;
    const phoneWhatsappUrl: string = `https://wa.me/${phoneWhatsapp}`;

    // Dynamic theme colors — admin panel overrides static siteConfig values
    const colors = (dbConfig?.themeColors ?? {}) as Record<string, string>;
    const primary     = colors.primary             ?? siteConfig.theme.primary;
    const primaryDark = colors.primaryContainer    ?? colors.primary_container    ?? siteConfig.theme.primaryContainer;
    const accent      = colors.accent              ?? siteConfig.theme.accent;
    const footerBg    = colors.footerBg            ?? colors.footer_bg            ?? siteConfig.theme.footerBg;
    const iconTint    = colors.onPrimaryContainer  ?? colors.on_primary_container ?? siteConfig.theme.onPrimaryContainer;

    // Dynamic logos — admin panel overrides static siteConfig values
    const logoSrc      = (dbConfig?.logoMain  as string | null) ?? siteConfig.logo.main;
    const logoWhiteSrc = (dbConfig?.logoWhite as string | null) ?? siteConfig.logo.white;

    return (
        <html lang={siteConfig.lang} suppressHydrationWarning>
            <head>
                {/* Site brand CSS variables — drives all themed colors */}
                <style>{`
                    :root {
                        --site-primary: ${primary};
                        --site-primary-dark: ${primaryDark};
                        --site-accent: ${accent};
                        --site-footer-bg: ${footerBg};
                        --site-icon-tint: ${iconTint};
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
            <body className={`${playfair.variable} ${inter.variable} font-body`}>
                <CurrencyProvider>
                    <Navbar phoneDisplay={phoneDisplay} phoneWhatsappUrl={phoneWhatsappUrl} logoSrc={logoSrc} />
                    <main>{children}</main>
                    <Footer phoneDisplay={phoneDisplay} phoneWhatsappUrl={phoneWhatsappUrl} logoWhiteSrc={logoWhiteSrc} />
                </CurrencyProvider>
            </body>
        </html>
    );
}
