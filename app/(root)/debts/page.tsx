'use client';

import useSWR from 'swr';
import React, { useState } from 'react';
import axios from '@/lib/axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Search, Eye, Receipt, MoreHorizontal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Debt {
  id: string;
  customerName: string;
  amount: number;
  notes: string | null;
  isPaid: boolean;
  paidAt: string | null;
  createdAt: string;
  transaction: {
    id: string;
    totalAmount: number;
    createdAt: string;
  };
}

const statusFilters = ['all', 'unpaid', 'paid'] as const;
const statusLabels: Record<string, string> = {
  all: 'Semua',
  unpaid: 'Belum Lunas',
  paid: 'Lunas',
};

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function DebtsPage() {
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'paid'>('unpaid');
  const [search, setSearch] = useState('');
  const [markPaidId, setMarkPaidId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const params = new URLSearchParams();
  if (filter !== 'all') params.set('status', filter);
  
  const { data, isLoading: loading, mutate } = useSWR(`/api/debts?${params.toString()}`, fetcher);
  const debts: Debt[] = data?.debts || [];

  const handleMarkPaid = async () => {
    if (!markPaidId) return;
    try {
      setProcessing(true);
      await axios.patch(`/api/debts/${markPaidId}`, { isPaid: true });
      setMarkPaidId(null);
      mutate();
    } catch (error) {
      alert('Gagal menandai hutang sebagai lunas');
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setProcessing(true);
      await axios.delete(`/api/debts/${deleteId}`);
      setDeleteId(null);
      mutate();
    } catch (error) {
      alert('Gagal menghapus catatan hutang');
    } finally {
      setProcessing(false);
    }
  };

  const filteredDebts = debts.filter((d) =>
    d.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header — matches Product page */}
      <div className="h-14 flex items-center justify-between px-6 border-b border-[#DFE1E6] dark:border-[#2C333A] bg-white dark:bg-[#22272B]">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-[#0052CC] dark:text-[#579DFF]" />
          <h1 className="text-base font-bold text-[#172B4D] dark:text-white">Hutang</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-5 overflow-y-auto">
        {/* Filters — matches Product page filter bar */}
        <div className="flex flex-col xl:flex-row gap-4 p-4 bg-white dark:bg-[#22272B] border border-[#DFE1E6] dark:border-[#2C333A] rounded-lg items-start xl:items-center justify-between">
          {/* Status Tabs */}
          <div className="flex gap-2 w-full xl:w-auto flex-1 overflow-x-auto pb-2 xl:pb-0">
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 px-4 py-3 rounded-md text-sm font-bold transition-all whitespace-nowrap ${
                  filter === f
                    ? 'bg-[#0052CC] text-white shadow-md'
                    : 'bg-[#F4F5F7] dark:bg-[#2C333A] text-[#44546F] dark:text-[#9FADBC] hover:bg-[#EBECF0] dark:hover:bg-[#3D4449]'
                }`}
              >
                {statusLabels[f]}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full xl:w-80 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#626F86] dark:text-[#8C9BAB]" />
            <input
              type="text"
              placeholder="Cari nama pelanggan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-10 rounded-md border border-[#DFE1E6] dark:border-[#2C333A] bg-white dark:bg-[#1D2125] text-base placeholder:text-[#626F86] dark:placeholder:text-[#8C9BAB] focus:outline-none focus:ring-2 focus:ring-[#0052CC] transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[#EBECF0] dark:hover:bg-[#2C333A] rounded">
                <X className="w-4 h-4 text-[#626F86]" />
              </button>
            )}
          </div>
        </div>

        {/* Table — matches Product/Records table exactly */}
        <div className="flex-1 border border-[#DFE1E6] dark:border-[#2C333A] bg-white dark:bg-[#22272B] rounded-lg overflow-hidden flex flex-col shadow-sm">
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-base text-left">
              <thead className="bg-[#F4F5F7] dark:bg-[#1D2125] text-[#44546F] dark:text-[#9FADBC] text-xs uppercase font-bold border-b border-[#DFE1E6] dark:border-[#2C333A] sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 w-[16%]">Pelanggan</th>
                  <th className="px-6 py-4 w-[14%]">No. Transaksi</th>
                  <th className="px-6 py-4 w-[14%]">Tanggal</th>
                  <th className="px-6 py-4 text-right w-[14%]">Jumlah</th>
                  <th className="px-6 py-4 text-center w-[12%]">Status</th>
                  <th className="px-6 py-4 w-[16%]">Catatan</th>
                  <th className="px-6 py-4 w-[14%] text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE1E6] dark:divide-[#2C333A]">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={7} className="p-6 text-center">
                        <div className="h-4 bg-[#EBECF0] dark:bg-[#2C333A] rounded animate-pulse w-3/4 mx-auto mb-2" />
                      </td>
                    </tr>
                  ))
                ) : filteredDebts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-[#626F86] dark:text-[#8C9BAB]">
                      <div className="flex flex-col items-center justify-center">
                        <Receipt className="w-12 h-12 mb-4 opacity-20" />
                        <p className="text-lg font-medium">Tidak ada data hutang</p>
                        <p className="text-sm">Belum ada catatan hutang untuk filter ini.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredDebts.map((debt) => (
                    <tr key={debt.id} className="hover:bg-[#F4F5F7] dark:hover:bg-[#2C333A] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#172B4D] dark:text-[#B6C2CF] text-base">{debt.customerName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-[#0052CC] text-sm">#{debt.transaction.id.slice(-8).toUpperCase()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-[#172B4D] dark:text-[#B6C2CF]">
                          {format(new Date(debt.createdAt), 'dd MMM yyyy', { locale: id })}
                        </div>
                        <div className="text-[10px] text-[#626F86] dark:text-[#8C9BAB]">
                          {format(new Date(debt.createdAt), 'HH:mm')}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-[#172B4D] dark:text-[#B6C2CF] font-mono">
                        Rp{debt.amount.toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {debt.isPaid ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#E3FCEF] text-[#006644]">
                            Lunas
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FFF0B3] text-[#974F0C]">
                            Belum Lunas
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#626F86] dark:text-[#8C9BAB] truncate max-w-[150px]">
                        {debt.notes || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/records/${debt.transaction.id}`)}
                            className="text-[#0052CC] border-[#0052CC] hover:bg-[#E9F2FF] dark:text-[#579DFF] dark:border-[#579DFF] dark:hover:bg-[#1C2B41] h-8 text-xs font-semibold px-3"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1.5" />
                            Detail
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-[#626F86] dark:text-[#8C9BAB] hover:text-[#172B4D] dark:hover:text-white hover:bg-[#EBECF0] dark:hover:bg-[#3D4449]">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-[#22272B] border-[#DFE1E6] dark:border-[#2C333A]">
                              <DropdownMenuLabel className="text-[#626F86] dark:text-[#8C9BAB]">Opsi Lainnya</DropdownMenuLabel>
                              {!debt.isPaid && (
                                <DropdownMenuItem
                                  onClick={() => setMarkPaidId(debt.id)}
                                  className="cursor-pointer focus:bg-[#EBECF0] dark:focus:bg-[#3D4449]"
                                >
                                  Tandai Lunas
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator className="bg-[#DFE1E6] dark:bg-[#3D4449]" />
                              <DropdownMenuItem
                                onClick={() => setDeleteId(debt.id)}
                                className="text-[#DE350B] focus:text-[#DE350B] focus:bg-[#FFEBE6] dark:focus:bg-[#4A1A1A] cursor-pointer"
                              >
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mark Paid Confirmation */}
      <AlertDialog open={!!markPaidId} onOpenChange={(open) => !open && setMarkPaidId(null)}>
        <AlertDialogContent className="bg-white dark:bg-[#22272B] border-[#DFE1E6] dark:border-[#2C333A]">
          <AlertDialogHeader>
            <AlertDialogTitle>Tandai Lunas?</AlertDialogTitle>
            <AlertDialogDescription>
              Hutang ini akan ditandai sebagai lunas. Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setMarkPaidId(null)}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleMarkPaid} className="bg-[#0052CC] hover:bg-[#0747A6] text-white">
              {processing ? 'Memproses...' : 'Tandai Lunas'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-white dark:bg-[#22272B] border-[#DFE1E6] dark:border-[#2C333A]">
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Catatan Hutang?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Catatan hutang akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-[#DE350B] hover:bg-[#BF2600] text-white">
              {processing ? 'Menghapus...' : 'Hapus'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
