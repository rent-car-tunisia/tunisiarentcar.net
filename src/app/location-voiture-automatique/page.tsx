import ServicePageTemplate, { generateServiceMetadata } from "@/components/service-page-template";

export async function generateMetadata() {
    return generateServiceMetadata("automatique");
}

export default function AutomatiquePage() {
    return <ServicePageTemplate serviceSlug="automatique" />;
}
