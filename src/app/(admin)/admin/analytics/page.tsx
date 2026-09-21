"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Users, ShoppingCart, MousePointerClick } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';

// Mock Data
const monthlyRevenue = [
  { name: 'Jan', total: 12500000 },
  { name: 'Feb', total: 15800000 },
  { name: 'Mar', total: 18200000 },
  { name: 'Apr', total: 16500000 },
  { name: 'Mei', total: 22000000 },
  { name: 'Jun', total: 25400000 },
  { name: 'Jul', total: 31000000 },
  { name: 'Ags', total: 28500000 },
  { name: 'Sep', total: 35000000 },
];

const templatePopularity = [
  { name: 'Elegant Rose', views: 1240, orders: 345 },
  { name: 'Minimalist White', views: 1020, orders: 280 },
  { name: 'Rustic Charm', views: 850, orders: 190 },
  { name: 'Modern Dark', views: 640, orders: 150 },
  { name: 'Classic Gold', views: 520, orders: 110 },
];

const userRegistrations = [
  { name: 'Senin', users: 12 },
  { name: 'Selasa', users: 18 },
  { name: 'Rabu', users: 24 },
  { name: 'Kamis', users: 15 },
  { name: 'Jumat', users: 32 },
  { name: 'Sabtu', users: 45 },
  { name: 'Minggu', users: 50 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Analitik & Laporan</h1>
        <p className="text-gray-500 text-sm mt-1">Insight performa bisnis dan aktivitas pengguna.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Konversi Pesanan</span>
                <span className="text-2xl font-bold">12.5%</span>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-emerald-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+2.1% dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Pengunjung Unik</span>
                <span className="text-2xl font-bold">45,231</span>
              </div>
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-emerald-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+15.3% dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Total Transaksi</span>
                <span className="text-2xl font-bold">1,245</span>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                <ShoppingCart className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-emerald-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+8.4% dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Rata-rata Klik</span>
                <span className="text-2xl font-bold">3.2k</span>
              </div>
              <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                <MousePointerClick className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-red-500">
              <TrendingUp className="mr-1 h-4 w-4 rotate-180" />
              <span>-1.2% dari minggu lalu</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Pendapatan (2026)</CardTitle>
            <CardDescription>Grafik pendapatan bulanan platform</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `Rp${value / 1000000}M`} 
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(Number(value) || 0), "Pendapatan"]}
                  labelStyle={{ color: '#1f2937' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Popular Templates */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Template Terpopuler</CardTitle>
            <CardDescription>Berdasarkan jumlah pesanan tertinggi</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={templatePopularity} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} stroke="#4b5563" />
                <Tooltip />
                <Bar dataKey="orders" name="Pesanan" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Registration Trend */}
        <Card className="col-span-4 lg:col-span-7">
          <CardHeader>
            <CardTitle>Pendaftaran Pengguna Baru (Minggu Ini)</CardTitle>
            <CardDescription>Tren harian registrasi pengguna</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userRegistrations} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="users" name="Pengguna Baru" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
