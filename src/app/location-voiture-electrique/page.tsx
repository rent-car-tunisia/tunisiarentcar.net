import ServicePageTemplate, { generateServiceMetadata } from "@/components/service-page-template";

export async function generateMetadata() {
    return generateServiceMetadata("electrique");
}

export default function ElectriquePage() {
    return <ServicePageTemplate serviceSlug="electrique" />;
}
