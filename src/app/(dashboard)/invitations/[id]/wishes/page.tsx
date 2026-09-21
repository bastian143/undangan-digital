"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Download, MessageSquare } from "lucide-react";

const mockWishes = [
  { id: 1, name: "Andi & Keluarga", message: "Selamat menempuh hidup baru! Semoga samawa yaa.", date: "12 Okt 2023 14:30", isVisible: true, attendance: "Hadir" },
  { id: 2, name: "Budi Santoso", message: "Maaf belum bisa hadir, semoga lancar sampai hari H.", date: "11 Okt 2023 09:15", isVisible: true, attendance: "Tidak Hadir" },
];

export default function WishesPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ucapan & Doa</h1>
          <p className="text-muted-foreground">Kumpulan ucapan dari tamu undangan Anda.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockWishes.length > 0 ? mockWishes.map((wish) => (
          <Card key={wish.id}>
            <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
              <div>
                <h3 className="font-semibold text-lg">{wish.name}</h3>
                <p className="text-xs text-muted-foreground">{wish.date}</p>
              </div>
              <Badge variant={wish.attendance === "Hadir" ? "default" : "secondary"}>
                {wish.attendance}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm mt-2 p-3 bg-slate-50 rounded-md italic">"{wish.message}"</p>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <Switch id={`show-${wish.id}`} defaultChecked={wish.isVisible} />
                <Label htmlFor={`show-${wish.id}`} className="text-sm text-muted-foreground cursor-pointer">
                  Tampilkan di halaman undangan
                </Label>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="col-span-2 flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg bg-white">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Belum ada ucapan</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Ucapan dari tamu akan muncul di sini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
