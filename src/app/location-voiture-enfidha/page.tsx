import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("enfidha");
}

export default function EnfidhaPage() {
    return <CityPageTemplate citySlug="enfidha" />;
}
