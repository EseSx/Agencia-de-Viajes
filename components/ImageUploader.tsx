"use client";
import React, { useState } from "react";
import { uploadImage } from "@/lib/storage";

interface imageUploaderProps {
  onUpload: (url: string) => void;
}

export default function imageUploader({ onUpload }: imageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);
    setError("");

    try {
      const url = await uploadImage(file);
      onUpload(url);
    } catch {
      setError("Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Imagen del paquete
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {loading && <p className="text-sm text-gray-400">Subiendo imagen...</p>}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {preview && !loading && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-48 object-cover rounded-md border"
        />
      )}
    </div>
  );
}
