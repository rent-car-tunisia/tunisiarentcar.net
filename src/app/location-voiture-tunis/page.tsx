import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("tunis");
}

export default function TunisPage() {
    return <CityPageTemplate citySlug="tunis" />;
}
