import React, { useContext, useState, useEffect } from "react";
import { supabase } from "../supabase";
import AuthContext from "./AuthContext.js";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(supabase.auth.session());

  useEffect(() => {
    setSession(supabase.auth.session());
    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, thisSession) => {
        setUser(thisSession?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Will be passed down to Signup, Login and Dashboard components
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signIn(data),
    signInWithGitHub: () => supabase.auth.signIn({ provider: "github" }),
    signOut: () => supabase.auth.signOut(),
    user,
    session
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
