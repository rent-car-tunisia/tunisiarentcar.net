import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("tozeur");
}

export default function TozeurPage() {
    return <CityPageTemplate citySlug="tozeur" />;
}
