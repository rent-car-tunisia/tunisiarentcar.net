import ServicePageTemplate, { generateServiceMetadata } from "@/components/service-page-template";

export async function generateMetadata() {
    return generateServiceMetadata("avec-chauffeur");
}

export default function AvecChauffeurPage() {
    return <ServicePageTemplate serviceSlug="avec-chauffeur" />;
}
