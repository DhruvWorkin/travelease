import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUser, getCurrentUser, signIn, signOut, signUp } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ user: any; session: any } | undefined>;
  signUp: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{ user: any; session: any } | undefined>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking user session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut: async () => {
      await signOut();
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
