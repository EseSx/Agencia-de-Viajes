"use client"
import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase"

const AuthContext = createContext<User | null>(null)

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, setUser);
        return unsub;
    }, [])

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)