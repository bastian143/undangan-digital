"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Eye, CheckCircle2, Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { title: "Total Undangan", value: "2", icon: Heart, color: "text-rose-500" },
    { title: "Total Tamu", value: "150", icon: Users, color: "text-blue-500" },
    { title: "Total Views", value: "342", icon: Eye, color: "text-purple-500" },
    { title: "Total RSVP", value: "89", icon: CheckCircle2, color: "text-emerald-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Selamat Datang, {user?.displayName || "Pengguna"}! 👋</h1>
        <p className="text-muted-foreground mt-2">Kelola undangan digital pernikahan Anda di sini.</p>
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

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/invitations/new">
            <Plus className="mr-2 h-4 w-4" />
            Buat Undangan Baru
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/templates">Lihat Template</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Undangan Terbaru</CardTitle>
          <CardDescription>Daftar undangan yang baru saja Anda buat atau edit.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Belum ada undangan</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Anda belum membuat undangan apapun. Mulai buat undangan pertama Anda!
            </p>
            <Button asChild>
              <Link href="/invitations/new">Buat Undangan</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
