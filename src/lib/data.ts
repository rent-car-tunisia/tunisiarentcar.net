import 'server-only';
import fs from 'fs/promises';
import path from 'path';
import { publicFetch } from './api';

export interface Car {
    id: string;
    title: string;          // "Brand Model" (backward compat)
    model: string;          // just model name from backend
    brand: string;          // brand name from backend
    subtitle: string;       // "ou similaire"
    slug: string;
    price: string;          // per-day rate as string (backward compat)
    price3Days: number;     // 3-day price
    currency: string;
    category: string;
    transmission: string;
    seats: string;
    fuel: string;
    featured_image: string; // backward compat
    image: string;
    specs: string[];
    caution: string;
    doors: string;
    airConditioning: boolean;
    freeCancellation: boolean;
}

// Generate slug from text: "Suzuki Swift BVA" -> "suzuki-swift-bva"
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Backend car shape from GET /public/sites/:slug/cars
interface BackendCar {
    id: string;             // UUID
    brand: string;
    model: string;
    subtitle: string | null;
    category: string;       // economy, compact, sedan, suv, family, utility
    transmission: string;   // manual, automatic
    fuelType: string;       // petrol, diesel
    seats: number;
    doors: number | null;
    largeLuggage: number | null;
    smallLuggage: number | null;
    hasAc: boolean;
    deposit: string | null; // decimal as string
    imagePath: string | null;
    displayOrder: number;
    isActive: boolean;
    isFeatured: boolean;
    // Note: pricing comes from the pricing API, not directly on the car
}

// Category display names (backend -> French)
const CATEGORY_LABELS: Record<string, string> = {
    economy: 'Économique',
    compact: 'Compacte',
    sedan: 'Berline',
    suv: 'SUV',
    family: 'Familiale',
    utility: 'Utilitaire',
};

// Transmission display names
const TRANSMISSION_LABELS: Record<string, string> = {
    manual: 'Manuelle',
    automatic: 'Automatique',
};

// Fuel display names
const FUEL_LABELS: Record<string, string> = {
    petrol: 'Essence',
    diesel: 'Diesel',
};

function transformBackendCar(raw: BackendCar): Car {
    const fullName = `${raw.brand} ${raw.model}`;
    const slug = slugify(fullName);
    // imagePath from DB is like "CARS-IMAGES/01_Suzuki_Swift.png"
    // or legacy "images/voitures/name.png" — both are relative to /images/cars-data/
    const imagePath = raw.imagePath
        ? (raw.imagePath.startsWith('/') ? raw.imagePath : `/images/cars-data/${raw.imagePath}`)
        : `/images/cars-data/CARS-IMAGES/01_Suzuki_Swift.png`;

    const deposit = raw.deposit ? Math.round(parseFloat(raw.deposit)) : 2000;
    const transmissionFr = TRANSMISSION_LABELS[raw.transmission] || raw.transmission;
    const fuelFr = FUEL_LABELS[raw.fuelType] || raw.fuelType;
    const categoryFr = CATEGORY_LABELS[raw.category] || raw.category;

    // Build specs array (French)
    const specs: string[] = [
        `${raw.seats} sièges`,
        `${raw.doors || 5} portes`,
    ];
    if (raw.largeLuggage && raw.largeLuggage > 0) {
        specs.push(`${raw.largeLuggage} grande${raw.largeLuggage > 1 ? 's' : ''} valise${raw.largeLuggage > 1 ? 's' : ''}`);
    }
    if (raw.smallLuggage && raw.smallLuggage > 0) {
        specs.push(`${raw.smallLuggage} petite${raw.smallLuggage > 1 ? 's' : ''} valise${raw.smallLuggage > 1 ? 's' : ''}`);
    }
    if (raw.hasAc) specs.push('Climatisation');
    specs.push(`Boîte ${transmissionFr.toLowerCase()}`);
    specs.push(`Caution : ${deposit} TND`);

    return {
        id: raw.id,
        title: fullName,
        model: raw.model,
        brand: raw.brand,
        subtitle: raw.subtitle || 'ou similaire',
        slug,
        price: '0',      // Will be set from pricing data or default
        price3Days: 0,   // Will be set from pricing data or default
        currency: 'TND',
        category: categoryFr,
        transmission: transmissionFr,
        seats: String(raw.seats),
        fuel: fuelFr,
        featured_image: imagePath,
        image: imagePath,
        specs,
        caution: `Caution : ${deposit} TND`,
        doors: `${raw.doors || 5} portes`,
        airConditioning: raw.hasAc,
        freeCancellation: true,
    };
}

