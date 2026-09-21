"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Copy, Trash2, Download } from "lucide-react";
import { toast } from "sonner";

const mockGuests = [
  { id: 1, name: "Budi Santoso", phone: "081234567890", status: "Hadir", slug: "budi-santoso" },
  { id: 2, name: "Siti Aminah", phone: "081298765432", status: "Menunggu", slug: "siti-aminah" },
  { id: 3, name: "Joko Widodo", phone: "085612345678", status: "Tidak Hadir", slug: "joko-widodo" },
];

export default function GuestsPage({ params }: { params: { id: string } }) {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Hadir": return <Badge className="bg-green-500 hover:bg-green-600">Hadir</Badge>;
      case "Tidak Hadir": return <Badge variant="destructive">Tidak Hadir</Badge>;
      default: return <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">Menunggu</Badge>;
    }
  };

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`https://grativy.com/${params.id}?to=${slug}`);
    toast.success("Link berhasil disalin!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Tamu</h1>
          <p className="text-muted-foreground">Kelola daftar tamu undangan Anda.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Import/Export</Button>
          <Button><Plus className="mr-2 h-4 w-4" /> Tambah Tamu</Button>
        </div>
      </div>

      <div className="flex items-center max-w-sm">
        <Search className="mr-2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Cari nama tamu..." className="w-full" />
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Tamu</TableHead>
              <TableHead>No. WhatsApp</TableHead>
              <TableHead>Status RSVP</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockGuests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell className="font-medium">{guest.name}</TableCell>
                <TableCell>{guest.phone}</TableCell>
                <TableCell>{getStatusBadge(guest.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => copyLink(guest.slug)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
