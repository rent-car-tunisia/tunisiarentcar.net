import ServicePageTemplate, { generateServiceMetadata } from "@/components/service-page-template";

export async function generateMetadata() {
    return generateServiceMetadata("pas-cher");
}

export default function PasCherPage() {
    return <ServicePageTemplate serviceSlug="pas-cher" />;
}
