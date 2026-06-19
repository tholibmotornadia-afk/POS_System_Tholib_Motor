import React from 'react';
import { CreditCard, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartPaymentSectionProps {
  totalItems: number;
  total: number;
  cart: CartItem[];
  rawDiscountInput: string;
  setRawDiscountInput: (v: string) => void;
  discountAmount: number;
  setDiscountAmount: (v: number) => void;
  rawPaymentInput: string;
  setRawPaymentInput: (v: string) => void;
  paymentAmount: number;
  setPaymentAmount: (v: number) => void;
  processingPayment: boolean;
  isHutang: boolean;
  processPayment: () => void;
  clearCart: () => void;
  setShowHutangModal: (v: boolean) => void;
}

export function CartPaymentSection({
  totalItems, total, cart, rawDiscountInput, setRawDiscountInput,
  discountAmount, setDiscountAmount, rawPaymentInput, setRawPaymentInput,
  paymentAmount, setPaymentAmount, processingPayment, isHutang,
  processPayment, clearCart, setShowHutangModal,
}: CartPaymentSectionProps) {
  return (
    <div className="border-t border-[#DFE1E6] dark:border-[#2C333A] p-5 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-[#626F86] dark:text-[#8C9BAB]">
          <span>Total Items</span>
          <span>{totalItems} item</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-[#DFE1E6] dark:border-[#2C333A]">
          <span className="text-sm font-medium text-[#626F86] dark:text-[#8C9BAB]">Total</span>
          <span className="text-xl font-black text-[#0052CC] dark:text-[#579DFF]">Rp{total.toLocaleString('id-ID')}</span>
        </div>
      </div>

      {cart.length > 0 && (
        <>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between px-1 mb-1.5">
                <span className="text-[10px] font-bold text-[#626F86] dark:text-[#8C9BAB] uppercase tracking-wider">Diskon (Ribuan)</span>
                {rawDiscountInput && discountAmount > 0 && (
                  <span className="text-[10px] font-medium text-[#DE350B] bg-[#FFEBE6] px-1.5 py-0.5 rounded">-Rp{discountAmount.toLocaleString('id-ID')}</span>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#44546F] dark:text-[#9FADBC] pointer-events-none">Rp</span>
                <input
                  type="number"
                  placeholder="Contoh: 10 = 10.000"
                  value={rawDiscountInput}
                  onChange={(e) => { setRawDiscountInput(e.target.value); setDiscountAmount(e.target.value ? Number(e.target.value) * 1000 : 0); }}
                  className="w-full h-10 pl-8 pr-10 text-sm font-bold bg-[#FAFBFC] dark:bg-[#1D2125] border border-[#DFE1E6] dark:border-[#2C333A] rounded-lg focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none placeholder:text-[#A5ADBA] placeholder:font-normal placeholder:text-xs"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#626F86] dark:text-[#8C9BAB] opacity-50 pointer-events-none">.000</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between px-1 mb-1.5">
                <span className="text-[10px] font-bold text-[#626F86] dark:text-[#8C9BAB] uppercase tracking-wider">Pembayaran (Ribuan)</span>
                {rawPaymentInput && (
                  <span className="text-[10px] font-medium text-[#0052CC] bg-[#DEEBFF] px-1.5 py-0.5 rounded">Rp{paymentAmount.toLocaleString('id-ID')}</span>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#44546F] dark:text-[#9FADBC] pointer-events-none">Rp</span>
                <input
                  type="number"
                  placeholder="Contoh: 50 = 50.000"
                  value={rawPaymentInput}
                  onChange={(e) => { setRawPaymentInput(e.target.value); setPaymentAmount(e.target.value ? Number(e.target.value) * 1000 : 0); }}
                  className="w-full h-10 pl-8 pr-10 text-sm font-bold bg-[#FAFBFC] dark:bg-[#1D2125] border border-[#DFE1E6] dark:border-[#2C333A] rounded-lg focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none placeholder:text-[#A5ADBA] placeholder:font-normal placeholder:text-xs"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#626F86] dark:text-[#8C9BAB] opacity-50 pointer-events-none">.000</span>
              </div>
            </div>

            {paymentAmount > 0 && (
              <div className={`p-2.5 rounded-lg flex justify-between items-center ${paymentAmount >= total ? 'bg-[#E3FCEF] dark:bg-[#1A3326] text-[#006644] dark:text-[#36B37E]' : 'bg-[#FFEBE6] dark:bg-[#331A1A] text-[#BF2600]'}`}>
                <span className="text-[10px] font-black uppercase">{paymentAmount >= total ? 'Kembalian' : 'Kurang'}</span>
                <span className="text-sm font-black">Rp{Math.abs(paymentAmount - total).toLocaleString('id-ID')}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="h-10 px-3 font-bold text-[10px]" onClick={clearCart}>Reset</Button>
            <Button variant="outline" className="h-10 px-3 font-bold text-[#FF8B00] border-[#FF8B00] text-[10px]" disabled={processingPayment} onClick={() => setShowHutangModal(true)}>Hutang</Button>
            <Button className="flex-1 h-10 gap-1.5 text-sm font-bold shadow-lg" disabled={processingPayment || (!isHutang && paymentAmount < total)} onClick={processPayment}>
              <CreditCard className="w-4 h-4" />
              {processingPayment ? 'Memproses...' : 'Selesaikan'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
