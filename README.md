# Aplikasi Absensi Aeryn Salon

Aplikasi web modern untuk mengelola absensi staf salon.

## Fitur Utama

-   **Manajemen Staf**: Tambah, edit, dan hapus data staf dengan mudah.
-   **Absensi Cepat**: Tandai kehadiran manual (Hadir, Sakit, Izin).
-   **Absensi QR Code Universal**: Satu QR code untuk semua staf, mempermudah proses absensi.
-   **Log Absensi**: Catatan absensi harian yang terurut secara real-time.
-   **Ringkasan AI**: Dapatkan ringkasan absensi cerdas yang didukung oleh Gemini AI untuk analisis cepat.
-   **Desain Responsif**: Tampilan optimal di perangkat desktop maupun mobile.
-   **Zero Build Step**: Dibangun tanpa perlu proses build, siap untuk di-deploy sebagai situs statis.

## Cara Deploy ke Vercel

Aplikasi ini dirancang untuk kemudahan deployment di Vercel. Karena tidak memerlukan langkah *build* (semua adalah file statis), prosesnya sangat cepat. Ada dua cara utama untuk mendeploy aplikasi ini.

---

### Metode 1: Deploy Cepat dengan Drag & Drop (Manual)

Metode ini cocok jika Anda ingin mendeploy dengan cepat tanpa menggunakan Git.

**Langkah 1: Siapkan File untuk di-Zip**

Pastikan Anda memiliki semua file proyek berikut dalam satu folder:

```
/
├── components/
│   ├── AttendanceLog.tsx
│   ├── EmployeeCard.tsx
│   ├── EmployeeFormModal.tsx
│   ├── EmployeeManagement.tsx
│   ├── Header.tsx
│   ├── QrScannerModal.tsx
│   ├── SummaryCard.tsx
│   ├── UniversalAttendanceModal.tsx
│   └── UniversalQrCodeModal.tsx
├── services/
│   └── geminiService.ts
├── App.tsx
├── constants.ts
├── index.html
├── index.tsx
├── metadata.json
├── README.md
├── types.ts
└── vercel.json
```

**Langkah 2: Buat File ZIP**

1.  Pilih semua file dan folder di atas.
2.  Klik kanan dan pilih "Compress" atau "Send to > Compressed (zipped) folder".
3.  Beri nama file zip Anda, misalnya `aeryn-salon-app.zip`.

**Langkah 3: Deploy ke Vercel**

1.  Login ke akun [Vercel](https://vercel.com/) Anda.
2.  Dari dashboard Anda, **drag and drop** file `aeryn-salon-app.zip` yang baru saja Anda buat langsung ke halaman.
3.  Vercel akan secara otomatis mengekstrak dan mendeploy situs Anda sebagai *Static Site*. Tidak perlu konfigurasi tambahan karena proyek ini sudah menyertakan file `vercel.json` untuk routing.
4.  Setelah selesai, Vercel akan memberikan URL publik untuk aplikasi Anda. Selesai!

---

### Metode 2: Deploy dengan Integrasi Git (Direkomendasikan)

Ini adalah metode terbaik untuk pengembangan jangka panjang. Vercel akan secara otomatis men-deploy ulang aplikasi Anda setiap kali ada perubahan baru di repositori Git Anda.

**Prasyarat:** Anda sudah menginstal Git dan memiliki akun di salah satu penyedia Git (GitHub, GitLab, atau Bitbucket).

**Langkah 1: Buat Repositori Git**

1.  Buat repositori baru di GitHub (atau penyedia lain).
2.  Inisialisasi Git di folder proyek Anda, lalu commit dan push semua file:
    ```bash
    # Inisialisasi Git di folder proyek Anda
    git init
    git add .
    git commit -m "Initial commit: Aeryn Salon App"

    # Hubungkan ke repositori remote Anda dan push
    git remote add origin https://github.com/NAMA_USER/NAMA_REPO.git
    git branch -M main
    git push -u origin main
    ```
    *(Ganti `https://github.com/NAMA_USER/NAMA_REPO.git` dengan URL repositori Anda)*

**Langkah 2: Import Proyek di Vercel**

1.  Login ke [Vercel](https://vercel.com/) dan buka Dashboard Anda.
2.  Klik **"Add New..."** lalu pilih **"Project"**.
3.  Pilih repositori Git yang baru saja Anda buat. Vercel akan meminta izin untuk mengakses akun Git Anda jika ini pertama kalinya.
4.  Vercel akan secara otomatis mendeteksi bahwa ini adalah proyek *Static Site* (karena tidak ada framework yang terdeteksi). Konfigurasi default seharusnya sudah benar.
5.  Klik **"Deploy"**. Vercel akan men-clone repositori Anda dan mendeploynya.

**Penting: Konfigurasi Environment Variable**

Untuk fitur Ringkasan AI berfungsi, Anda perlu menambahkan `API_KEY` Gemini Anda ke Vercel.

1.  Di dashboard proyek Vercel Anda, buka tab **"Settings"**.
2.  Pilih **"Environment Variables"** di menu sebelah kiri.
3.  Tambahkan variabel baru:
    -   **Name**: `API_KEY`
    -   **Value**: Masukkan API Key Google Gemini Anda.
4.  Klik **"Save"**.
5.  **Redeploy** aplikasi Anda agar variabel lingkungan yang baru dapat digunakan. Anda bisa melakukannya dari tab "Deployments" dengan memilih deployment terakhir dan mengklik menu "..." lalu "Redeploy".

Sekarang, setiap kali Anda melakukan `git push` ke branch `main`, Vercel akan secara otomatis membangun dan men-deploy versi terbaru dari aplikasi Anda.
