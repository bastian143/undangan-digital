"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, Heart, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const plans = [
  {
    id: "30",
    name: "Paket 30 Hari",
    price: 99000,
    duration: "30 hari",
    description: "Cocok untuk pernikahan yang sudah dekat",
    isPopular: false,
    icon: Clock,
  },
  {
    id: "60",
    name: "Paket 60 Hari",
    price: 149000,
    duration: "60 hari",
    description: "Waktu lebih leluasa untuk persiapan",
    isPopular: true,
    icon: Star,
  },
  {
    id: "90",
    name: "Paket 90 Hari",
    price: 199000,
    duration: "90 hari",
    description: "Persiapan maksimal dengan waktu panjang",
    isPopular: false,
    icon: Heart,
  },
];

const features = [
  "Semua template premium",
  "Fitur RSVP & konfirmasi kehadiran",
  "Ucapan & doa dari tamu",
  "Countdown timer",
  "Galeri foto prewedding",
  "Love story / timeline",
  "Amplop digital (gift)",
  "Background musik",
  "Google Maps lokasi acara",
  "QR Code undangan",
  "Link personal per tamu",
  "Dashboard analitik",
  "Export daftar tamu",
  "Unlimited tamu undangan",
  "Custom URL undangan",
  "Share ke WhatsApp",
];

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-rose-50 via-pink-50 to-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-rose-100 text-rose-600 mb-4 px-4 py-1">
                <Sparkles className="w-3 h-3 mr-1" />
                Harga Terjangkau
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Pilih Paket Anda
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Semua paket memiliki fitur yang sama. Perbedaannya hanya pada
                durasi aktif undangan Anda.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`relative overflow-hidden h-full transition-all duration-300 hover:shadow-2xl ${
                      plan.isPopular
                        ? "border-rose-500 border-2 shadow-xl scale-105"
                        : "border-gray-200 hover:border-rose-200"
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute top-0 right-0">
                        <Badge className="bg-rose-500 text-white rounded-none rounded-bl-lg px-4 py-1 text-sm">
                          Populer
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-4">
                      <div
                        className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                          plan.isPopular
                            ? "bg-rose-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <Icon
                          className={`w-8 h-8 ${
                            plan.isPopular
                              ? "text-rose-500"
                              : "text-gray-500"
                          }`}
                        />
                      </div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <p className="text-sm text-gray-500">
                        {plan.description}
                      </p>
                    </CardHeader>

                    <CardContent className="text-center">
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-gray-900">
                          {formatPrice(plan.price)}
                        </span>
                        <span className="text-gray-500 ml-1">
                          / {plan.duration}
                        </span>
                      </div>

                      <Link href="/register">
                        <Button
                          className={`w-full py-6 text-lg ${
                            plan.isPopular
                              ? "bg-rose-500 hover:bg-rose-600"
                              : "bg-gray-900 hover:bg-gray-800"
                          }`}
                        >
                          Pilih Paket
                        </Button>
                      </Link>

                      <p className="text-xs text-gray-400 mt-3">
                        Pembayaran satu kali, bukan langganan
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* All Features */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Semua Fitur Termasuk
              </h2>
              <p className="text-gray-600">
                Tidak ada fitur yang dibatasi. Semua paket mendapat akses penuh.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white"
                >
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-16 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Pertanyaan Umum
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Apa yang dimaksud dengan durasi paket?",
                a: "Durasi paket adalah masa aktif undangan Anda setelah pembayaran. Selama periode tersebut, undangan bisa diakses oleh tamu melalui link yang Anda bagikan.",
              },
              {
                q: "Apakah bisa memperpanjang durasi?",
                a: "Ya! Anda bisa memperpanjang durasi undangan kapan saja dengan membeli paket tambahan melalui dashboard.",
              },
              {
                q: "Apakah ada batasan jumlah tamu?",
                a: "Tidak ada batasan. Anda bisa mengundang tamu sebanyak yang Anda mau di semua paket.",
              },
              {
                q: "Metode pembayaran apa yang tersedia?",
                a: "Kami menerima QRIS, Virtual Account (BCA, BRI, BNI, Mandiri), e-wallet (GoPay, OVO, DANA), dan kartu kredit/debit.",
              },
              {
                q: "Apakah bisa edit undangan setelah dibuat?",
                a: "Tentu! Anda bisa mengedit semua informasi undangan kapan saja selama masa aktif melalui dashboard.",
              },
              {
                q: "Bagaimana cara tamu mengakses undangan?",
                a: "Tamu mengakses undangan melalui link unik yang Anda bagikan via WhatsApp, media sosial, atau QR code.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-lg p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-rose-500 to-pink-500 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Mulai Buat Undangan Sekarang
            </h2>
            <p className="text-white/80 mb-8">
              Bergabung dengan ribuan pasangan yang sudah menggunakan platform
              kami.
            </p>
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-6 text-lg"
              >
                Daftar Gratis
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
