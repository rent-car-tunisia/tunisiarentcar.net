import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("tabarka");
}

export default function TabarkaPage() {
    return <CityPageTemplate citySlug="tabarka" />;
}
