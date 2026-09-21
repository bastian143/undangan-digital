import { PricingPlan } from "@/types";

// ============================================
// Application Constants
// ============================================

export const APP_NAME = "Undangan Digital";
export const APP_DESCRIPTION = "Platform undangan pernikahan digital modern dengan berbagai template cantik dan fitur lengkap.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// ---- Pricing Plans ----
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "30",
    name: "Paket 30 Hari",
    duration: 30,
    price: 99000,
    description: "Cocok untuk pernikahan yang sudah dekat",
    isPopular: false,
  },
  {
    id: "60",
    name: "Paket 60 Hari",
    duration: 60,
    price: 149000,
    description: "Waktu lebih leluasa untuk persiapan",
    isPopular: true,
  },
  {
    id: "90",
    name: "Paket 90 Hari",
    duration: 90,
    price: 199000,
    description: "Persiapan maksimal dengan waktu panjang",
    isPopular: false,
  },
];

// ---- Template Categories ----
export const TEMPLATE_CATEGORIES = [
  { value: "minimalist", label: "Minimalis" },
  { value: "elegant", label: "Elegan" },
  { value: "floral", label: "Floral" },
  { value: "islamic", label: "Islami" },
  { value: "modern", label: "Modern" },
  { value: "traditional", label: "Tradisional" },
  { value: "rustic", label: "Rustic" },
  { value: "luxury", label: "Luxury" },
  { value: "artistic", label: "Artistik" },
] as const;

// ---- RSVP Options ----
export const RSVP_OPTIONS = [
  { value: "attending", label: "Hadir" },
  { value: "not_attending", label: "Tidak Hadir" },
] as const;

export const ATTENDANCE_OPTIONS = [
  { value: "hadir", label: "Hadir" },
  { value: "tidak_hadir", label: "Tidak Hadir" },
  { value: "masih_ragu", label: "Masih Ragu" },
] as const;

// ---- Supported Languages ----
export const SUPPORTED_LANGUAGES = [
  { code: "id", name: "Bahasa Indonesia" },
  { code: "en", name: "English" },
  { code: "jv", name: "Bahasa Jawa" },
  { code: "su", name: "Bahasa Sunda" },
] as const;

// ---- Bank Options for Gift ----
export const BANK_OPTIONS = [
  "BCA",
  "BRI",
  "BNI",
  "Mandiri",
  "CIMB Niaga",
  "Permata",
  "BSI",
  "Danamon",
  "OCBC NISP",
  "GoPay",
  "OVO",
  "DANA",
  "ShopeePay",
  "LinkAja",
] as const;

// ---- File Upload Limits ----
export const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_MUSIC_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_GALLERY_PHOTOS = 20;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ALLOWED_MUSIC_TYPES = ["audio/mpeg", "audio/mp3", "audio/wav"];

// ---- Firestore Collection Names ----
export const COLLECTIONS = {
  USERS: "users",
  TEMPLATES: "templates",
  ORDERS: "orders",
  INVITATIONS: "invitations",
  GUESTS: "guests",
  WISHES: "wishes",
  ANALYTICS: "analytics",
} as const;

// ---- Midtrans Config ----
export const MIDTRANS_CONFIG = {
  IS_PRODUCTION: process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true",
  CLIENT_KEY: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
  SNAP_URL: process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js",
} as const;