// ============================
// LOCAL FALLBACK (from cars.json)
// ============================

interface RawCar {
    id: number;
    model: string;
    subtitle: string;
    priceValue: number;
    currency: string;
    category: string;
    transmission: string;
    seats: string;
    fuel: string;
    image: { savedAs: string; alt: string };
    specs: string[];
    cautionText: string;
    doorsText: string;
    airConditioningText: string | null;
    freeCancellation: string;
}

function transformLocalCar(raw: RawCar): Car {
    const slug = slugify(raw.model);
    const imagePath = `/images/cars-data/${raw.image.savedAs}`;

    return {
        id: String(raw.id),
        title: raw.model,
        model: raw.model,
        brand: raw.model.split(' ')[0],
        subtitle: raw.subtitle || 'ou similaire',
        slug,
        price: String(Math.round(raw.priceValue / 3)),
        price3Days: raw.priceValue,
        currency: raw.currency || 'TND',
        category: raw.category || 'Économique',
        transmission: raw.transmission || 'Manuelle',
        seats: raw.seats || '5',
        fuel: raw.fuel || 'Essence',
        featured_image: imagePath,
        image: imagePath,
        specs: raw.specs || [],
        caution: raw.cautionText || '',
        doors: raw.doorsText || '5 portes',
        airConditioning: !!raw.airConditioningText,
        freeCancellation: !!raw.freeCancellation,
    };
}

async function getLocalCars(): Promise<Car[]> {
    const jsonPath = path.join(process.cwd(), 'public', 'images', 'cars-data', 'cars.json');
    try {
        const content = await fs.readFile(jsonPath, 'utf-8');
        const rawCars: RawCar[] = JSON.parse(content);
        return rawCars.map(transformLocalCar);
    } catch (error) {
        console.error('Error reading local cars.json:', error);
        return [];
    }
}

// ============================
// DEFAULT PRICES (from cars.json priceValues, keyed by displayOrder)
// These are used when backend cars don't have pricing loaded yet.
// ============================
const DEFAULT_PRICES_3DAYS: Record<number, number> = {
    1: 324, 2: 324, 3: 406, 4: 406, 5: 406, 6: 406, 7: 406, 8: 406,
    9: 406, 10: 406, 11: 426, 12: 710, 13: 710, 14: 710, 15: 710,
    16: 710, 17: 710, 18: 1014, 19: 1014, 20: 1014, 21: 1521,
};

// ============================
// MAIN EXPORTS
// ============================

export async function getCars(): Promise<Car[]> {
    try {
        const backendCars = await publicFetch<BackendCar[]>('/cars');
        if (backendCars && backendCars.length > 0) {
            return backendCars.map((bc) => {
                const car = transformBackendCar(bc);
                // Apply default prices (backend pricing calc is separate)
                const defaultPrice = DEFAULT_PRICES_3DAYS[bc.displayOrder] || 400;
                car.price3Days = defaultPrice;
                car.price = String(Math.round(defaultPrice / 3));
                return car;
            });
        }
    } catch (error) {
        console.warn('Backend API unavailable, falling back to local cars.json:', error);
    }

    // Fallback to local file
    return getLocalCars();
}

export async function getCarBySlug(slug: string): Promise<Car | undefined> {
    const cars = await getCars();
    return cars.find(car => car.slug === slug);
}

export async function getCarById(id: string): Promise<Car | undefined> {
    const cars = await getCars();
    return cars.find(car => car.id === id);
}
