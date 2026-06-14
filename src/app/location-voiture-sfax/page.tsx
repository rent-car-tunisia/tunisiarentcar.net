import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("sfax");
}

export default function SfaxPage() {
    return <CityPageTemplate citySlug="sfax" />;
}
