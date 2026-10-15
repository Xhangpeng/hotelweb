import React, { useState } from 'react';
import {
  X,
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  Copy,
  Check,
  Calendar,
  Sparkles,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { RESTAURANT_CONTACT_INFO } from '../data/menuData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservations: () => void;
  onOpenOnlineOrder: () => void;
}

export const CallToOrderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenReservations,
  onOpenOnlineOrder
}) => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (num: string) => {
    navigator.clipboard?.writeText(num.replace(/\s+/g, ''));
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden text-stone-100 animate-slide-up">
        {/* Header with warm luxury accent */}
        <div className="relative bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900/60 p-6 border-b border-amber-500/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Phone className="w-4 h-4 animate-pulse" />
            <span>Direct Kitchen & Concierge Lines</span>
          </div>
          <h2 className="text-2xl font-serif-display font-bold text-amber-100">
            Call to Order
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Speak directly with our Captains to place immediate takeaway, delivery, or custom banquet orders.
          </p>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-6">
          {/* Primary Phone numbers */}
          <div className="space-y-3">
            <div className="bg-stone-800/80 rounded-xl p-4 border border-stone-700/60 flex items-center justify-between gap-4 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                    Main Restaurant Line
                  </div>
                  <a
                    href={`tel:${RESTAURANT_CONTACT_INFO.phonePrimary.replace(/\s+/g, '')}`}
                    className="text-lg font-mono font-bold text-white hover:text-amber-300 transition-colors"
                  >
                    {RESTAURANT_CONTACT_INFO.phonePrimary}
                  </a>
                  <div className="text-[11px] text-stone-400">
                    Live Takeaway, Delivery & Order Inquiries
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(RESTAURANT_CONTACT_INFO.phonePrimary)}
                  className="p-2 rounded-lg bg-stone-700/50 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy Phone Number"
                >
                  {copiedNumber === RESTAURANT_CONTACT_INFO.phonePrimary ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={`tel:${RESTAURANT_CONTACT_INFO.phonePrimary.replace(/\s+/g, '')}`}
                  className="px-3.5 py-2 rounded-lg bg-amber-400 text-stone-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Call</span>
                </a>
              </div>
            </div>

            <div className="bg-stone-800/80 rounded-xl p-4 border border-stone-700/60 flex items-center justify-between gap-4 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                    WhatsApp Direct Order & VIP Concierge
                  </div>
                  <a
                    href={`https://wa.me/919811023456?text=Hello%20Shankar%20Restaurant,%20I%20would%20like%20to%20place%20an%20order`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-mono font-bold text-white hover:text-emerald-300 transition-colors"
                  >
                    {RESTAURANT_CONTACT_INFO.phoneDirect}
                  </a>
                  <div className="text-[11px] text-stone-400">
                    Instant menu chat, custom dishes & table queries
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(RESTAURANT_CONTACT_INFO.phoneDirect)}
                  className="p-2 rounded-lg bg-stone-700/50 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy Number"
                >
                  {copiedNumber === RESTAURANT_CONTACT_INFO.phoneDirect ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={`https://wa.me/919811023456?text=Hello%20Shankar%20Restaurant,%20I%20would%20like%20to%20place%20an%20order`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-emerald-500 text-stone-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Chat</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Service Hours */}
          <div className="bg-stone-950/60 rounded-xl p-4 border border-stone-800 text-xs space-y-2">
            <div className="flex items-center gap-2 text-stone-300 font-semibold mb-1">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Kitchen Operating Hours</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-stone-400 pt-1 border-t border-stone-800/80">
              <div>
                <span className="text-stone-300 block font-medium">Lunch Service</span>
                <span>{RESTAURANT_CONTACT_INFO.hours.lunch}</span>
              </div>
              <div>
                <span className="text-stone-300 block font-medium">Dinner Service</span>
                <span>{RESTAURANT_CONTACT_INFO.hours.dinner}</span>
              </div>
            </div>
          </div>

          {/* Quick Alternative Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenOnlineOrder();
              }}
              className="py-3 px-4 rounded-xl border border-stone-700 bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Order Online Instead</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenReservations();
              }}
              className="py-3 px-4 rounded-xl border border-amber-500/40 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Book a Table</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
