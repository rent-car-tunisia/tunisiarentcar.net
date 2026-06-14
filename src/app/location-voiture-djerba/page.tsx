import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("djerba");
}

export default function DjerbaPage() {
    return <CityPageTemplate citySlug="djerba" />;
}
