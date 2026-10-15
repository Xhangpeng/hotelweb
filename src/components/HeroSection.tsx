import React from 'react';
import { Clock, MapPin, Sparkles, UtensilsCrossed } from 'lucide-react';
import { BookingType, GeofenceState } from '../types/restaurant';
import { RESTAURANT_HERO_IMAGE } from '../data/menuData';

interface Props {
  bookingType: BookingType;
  onChangeBookingType: (type: BookingType) => void;
  geofenceState: GeofenceState;
  deliveryRadiusKm: number;
  onOpenGeofenceRadar: () => void;
  onOpenReservations: () => void;
  onScrollToMenu: () => void;
}

export const HeroSection: React.FC<Props> = ({
  bookingType,
  onChangeBookingType,
  geofenceState,
  deliveryRadiusKm,
  onOpenGeofenceRadar,
  onOpenReservations,
  onScrollToMenu
}) => {
  const isInside = geofenceState.isInsideDeliveryRadius;
  const distanceKm = geofenceState.distanceKm ?? 0;

  return (
    <section className="relative bg-stone-950 text-stone-100 overflow-hidden">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0">
        <img
          src={RESTAURANT_HERO_IMAGE}
          alt="Shankar Restaurant Grand Royal Dining Interior"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl space-y-6">
          {/* Unboxed editorial kicker */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-sans-body">
            <span>Heritage Dining Since 1974</span>
            <span aria-hidden="true">·</span>
            <span>Connaught Place, New Delhi</span>
            <span aria-hidden="true">·</span>
            <span>Royal Mughlai & North Indian</span>
          </div>

          {/* Main Title with balanced wrapping */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-bold text-white tracking-tight leading-[1.1] text-balance">
            Shankar Restaurant: Authenticity, Fire & Royal Flavours
          </h1>

          <p className="text-base sm:text-lg text-stone-300 font-sans-body leading-relaxed max-w-2xl">
            Slow-simmered handi curries, clay-tandoor smoked kebabs, and Awadhi dum biryanis
            crafted under secret family spice formulations.
          </p>

          {/* Interactive Booking Mode Selector */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="inline-flex p-1 rounded-xl bg-stone-900/90 border border-stone-800">
              <button
                onClick={() => onChangeBookingType('delivery')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  bookingType === 'delivery'
                    ? 'bg-amber-400 text-stone-950 font-semibold shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Delivery
              </button>
              <button
                onClick={() => onChangeBookingType('dine_in')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  bookingType === 'dine_in'
                    ? 'bg-amber-400 text-stone-950 font-semibold shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Dine-In Table
              </button>
              <button
                onClick={() => onChangeBookingType('takeaway')}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  bookingType === 'takeaway'
                    ? 'bg-amber-400 text-stone-950 font-semibold shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Direct Takeaway
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onScrollToMenu}
                className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold bg-white text-stone-950 rounded-xl hover:bg-stone-200 transition-colors shadow-md cursor-pointer"
              >
                Order Culinary Dishes
              </button>

              <button
                onClick={onOpenReservations}
                className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl transition-colors border border-stone-700 cursor-pointer"
              >
                Book Table
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Craftsmanship Bar */}
      <div className="border-t border-stone-800/80 bg-stone-950/90 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans-body text-stone-400">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Clay Charcoal Tandoor</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>100% Desi Makhan & Ghee</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>25-35 Min Gourmet Dispatch</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Connaught Place, New Delhi</span>
          </div>
        </div>
      </div>
    </section>
  );
};
