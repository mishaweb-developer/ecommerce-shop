import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  /* TASK-10
TODO: Implementiraj user, session, loading, početnu proveru sesije, auth subscription, cleanup i logout.
HINT: useState, useEffect, supabase.auth.getSession i supabase.auth.onAuthStateChange.
*/
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();

      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    }

    loadSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();
  }

  const value = {
    user,
    session,
    loading,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
