"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Palette,
  Settings,
  Link as LinkIcon,
  MessageSquareHeart,
  Clock,
  MailOpen,
  CheckCircle2,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatCurrency } from "@/lib/utils";
// import { PRICING_PLANS } from "@/lib/constants"; // if you have it available

// Mocking PRICING_PLANS in case it doesn't exist yet, avoiding build errors.
const PLANS = [
  {
    id: "30-days",
    name: "30 Hari",
    price: 99000,
    duration: "Masa aktif 30 hari",
    popular: false,
    features: [
      "Semua Pilihan Template",
      "Kustomisasi Tanpa Batas",
      "Link Unik Personal",
      "RSVP & Buku Tamu",
      "Countdown Timer",
      "Amplop Digital (Kado/Angpao)",
      "Galeri Foto & Video",
      "Background Music"
    ]
  },
  {
    id: "60-days",
    name: "60 Hari",
    price: 149000,
    duration: "Masa aktif 60 hari",
    popular: true,
    features: [
      "Semua Pilihan Template",
      "Kustomisasi Tanpa Batas",
      "Link Unik Personal",
      "RSVP & Buku Tamu",
      "Countdown Timer",
      "Amplop Digital (Kado/Angpao)",
      "Galeri Foto & Video",
      "Background Music"
    ]
  },
  {
    id: "90-days",
    name: "90 Hari",
    price: 199000,
    duration: "Masa aktif 90 hari",
    popular: false,
    features: [
      "Semua Pilihan Template",
      "Kustomisasi Tanpa Batas",
      "Link Unik Personal",
      "RSVP & Buku Tamu",
      "Countdown Timer",
      "Amplop Digital (Kado/Angpao)",
      "Galeri Foto & Video",
      "Background Music"
    ]
  }
];

// Fallback format if utils is missing
const formatPrice = (price: number) => {
  try {
    return formatCurrency(price);
  } catch (e) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  }
};

const FEATURES = [
  {
    icon: <Palette className="h-8 w-8 text-rose-500" />,
    title: "Template Cantik",
    description: "Pilihan desain elegan dan modern yang selalu diupdate menyesuaikan tren pernikahan terkini."
  },
  {
    icon: <Settings className="h-8 w-8 text-rose-500" />,
    title: "Kustomisasi Mudah",
    description: "Ubah warna, font, foto, dan informasi dengan mudah melalui dashboard yang user-friendly."
  },
  {
    icon: <LinkIcon className="h-8 w-8 text-rose-500" />,
    title: "Link Personal",
    description: "Buat link khusus dengan nama tamu undangan untuk memberikan kesan yang lebih personal."
  },
  {
    icon: <MessageSquareHeart className="h-8 w-8 text-rose-500" />,
    title: "RSVP & Ucapan",
    description: "Kelola konfirmasi kehadiran tamu dan kumpulkan ucapan doa dalam satu tempat."
  },
  {
    icon: <Clock className="h-8 w-8 text-rose-500" />,
    title: "Countdown Timer",
    description: "Tampilkan penghitung waktu mundur menuju hari bahagiamu secara presisi."
  },
  {
    icon: <MailOpen className="h-8 w-8 text-rose-500" />,
    title: "Amplop Digital",
    description: "Terima hadiah atau angpao digital secara aman melalui e-wallet atau transfer bank."
  }
];

const STEPS = [
  {
    num: "1",
    title: "Pilih Template",
    description: "Jelajahi galeri kami dan pilih desain yang paling sesuai dengan tema pernikahanmu."
  },
  {
    num: "2",
    title: "Isi Data & Kustomisasi",
    description: "Masukkan detail acara, upload foto pre-wedding, dan sesuaikan tampilan undangan."
  },
  {
    num: "3",
    title: "Bagikan ke Tamu",
    description: "Generate link personal dan sebarkan undangan digitalmu ke semua kerabat."
  }
];

const TEMPLATES = [
  {
    name: "Classic Elegance",
    category: "Minimalist",
    color: "from-slate-200 to-slate-400"
  },
  {
    name: "Rustic Romance",
    category: "Floral",
    color: "from-rose-200 to-orange-200"
  },
  {
    name: "Midnight Gold",
    category: "Luxury",
    color: "from-slate-800 to-slate-900"
  },
  {
    name: "Pastel Dream",
    category: "Watercolor",
    color: "from-blue-200 to-purple-200"
  }
];

