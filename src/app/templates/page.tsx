"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TEMPLATE_CATEGORIES = [
  { value: "all", label: "Semua" },
  { value: "elegant", label: "Elegan" },
  { value: "minimalist", label: "Minimalis" },
  { value: "floral", label: "Floral" },
  { value: "islamic", label: "Islami" },
  { value: "modern", label: "Modern" },
  { value: "traditional", label: "Tradisional" },
  { value: "rustic", label: "Rustic" },
  { value: "luxury", label: "Luxury" },
  { value: "artistic", label: "Artistik" },
];

const TEMPLATES = [
  {
    id: "elegant-rose",
    name: "Elegant Rose",
    category: "elegant",
    description: "Template elegan dengan tema mawar dusty rose dan aksen emas.",
    gradient: "from-rose-200 via-rose-300 to-rose-400",
    colors: { primary: "#D4A5A5", accent: "#C9A96E" },
    isNew: true,
  },
  {
    id: "minimalist-white",
    name: "Minimalist White",
    category: "minimalist",
    description: "Desain bersih dan minimalis dengan banyak ruang putih.",
    gradient: "from-gray-100 via-white to-gray-200",
    colors: { primary: "#6B7280", accent: "#374151" },
    isNew: true,
  },
  {
    id: "javanese-classic",
    name: "Javanese Classic",
    category: "traditional",
    description: "Motif batik dan wayang dengan sentuhan tradisional Jawa.",
    gradient: "from-amber-700 via-amber-600 to-yellow-700",
    colors: { primary: "#92400E", accent: "#B45309" },
    isNew: false,
  },
  {
    id: "garden-party",
    name: "Garden Party",
    category: "floral",
    description: "Nuansa taman hijau dengan ilustrasi botanical segar.",
    gradient: "from-green-200 via-emerald-300 to-green-400",
    colors: { primary: "#059669", accent: "#047857" },
    isNew: true,
  },
  {
    id: "modern-geometric",
    name: "Modern Geometric",
    category: "modern",
    description: "Garis tegas dan pola geometris dengan warna berani.",
    gradient: "from-indigo-400 via-purple-400 to-pink-400",
    colors: { primary: "#6366F1", accent: "#8B5CF6" },
    isNew: false,
  },
  {
    id: "islamic-green",
    name: "Islamic Green",
    category: "islamic",
    description: "Kaligrafi Arab dengan tema hijau-emas yang anggun.",
    gradient: "from-emerald-600 via-green-500 to-teal-500",
    colors: { primary: "#059669", accent: "#D4AF37" },
    isNew: true,
  },
  {
    id: "rustic-wood",
    name: "Rustic Wood",
    category: "rustic",
    description: "Tekstur kayu dengan bunga liar dan nuansa alami.",
    gradient: "from-amber-600 via-orange-500 to-amber-700",
    colors: { primary: "#D97706", accent: "#92400E" },
    isNew: false,
  },
  {
    id: "cherry-blossom",
    name: "Cherry Blossom",
    category: "floral",
    description: "Sakura Jepang dengan pink lembut yang romantis.",
    gradient: "from-pink-200 via-pink-300 to-rose-300",
    colors: { primary: "#EC4899", accent: "#F472B6" },
    isNew: true,
  },
  {
    id: "royal-gold",
    name: "Royal Gold",
    category: "luxury",
    description: "Aksen emas mewah dengan latar gelap yang megah.",
    gradient: "from-yellow-600 via-amber-500 to-yellow-700",
    colors: { primary: "#D4AF37", accent: "#1F2937" },
    isNew: false,
  },
  {
    id: "watercolor-dream",
    name: "Watercolor Dream",
    category: "artistic",
    description: "Percikan watercolor pastel yang artistik dan unik.",
    gradient: "from-sky-200 via-purple-200 to-pink-200",
    colors: { primary: "#8B5CF6", accent: "#EC4899" },
    isNew: true,
  },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTemplates =
    activeCategory === "all"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-rose-50 to-pink-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Koleksi Template
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Pilih template undangan pernikahan digital yang sesuai dengan gaya
              dan tema pernikahan Anda. Semua template dilengkapi fitur lengkap.
            </motion.p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-500">Filter Kategori</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TEMPLATE_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.value
                    ? "bg-rose-500 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-600 border border-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Template Grid */}
        <section className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                  {/* Thumbnail */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${template.gradient} flex items-center justify-center`}
                    >
                      <div className="text-center text-white/80 p-6">
                        <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-60" />
                        <p className="text-lg font-serif italic">Preview</p>
                      </div>
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <Link href={`/templates/${template.id}`}>
                        <Button variant="secondary" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                          Pilih
                        </Button>
                      </Link>
                    </div>

                    {/* New badge */}
                    {template.isNew && (
                      <Badge className="absolute top-3 left-3 bg-rose-500 text-white">
                        Baru
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {template.name}
                      </h3>
                      <Badge variant="outline" className="text-xs capitalize">
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {template.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                Tidak ada template di kategori ini.
              </p>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-rose-500 to-pink-500 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Siap Membuat Undangan?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Pilih template favorit Anda dan buat undangan dalam hitungan menit.
            </p>
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-6 text-lg"
              >
                Mulai Sekarang
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
