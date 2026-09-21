"use client";

import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Bagian kiri - Dekoratif */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary/5 flex-col justify-center items-center overflow-hidden">
        {/* Elemen dekoratif */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-100/40 via-transparent to-teal-100/40 opacity-70 z-0" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-24 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '4s' }} />
        
        <div className="relative z-10 p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6 font-bold tracking-tight">
            Bagikan Momen Bahagia
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Buat dan kelola undangan digital impian Anda dengan desain yang elegan, modern, dan mudah digunakan.
          </p>
        </div>
      </div>
      
      {/* Bagian kanan - Formulir */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent lg:hidden z-0" />
        <div className="w-full max-w-md relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
