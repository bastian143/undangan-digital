"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, Edit2, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const mockInvitations = [
  {
    id: "1",
    coupleNames: "Romeo & Juliet",
    status: "Aktif",
    expiryDate: "2024-12-31",
    views: 156,
  }
];

export default function InvitationsPage() {
  const [filter, setFilter] = useState("semua");

  const filtered = filter === "semua" ? mockInvitations : mockInvitations.filter(i => i.status.toLowerCase() === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Undangan Saya</h1>
          <p className="text-muted-foreground">Kelola semua undangan yang telah Anda buat.</p>
        </div>
        <Button asChild>
          <Link href="/invitations/new">
            <Plus className="mr-2 h-4 w-4" />
            Buat Baru
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="semua" onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="semua">Semua</TabsTrigger>
          <TabsTrigger value="aktif">Aktif</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg bg-white">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Tidak ada undangan</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Belum ada undangan yang sesuai dengan filter ini.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((invitation) => (
            <Card key={invitation.id} className="overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-rose-100 to-teal-100 relative">
                <div className="absolute top-2 right-2">
                  <Badge variant={invitation.status === "Aktif" ? "default" : "secondary"}>
                    {invitation.status}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-lg line-clamp-1">{invitation.coupleNames}</h3>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="flex items-center"><Calendar className="mr-1 h-3 w-3" /> {invitation.expiryDate}</span>
                  <span className="flex items-center"><Eye className="mr-1 h-3 w-3" /> {invitation.views}</span>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/invitations/${invitation.id}/edit`}>
                    <Edit2 className="mr-2 h-4 w-4" /> Edit
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
