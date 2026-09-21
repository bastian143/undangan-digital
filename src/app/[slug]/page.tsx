import { Metadata } from "next";
import InvitationPage from "./InvitationPage";

// Dynamic metadata for Open Graph (WhatsApp preview)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // TODO: Fetch invitation data from Firestore for real metadata
  // For now, use placeholder
  const formattedSlug = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Undangan Pernikahan ${formattedSlug}`,
    description: `Anda diundang ke pernikahan ${formattedSlug}. Buka undangan digital ini untuk melihat detail acara.`,
    openGraph: {
      title: `💍 Undangan Pernikahan ${formattedSlug}`,
      description: `Dengan hormat, kami mengundang Anda untuk menghadiri pernikahan kami. Buka undangan ini untuk detail acara.`,
      type: "website",
      locale: "id_ID",
      images: [
        {
          url: `/api/og/${slug}`,
          width: 1200,
          height: 630,
          alt: `Undangan Pernikahan ${formattedSlug}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `💍 Undangan Pernikahan ${formattedSlug}`,
      description: `Anda diundang ke pernikahan ${formattedSlug}.`,
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}) {
  const { slug } = await params;
  const { to } = await searchParams;

  return <InvitationPage slug={slug} guestName={to} />;
}
