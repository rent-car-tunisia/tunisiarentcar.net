import { MetadataRoute } from 'next'
import { getCars } from '@/lib/data'
import { siteConfig } from '@/lib/site-config'
import { getCities, getAirports, getServices } from '@/lib/get-site-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.url.baseUrl
    const [cars, cities, airports, services] = await Promise.all([
        getCars(),
        getCities(),
        getAirports(),
        getServices(),
    ])
    const now = new Date()

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/nos-voitures`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/tarifs`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/longue-duree`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/sans-carte-bancaire`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/promotions`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ]

    // All 12 city landing pages
    const cityPages: MetadataRoute.Sitemap = cities.map(city => ({
        url: `${baseUrl}/location-voiture-${city.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // All 4 airport pages (using correct slugs from airports data)
    const airportPages: MetadataRoute.Sitemap = airports.map(airport => ({
        url: `${baseUrl}/aeroport-${airport.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }))

    // All service pages (template-based: /location-voiture-{slug} or custom slug)
    const serviceUrlMap: Record<string, string> = {
        'utilitaire': `${baseUrl}/location-utilitaire`,
    }
    const servicePages: MetadataRoute.Sitemap = services
        .filter(s => !['longue-duree'].includes(s.slug)) // longue-duree has standalone page above
        .map(service => ({
            url: serviceUrlMap[service.slug] || `${baseUrl}/location-voiture-${service.slug}`,
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.85,
        }))

    // Car detail pages — all cars × all cities
    const allCitySlugs = cities.map(c => c.slug)
    const carPages: MetadataRoute.Sitemap = cars.flatMap(car => {
        return allCitySlugs.map(city => ({
            url: `${baseUrl}/rental/${city}/${car.slug}`,
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    })

    return [...staticPages, ...cityPages, ...airportPages, ...servicePages, ...carPages]
}
