"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  loadingComponent?: React.ReactNode;
  showNotification?: boolean;
}

export function ProtectedRoute({ 
  children, 
  redirectTo = "/", 
  loadingComponent,
  showNotification = true
}: ProtectedRouteProps) {
  const { authenticated, ready } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (ready) {
      setIsChecking(false);
      
      if (!authenticated) {
        // Show notification if enabled
        if (showNotification) {
          setShowAlert(true);
          // Auto-hide notification after 3 seconds
          setTimeout(() => {
            setShowAlert(false);
            router.push(redirectTo);
          }, 3000);
        } else {
          // Redirect immediately if notification is disabled
          router.push(redirectTo);
        }
      }
    }
  }, [ready, authenticated, router, redirectTo, showNotification]);

  // Show loading state while checking auth
  if (!ready || isChecking) {
    return loadingComponent || (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-primary border-secondary rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!authenticated) {
    return (
      <>
        {/* Login Required Notification */}
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-md px-4"
            >
              <div className="bg-white rounded-xl shadow-2xl border border-[#FFE8E0] overflow-hidden">
                <div className="flex items-start p-4 gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-[#FF6B35]" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#1F2937] mb-1">
                      Login Required
                    </h3>
                    <p className="text-sm text-[#5A6C7D]">
                      Please log in to access this page. Redirecting to home...
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowAlert(false);
                      router.push(redirectTo);
                    }}
                    className="flex-shrink-0 text-[#5A6C7D] hover:text-[#1F2937] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {/* Progress bar */}
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="h-1 bg-[#FF6B35]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Empty state while showing notification */}
        <div className="min-h-screen bg-[#FAFBFC]" />
      </>
    );
  }

  // User is authenticated, render children
  return <>{children}</>;
}
