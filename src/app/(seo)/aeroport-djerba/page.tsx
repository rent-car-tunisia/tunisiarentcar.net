import { Metadata } from "next";
import { AirportPageContent, generateAirportMetadata } from "@/components/airport-page";

export async function generateMetadata(): Promise<Metadata> {
    return generateAirportMetadata("djerba");
}

export default function DjerbaAirportPage() {
    return <AirportPageContent slug="djerba" />;
}
