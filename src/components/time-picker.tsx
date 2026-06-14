'use client';

import { useState, useEffect, useRef } from 'react';
import { Clock, ChevronDown } from 'lucide-react';

interface TimePickerProps {
    value: string;
    onChange: (time: string) => void;
}

const TIME_SLOTS = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
];

export function TimePicker({ value, onChange }: TimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleTimeSelect = (time: string) => {
        onChange(time);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-left"
            >
                <Clock size={14} className="text-accent flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-900">{value}</span>
                <ChevronDown size={12} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Time Dropdown */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-[9999] min-w-[120px] animate-fade-in overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Heure</span>
                    </div>

                    {/* Time slots */}
                    <div className="max-h-[240px] overflow-y-auto hide-scrollbar py-1">
                        {TIME_SLOTS.map((time) => (
                            <button
                                key={time}
                                type="button"
                                onClick={() => handleTimeSelect(time)}
                                className={`
                                    w-full text-left px-4 py-2.5 text-sm font-medium transition-colors
                                    ${value === time
                                        ? 'bg-accent text-white'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }
                                `}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
