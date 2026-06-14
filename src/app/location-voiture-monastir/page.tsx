import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("monastir");
}

export default function MonastirPage() {
    return <CityPageTemplate citySlug="monastir" />;
}
