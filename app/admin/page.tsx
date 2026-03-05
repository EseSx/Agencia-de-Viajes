"use client";
import React, { useEffect, useState } from "react";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "@/lib/packages";

interface Package {
  id: string;
  name: string;
  destination: string;
  price: number;
  availableSeats: number;
}

const emptyForm = {
  name: "",
  destination: "",
  price: 0,
  availableSeats: 0,
};

export default function AdminPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPackages();
  }, []);

  async function loadPackages() {
    const data = await getPackages();
    setPackages(data as Package[]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await updatePackage(editingId, form);
        setEditingId(null);
      } else {
        await createPackage(form);
      }
      setForm(emptyForm);
      await loadPackages();
    } catch {
      setError("Error al guardar el paquete");
    }
  }

  function handleEdit(pkg: Package) {
    setEditingId(pkg.id);
    setForm({
      name: pkg.name,
      destination: pkg.destination,
      price: pkg.price,
      availableSeats: pkg.availableSeats,
    });
  }

  async function handleDelete(id: string) {
    await deletePackage(id);
    await loadPackages();
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-8">Panel de administración</h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 border rounded-lg bg-white shadow-sm mb-10"
      >
        <h2 className="text-lg font-semibold">
          {editingId ? "Editar paquete" : "Crear paquete"}
        </h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          placeholder="Nombre del paquete"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          type="text"
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          placeholder="Destino"
          value={form.destination}
          onChange={(e) => setForm({ ...form, destination: e.target.value })}
          required
          type="text"
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Asientos disponibles"
          value={form.availableSeats}
          onChange={(e) =>
            setForm({ ...form, availableSeats: Number(e.target.value) })
          }
          required
          className="w-full px-3 py-2 border rounded-md"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {editingId ? "Guardar cambios" : "Crear paquete"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="border px-4 py-2 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de paquetes */}
      <div className="space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
          >
            <div>
              <p className="font-semibold">{pkg.name}</p>
              <p className="text-sm text-gray-500">
                {pkg.destination} — ${pkg.price}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(pkg)}
                className="text-sm px-3 py-1 border rounded-md hover:bg-gray-50"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(pkg.id)}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {packages.length === 0 && (
          <p className="text-gray-400 text-center">
            No hay paquetes cargados todavía.
          </p>
        )}
      </div>
    </main>
  );
}
