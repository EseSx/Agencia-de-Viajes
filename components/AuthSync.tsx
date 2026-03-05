"use client";
import { useEffect } from "react";
import { syncAuthCookies } from "@/lib/firebase";

export default function AuthSync() {
    useEffect(() => {
        syncAuthCookies();
    }, []);
    return null;
}