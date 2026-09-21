"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, Check, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const categories = ["Minimalist", "Floral", "Rustic", "Modern", "Classic", "Vintage", "Nature", "Luxury"];

export default function NewTemplatePage() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    price: "150000",
    colors: {
      primary: "#4f46e5",
      secondary: "#f472b6",
      accent: "#fbbf24",
      background: "#ffffff",
      text: "#1f2937"
    },
    features: {
      hasCover: true,
      hasAutoScroll: true,
      hasCountdown: true,
      hasGallery: true,
      hasLoveStory: true,
      hasRSVP: true,
      hasWishes: true,
      hasGift: true,
      hasMusic: true,
      hasMap: true,
      hasQRCode: true
    }
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, name, slug });
  };

  const handleFeatureToggle = (feature: keyof typeof formData.features) => {
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [feature]: !formData.features[feature]
      }
    });
  };

  const handleColorChange = (colorKey: keyof typeof formData.colors, value: string) => {
    setFormData({
      ...formData,
      colors: {
        ...formData.colors,
        [colorKey]: value
      }
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/templates">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tambah Template Baru</h1>
          <p className="text-gray-500 text-sm">Buat template undangan digital baru</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Informasi Dasar */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
              <CardDescription>Detail utama tentang template ini.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Template</Label>
                  <Input 
                    id="name" 
                    placeholder="Contoh: Elegant Rose" 
                    value={formData.name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input 
                    id="slug" 
                    placeholder="elegant-rose" 
                    value={formData.slug}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <select 
                    id="category"
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="" disabled>Pilih Kategori</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Harga Standar (Rp)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea 
                  id="description" 
                  placeholder="Jelaskan tentang gaya dan kecocokan template ini..."
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Konfigurasi Warna */}
          <Card>
            <CardHeader>
              <CardTitle>Palet Warna</CardTitle>
              <CardDescription>Warna default yang digunakan dalam template.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {Object.entries(formData.colors).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label className="capitalize text-xs">{key}</Label>
                    <div className="flex gap-2 items-center">
                      <div 
                        className="w-8 h-8 rounded border border-gray-200 overflow-hidden shrink-0"
                        style={{ backgroundColor: value }}
                      >
                        <input 
                          type="color" 
                          value={value}
                          onChange={(e) => handleColorChange(key as keyof typeof formData.colors, e.target.value)}
                          className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                        />
                      </div>
                      <Input 
                        value={value} 
                        onChange={(e) => handleColorChange(key as keyof typeof formData.colors, e.target.value)}
                        className="h-8 text-xs font-mono px-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Source Code */}
          <Card>
            <CardHeader>
              <CardTitle>Kode Komponen (Opsional)</CardTitle>
              <CardDescription>Jika template menggunakan kode React kustom, paste di sini.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="export default function Template() { ... }"
                className="font-mono text-sm min-h-[200px] bg-slate-900 text-slate-50"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Thumbnail */}
          <Card>
            <CardHeader>
              <CardTitle>Thumbnail</CardTitle>
              <CardDescription>Gambar preview template.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 mx-6 mb-6">
              <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-4 text-center">Upload gambar thumbnail (Rekomendasi: 800x1200px)</p>
              <Button variant="outline" size="sm">Pilih Gambar</Button>
            </CardContent>
          </Card>

          {/* Fitur Aktif */}
          <Card>
            <CardHeader>
              <CardTitle>Fitur Template</CardTitle>
              <CardDescription>Aktifkan bagian yang didukung oleh template ini.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(formData.features).map(([key, value]) => {
                const label = key.replace('has', '');
                return (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={key} className="cursor-pointer font-normal">
                      Bagian {label}
                    </Label>
                    <Switch 
                      id={key}
                      checked={value}
                      onCheckedChange={() => handleFeatureToggle(key as keyof typeof formData.features)}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="sticky top-6">
            <CardContent className="pt-6 flex flex-col gap-3">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Save className="mr-2 h-4 w-4" />
                Simpan Template
              </Button>
              <Button variant="outline" className="w-full">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
