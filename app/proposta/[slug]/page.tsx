import { notFound } from "next/navigation";
import { proposals, getProposal } from "@/lib/proposals";
import ProposalPage from "@/components/ProposalPage";

export async function generateStaticParams() {
  return Object.keys(proposals).map((slug) => ({ slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const proposal = getProposal(params.slug);
  if (!proposal) notFound();
  return <ProposalPage proposal={proposal} />;
}
