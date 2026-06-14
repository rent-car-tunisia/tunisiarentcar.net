import { Metadata } from "next";
import { AirportPageContent, generateAirportMetadata } from "@/components/airport-page";

export async function generateMetadata(): Promise<Metadata> {
    return generateAirportMetadata("tunis-carthage");
}

export default function TunisCarthagePage() {
    return <AirportPageContent slug="tunis-carthage" />;
}
