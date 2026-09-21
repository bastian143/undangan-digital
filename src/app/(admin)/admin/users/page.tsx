"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, ShieldAlert, Ban, Eye, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data
const mockUsers = [
  { id: "USR-01", name: "Budi Santoso", email: "budi@example.com", role: "USER", joined: "15 Jan 2026", orders: 2, status: "Active" },
  { id: "USR-02", name: "Siti Aminah", email: "siti@example.com", role: "USER", joined: "20 Jan 2026", orders: 1, status: "Active" },
  { id: "USR-03", name: "Admin Grativy", email: "admin@grativy.com", role: "ADMIN", joined: "01 Jan 2026", orders: 0, status: "Active" },
  { id: "USR-04", name: "Andi Saputra", email: "andi@example.com", role: "USER", joined: "10 Feb 2026", orders: 3, status: "Active" },
  { id: "USR-05", name: "Rina Wijaya", email: "rina@example.com", role: "USER", joined: "05 Mar 2026", orders: 1, status: "Active" },
  { id: "USR-06", name: "Eko Prasetyo", email: "eko@example.com", role: "USER", joined: "12 Mar 2026", orders: 1, status: "Suspended" },
  { id: "USR-07", name: "Dewi Lestari", email: "dewi@example.com", role: "USER", joined: "20 Mar 2026", orders: 2, status: "Active" },
  { id: "USR-08", name: "Manager Ops", email: "ops@grativy.com", role: "ADMIN", joined: "05 Jan 2026", orders: 0, status: "Active" },
  { id: "USR-09", name: "Agus Setiawan", email: "agus@example.com", role: "USER", joined: "02 Apr 2026", orders: 1, status: "Active" },
  { id: "USR-10", name: "Maya Indah", email: "maya@example.com", role: "USER", joined: "15 Apr 2026", orders: 0, status: "Active" },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "Semua" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kelola Pengguna</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola data pengguna, peran, dan status akun.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Cari Nama, Email..." 
              className="pl-9 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            {["Semua", "USER", "ADMIN"].map(role => (
              <Button
                key={role}
                variant={roleFilter === role ? "default" : "outline"}
                size="sm"
                onClick={() => setRoleFilter(role)}
                className={roleFilter === role ? 'bg-indigo-600' : 'bg-white'}
              >
                {role === "Semua" ? "Semua Peran" : role}
              </Button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead>Pengguna</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Tgl Bergabung</TableHead>
                <TableHead className="text-center">Total Pesanan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                    Tidak ada pengguna yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'} className={user.role === 'ADMIN' ? 'bg-indigo-600' : ''}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {user.joined}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {user.orders}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={user.status === 'Active' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-red-700 bg-red-50 border-red-200'}>
                        {user.status === 'Active' ? 'Aktif' : 'Suspended'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-muted text-gray-500">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Buka menu</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4 text-gray-500" /> Lihat Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Mail className="mr-2 h-4 w-4 text-gray-500" /> Kirim Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.role === 'USER' ? (
                            <DropdownMenuItem className="cursor-pointer text-indigo-600 focus:text-indigo-700">
                              <ShieldAlert className="mr-2 h-4 w-4" /> Jadikan Admin
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="cursor-pointer text-amber-600 focus:text-amber-700">
                              <ShieldAlert className="mr-2 h-4 w-4" /> Hapus Akses Admin
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-700">
                            <Ban className="mr-2 h-4 w-4" /> Suspend Akun
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
