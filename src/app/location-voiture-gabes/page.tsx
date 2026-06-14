import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("gabes");
}

export default function GabesPage() {
    return <CityPageTemplate citySlug="gabes" />;
}
