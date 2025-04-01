
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import ProfileButton from "@/components/auth/ProfileButton";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  ProfileButton: React.FC;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  isLoading: true,
  ProfileButton: () => null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // This component will be provided as part of the auth context
  const UserProfileButton = () => {
    if (!user) return null;
    return <ProfileButton userId={user.id} />;
  };

  const value = {
    session,
    user,
    isLoading,
    ProfileButton: UserProfileButton,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
