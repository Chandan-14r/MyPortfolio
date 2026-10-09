"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/providers/AppProvider";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  layoutId?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, layoutId, children }: ModalProps) {
  const { reducedMotion } = useApp();

  useEffect(() => {
    if (isOpen) {
      document.documentElement.setAttribute("data-lenis-prevent", "true");
      const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.documentElement.removeAttribute("data-lenis-prevent");
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            layoutId={!reducedMotion ? layoutId : undefined}
            initial={reducedMotion ? { opacity: 0, scale: 0.95 } : undefined}
            animate={reducedMotion ? { opacity: 1, scale: 1 } : undefined}
            exit={reducedMotion ? { opacity: 0, scale: 0.95 } : undefined}
            className="relative w-full max-w-5xl max-h-full bg-bg-2 border border-border rounded-xl overflow-hidden shadow-2xl flex flex-col z-10"
            role="dialog"
            aria-modal="true"
            data-lenis-prevent
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 backdrop-blur rounded-full text-white hover:bg-black transition-colors border border-white/10"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="overflow-y-auto no-scrollbar w-full h-full p-0">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
