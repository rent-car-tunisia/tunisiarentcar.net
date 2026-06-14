import ServicePageTemplate, { generateServiceMetadata } from "@/components/service-page-template";

export async function generateMetadata() {
    return generateServiceMetadata("utilitaire");
}

export default function UtilitairePage() {
    return <ServicePageTemplate serviceSlug="utilitaire" />;
}
