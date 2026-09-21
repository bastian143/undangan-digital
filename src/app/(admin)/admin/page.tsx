"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Users, FileText, Activity, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock Data
const revenueData = {
  today: 1500000,
  thisWeek: 8750000,
  thisMonth: 35000000,
  total: 150000000
};

const statsData = {
  orders: 350,
  users: 1200,
  activeInvitations: 180
};

const recentOrders = [
  { id: "ORD-2026-09-20-01", user: "Budi Santoso", template: "Elegant Rose", amount: 150000, status: "Dibayar", date: "20 Sep 2026" },
  { id: "ORD-2026-09-20-02", user: "Siti Aminah", template: "Minimalist White", amount: 150000, status: "Pending", date: "20 Sep 2026" },
  { id: "ORD-2026-09-19-01", user: "Andi Saputra", template: "Rustic Charm", amount: 250000, status: "Aktif", date: "19 Sep 2026" },
  { id: "ORD-2026-09-19-02", user: "Rina Wijaya", template: "Modern Dark", amount: 250000, status: "Aktif", date: "19 Sep 2026" },
  { id: "ORD-2026-09-18-01", user: "Eko Prasetyo", template: "Classic Gold", amount: 150000, status: "Dibatalkan", date: "18 Sep 2026" }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-500 mt-1">Ringkasan aktivitas dan pendapatan platform.</p>
      </div>

      {/* Revenue Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pendapatan Hari Ini</CardTitle>
            <CreditCard className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(revenueData.today)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pendapatan Minggu Ini</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(revenueData.thisWeek)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pendapatan Bulan Ini</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(revenueData.thisMonth)}</div>
          </CardContent>
        </Card>
        <Card className="bg-indigo-600 text-white border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-100">Total Pendapatan</CardTitle>
            <CreditCard className="h-4 w-4 text-indigo-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(revenueData.total)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Pesanan</p>
              <h3 className="text-2xl font-bold text-gray-900">{statsData.orders}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full text-purple-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Pengguna</p>
              <h3 className="text-2xl font-bold text-gray-900">{statsData.users}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Undangan Aktif</p>
              <h3 className="text-2xl font-bold text-gray-900">{statsData.activeInvitations}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Simple Chart Placeholder */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Ringkasan Pendapatan</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex flex-col items-center justify-center border-t border-gray-100 bg-gray-50/50">
            <Activity className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 text-sm">Grafik pendapatan akan ditampilkan di sini</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/admin/analytics">Lihat Analitik Lengkap</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pesanan Terbaru</CardTitle>
            <Button variant="link" size="sm" asChild className="px-0">
              <Link href="/admin/orders">Lihat Semua</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{order.user}</p>
                    <p className="text-xs text-gray-500">{order.template}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <div className="text-sm font-medium">{formatCurrency(order.amount)}</div>
                    <Badge 
                      variant={
                        order.status === "Aktif" ? "default" :
                        order.status === "Dibayar" ? "secondary" :
                        order.status === "Pending" ? "outline" :
                        "destructive"
                      }
                      className={
                        order.status === "Aktif" ? "bg-emerald-500 hover:bg-emerald-600" :
                        order.status === "Dibayar" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                        order.status === "Pending" ? "text-amber-600 border-amber-200" :
                        ""
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
