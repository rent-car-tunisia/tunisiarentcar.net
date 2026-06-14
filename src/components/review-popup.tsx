"use client";

import { useState, useEffect } from "react";
import { Star, X, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const GOOGLE_REVIEW_URL = siteConfig.url.googleReview;

interface ReviewPopupProps {
    show: boolean;
    onClose: () => void;
}

export function ReviewPopup({ show, onClose }: ReviewPopupProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            // Small delay for animation
            setTimeout(() => setIsVisible(true), 100);
        } else {
            setIsVisible(false);
        }
    }, [show]);

    if (!show) return null;

    const handleReviewClick = () => {
        // Open Google review in new tab
        window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
        // Mark as reviewed in localStorage
        localStorage.setItem(siteConfig.booking.reviewStorageKey, "true");
        onClose();
    };

    const handleLater = () => {
        // Don't mark as reviewed, just close
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                    }`}
                onClick={handleLater}
            />

            {/* Modal */}
            <div
                className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transition-all duration-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
            >
                {/* Close button */}
                <button
                    onClick={handleLater}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Content */}
                <div className="text-center">
                    {/* Google Logo */}
                    <div className="flex justify-center mb-4">
                        <img
                            src="/images/google-logo.png"
                            alt="Google"
                            className="h-12 w-12"
                        />
                    </div>

                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                                key={i}
                                size={32}
                                className="text-yellow-400"
                                fill="currentColor"
                            />
                        ))}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Merci pour votre réservation !
                    </h3>

                    <p className="text-gray-600 mb-6">
                        Votre avis nous aide énormément ! Prenez un moment pour partager
                        votre expérience sur Google.
                    </p>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleReviewClick}
                            className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-accent/25"
                        >
                            <Star size={20} fill="currentColor" />
                            Laisser un avis
                            <ExternalLink size={16} />
                        </button>

                        <button
                            onClick={handleLater}
                            className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm font-medium transition-colors"
                        >
                            Plus tard
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-4">
                        Votre avis compte beaucoup pour nous 💖
                    </p>
                </div>
            </div>
        </div>
    );
}

// Hook to trigger review popup
export function useReviewPopup() {
    const [showPopup, setShowPopup] = useState(false);

    const triggerReviewPopup = () => {
        // Check if user has already reviewed
        const hasReviewed = localStorage.getItem(siteConfig.booking.reviewStorageKey) === "true";
        if (!hasReviewed) {
            setShowPopup(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return { showPopup, triggerReviewPopup, closePopup };
}
