"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const user = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <nav className="w-full border-b bg-white px-6 py-4 flex items-center justify-between">
      <Link href={"/"} className="text-lg font-bold text-blue-600">
        Agencia de Viajes
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/" className="text-sm text-gray-600 hover:text-black">
          Inicio
        </Link>

        {user ? (
          <>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-black"
            >
              Mis Reservas
            </Link>
            <span className="text-sm text-gray-400">{user.email}</span>
            <button
              onClick={handleSignOut}
              className="text-sm px-3 py-1 border rounded-md hover:bg-gray-50"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
}
