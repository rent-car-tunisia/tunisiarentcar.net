import ServicePageTemplate, { generateServiceMetadata } from "@/components/service-page-template";

export async function generateMetadata() {
    return generateServiceMetadata("7-places");
}

export default function SeptPlacesPage() {
    return <ServicePageTemplate serviceSlug="7-places" />;
}
