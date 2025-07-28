import { GoogleGenAI } from "@google/genai";
import { AttendanceRecord } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAttendanceSummary = async (records: AttendanceRecord[], totalEmployees: number): Promise<string> => {
  if (records.length === 0) {
    return "Belum ada data absensi untuk dibuatkan ringkasan.";
  }

  const attendanceData = records.map(r => `- ${r.name}: ${r.status}`).join('\n');

  const prompt = `
    Anda adalah asisten manajer salon virtual yang cerdas dan efisien. Tugas Anda adalah membuat ringkasan absensi harian staf salon dalam Bahasa Indonesia berdasarkan data yang diberikan.

    Data Mentah Absensi Hari Ini:
    ${attendanceData}

    Total Staf Terdaftar: ${totalEmployees}

    Instruksi:
    1.  Analisis data absensi yang diberikan.
    2.  Hitung jumlah dan persentase staf untuk setiap status (Hadir, Sakit, Izin).
    3.  Hitung jumlah dan persentase staf yang belum tercatat absensinya.
    4.  Sajikan ringkasan dalam format poin-poin yang jelas dan profesional.
    5.  Gunakan emoji yang relevan untuk setiap poin untuk membuatnya lebih menarik secara visual (misalnya ✅ untuk Hadir, 🤒 untuk Sakit, 📝 untuk Izin, ❓ untuk Belum Absen).
    6.  Pastikan semua angka (jumlah dan persentase) akurat berdasarkan data yang diberikan.
    7.  Jaga agar bahasa tetap formal dan positif.

    Contoh Format Output:
    "Berikut adalah ringkasan absensi staf hari ini:
    ✅ *Hadir*: [Jumlah] dari ${totalEmployees} staf ([Persentase]%).
    🤒 *Sakit*: [Jumlah] dari ${totalEmployees} staf ([Persentase]%).
    📝 *Izin*: [Jumlah] dari ${totalEmployees} staf ([Persentase]%).
    ❓ *Belum Absen*: [Jumlah] dari ${totalEmployees} staf ([Persentase]%)."
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini API:", error);
    return "Terjadi kesalahan saat membuat ringkasan. Silakan coba lagi nanti.";
  }
};