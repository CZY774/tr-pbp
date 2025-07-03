import React, { useState } from "react";
import { Clock, MapPin, Phone, Mail, Users, Heart, Shield, Star } from "lucide-react";

const LandingPage = ({ onLoginClick }) => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Konsultasi Umum",
      description: "Pemeriksaan kesehatan umum oleh dokter berpengalaman"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Pemeriksaan Kesehatan",
      description: "Medical check-up lengkap untuk deteksi dini penyakit"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Konsultasi Spesialis",
      description: "Konsultasi dengan dokter spesialis sesuai kebutuhan"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Layanan Unggulan",
      description: "Layanan kesehatan dengan teknologi terdepan"
    }
  ];

  const stats = [
    { number: "5000+", label: "Pasien Terlayani" },
    { number: "15+", label: "Dokter Ahli" },
    { number: "24/7", label: "Layanan Darurat" },
    { number: "10+", label: "Tahun Pengalaman" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-teal-300 rounded-full opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-500 rounded-full opacity-10 animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Rumah Sakit Rawat Jalan
              <span className="block text-emerald-300">Étoile Santé</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Sistem informasi kesehatan terpadu untuk pelayanan medis yang lebih baik. 
              Kelola pendaftaran, kunjungan, resep, dan riwayat medis dalam satu platform digital.
            </p>
            
            {/* Hospital Image */}
            <div className="mb-8 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Modern Hospital Building"
                className="rounded-2xl shadow-2xl w-full max-w-2xl h-64 object-cover border-4 border-blue-200"
              />
            </div>
            
            <button
              onClick={onLoginClick}
              className="inline-flex items-center px-8 py-4 bg-emerald-500 text-white rounded-xl text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:bg-emerald-600"
            >
              <Shield className="w-5 h-5 mr-2" />
              Login Admin
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-700 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Layanan Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan berbagai layanan kesehatan dengan standar internasional 
              untuk memenuhi kebutuhan kesehatan Anda dan keluarga.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl text-center transition-all duration-300 cursor-pointer ${
                  hoveredService === index 
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl transform scale-105' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  hoveredService === index ? 'bg-blue-500' : 'bg-blue-100 text-blue-600'
                }`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className={`${hoveredService === index ? 'text-blue-100' : 'text-gray-600'}`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Jam Operasional</h4>
                <p className="text-blue-100">Senin - Jumat: 08:00 - 20:00</p>
                <p className="text-blue-100">Sabtu: 08:00 - 16:00</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Alamat</h4>
                <p className="text-blue-100">Jl. Kesehatan No. 123</p>
                <p className="text-blue-100">Surakarta, Jawa Tengah</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Telepon</h4>
                <p className="text-blue-100">(0271) 123-4567</p>
                <p className="text-blue-100">0812-3456-7890</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <p className="text-blue-100">info@rsetoilesante.com</p>
                <p className="text-blue-100">admin@rsetoilesante.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">RS Étoile Santé</h3>
              <p className="text-gray-400 mb-4">
                Rumah sakit rawat jalan terpercaya dengan layanan kesehatan berkualitas tinggi 
                dan teknologi medis terdepan.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Layanan Unggulan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• Konsultasi Dokter Umum</li>
                <li>• Pemeriksaan Laboratorium</li>
                <li>• Radiologi & Imaging</li>
                <li>• Farmasi & Apotek</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Sistem Informasi</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• Pendaftaran Online</li>
                <li>• Manajemen Kunjungan</li>
                <li>• Resep Digital</li>
                <li>• Riwayat Medis</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Rumah Sakit Rawat Jalan Étoile Santé. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;