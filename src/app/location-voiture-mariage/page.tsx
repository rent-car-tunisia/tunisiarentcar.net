import ServicePageTemplate, { generateServiceMetadata } from "@/components/service-page-template";

export async function generateMetadata() {
    return generateServiceMetadata("mariage");
}

export default function MariagePage() {
    return <ServicePageTemplate serviceSlug="mariage" />;
}
