import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { siteConfig } from '@/lib/site-config';

interface CarInfo {
    id: string;
    title: string;
    slug: string;
    price: number;
    image: string;
}

interface BookingState {
    // Location
    pickupLocation: string;
    dropoffLocation: string;
    returnLocation: string;

    // Dates & Times
    pickupDate: string;
    returnDate: string;
    pickupTime: string;
    returnTime: string;

    // Selected Car
    selectedCar: CarInfo | null;

    // Actions
    setPickupLocation: (location: string) => void;
    setDropoffLocation: (location: string) => void;
    setPickupDate: (date: string) => void;
    setReturnDate: (date: string) => void;
    setPickupTime: (time: string) => void;
    setReturnTime: (time: string) => void;
    setSelectedCar: (car: CarInfo) => void;
    setBookingDates: (data: {
        location: string;
        pickupDate: string;
        pickupTime: string;
        returnDate: string;
        returnTime: string
    }) => void;
    reset: () => void;
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set) => ({
            pickupLocation: siteConfig.booking.defaultLocation,
            dropoffLocation: siteConfig.booking.defaultLocation,
            returnLocation: siteConfig.booking.defaultLocation,
            pickupDate: '',
            returnDate: '',
            pickupTime: '10:00',
            returnTime: '10:00',
            selectedCar: null,

            setPickupLocation: (location) => set({
                pickupLocation: location,
                dropoffLocation: location,
                returnLocation: location
            }),
            setDropoffLocation: (location) => set({ dropoffLocation: location, returnLocation: location }),
            setPickupDate: (date) => set({ pickupDate: date }),
            setReturnDate: (date) => set({ returnDate: date }),
            setPickupTime: (time) => set({ pickupTime: time }),
            setReturnTime: (time) => set({ returnTime: time }),
            setSelectedCar: (car) => set({ selectedCar: car }),
            setBookingDates: (data) => set({
                pickupLocation: data.location,
                dropoffLocation: data.location,
                returnLocation: data.location,
                pickupDate: data.pickupDate,
                pickupTime: data.pickupTime,
                returnDate: data.returnDate,
                returnTime: data.returnTime,
            }),
            reset: () => set({
                selectedCar: null,
                pickupTime: '10:00',
                returnTime: '10:00',
                pickupDate: '',
                returnDate: '',
            }),
        }),
        {
            name: siteConfig.booking.storageKey,
        }
    )
);
