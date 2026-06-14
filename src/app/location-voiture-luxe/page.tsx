import ServicePageTemplate, { generateServiceMetadata } from "@/components/service-page-template";

export async function generateMetadata() {
    return generateServiceMetadata("luxe");
}

export default function LuxePage() {
    return <ServicePageTemplate serviceSlug="luxe" />;
}
