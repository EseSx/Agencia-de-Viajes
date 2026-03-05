"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserReservations } from "@/lib/reservations";
import { useRouter } from "next/navigation";

interface Reservation {
  id: string;
  packageId: string;
  seats: number;
  status: "pending" | "confirmed";
  createdAt: { seconds: number };
}

export default function DashboardPage() {
  const user = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    getUserReservations(user.uid).then((data) => {
      setReservations(data as Reservation[]);
      setLoading(false);
    });
  }, [user, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400">Cargando...</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-2">Mis Reservas</h1>
      <p className="text-gray-500 mb-8">Bienvenido, {user?.email}</p>

      <div className="space-y-4">
        {reservations.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
          >
            <div>
              <p className="font-semibold">Paquete: {r.packageId}</p>
              <p className="text-sm text-gray-500">Asientos: {r.seats}</p>
            </div>
            <span
              className={`text-sm px-3 py-1 rounded-full font-medium ${
                r.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {r.status === "confirmed" ? "Confirmada" : "Pendiente"}
            </span>
          </div>
        ))}

        {reservations.length === 0 && (
          <div className="text-center py-12 border rounded-lg bg-white">
            <p className="text-gray-400">No tenés reservas todavía.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Ver paquetes disponibles
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