const FAQS = [
  {
    question: "Apa itu undangan digital?",
    answer: "Undangan digital adalah versi elektronik dari undangan pernikahan tradisional yang dapat dibagikan melalui link web. Tamu dapat melihat detail acara, foto, mengonfirmasi kehadiran (RSVP), dan memberikan ucapan."
  },
  {
    question: "Berapa lama masa aktif undangan?",
    answer: "Masa aktif undangan bergantung pada paket yang Anda pilih (30, 60, atau 90 hari). Anda dapat memilih sesuai dengan seberapa jauh jarak waktu penyebaran undangan dengan hari-H pernikahan."
  },
  {
    question: "Apakah bisa mengubah data setelah undangan dipublish?",
    answer: "Tentu! Anda dapat mengedit detail acara, foto, atau informasi lainnya kapan saja selama masa aktif undangan melalui dashboard Anda."
  },
  {
    question: "Bagaimana cara kerja fitur RSVP?",
    answer: "Tamu yang menerima undangan dapat mengisi form konfirmasi kehadiran langsung di halaman undangan. Data tersebut akan otomatis masuk dan terekap di dashboard Anda."
  },
  {
    question: "Apakah saya bisa membuat link khusus untuk tiap tamu?",
    answer: "Ya, kami menyediakan fitur generator link nama tamu, sehingga ketika tamu membuka undangan, akan ada sapaan khusus menggunakan nama mereka."
  },
  {
    question: "Metode pembayaran apa saja yang didukung untuk Amplop Digital?",
    answer: "Anda dapat mencantumkan nomor rekening bank (BCA, Mandiri, BNI, dll) maupun e-wallet (Gopay, OVO, Dana, ShopeePay) untuk fitur amplop digital/gift."
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/80 to-white -z-10" />
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-rose-200/40 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-pink-200/40 rounded-full blur-3xl -z-10" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl mx-auto space-y-8"
            >
              <motion.div variants={fadeIn}>
                <Badge variant="outline" className="px-4 py-1.5 rounded-full border-rose-200 text-rose-600 bg-rose-50 mb-4 inline-flex">
                  ✨ Solusi Undangan Pernikahan Masa Kini
                </Badge>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Buat Undangan Pernikahan <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Digital yang Elegan</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Bagikan momen kebahagiaanmu dengan cara modern. Kustomisasi mudah, desain premium, dan fitur lengkap untuk mempermudah persiapan pernikahanmu.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-rose-200 group">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg border-gray-300 text-gray-700 hover:bg-gray-50">
                  Lihat Template
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Fitur Lengkap untuk Hari Spesialmu
              </motion.h2>
              <motion.p variants={fadeIn} className="text-gray-600 text-lg">
                Semua yang kamu butuhkan untuk undangan digital yang sempurna ada di sini.
              </motion.p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {FEATURES.map((feature, idx) => (
                <motion.div key={idx} variants={fadeIn}>
                  <Card className="h-full border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gray-50/50">
                    <CardHeader>
                      <div className="mb-4 inline-flex p-3 rounded-2xl bg-rose-100/50 w-fit">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Cara Kerja yang Simpel
              </h2>
              <p className="text-gray-600 text-lg">
                Hanya butuh beberapa menit untuk membuat undangan digital impianmu.
              </p>
            </motion.div>

            <div className="relative max-w-5xl mx-auto">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-rose-200 -z-10" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {STEPS.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { delay: idx * 0.2, duration: 0.6 } }
                    }}
                    className="flex flex-col items-center text-center relative"
                  >
                    <div className="w-24 h-24 rounded-full bg-white border-4 border-rose-100 flex items-center justify-center shadow-lg shadow-rose-100 mb-6 relative z-10">
                      <span className="text-3xl font-bold text-rose-500">{step.num}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed max-w-xs">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Template Showcase */}
        <section id="templates" className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="max-w-2xl"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Desain Premium untuk Semua Tema
                </h2>
                <p className="text-gray-600 text-lg">
                  Pilih dari koleksi template eksklusif kami yang siap disesuaikan dengan warnamu.
                </p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Button variant="outline" className="rounded-full text-rose-600 border-rose-200 hover:bg-rose-50">
                  Lihat Semua Template <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEMPLATES.map((template, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { delay: idx * 0.1, duration: 0.5 } }
                  }}
                >
                  <Card className="overflow-hidden group cursor-pointer border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className={`h-80 w-full bg-gradient-to-br ${template.color} relative overflow-hidden`}>
                      {/* Placeholder for template image */}
                      <div className="absolute inset-0 flex items-center justify-center text-white/50 font-medium">
                        Preview Image
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 text-gray-800 backdrop-blur-sm shadow-sm hover:bg-white">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-rose-500 transition-colors">{template.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-rose-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Harga Transparan, Fitur Maksimal
              </h2>
              <p className="text-gray-600 text-lg">
                Pilih paket berdasarkan masa aktif yang kamu butuhkan. Semua paket mendapatkan fitur penuh tanpa batasan.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {PLANS.map((plan, idx) => (
                <motion.div
                  key={plan.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.5 } }
                  }}
                  className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                >
                  <Card className={`h-full border ${plan.popular ? 'border-rose-300 shadow-xl shadow-rose-100/50' : 'border-gray-200 shadow-sm'} relative overflow-hidden flex flex-col`}>
                    {plan.popular && (
                      <div className="bg-rose-500 text-white text-xs font-bold uppercase tracking-wider py-1.5 w-full text-center absolute top-0 left-0">
                        Paling Populer
                      </div>
                    )}
                    
                    <CardHeader className={`text-center pb-8 ${plan.popular ? 'pt-10' : 'pt-8'}`}>
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                      <CardDescription className="text-gray-500 mb-4">{plan.duration}</CardDescription>
                      <div className="flex justify-center items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-gray-900">{formatPrice(plan.price)}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="flex-grow">
                      <ul className="space-y-4">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter className="pt-8">
                      <Button 
                        className={`w-full h-12 rounded-xl text-md font-semibold ${
                          plan.popular 
                            ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-200' 
                            : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                        }`}
                      >
                        Pilih Paket
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-gray-600 text-lg">
                Masih ragu? Temukan jawaban untuk pertanyaanmu di bawah ini.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Accordion className="w-full space-y-4">
                {FAQS.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border border-gray-100 rounded-lg px-6 bg-gray-50/50">
                    <AccordionTrigger className="text-left text-gray-900 font-medium hover:text-rose-600 py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
