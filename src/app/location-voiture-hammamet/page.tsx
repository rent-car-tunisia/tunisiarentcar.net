import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("hammamet");
}

export default function HammametPage() {
    return <CityPageTemplate citySlug="hammamet" />;
}
