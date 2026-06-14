import ServicePageTemplate, { generateServiceMetadata } from "@/components/service-page-template";

export async function generateMetadata() {
    return generateServiceMetadata("9-places");
}

export default function NeufPlacesPage() {
    return <ServicePageTemplate serviceSlug="9-places" />;
}
