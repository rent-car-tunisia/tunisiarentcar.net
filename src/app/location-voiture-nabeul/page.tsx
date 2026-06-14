import CityPageTemplate, { generateCityMetadata } from "@/components/city-page-template";

export async function generateMetadata() {
    return generateCityMetadata("nabeul");
}

export default function NabeulPage() {
    return <CityPageTemplate citySlug="nabeul" />;
}
