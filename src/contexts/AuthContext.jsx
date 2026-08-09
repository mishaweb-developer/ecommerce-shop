import { createContext,useContext } from 'react';
const AuthContext=createContext(undefined);
export function AuthProvider({children}){/* TASK-10
TODO: Implementiraj user, session, loading, početnu proveru sesije, auth subscription, cleanup i logout.
HINT: useState, useEffect, supabase.auth.getSession i supabase.auth.onAuthStateChange.
*/const value={user:null,session:null,loading:false,logout:async()=>{}};return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>}
export function useAuth(){const context=useContext(AuthContext);if(context===undefined)throw new Error('useAuth must be used inside AuthProvider');return context}
