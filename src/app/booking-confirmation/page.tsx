"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Home, Calendar, Phone, Star, ExternalLink } from "lucide-react";
import { ReviewPopup, useReviewPopup } from "@/components/review-popup";
import { siteConfig } from "@/lib/site-config";

export default function ConfirmationPage() {
    const router = useRouter();
    const { showPopup, triggerReviewPopup, closePopup } = useReviewPopup();
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        // Check if user came from a real booking (referrer check)
        // If accessed directly without navigation from checkout, redirect
        const referrer = document.referrer;
        const isFromCheckout = referrer && (referrer.includes('/checkout') || referrer.includes('/api/bookings'));
        
        if (!isFromCheckout && !sessionStorage.getItem('booking_completed')) {
            router.replace('/');
            return;
        }

        setIsValid(true);
        sessionStorage.setItem('booking_completed', 'true');

        const timer = setTimeout(() => {
            triggerReviewPopup();
        }, 3000);

        return () => clearTimeout(timer);
    }, [triggerReviewPopup, router]);

    if (!isValid) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-accent"></div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl text-center space-y-8 border border-gray-100">
                    {/* Success Icon */}
                    <div className="flex justify-center">
                        <div className="bg-green-100 p-6 rounded-full text-green-600 animate-bounce">
                            <CheckCircle size={64} />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black text-gray-900">Demande bien reçue !</h1>
                        <p className="text-gray-600">
                            Merci d'avoir choisi {siteConfig.brand.name}. Notre équipe vous contactera dans les <strong className="text-gray-900">24 heures</strong> pour finaliser votre réservation.
                        </p>
                    </div>

                    {/* Info Card */}
                    <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4 border border-gray-100">
                        <div className="flex items-center gap-3">
                            <Calendar className="text-accent" size={20} />
                            <span className="text-sm font-bold text-gray-900">Nous vous contactons sous 24h</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="text-accent" size={20} />
                            <span className="text-sm font-bold text-gray-900">{siteConfig.contact.phone.display}</span>
                        </div>
                    </div>

                    {/* Google Review CTA */}
                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-6 border border-accent/20">
                        <div className="flex justify-center mb-3">
                            <img src="/images/google-logo.png" alt="Google" className="h-8 w-8" />
                        </div>
                        <p className="text-sm text-gray-700 mb-4">
                            Votre avis nous aide à améliorer notre service !
                        </p>
                        <a
                            href={siteConfig.url.googleReview}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                        >
                            <Star size={18} fill="currentColor" />
                            Laisser un avis Google
                            <ExternalLink size={14} />
                        </a>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 space-y-4">
                        <Link
                            href="/"
                            className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all"
                        >
                            <Home size={20} />
                            Retour à l'accueil
                        </Link>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                            Paiement à l'arrivée • Sans carte bancaire
                        </p>
                    </div>
                </div>
            </div>

            {/* Review Popup */}
            <ReviewPopup show={showPopup} onClose={closePopup} />
        </>
    );
}
