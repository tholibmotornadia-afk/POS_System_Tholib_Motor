'use client';

import React, { useState } from 'react';
import {
    Settings,
    Store,
    Tag,
    Users,
    ChevronRight,
    Building2,
    Phone,
    MapPin,
    FileText,
    Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const settingsSections = [
    {
        id: 'store',
        label: 'Profil Toko',
        icon: Store,
        description: 'Nama toko, alamat, dan info kontak yang tampil di struk',
    },
    {
        id: 'category',
        label: 'Kategori & Brand',
        icon: Tag,
        description: 'Kelola master kategori dan brand produk',
    },
    {
        id: 'users',
        label: 'Manajemen Akun',
        icon: Users,
        description: 'Kelola akun kasir dan hak akses',
    },
];

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('store');

    return (
        <div className="h-full flex flex-col bg-[#F4F5F7] dark:bg-[#1D2125]">
            {/* Header */}
            <div className="h-14 flex items-center px-6 border-b border-[#DFE1E6] dark:border-[#2C333A] bg-white dark:bg-[#22272B] shrink-0">
                <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#0052CC] dark:text-[#579DFF]" />
                    <h1 className="text-base font-bold text-[#172B4D] dark:text-white">Pengaturan</h1>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Menu */}
                <nav className="w-64 border-r border-[#DFE1E6] dark:border-[#2C333A] bg-white dark:bg-[#22272B] p-3 space-y-1 shrink-0">
                    {settingsSections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all text-left group
                  ${isActive
                                        ? 'bg-[#DEEBFF] dark:bg-[#0747A6]/30 text-[#0052CC] dark:text-[#579DFF]'
                                        : 'text-[#44546F] dark:text-[#9FADBC] hover:bg-[#F4F5F7] dark:hover:bg-[#2C333A]'
                                    }`}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                <span className="flex-1">{section.label}</span>
                                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                            </button>
                        );
                    })}
                </nav>

                {/* Section Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeSection === 'store' && <StoreSetting />}
                    {activeSection === 'category' && <CategorySetting />}
                    {activeSection === 'users' && <UsersSetting />}
                </div>
            </div>
        </div>
    );
}

/* ─── Profil Toko ─── */
function StoreSetting() {
    const [form, setForm] = useState({
        name: 'Tholib Motor',
        tagline: 'Spesialis Suku Cadang Motor Honda, Yamaha, Suzuki, Kawasaki',
        address: 'Jl. Kebon Jeruk No. 12, Jakarta Barat',
        phone: '',
        receiptFooter: 'Barang yang sudah dibeli tidak dapat ditukar atau dikembalikan.',
    });

    const handleSave = () => {
        // TODO: connect to API
        alert('Pengaturan toko berhasil disimpan!');
    };

    return (
        <div className="max-w-2xl space-y-6">
            <div>
                <h2 className="text-lg font-bold text-[#172B4D] dark:text-white">Profil Toko</h2>
                <p className="text-sm text-[#626F86] dark:text-[#8C9BAB] mt-1">
                    Informasi ini akan tampil di header struk belanja.
                </p>
            </div>

            <div className="bg-white dark:bg-[#22272B] rounded-lg border border-[#DFE1E6] dark:border-[#2C333A] divide-y divide-[#DFE1E6] dark:divide-[#2C333A]">
                {/* Nama Toko */}
                <div className="p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-md bg-[#DEEBFF] dark:bg-[#0747A6]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 className="w-4 h-4 text-[#0052CC] dark:text-[#579DFF]" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                        <label className="text-xs font-bold text-[#44546F] dark:text-[#9FADBC] uppercase tracking-wide">
                            Nama Toko
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="w-full h-10 px-3 rounded-md border border-[#DFE1E6] dark:border-[#2C333A] bg-[#F4F5F7] dark:bg-[#1D2125] text-sm text-[#172B4D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Tagline */}
                <div className="p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-md bg-[#E3FCEF] dark:bg-[#1C3329]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4 text-[#006644] dark:text-[#22A06B]" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                        <label className="text-xs font-bold text-[#44546F] dark:text-[#9FADBC] uppercase tracking-wide">
                            Tagline / Sub Judul
                        </label>
                        <input
                            type="text"
                            value={form.tagline}
                            onChange={e => setForm({ ...form, tagline: e.target.value })}
                            className="w-full h-10 px-3 rounded-md border border-[#DFE1E6] dark:border-[#2C333A] bg-[#F4F5F7] dark:bg-[#1D2125] text-sm text-[#172B4D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Alamat */}
                <div className="p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-md bg-[#FFF0B3] dark:bg-[#3D2E00]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-[#974F0C] dark:text-[#FFE380]" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                        <label className="text-xs font-bold text-[#44546F] dark:text-[#9FADBC] uppercase tracking-wide">
                            Alamat
                        </label>
                        <input
                            type="text"
                            value={form.address}
                            onChange={e => setForm({ ...form, address: e.target.value })}
                            className="w-full h-10 px-3 rounded-md border border-[#DFE1E6] dark:border-[#2C333A] bg-[#F4F5F7] dark:bg-[#1D2125] text-sm text-[#172B4D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Nomor HP */}
                <div className="p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-md bg-[#EAE6FF] dark:bg-[#352C63]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="w-4 h-4 text-[#5243AA] dark:text-[#998DD9]" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                        <label className="text-xs font-bold text-[#44546F] dark:text-[#9FADBC] uppercase tracking-wide">
                            Nomor Telepon / WhatsApp
                        </label>
                        <input
                            type="text"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            placeholder="contoh: 0812-3456-7890"
                            className="w-full h-10 px-3 rounded-md border border-[#DFE1E6] dark:border-[#2C333A] bg-[#F4F5F7] dark:bg-[#1D2125] text-sm text-[#172B4D] dark:text-white placeholder:text-[#626F86] focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Footer Struk */}
                <div className="p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-md bg-[#FFEBE6] dark:bg-[#4A1D19]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4 text-[#BF2600] dark:text-[#FF8F73]" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                        <label className="text-xs font-bold text-[#44546F] dark:text-[#9FADBC] uppercase tracking-wide">
                            Footer Struk
                        </label>
                        <textarea
                            value={form.receiptFooter}
                            onChange={e => setForm({ ...form, receiptFooter: e.target.value })}
                            rows={2}
                            className="w-full px-3 py-2 rounded-md border border-[#DFE1E6] dark:border-[#2C333A] bg-[#F4F5F7] dark:bg-[#1D2125] text-sm text-[#172B4D] dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent"
                        />
                        <p className="text-[10px] text-[#626F86] dark:text-[#8C9BAB]">
                            Teks ini tampil di bagian bawah struk cetak.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={handleSave}
                    className="bg-[#0052CC] hover:bg-[#0747A6] text-white gap-2 font-bold px-6"
                >
                    <Save className="w-4 h-4" />
                    Simpan Pengaturan
                </Button>
            </div>
        </div>
    );
}

/* ─── Kategori & Brand ─── */
function CategorySetting() {
    return (
        <div className="max-w-2xl space-y-6">
            <div>
                <h2 className="text-lg font-bold text-[#172B4D] dark:text-white">Kategori & Brand</h2>
                <p className="text-sm text-[#626F86] dark:text-[#8C9BAB] mt-1">
                    Kelola master kategori dan brand yang tersedia untuk produk.
                </p>
            </div>
            <div className="bg-white dark:bg-[#22272B] rounded-lg border border-[#DFE1E6] dark:border-[#2C333A] p-10 flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-[#F4F5F7] dark:bg-[#2C333A] flex items-center justify-center">
                    <Tag className="w-6 h-6 text-[#626F86]" />
                </div>
                <p className="text-sm font-bold text-[#172B4D] dark:text-white">Segera Hadir</p>
                <p className="text-xs text-[#626F86] dark:text-[#8C9BAB] max-w-xs">
                    Fitur CRUD kategori & brand sedang dalam pengembangan.
                </p>
            </div>
        </div>
    );
}

/* ─── Manajemen Akun ─── */
function UsersSetting() {
    return (
        <div className="max-w-2xl space-y-6">
            <div>
                <h2 className="text-lg font-bold text-[#172B4D] dark:text-white">Manajemen Akun</h2>
                <p className="text-sm text-[#626F86] dark:text-[#8C9BAB] mt-1">
                    Kelola akun kasir dan level akses pada aplikasi ini.
                </p>
            </div>
            <div className="bg-white dark:bg-[#22272B] rounded-lg border border-[#DFE1E6] dark:border-[#2C333A] p-10 flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-[#F4F5F7] dark:bg-[#2C333A] flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#626F86]" />
                </div>
                <p className="text-sm font-bold text-[#172B4D] dark:text-white">Segera Hadir</p>
                <p className="text-xs text-[#626F86] dark:text-[#8C9BAB] max-w-xs">
                    Fitur manajemen akun sedang dalam pengembangan.
                </p>
            </div>
        </div>
    );
}
