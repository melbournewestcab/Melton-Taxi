import React from "react";
import { Phone, MessageSquareText } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function FloatingContact() {
  return (
    <aside
      aria-label="Instant Taxi Dispatch"
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6 pointer-events-none"
    >
      {/* Secondary Actions (WhatsApp & SMS) */}
      <div className="flex flex-col items-end gap-2 pointer-events-auto">
        <a
          href="https://wa.me/61401134074?text=Hi%2C%20I%20would%20like%20to%20book%20a%20taxi%20with%20Melton%20Taxi."
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-11 sm:h-11 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 group"
          aria-label="Chat with Melton Taxi on WhatsApp"
          data-testid="btn-float-whatsapp"
        >
          <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </a>

        <a
          href="sms:0401134074"
          className="w-10 h-10 sm:w-11 sm:h-11 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 group"
          aria-label="Send SMS text message to 0401 134 074"
          data-testid="btn-float-sms"
        >
          <MessageSquareText className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </a>
      </div>

      {/* ── Persistent Floating 'Call Now' Button ── */}
      <a
        href="tel:0401134074"
        className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 bg-primary text-black rounded-full shadow-2xl shadow-primary/50 hover:bg-primary/95 active:scale-95 transition-all duration-200 border-2 border-black/15 group select-none ring-2 ring-primary/40"
        aria-label="Call Now - 0401 134 074"
        data-testid="btn-float-call-now"
      >
        {/* Pulsing Live 24/7 Availability Indicator */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>

        {/* Ringing Phone Icon */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/10 flex items-center justify-center shrink-0 group-hover:bg-black/15 transition-colors">
          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black group-hover:rotate-12 transition-transform" />
        </div>

        {/* Text */}
        <span className="text-xs sm:text-sm font-black text-black uppercase tracking-wider pr-1 whitespace-nowrap">
          Call Now
        </span>
      </a>
    </aside>
  );
}
export default FloatingContact;
