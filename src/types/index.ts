// ============================================
// Core Types for Undangan Digital Platform
// ============================================

import { Timestamp } from "firebase/firestore";

// ---- User Types ----
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: "user" | "admin";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ---- Template Types ----
export interface TemplateConfigField {
  key: string;
  label: string;
  type: "text" | "textarea" | "date" | "time" | "image" | "gallery" | "music" | "color" | "select";
  required: boolean;
  placeholder?: string;
  options?: string[]; // for select type
  section: string; // group fields by section
}

export interface TemplateFeatures {
  hasCover: boolean;
  hasAutoScroll: boolean;
  hasCountdown: boolean;
  hasGallery: boolean;
  hasLoveStory: boolean;
  hasRSVP: boolean;
  hasWishes: boolean;
  hasGift: boolean;
  hasMusic: boolean;
  hasMap: boolean;
  hasQRCode: boolean;
}

export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: TemplateCategory;
  thumbnail: string;
  previewImages: string[];
  previewUrl: string;
  componentName: string; // React component name to render
  features: TemplateFeatures;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  isActive: boolean;
  usageCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type TemplateCategory =
  | "minimalist"
  | "elegant"
  | "floral"
  | "islamic"
  | "modern"
  | "traditional"
  | "rustic"
  | "luxury"
  | "artistic";

// ---- Order Types ----
export type PlanDuration = "30" | "60" | "90";
export type OrderStatus = "pending" | "paid" | "active" | "expired" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  templateId: string;
  slug: string;
  plan: PlanDuration;
  price: number;
  status: OrderStatus;
  paymentId: string;
  paymentMethod: string;
  paidAt: Timestamp | null;
  activatedAt: Timestamp | null;
  expiresAt: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ---- Invitation Types ----
export interface GiftAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
  logoUrl?: string;
}

export interface LoveStoryItem {
  date: string;
  title: string;
  description: string;
  photo?: string;
}

export interface EventDetail {
  name: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  address: string;
  mapUrl: string;
  mapEmbedUrl?: string;
}

export interface InvitationData {
  // Couple info
  groomName: string;
  groomFullName: string;
  groomPhoto: string;
  groomParents: string;
  groomChildOrder?: string; // "Putra pertama dari..."
  brideName: string;
  brideFullName: string;
  bridePhoto: string;
  brideParents: string;
  brideChildOrder?: string;

  // Events
  events: EventDetail[];

  // Gallery
  gallery: string[];
  couplePhoto?: string; // Main couple photo

  // Love Story
  loveStory: LoveStoryItem[];

  // Quote
  quote: string;
  quoteSource: string;

  // Music
  musicUrl: string;
  musicTitle?: string;

  // Gift
  giftAccounts: GiftAccount[];
  giftAddress?: string; // Physical address for gifts

  // Settings
  language: string;
  customSlug: string;
}

export interface Invitation {
  id: string;
  orderId: string;
  userId: string;
  templateId: string;
  slug: string;
  data: InvitationData;
  viewCount: number;
  uniqueViewCount: number;
  isActive: boolean;
  expiresAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ---- Guest Types ----
export type RSVPStatus = "pending" | "attending" | "not_attending";

export interface Guest {
  id: string;
  invitationId: string;
  name: string;
  slug: string; // URL-safe name for ?to= param
  phone?: string;
  email?: string;
  rsvpStatus: RSVPStatus;
  rsvpCount: number; // number of people attending
  rsvpAt: Timestamp | null;
  viewedAt: Timestamp | null;
  createdAt: Timestamp;
}

// ---- Wish Types ----
export type AttendanceStatus = "hadir" | "tidak_hadir" | "masih_ragu";

export interface Wish {
  id: string;
  invitationId: string;
  guestName: string;
  message: string;
  attendance: AttendanceStatus;
  isApproved: boolean;
  createdAt: Timestamp;
}

// ---- Pricing Types ----
export interface PricingPlan {
  id: PlanDuration;
  name: string;
  duration: number; // days
  price: number;
  description: string;
  isPopular: boolean;
}

// ---- Analytics Types ----
export interface InvitationAnalytics {
  totalViews: number;
  uniqueViews: number;
  rsvpAttending: number;
  rsvpNotAttending: number;
  rsvpPending: number;
  totalWishes: number;
  viewsByDate: { date: string; count: number }[];
}

export interface AdminAnalytics {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  activeInvitations: number;
  revenueByMonth: { month: string; revenue: number }[];
  ordersByStatus: { status: OrderStatus; count: number }[];
  popularTemplates: { templateId: string; templateName: string; count: number }[];
}
