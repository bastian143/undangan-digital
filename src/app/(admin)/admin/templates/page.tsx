"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";

// Mock Data
const mockTemplates = [
  { id: "TPL-001", name: "Elegant Rose", category: "Floral", status: true, usage: 145, date: "01 Jan 2026" },
  { id: "TPL-002", name: "Minimalist White", category: "Minimalist", status: true, usage: 320, date: "15 Jan 2026" },
  { id: "TPL-003", name: "Rustic Charm", category: "Rustic", status: true, usage: 89, date: "05 Feb 2026" },
  { id: "TPL-004", name: "Modern Dark", category: "Modern", status: false, usage: 45, date: "20 Feb 2026" },
  { id: "TPL-005", name: "Classic Gold", category: "Classic", status: true, usage: 210, date: "10 Mar 2026" },
  { id: "TPL-006", name: "Tropical Vibes", category: "Nature", status: true, usage: 67, date: "25 Mar 2026" },
  { id: "TPL-007", name: "Vintage Love", category: "Vintage", status: false, usage: 12, date: "12 Apr 2026" },
  { id: "TPL-008", name: "Ocean Blue", category: "Modern", status: true, usage: 156, date: "01 May 2026" },
  { id: "TPL-009", name: "Autumn Leaves", category: "Nature", status: true, usage: 98, date: "15 May 2026" },
  { id: "TPL-010", name: "Geometric Chic", category: "Minimalist", status: true, usage: 205, date: "30 May 2026" },
];

export default function AdminTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [templates, setTemplates] = useState(mockTemplates);

  const toggleStatus = (id: string) => {
    setTemplates(templates.map(tpl => 
      tpl.id === id ? { ...tpl, status: !tpl.status } : tpl
    ));
  };

  const filteredTemplates = templates.filter(tpl => 
    tpl.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tpl.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kelola Template</h1>
          <p className="text-gray-500 text-sm mt-1">Tambah, edit, atau nonaktifkan template undangan.</p>
        </div>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
          <Link href="/admin/templates/new">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Template
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Cari template..." 
              className="pl-9 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Total: {filteredTemplates.length} Template
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="w-[100px]">Thumbnail</TableHead>
                <TableHead>Nama Template</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Digunakan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                    Tidak ada template yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell>
                      <div className="h-12 w-12 rounded bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center border border-gray-200">
                        <Palette className="h-5 w-5 text-indigo-300" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{template.name}</div>
                      <div className="text-xs text-gray-500">{template.id}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50">
                        {template.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <Switch 
                          checked={template.status} 
                          onCheckedChange={() => toggleStatus(template.id)}
                        />
                        <span className={`text-xs ${template.status ? 'text-emerald-600' : 'text-gray-500'}`}>
                          {template.status ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {template.usage}x
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" title="Preview">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" title="Hapus">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// Need to import Palette for thumbnail icon
import { Palette } from "lucide-react";
