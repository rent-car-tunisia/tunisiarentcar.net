'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
    CheckCircle,
    Phone,
    ArrowRight,
    MessageCircle
} from 'lucide-react';
import { siteConfig, telUrl, whatsappUrl } from '@/lib/site-config';

function ThankYouContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('order');

    // No valid order number — redirect to homepage
    if (!orderNumber) {
        router.replace('/');
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-accent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-16 pb-16">
            <div className="max-w-2xl mx-auto px-6">
                {/* Success Icon */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6">
                        <CheckCircle size={40} className="text-accent" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        Demande bien reçue !
                    </h1>
                    <p className="text-gray-500">
                        Merci pour votre demande. Notre équipe vous contactera dans les <strong className="text-gray-900">24 heures</strong> pour finaliser votre réservation.
                    </p>
                </div>

                {/* Reference Number */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8 text-center">
                    <p className="text-sm text-gray-500 mb-1">Numéro de référence</p>
                    <p className="text-2xl font-bold text-gray-900 tracking-wide">{orderNumber}</p>
                    <p className="text-xs text-gray-400 mt-1">Conservez ce numéro pour le suivi de votre demande</p>
                </div>

                {/* What happens next */}
                <h2 className="text-lg font-bold text-gray-900 mb-4">Et maintenant ?</h2>
                <div className="space-y-4 mb-10">
                    <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-bold text-sm">1</span>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Traitement de votre demande</h3>
                            <p className="text-sm text-gray-500">Notre équipe vérifie la disponibilité du véhicule choisi.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
                        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-orange-600 font-bold text-sm">2</span>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Nous vous appelons sous 24h</h3>
                            <p className="text-sm text-gray-500">Un conseiller vous contacte pour confirmer les détails et répondre à vos questions.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-green-600 font-bold text-sm">3</span>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Confirmation finale</h3>
                            <p className="text-sm text-gray-500">Votre réservation est confirmée après validation par notre équipe.</p>
                        </div>
                    </div>
                </div>

                {/* Documents reminder */}
                <div className="bg-blue-50 rounded-xl p-5 mb-10">
                    <p className="font-medium text-blue-900 mb-3">Documents à préparer pour le jour J</p>
                    <div className="flex flex-wrap gap-4 text-sm text-blue-700">
                        <span className="flex items-center gap-2">
                            <CheckCircle size={14} />
                            Permis de conduire
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle size={14} />
                            Carte d'identité / Passeport
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle size={14} />
                            Dépôt de garantie
                        </span>
                    </div>
                </div>

                {/* Contact — for urgent requests */}
                <p className="text-sm text-gray-500 text-center mb-3">Besoin d'une réponse plus rapide ?</p>
                <div className="flex flex-col sm:flex-row gap-3 mb-10">
                    <a
                        href={telUrl}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                        <Phone size={18} />
                        {siteConfig.contact.phone.display}
                    </a>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-green-700 transition-colors"
                    >
                        <MessageCircle size={18} />
                        WhatsApp
                    </a>
                </div>

                {/* Back Link */}
                <div className="text-center">
                    <Link
                        href="/nos-voitures"
                        className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                    >
                        Voir d'autres véhicules
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-accent"></div>
            </div>
        }>
            <ThankYouContent />
        </Suspense>
    );
}
