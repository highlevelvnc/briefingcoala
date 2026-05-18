import { notFound } from "next/navigation";
import { getBriefing, getAllSlugs } from "@/data";
import BriefingForm from "@/components/BriefingForm";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function BriefingPage({
  params,
}: {
  params: { slug: string };
}) {
  const briefing = getBriefing(params.slug);
  if (!briefing) notFound();

  return <BriefingForm briefing={briefing} />;
}
