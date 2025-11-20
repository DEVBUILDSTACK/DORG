"use client";

import { useEffect } from "react";
import { Button } from "@mantine/core";

export default function FundioError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-center">Fundio Error</h2>
          
          <p className="text-gray-400 text-center text-sm">
            {error.message || "An error occurred while loading Fundio. Please make sure you're logged in."}
          </p>
          
          {error.digest && (
            <p className="text-gray-500 text-xs">Error ID: {error.digest}</p>
          )}
          
          <div className="flex gap-3 mt-4 w-full">
            <Button
              onClick={reset}
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              Try Again
            </Button>
            
            <Button
              onClick={() => window.location.href = "/"}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
