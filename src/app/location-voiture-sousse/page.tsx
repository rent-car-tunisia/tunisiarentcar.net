import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("sousse");
}

export default function SoussePage() {
    return <CityPageTemplate citySlug="sousse" />;
}
