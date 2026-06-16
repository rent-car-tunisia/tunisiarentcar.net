import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("mahdia");
}

export default function MahdiaPage() {
    return <CityPageTemplate citySlug="mahdia" />;
}
