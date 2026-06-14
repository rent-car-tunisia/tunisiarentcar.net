import Link from 'next/link';
import { Suspense } from 'react';
import { getCars } from '@/lib/data';
import { ChevronRight } from 'lucide-react';
import CarListing from '@/components/car-listing';
import { siteConfig } from '@/lib/site-config';

export const metadata = {
    title: `Nos Voitures | Location Voiture Tunisie | ${siteConfig.brand.name}`,
    description: 'Découvrez notre flotte de véhicules de location en Tunisie. Économiques, compactes, SUV, berlines - réservez en ligne sans carte bancaire.',
    openGraph: {
        title: `Nos Voitures de Location en Tunisie | ${siteConfig.brand.name}`,
        description: 'Flotte complète de véhicules de location. Citadines, compactes, SUV, berlines. Sans carte bancaire.',
    },
    alternates: {
        canonical: `${siteConfig.url.baseUrl}/nos-voitures`,
    },
};

// Loading skeleton — matches new stacked layout
function CarListingSkeleton() {
    return (
        <div className="space-y-4">
            <div className="animate-pulse bg-white rounded-xl h-24 border border-gray-100" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse bg-white rounded-xl h-72 sm:h-80 border border-gray-100" />
                ))}
            </div>
        </div>
    );
}

export default async function NosVoituresPage() {
    const cars = await getCars();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Compact Hero */}
            <section className="bg-[#00256f]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-xs text-blue-300/70 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
                        <ChevronRight size={12} />
                        <span className="text-white font-medium">Nos Voitures</span>
                    </nav>

                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
                                Nos Voitures <span className="text-accent">de Location</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-blue-200/70 mt-1">
                                Kilométrage illimité &bull; Assurance incluse &bull; Sans carte bancaire
                            </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-2 flex-shrink-0">
                            <span className="text-lg font-black text-accent">{cars.length}</span>
                            <span className="text-xs text-blue-200/80">véhicules</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="py-4 sm:py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Suspense fallback={<CarListingSkeleton />}>
                        <CarListing cars={cars} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
