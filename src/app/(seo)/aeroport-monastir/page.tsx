import { Metadata } from "next";
import { AirportPageContent, generateAirportMetadata } from "@/components/airport-page";

export async function generateMetadata(): Promise<Metadata> {
    return generateAirportMetadata("monastir");
}

export default function MonastirAirportPage() {
    return <AirportPageContent slug="monastir" />;
}
