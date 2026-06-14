'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DatePickerProps {
    value: string;
    onChange: (date: string) => void;
    label?: string;
    minDate?: Date;
}

const MONTHS_FR = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const DAYS_FR = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];

export function DatePicker({ value, onChange, label, minDate }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openAbove, setOpenAbove] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const parseDate = (dateStr: string): Date | null => {
        if (!dateStr) return null;
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const selectedDate = parseDate(value);

    // Detect mobile
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Close on outside click (desktop only)
    useEffect(() => {
        if (isMobile) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile]);

    // Lock body scroll on mobile when open
    useEffect(() => {
        if (isMobile && isOpen) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [isMobile, isOpen]);

    // Determine if calendar should open above or below (desktop)
    useEffect(() => {
        if (isOpen && buttonRef.current && !isMobile) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setOpenAbove(spaceBelow < 380 && rect.top > 380);
        }
    }, [isOpen, isMobile]);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        const days: (number | null)[] = [];
        for (let i = 0; i < startingDay; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++) days.push(i);
        return days;
    };

    const handleDateSelect = (day: number) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        onChange(formatted);
        setIsOpen(false);
    };

    const goToPrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const isDateDisabled = (day: number) => {
        if (!minDate) return false;
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const minDateNormalized = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        return date < minDateNormalized;
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear()
        );
    };

    const isSelected = (day: number) => {
        if (!selectedDate) return false;
        return (
            day === selectedDate.getDate() &&
            currentMonth.getMonth() === selectedDate.getMonth() &&
            currentMonth.getFullYear() === selectedDate.getFullYear()
        );
    };

    const formatDisplayDate = () => {
        if (!selectedDate) return 'Sélectionner';
        return selectedDate.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short'
        });
    };

    const days = getDaysInMonth(currentMonth);

    // Shared calendar content
    const calendarContent = (
        <>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button
                    type="button"
                    onClick={goToPrevMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronLeft size={18} className="text-gray-600" />
                </button>
                <span className="font-semibold text-gray-900">
                    {MONTHS_FR[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button
                    type="button"
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronRight size={18} className="text-gray-600" />
                </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS_FR.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-400 py-1">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                    <div key={index} className="aspect-square">
                        {day !== null ? (
                            <button
                                type="button"
                                disabled={isDateDisabled(day)}
                                onClick={() => handleDateSelect(day)}
                                className={`
                                    w-full h-full flex items-center justify-center rounded-lg text-sm font-medium transition-all
                                    ${isSelected(day)
                                        ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                        : isToday(day)
                                            ? 'bg-accent/10 text-accent'
                                            : isDateDisabled(day)
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'text-gray-700 hover:bg-gray-100'
                                    }
                                `}
                            >
                                {day}
                            </button>
                        ) : null}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <button
                    type="button"
                    onClick={() => {
                        const today = new Date();
                        setCurrentMonth(today);
                        handleDateSelect(today.getDate());
                    }}
                    className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                    Aujourd&apos;hui
                </button>
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                >
                    Fermer
                </button>
            </div>
        </>
    );

    return (
        <div className="relative" ref={containerRef}>
            {/* Trigger Button */}
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left flex items-center gap-1.5"
            >
                <span className="text-sm font-semibold text-gray-900 truncate">{formatDisplayDate()}</span>
            </button>

            {/* Calendar — Mobile: fixed bottom sheet | Desktop: absolute dropdown */}
            {isOpen && (
                <>
                    {isMobile ? (
                        /* Mobile: Full-screen overlay with bottom sheet */
                        <div className="fixed inset-0 z-[9999]">
                            {/* Backdrop */}
                            <div
                                className="absolute inset-0 bg-black/40"
                                onClick={() => setIsOpen(false)}
                            />
                            {/* Bottom sheet */}
                            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-4 pb-6 animate-slide-up">
                                {/* Drag handle */}
                                <div className="flex justify-center mb-3">
                                    <div className="w-10 h-1 bg-gray-300 rounded-full" />
                                </div>
                                {/* Close button */}
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg"
                                >
                                    <X size={18} className="text-gray-500" />
                                </button>
                                {calendarContent}
                            </div>
                        </div>
                    ) : (
                        /* Desktop: Absolute dropdown */
                        <div
                            className={`absolute left-0 min-w-[300px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-[9999] p-4 animate-fade-in ${
                                openAbove ? 'bottom-full mb-2' : 'top-full mt-2'
                            }`}
                        >
                            {calendarContent}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
