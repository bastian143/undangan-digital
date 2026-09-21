"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, Users, UserCheck, UserX, BarChart3 } from "lucide-react";

export default function AnalyticsPage({ params }: { params: { id: string } }) {
  const stats = [
    { title: "Total Views", value: "342", icon: Eye, color: "text-blue-500" },
    { title: "Unique Views", value: "156", icon: Users, color: "text-purple-500" },
    { title: "RSVP Hadir", value: "120", icon: UserCheck, color: "text-green-500" },
    { title: "RSVP Tidak Hadir", value: "15", icon: UserX, color: "text-red-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statistik Undangan</h1>
        <p className="text-muted-foreground">Pantau performa dan respons undangan digital Anda.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Statistik Kunjungan</CardTitle>
            <CardDescription>Jumlah pengunjung 7 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
            <BarChart3 className="h-16 w-16 mb-4 opacity-20" />
            <p>Grafik kunjungan akan segera tersedia.</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ringkasan RSVP</CardTitle>
            <CardDescription>Persentase kehadiran tamu</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
            <div className="w-48 h-48 rounded-full border-8 border-slate-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-green-500 opacity-80" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", transform: "rotate(30deg) translateY(20%)" }}></div>
              <div className="z-10 bg-white w-32 h-32 rounded-full flex items-center justify-center font-bold text-xl">
                85%
              </div>
            </div>
            <p className="mt-6">Tingkat kehadiran yang diharapkan.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
