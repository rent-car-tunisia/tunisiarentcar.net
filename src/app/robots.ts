import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/checkout/', '/booking-confirmation/', '/thank-you/'],
            },
        ],
        sitemap: `${siteConfig.url.baseUrl}/sitemap.xml`,
    }
}
