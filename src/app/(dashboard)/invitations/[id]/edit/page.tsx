"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ExternalLink, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const steps = ["Pasangan", "Acara", "Galeri", "Detail", "Pengaturan"];

export default function EditInvitationPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [date, setDate] = useState<Date>();

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Undangan</h1>
          <p className="text-muted-foreground">Lengkapi data untuk undangan Anda.</p>
        </div>
        <Button variant="outline">
          <ExternalLink className="mr-2 h-4 w-4" /> Preview Live
        </Button>
      </div>

      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold",
              currentStep >= index ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground text-muted-foreground"
            )}>
              {index + 1}
            </div>
            <span className={cn(
              "ml-2 text-sm font-medium",
              currentStep >= index ? "text-primary" : "text-muted-foreground"
            )}>
              {step}
            </span>
            {index < steps.length - 1 && (
              <div className={cn(
                "h-[2px] w-12 mx-4",
                currentStep > index ? "bg-primary" : "bg-muted"
              )} />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Data Pasangan</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-primary">Mempelai Pria</h3>
                  <div className="space-y-2">
                    <Label>Nama Lengkap</Label>
                    <Input placeholder="Contoh: Romeo Adiguna" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nama Panggilan</Label>
                    <Input placeholder="Contoh: Romeo" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nama Orang Tua</Label>
                    <Input placeholder="Putra dari Bapak X & Ibu Y" />
                  </div>
                  <div className="space-y-2">
                    <Label>Foto</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground">
                      <ImageIcon className="h-8 w-8 mb-2" />
                      <span>Upload Foto</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-primary">Mempelai Wanita</h3>
                  <div className="space-y-2">
                    <Label>Nama Lengkap</Label>
                    <Input placeholder="Contoh: Juliet Maharani" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nama Panggilan</Label>
                    <Input placeholder="Contoh: Juliet" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nama Orang Tua</Label>
                    <Input placeholder="Putri dari Bapak A & Ibu B" />
                  </div>
                  <div className="space-y-2">
                    <Label>Foto</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground">
                      <ImageIcon className="h-8 w-8 mb-2" />
                      <span>Upload Foto</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Detail Acara</h2>
              <div className="space-y-6">
                <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="font-medium">Akad Nikah</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tanggal</Label>
                      <Popover>
                        <PopoverTrigger
                          className={cn(
                            buttonVariants({ variant: "outline" }),
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Waktu</Label>
                      <Input placeholder="08:00 - Selesai" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Lokasi</Label>
                    <Input placeholder="Nama Gedung / Tempat" />
                  </div>
                  <div className="space-y-2">
                    <Label>Alamat Lengkap</Label>
                    <Textarea placeholder="Jl. Contoh No. 123..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Link Google Maps</Label>
                    <Input placeholder="https://maps.google.com/..." />
                  </div>
                </div>
                
                <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="font-medium">Resepsi</h3>
                  {/* Similar fields to Akad */}
                  <p className="text-sm text-muted-foreground">Formulir resepsi (sama seperti akad)</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Galeri & Kisah Cinta</h2>
              <div className="space-y-4">
                <Label>Galeri Foto</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="aspect-square border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground hover:bg-slate-50 cursor-pointer">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Kisah Cinta (Love Story)</Label>
                <Button variant="outline" className="w-full border-dashed">Tambah Cerita +</Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Detail Tambahan</h2>
              <div className="space-y-4">
                <Label>Quotes / Ayat</Label>
                <Textarea placeholder="Tuliskan ayat suci atau quotes..." />
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Musik Latar</Label>
                <Input type="file" accept="audio/*" />
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Rekening Hadiah (Amplop Digital)</Label>
                <div className="p-4 border rounded-md space-y-4">
                  <Input placeholder="Nama Bank (cth: BCA)" />
                  <Input placeholder="Nomor Rekening" />
                  <Input placeholder="Atas Nama" />
                </div>
                <Button variant="outline" className="w-full border-dashed">Tambah Rekening +</Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Pengaturan Undangan</h2>
              <div className="space-y-4">
                <Label>Link Undangan (Slug)</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                    grativy.com/
                  </span>
                  <Input className="rounded-l-none" placeholder="romeo-juliet" />
                </div>
                <p className="text-xs text-muted-foreground">Ini akan menjadi alamat link undangan Anda.</p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>Sebelumnya</Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={nextStep}>Selanjutnya</Button>
            ) : (
              <Button>Simpan Perubahan</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
