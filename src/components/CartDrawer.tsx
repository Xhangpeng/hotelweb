import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ShieldAlert,
  ShieldCheck,
  Compass,
  ArrowRight,
  Flame
} from 'lucide-react';
import { CartItem, GeofenceState, BookingType } from '../types/restaurant';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  bookingType: BookingType;
  geofenceState: GeofenceState;
  deliveryRadiusKm: number;
  discountCode: string;
  appliedDiscount: number;
  onApplyDiscount: (code: string) => boolean;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onOpenGeofenceRadar: () => void;
  onOpenReservations: () => void;
}

export const CartDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  cartItems,
  bookingType,
  geofenceState,
  deliveryRadiusKm,
  discountCode,
  appliedDiscount,
  onApplyDiscount,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onOpenGeofenceRadar,
  onOpenReservations
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);
  const gstAmount = Math.round(subtotal * 0.05); // 5% GST on restaurant food
  const deliveryFee = bookingType === 'delivery' ? (subtotal > 500 ? 0 : 50) : 0;
  const grandTotal = Math.max(0, subtotal + gstAmount + deliveryFee - appliedDiscount);

  const isLocationAuthorized =
    bookingType === 'takeaway' || geofenceState.isInsideDeliveryRadius;
  const distanceKm = geofenceState.distanceKm ?? 0;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyDiscount(promoInput.trim());
    if (success) {
      setPromoError(null);
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon. Try using "SHANKAR20" for 20% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs font-sans-body transition-opacity">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-stone-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-serif-display font-semibold text-amber-300">
              Your Shankar Dining Bag
            </h2>
            <span className="font-mono text-xs text-stone-400">
              ({cartItems.reduce((a, b) => a + b.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Delivery Zone Notice - only shown if outside delivery radius */}
          {!isLocationAuthorized && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 flex items-start gap-3">
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-amber-900 block">
                  Delivery Area Notice
                </span>
                <p className="text-[11px] text-stone-600 leading-normal">
                  Shankar Restaurant delivers within our local Connaught Place dining perimeter. Your current location is outside our hot delivery zone.
                </p>
                <button
                  type="button"
                  onClick={onOpenGeofenceRadar}
                  className="text-amber-900 font-semibold underline text-[11px] pt-1 block cursor-pointer"
                >
                  Change or test delivery location
                </button>
              </div>
            </div>
          )}

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-sm text-stone-600 font-medium">Your bag is currently empty.</p>
              <p className="text-xs text-stone-400">
                Explore our Royal Curries, Tandoori Kebabs & Dum Biryanis.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.menuItem.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                        }`}
                      />
                      <h4 className="text-xs font-semibold text-stone-900 leading-snug">
                        {item.menuItem.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
                      <span className="capitalize">{item.portion} portion</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-amber-800">
                        <Flame className="w-3 h-3 text-amber-700" />
                        <span>
                          {item.spiceLevel === 0
                            ? 'Mild'
                            : item.spiceLevel === 1
                            ? 'Classic'
                            : item.spiceLevel === 2
                            ? 'Spicy'
                            : 'Hot'}
                        </span>
                      </span>
                    </div>

                    {item.specialInstructions && (
                      <p className="text-[10px] text-stone-500 italic">
                        Note: {item.specialInstructions}
                      </p>
                    )}

                    <div className="font-mono text-xs font-bold text-stone-900 pt-1 tabular-nums">
                      ₹{item.itemTotal}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-stone-200">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="text-stone-600 hover:text-stone-900 p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-stone-900 w-4 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="text-stone-600 hover:text-stone-900 p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Coupon Code Section */}
          {cartItems.length > 0 && (
            <div className="space-y-2 pt-2">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. SHANKAR20)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg uppercase font-mono tracking-wider text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 shrink-0 cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {appliedDiscount > 0 && (
                <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-mono">
                  <span>Discount Applied ({discountCode})</span>
                  <span>-₹{appliedDiscount}</span>
                </div>
              )}

              {promoError && (
                <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout Action */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-stone-50 border-t border-stone-200 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600 font-sans-body">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-mono tabular-nums text-stone-900">₹{gstAmount}</span>
              </div>
              {bookingType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
              )}
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promotion Savings</span>
                  <span className="font-mono tabular-nums">-₹{appliedDiscount}</span>
                </div>
              )}
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-950">
                <span>Grand Total</span>
                <span className="font-mono tabular-nums text-base">₹{grandTotal}</span>
              </div>
            </div>

            {/* Strict Geofence Checkout Lock Notice */}
            {!isLocationAuthorized ? (
              <div className="space-y-2">
                <button
                  disabled
                  className="w-full py-3 bg-stone-200 text-stone-500 text-xs font-semibold rounded-xl cursor-not-allowed text-center"
                >
                  Delivery Unavailable for Selected Location
                </button>
                <button
                  type="button"
                  onClick={onOpenGeofenceRadar}
                  className="w-full py-2 bg-stone-900 text-white text-xs font-medium rounded-xl hover:bg-stone-800 transition-colors text-center cursor-pointer"
                >
                  Change Delivery Address or Location
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3 bg-amber-900 hover:bg-amber-800 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
