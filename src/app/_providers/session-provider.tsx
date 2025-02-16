"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface SessionContextType {
  session: any;
  isReady: boolean;
}


const SessionContext = createContext<SessionContextType | null>(null);

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children } : { children: React.ReactNode }) => {
  const [session, setSession] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session", {
          credentials: "include", // Pour inclure les cookies de session
        });
        if (res.ok) {
          const data = await res.json();
          setSession(data);
        }
      } catch (error) {
        console.error("Failed to fetch session", error);
      }
      setIsReady(true);
    };
    
    fetchSession();
  }, []);

  if (!isReady) {
    return (
<div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <SessionContext.Provider value={{ session, isReady }}>
      {children}
    </SessionContext.Provider>
  );
};
