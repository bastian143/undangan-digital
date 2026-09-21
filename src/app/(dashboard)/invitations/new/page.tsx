"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Check } from "lucide-react";

const mockTemplates = [
  { id: "t1", name: "Elegant Gold", category: "Premium" },
  { id: "t2", name: "Rustic Green", category: "Standard" },
  { id: "t3", name: "Minimalist White", category: "Basic" },
];

export default function NewInvitationPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
  };

  const handleCheckout = () => {
    toast("Fitur pembayaran akan segera tersedia", {
      description: "Integrasi Midtrans sedang dalam pengembangan.",
    });
  };

  if (selectedTemplate) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Pilih Paket Masa Aktif</h1>
        <p className="text-center text-muted-foreground">Pilih durasi masa aktif undangan Anda.</p>
        
        <div className="grid gap-4 md:grid-cols-3">
          {["30", "60", "90"].map((days) => (
            <Card key={days} className="relative overflow-hidden cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-xl mb-2">{days} Hari</h3>
                <p className="text-2xl font-bold text-primary">Rp {parseInt(days) * 1000}</p>
                <Button className="w-full mt-4" onClick={handleCheckout}>Pilih Paket</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button variant="ghost" className="w-full" onClick={() => setSelectedTemplate(null)}>
          Kembali Pilih Template
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pilih Desain Template</h1>
        <p className="text-muted-foreground">Mulai dengan memilih template yang paling sesuai dengan tema pernikahan Anda.</p>
      </div>

      <Tabs defaultValue="semua">
        <TabsList>
          <TabsTrigger value="semua">Semua</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="basic">Basic</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden group">
            <div className="aspect-[3/4] bg-gradient-to-tr from-slate-100 to-slate-200 relative p-4">
              <Badge variant="secondary" className="absolute top-2 right-2 shadow-sm bg-white/80 backdrop-blur">
                {template.category}
              </Badge>
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                <Button variant="secondary" className="w-32">Preview</Button>
                <Button className="w-32" onClick={() => handleSelectTemplate(template.id)}>Pilih</Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{template.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
