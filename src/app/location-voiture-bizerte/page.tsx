import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("bizerte");
}

export default function BizertePage() {
    return <CityPageTemplate citySlug="bizerte" />;
}
