"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, CheckCircle, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Mock Data
const mockOrders = Array.from({ length: 15 }).map((_, i) => {
  const statuses = ["Pending", "Dibayar", "Aktif", "Expired", "Dibatalkan"];
  const templates = ["Elegant Rose", "Minimalist White", "Rustic Charm", "Modern Dark", "Classic Gold"];
  const plans = ["Basic", "Premium", "Exclusive"];
  
  const status = statuses[i % 5];
  return {
    id: `ORD-2026-09-${(20 - Math.floor(i/3)).toString().padStart(2, '0')}-${(i % 5 + 1).toString().padStart(2, '0')}`,
    user: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    template: templates[i % 5],
    plan: plans[i % 3],
    amount: (i % 3 + 1) * 150000,
    status: status,
    date: `${20 - Math.floor(i/3)} Sep 2026`
  };
});

const statusColors: Record<string, string> = {
  "Pending": "text-amber-700 bg-amber-50 border-amber-200",
  "Dibayar": "text-blue-700 bg-blue-50 border-blue-200",
  "Aktif": "text-emerald-700 bg-emerald-50 border-emerald-200",
  "Expired": "text-gray-700 bg-gray-50 border-gray-200",
  "Dibatalkan": "text-red-700 bg-red-50 border-red-200",
};

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Semua" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kelola Pesanan</h1>
        <p className="text-gray-500 text-sm mt-1">Pantau dan kelola semua transaksi pengguna.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Cari ID Pesanan, Nama, Email..." 
              className="pl-9 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {["Semua", "Pending", "Dibayar", "Aktif", "Expired", "Dibatalkan"].map(status => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className={`whitespace-nowrap ${statusFilter === status ? 'bg-indigo-600' : 'bg-white'}`}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead>Order ID / Tanggal</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Template & Paket</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                    Tidak ada pesanan yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-xs text-gray-500">{order.date}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{order.user}</div>
                      <div className="text-xs text-gray-500">{order.email}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{order.template}</div>
                      <div className="text-xs text-gray-500">{order.plan}</div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(order.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" title="Detail">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {order.status === "Dibayar" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" title="Aktifkan">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {order.status === "Aktif" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50" title="Perpanjang">
                            <Clock className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-gray-200 bg-gray-50/50 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Menampilkan <span className="font-medium text-gray-900">1</span> - <span className="font-medium text-gray-900">{Math.min(10, filteredOrders.length)}</span> dari <span className="font-medium text-gray-900">{filteredOrders.length}</span> pesanan
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled>Sebelumnya</Button>
            <Button variant="outline" size="sm" className="bg-indigo-50 text-indigo-600 border-indigo-200">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">Selanjutnya</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
