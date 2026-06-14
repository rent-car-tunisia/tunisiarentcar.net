import { Metadata } from "next";
import { AirportPageContent, generateAirportMetadata } from "@/components/airport-page";

export async function generateMetadata(): Promise<Metadata> {
    return generateAirportMetadata("enfidha-hammamet");
}

export default function EnfidhaHammametPage() {
    return <AirportPageContent slug="enfidha-hammamet" />;
}
