import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("kairouan");
}

export default function KairouanPage() {
    return <CityPageTemplate citySlug="kairouan" />;
}
