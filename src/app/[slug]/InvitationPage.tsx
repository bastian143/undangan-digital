"use client";

import { useEffect, useState } from "react";
import ElegantRoseTemplate from "@/templates/elegant-rose";
import { InvitationData } from "@/types";

// Mock data for development/preview
const MOCK_INVITATION_DATA: InvitationData = {
  groomName: "Ahmad",
  groomFullName: "Ahmad Rizky Pratama",
  groomPhoto: "",
  groomParents: "Bapak Hasan & Ibu Fatimah",
  groomChildOrder: "Putra pertama dari",
  brideName: "Sari",
  brideFullName: "Sari Dewi Lestari",
  bridePhoto: "",
  brideParents: "Bapak Sutrisno & Ibu Wati",
  brideChildOrder: "Putri kedua dari",
  events: [
    {
      name: "Akad Nikah",
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      time: "08:00",
      endTime: "10:00",
      location: "Masjid Al-Ikhlas",
      address: "Jl. Merdeka No. 45, Jakarta Selatan",
      mapUrl: "https://maps.google.com/?q=-6.2088,106.8456",
    },
    {
      name: "Resepsi",
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      time: "11:00",
      endTime: "14:00",
      location: "Hotel Grand Ballroom",
      address: "Jl. Sudirman No. 100, Jakarta Pusat",
      mapUrl: "https://maps.google.com/?q=-6.2088,106.8456",
    },
  ],
  gallery: [],
  couplePhoto: "",
  loveStory: [
    {
      date: "2020",
      title: "Pertama Bertemu",
      description: "Kami bertemu pertama kali di sebuah acara kampus yang tak terlupakan.",
    },
    {
      date: "2021",
      title: "Mulai Dekat",
      description: "Seiring waktu, kami semakin dekat dan saling mengenal satu sama lain.",
    },
    {
      date: "2023",
      title: "Lamaran",
      description: "Dengan izin Allah, kami memutuskan untuk melangkah ke jenjang yang lebih serius.",
    },
    {
      date: "2024",
      title: "Pernikahan",
      description: "Alhamdulillah, kami siap menjalani kehidupan baru bersama.",
    },
  ],
  quote: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.",
  quoteSource: "QS. Ar-Rum: 21",
  musicUrl: "",
  musicTitle: "Beautiful in White",
  giftAccounts: [
    {
      bank: "BCA",
      accountNumber: "1234567890",
      accountName: "Ahmad Rizky Pratama",
    },
    {
      bank: "Mandiri",
      accountNumber: "0987654321",
      accountName: "Sari Dewi Lestari",
    },
  ],
  giftAddress: "Jl. Merdeka No. 45, Jakarta Selatan 12345",
  language: "id",
  customSlug: "ahmad-dan-sari",
};

// Template registry - maps template IDs to components
const TEMPLATE_REGISTRY: Record<string, React.ComponentType<{
  data: InvitationData;
  guestName?: string;
  isPreview?: boolean;
}>> = {
  "elegant-rose": ElegantRoseTemplate,
  // More templates will be added here
};

interface InvitationPageProps {
  slug: string;
  guestName?: string;
}

export default function InvitationPage({ slug, guestName }: InvitationPageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [templateId, setTemplateId] = useState<string>("elegant-rose");

  useEffect(() => {
    async function fetchInvitation() {
      try {
        // TODO: Fetch real invitation data from Firestore by slug
        // For now, use mock data
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check if invitation exists and is not expired
        // For development, always show mock data
        setInvitationData(MOCK_INVITATION_DATA);
        setTemplateId("elegant-rose");
        setLoading(false);
      } catch (err) {
        setError("Undangan tidak ditemukan atau sudah tidak aktif.");
        setLoading(false);
      }
    }

    fetchInvitation();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4A5A5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#3D2B1F] font-medium">Memuat undangan...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !invitationData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-4">💔</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Undangan Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "Undangan yang Anda cari tidak tersedia atau sudah kadaluarsa."}
          </p>
          <a
            href="/"
            className="inline-block bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition-colors"
          >
            Kembali ke Beranda
          </a>
        </div>
      </div>
    );
  }

  // Get template component
  const TemplateComponent = TEMPLATE_REGISTRY[templateId];

  if (!TemplateComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Template Tidak Tersedia
          </h1>
          <p className="text-gray-600">
            Template undangan ini sedang tidak tersedia.
          </p>
        </div>
      </div>
    );
  }

  // Render template
  return (
    <TemplateComponent
      data={invitationData}
      guestName={guestName ? decodeURIComponent(guestName) : undefined}
      isPreview={false}
    />
  );
}
