# 🐛 LAPORAN BUG & MASALAH - UNDANGAN PERNIKAHAN DIGITAL

**Tanggal Pemeriksaan:** 25 December 2025  
**Pemeriksa:** Bug Tester & Full Stack Developer  
**Versi Kode:** 1.0.0  
**Status:** ⚠️ DITEMUKAN BEBERAPA MASALAH YANG PERLU DIPERBAIKI

---

## 📋 DAFTAR ISI

1. [Bug Kritis](#bug-kritis)
2. [Bug Minor](#bug-minor)
3. [Masalah Keamanan](#masalah-keamanan)
4. [Masalah Performa](#masalah-performa)
5. [Masalah Aksesibilitas](#masalah-aksesibilitas)
6. [Masalah SEO](#masalah-seo)
7. [Masalah UX/UI](#masalah-uxui)
8. [Masalah Konfigurasi](#masalah-konfigurasi)
9. [Rekomendasi Perbaikan](#rekomendasi-perbaikan)

---

## 🚨 BUG KRITIS

### 1. **Supabase Config Kosong - Fitur RSVP Tidak Berfungsi**
**Lokasi:** `js/supabase_config.js`  
**Severity:** 🔴 KRITIS  
**Status:** ❌ BELUM DIPERBAIKI

**Masalah:**
```javascript
const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";
```
- URL dan Key Supabase masih kosong
- Form RSVP tidak akan berfungsi tanpa konfigurasi ini
- Pesan tamu tidak akan tersimpan ke database

**Dampak:**
- Fitur utama (RSVP & Ucapan) tidak berfungsi
- Data tamu tidak tersimpan
- User experience sangat terganggu

**Solusi:**
1. Buat proyek Supabase baru di https://supabase.com
2. Buat tabel `guest_messages` dengan kolom:
   - `id` (uuid, primary key)
   - `guest_name` (text)
   - `attendance` (text)
   - `message` (text, nullable)
   - `created_at` (timestamp)
3. Isi `SUPABASE_URL` dan `SUPABASE_ANON_KEY` di `js/supabase_config.js`
4. Set Row Level Security (RLS) policy untuk allow insert dan select

---

### 2. **Placeholder Links Belum Diganti - Link Tidak Berfungsi**
**Lokasi:** `index.html` (multiple locations)  
**Severity:** 🔴 KRITIS  
**Status:** ❌ BELUM DIPERBAIKI

**Masalah:**
- **Google Maps Links:** `https://maps.app.goo.gl/YourGoogleMapsLinkHere` (3 lokasi)
  - Line 604: Akad Nikah
  - Line 667: Resepsi
  - Line 716: Live Streaming (salah link, harusnya link streaming bukan maps)
- **WhatsApp Link:** `https://wa.me/6281234567890` (nomor placeholder)
- **Live Streaming Link:** Menggunakan link Google Maps, bukan link streaming

**Dampak:**
- User tidak bisa melihat lokasi acara
- User tidak bisa konfirmasi transfer via WhatsApp
- Live streaming tidak bisa diakses

**Solusi:**
1. Ganti semua `YourGoogleMapsLinkHere` dengan link Google Maps yang valid
2. Ganti `6281234567890` dengan nomor WhatsApp yang benar
3. Ganti link Live Streaming dengan link streaming yang valid (YouTube, Zoom, dll)

**Lokasi yang perlu diperbaiki:**
- `index.html:604` - Link lokasi Akad Nikah
- `index.html:667` - Link lokasi Resepsi  
- `index.html:716` - Link Live Streaming (salah, harus diganti)
- `index.html:1041` - Link WhatsApp konfirmasi transfer
- `js/script.js:370` - Link Google Maps di script
- `js/script.js:435` - Link WhatsApp di script

---

### 3. **Nomor Rekening & E-Wallet Masih Placeholder**
**Lokasi:** `index.html`  
**Severity:** 🔴 KRITIS  
**Status:** ❌ BELUM DIPERBAIKI

**Masalah:**
- Nomor rekening BCA: `1234567890` (placeholder)
- Nomor Dana: `081234567890` (placeholder)
- Nama pemilik rekening: `Rian & Nisa` (mungkin perlu disesuaikan)

**Dampak:**
- Transfer akan gagal jika menggunakan nomor placeholder
- User akan frustasi karena tidak bisa transfer

**Solusi:**
- Ganti dengan nomor rekening yang benar di:
  - `index.html:998` - Nomor rekening BCA
  - `index.html:1026` - Nomor Dana
  - `js/script.js:471` - Nomor Dana di script copy

---

## ⚠️ BUG MINOR

### 4. **Query Selector Tidak Spesifik - Bisa Menyebabkan Bug**
**Lokasi:** `js/script.js:378-390`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
```javascript
const guestNameDisplayElements = document.querySelectorAll(
  "#main-invite-page .text-2xl.font-semibold"
);
```
- Selector terlalu umum, bisa menangkap elemen lain yang tidak diinginkan
- Bisa mengganti teks yang bukan nama tamu

**Dampak:**
- Nama tamu bisa salah diganti jika ada elemen lain dengan class yang sama
- Bug sulit di-debug karena tidak spesifik

**Solusi:**
```javascript
// Gunakan selector yang lebih spesifik
const guestNameElement = document.querySelector(
  "#landing-page .font-primary.font-semibold"
);
// atau tambahkan ID khusus untuk elemen nama tamu
```

---

### 5. **Copy Button Menggunakan Metode Deprecated**
**Lokasi:** `js/script.js:342-364`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
```javascript
document.execCommand("copy"); // Deprecated API
```
- `document.execCommand` sudah deprecated
- Browser modern lebih suka menggunakan `navigator.clipboard.writeText()`

**Dampak:**
- Fitur copy mungkin tidak bekerja di browser terbaru
- Browser akan menampilkan warning di console

**Solusi:**
```javascript
// Gunakan Clipboard API modern
if (navigator.clipboard && navigator.clipboard.writeText) {
  await navigator.clipboard.writeText(accountNumber);
} else {
  // Fallback untuk browser lama
  // ... existing code
}
```

**Catatan:** Kode di `js/script.js:471` sudah menggunakan `navigator.clipboard.writeText()` dengan benar, tapi ada inconsistency.

---

### 6. **Tombol Copy Rekening Tidak Ditemukan di HTML**
**Lokasi:** `js/script.js:342-344`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
```javascript
const copyButtons = document.querySelectorAll(
  'button[data-action="copy-rekening"]'
);
```
- Selector mencari button dengan `data-action="copy-rekening"`
- Di HTML, button menggunakan ID `copy-rekening-btn`, bukan attribute `data-action`

**Dampak:**
- Event listener tidak terpasang
- Tombol copy tidak berfungsi

**Solusi:**
- Ubah selector menjadi: `document.getElementById("copy-rekening-btn")`
- Atau tambahkan `data-action="copy-rekening"` ke button di HTML

---

### 7. **Google Maps Button Selector Tidak Ditemukan**
**Lokasi:** `js/script.js:367-372`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
```javascript
const googleMapsBtn = document.querySelector("button.bg-purple-600");
```
- Mencari button dengan class `bg-purple-600`
- Di HTML, link Google Maps menggunakan tag `<a>`, bukan `<button>`
- Tidak ada class `bg-purple-600` di HTML

**Dampak:**
- Event listener tidak terpasang
- Kode ini tidak akan pernah dieksekusi

**Solusi:**
- Hapus kode ini karena sudah ada link langsung di HTML
- Atau ubah menjadi selector yang benar jika memang diperlukan

---

### 8. **Inkonsistensi Nama Pengantin**
**Lokasi:** Multiple locations  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Di beberapa tempat: "Rian & Nisa"
- Di section mempelai: "Muhammad Aprianto" & "Annisa Riski Firmani"
- Nama tidak konsisten

**Dampak:**
- Confusion untuk user
- Terlihat tidak profesional

**Solusi:**
- Pastikan semua nama konsisten di seluruh halaman
- Gunakan nama lengkap atau nama panggilan secara konsisten

---

## 🔒 MASALAH KEAMANAN

### 9. **XSS Vulnerability - Tidak Ada Sanitization Input**
**Lokasi:** `js/script_form.js:123-128`  
**Severity:** 🟠 MEDIUM  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
```javascript
messageDiv.innerHTML = `
  <p class="font-semibold text-gray-800">${escapeHtml(msg.guest_name)}</p>
  ${msg.message ? `<p class="text-gray-700 text-sm mt-2">${escapeHtml(msg.message)}</p>` : ""}
`;
```
- Meskipun sudah ada `escapeHtml()`, penggunaan `innerHTML` masih berisiko
- Jika ada bug di `escapeHtml()`, bisa terjadi XSS

**Dampak:**
- Malicious script bisa diinjeksi melalui form
- Data user bisa dicuri

**Solusi:**
```javascript
// Gunakan textContent atau createElement
const nameP = document.createElement("p");
nameP.className = "font-semibold text-gray-800";
nameP.textContent = msg.guest_name;
messageDiv.appendChild(nameP);
```

**Catatan:** Fungsi `escapeHtml()` sudah ada dan digunakan dengan benar, tapi lebih aman menggunakan DOM API langsung.

---

### 10. **Supabase Anon Key Terlihat di Client-Side**
**Lokasi:** `js/supabase_config.js`  
**Severity:** 🟡 LOW (Normal untuk Supabase)  
**Status:** ℹ️ INFORMASI

**Masalah:**
- Supabase Anon Key akan terlihat di source code client-side
- Ini normal untuk Supabase, tapi perlu dipastikan RLS policy sudah benar

**Dampak:**
- Jika RLS tidak dikonfigurasi dengan benar, data bisa diakses siapa saja

**Solusi:**
- Pastikan Row Level Security (RLS) sudah diaktifkan di Supabase
- Set policy yang tepat untuk insert dan select
- Jangan expose sensitive data tanpa RLS

---

## ⚡ MASALAH PERFORMA

### 11. **Banyak Image Tanpa Lazy Loading**
**Lokasi:** `index.html` (multiple locations)  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Banyak gambar yang tidak menggunakan `loading="lazy"`
- Semua gambar dimuat sekaligus saat halaman dibuka
- Beberapa gambar sudah menggunakan `loading="lazy"` (line 775, 793, 812, dll), tapi tidak konsisten

**Dampak:**
- Waktu loading awal lebih lama
- Menggunakan bandwidth lebih banyak
- User experience kurang baik terutama di mobile

**Solusi:**
- Tambahkan `loading="lazy"` ke semua gambar yang tidak di viewport awal
- Atau gunakan library seperti `lazysizes` untuk lazy loading yang lebih advanced

**Contoh:**
```html
<img src="..." alt="..." loading="lazy" />
```

---

### 12. **Audio File Tidak Preload**
**Lokasi:** `index.html:1317-1321`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
```html
<audio id="background-music" loop>
  <source src="./music/song.mp3" type="audio/mpeg" />
</audio>
```
- Tidak ada atribut `preload`
- Audio akan dimuat saat user klik play (baik untuk performa)
- Tapi bisa ada delay saat pertama kali play

**Dampak:**
- Delay saat pertama kali play musik
- User experience kurang smooth

**Solusi:**
- Tambahkan `preload="metadata"` untuk load metadata saja
- Atau `preload="auto"` jika ingin preload penuh (tapi akan menggunakan bandwidth)

**Rekomendasi:**
```html
<audio id="background-music" loop preload="metadata">
```

---

### 13. **Banyak Inline Styles**
**Lokasi:** `index.html` (multiple locations)  
**Severity:** 🟡 MINOR  
**Status:** ℹ️ INFORMASI

**Masalah:**
- Banyak penggunaan inline `style=""` di HTML
- Seharusnya menggunakan CSS classes

**Dampak:**
- File HTML lebih besar
- Sulit untuk maintain
- Tidak bisa di-cache oleh browser

**Solusi:**
- Pindahkan inline styles ke CSS file
- Gunakan utility classes Tailwind jika memungkinkan

---

### 14. **AOS Refresh Terlalu Sering**
**Lokasi:** `index.html:1345-1351`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
```javascript
document.querySelectorAll(".overflow-y-auto").forEach(function (container) {
  container.addEventListener("scroll", function () {
    AOS.refresh();
  });
});
```
- `AOS.refresh()` dipanggil setiap kali scroll di container dengan `overflow-y-auto`
- Bisa menyebabkan performance issue jika ada banyak scroll event

**Dampak:**
- Performance degradation saat scroll
- Bisa menyebabkan lag

**Solusi:**
- Gunakan debounce atau throttle untuk `AOS.refresh()`
- Atau hapus jika tidak diperlukan

---

## ♿ MASALAH AKSESIBILITAS

### 15. **Kurang Alt Text pada Beberapa Gambar**
**Lokasi:** `index.html` (multiple locations)  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Beberapa gambar dekoratif tidak memiliki alt text yang bermakna
- Contoh: `alt="Daun Kiri Atas"` untuk gambar dekoratif

**Dampak:**
- Screen reader akan membaca semua alt text, termasuk yang tidak penting
- User dengan screen reader akan terganggu

**Solusi:**
- Untuk gambar dekoratif, gunakan `alt=""` (empty string)
- Untuk gambar konten, gunakan alt text yang deskriptif

**Contoh:**
```html
<!-- Dekoratif -->
<img src="..." alt="" />

<!-- Konten -->
<img src="..." alt="Foto pengantin Rian dan Nisa" />
```

---

### 16. **Kurang ARIA Labels**
**Lokasi:** `index.html` (multiple locations)  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Banyak button dan link tidak memiliki `aria-label`
- Terutama button dengan hanya icon

**Dampak:**
- Screen reader tidak bisa menjelaskan fungsi button
- User dengan disabilitas akan kesulitan

**Solusi:**
- Tambahkan `aria-label` ke semua button dan link yang hanya memiliki icon
- Contoh: `<button aria-label="Play music">`

**Lokasi yang perlu diperbaiki:**
- Music toggle button
- Copy buttons
- Navigation links

---

### 17. **Form Tidak Memiliki Fieldset dan Legend**
**Lokasi:** `index.html:1098-1145`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Form RSVP tidak menggunakan `<fieldset>` dan `<legend>`
- Tidak ada grouping yang jelas untuk screen reader

**Dampak:**
- Screen reader tidak bisa menjelaskan struktur form dengan baik
- User dengan disabilitas akan kesulitan

**Solusi:**
```html
<form id="rsvp-form">
  <fieldset>
    <legend>Formulir RSVP</legend>
    <!-- form fields -->
  </fieldset>
</form>
```

---

### 18. **Kontras Warna Mungkin Tidak Cukup**
**Lokasi:** Multiple locations  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Beberapa teks mungkin tidak memenuhi WCAG contrast ratio
- Terutama teks putih di background terang atau sebaliknya

**Dampak:**
- User dengan low vision akan kesulitan membaca
- Tidak memenuhi standar aksesibilitas

**Solusi:**
- Test kontras warna menggunakan tool seperti WebAIM Contrast Checker
- Pastikan semua teks memenuhi WCAG AA (4.5:1 untuk normal text, 3:1 untuk large text)

---

## 🔍 MASALAH SEO

### 19. **Meta Description Tidak Ada**
**Lokasi:** `index.html:5-9`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Undangan Pernikahan Rian & Nisa</title>
```
- Tidak ada `<meta name="description">`
- Tidak ada Open Graph tags
- Tidak ada Twitter Card tags

**Dampak:**
- SEO kurang optimal
- Preview link di social media tidak menarik
- Tidak ada metadata untuk search engine

**Solusi:**
```html
<meta name="description" content="Undangan pernikahan Rian & Nisa. 28 Desember 2025. Menara 165, Jakarta Selatan." />
<!-- Open Graph -->
<meta property="og:title" content="Undangan Pernikahan Rian & Nisa" />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:url" content="..." />
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
```

---

### 20. **Structured Data Tidak Ada**
**Lokasi:** `index.html`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Tidak ada JSON-LD structured data untuk event
- Search engine tidak bisa memahami struktur event

**Dampak:**
- Tidak muncul di Google Events
- SEO kurang optimal

**Solusi:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Pernikahan Rian & Nisa",
  "startDate": "2025-12-28T08:00:00+07:00",
  "location": {
    "@type": "Place",
    "name": "Menara 165",
    "address": "Jl. TB Simatupang Jakarta Selatan"
  }
}
</script>
```

---

### 21. **Canonical URL Tidak Ada**
**Lokasi:** `index.html`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Tidak ada `<link rel="canonical">`
- Bisa menyebabkan duplicate content issues

**Dampak:**
- SEO kurang optimal
- Bisa dianggap duplicate content

**Solusi:**
```html
<link rel="canonical" href="https://yoursite.com/" />
```

---

## 🎨 MASALAH UX/UI

### 22. **Loading State Tidak Ada**
**Lokasi:** Multiple locations  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Form submission tidak menampilkan loading state
- User tidak tahu apakah form sedang diproses

**Dampak:**
- User mungkin klik submit berkali-kali
- User experience kurang baik

**Solusi:**
- Tambahkan loading spinner saat form sedang diproses
- Disable button saat submit
- Tampilkan feedback yang jelas

---

### 23. **Error Handling Kurang Informative**
**Lokasi:** `js/script_form.js`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
```javascript
showNotification("Maaf, terjadi kesalahan. Silakan coba lagi.", "error");
```
- Error message terlalu generic
- User tidak tahu apa yang salah

**Dampak:**
- User frustasi karena tidak tahu masalahnya
- User mungkin tidak bisa memperbaiki masalah sendiri

**Solusi:**
- Tampilkan error message yang lebih spesifik
- Berikan saran solusi jika memungkinkan

---

### 24. **Tidak Ada Confirmation untuk Copy to Clipboard**
**Lokasi:** `js/script.js:471-479`  
**Severity:** 🟡 MINOR  
**Status:** ✅ SUDAH ADA (tapi bisa diperbaiki)

**Masalah:**
- Sudah ada notifikasi sukses untuk copy
- Tapi bisa lebih baik dengan toast notification yang lebih jelas

**Dampak:**
- User mungkin tidak melihat notifikasi kecil

**Solusi:**
- Gunakan toast notification yang lebih menonjol
- Atau gunakan library seperti `react-hot-toast` atau `sweetalert2`

---

## ⚙️ MASALAH KONFIGURASI

### 25. **File Tidak Digunakan**
**Lokasi:** Root directory  
**Severity:** 🟡 MINOR  
**Status:** ℹ️ INFORMASI

**Masalah:**
- Ada file `index2.html`, `try.html`, `Coba_pesan.html` yang mungkin tidak digunakan
- Ada file `js/script2.js` yang mungkin tidak digunakan

**Dampak:**
- Confusion untuk developer
- File tidak perlu menggunakan space

**Solusi:**
- Hapus file yang tidak digunakan
- Atau dokumentasikan jika memang diperlukan

---

### 26. **Package.json Tidak Lengkap**
**Lokasi:** `package.json`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
```json
{
  "name": "template-1",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "npx tailwindcss -i ./input.css -o ./css/output.css --watch"
  }
}
```
- Tidak ada description
- Tidak ada author
- Tidak ada repository
- Script test tidak berguna

**Dampak:**
- Tidak profesional
- Sulit untuk maintain

**Solusi:**
```json
{
  "name": "undangan-pernikahan-digital",
  "version": "1.0.0",
  "description": "Website undangan pernikahan digital dengan fitur RSVP",
  "author": "Your Name",
  "scripts": {
    "dev": "npx tailwindcss -i ./input.css -o ./css/output.css --watch",
    "build": "npx tailwindcss -i ./input.css -o ./css/output.css --minify"
  }
}
```

---

## 📝 REKOMENDASI PERBAIKAN PRIORITAS

### Prioritas Tinggi (Harus Segera Diperbaiki)
1. ✅ **Isi Supabase Config** - Fitur RSVP tidak berfungsi tanpa ini
2. ✅ **Ganti Placeholder Links** - Google Maps, WhatsApp, Live Streaming
3. ✅ **Ganti Nomor Rekening** - Transfer tidak akan berfungsi
4. ✅ **Perbaiki Query Selector** - Bisa menyebabkan bug

### Prioritas Sedang (Perlu Diperbaiki)
5. ✅ **Tambah Meta Tags SEO** - Untuk SEO dan social sharing
6. ✅ **Perbaiki Aksesibilitas** - Alt text, ARIA labels
7. ✅ **Tambah Error Handling** - User experience lebih baik
8. ✅ **Optimasi Performa** - Lazy loading, preload

### Prioritas Rendah (Nice to Have)
9. ✅ **Cleanup File Tidak Digunakan** - Maintainability
10. ✅ **Tambah Structured Data** - SEO enhancement
11. ✅ **Perbaiki Package.json** - Professionalism
12. ✅ **Fix Memory Leaks** - setInterval, setTimeout, event listeners
13. ✅ **Fix Code Duplication** - script.js vs script2.js
14. ✅ **Standardize Script Loading** - Konsistensi loading order

---

## 🔄 MASALAH KODE DUPLIKASI & KONFLIK

### 27. **Duplikasi Kode Antara script.js dan script2.js**
**Lokasi:** `js/script.js` vs `js/script2.js`  
**Severity:** 🟠 MEDIUM  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Ada 2 file JavaScript dengan fungsi yang sama:
  - `script.js` - digunakan di `index.html`
  - `script2.js` - digunakan di `index2.html`
- Keduanya memiliki logika navbar aktif, gift section, copy button yang sama
- Kode tidak konsisten antara kedua file

**Dampak:**
- Maintenance sulit karena harus update 2 file
- Bisa terjadi inconsistency
- Code duplication melanggar DRY principle

**Solusi:**
- Pilih salah satu file sebagai master
- Hapus file yang tidak digunakan
- Atau refactor menjadi module yang bisa di-share

---

### 28. **Multiple HTML Files Membingungkan**
**Lokasi:** Root directory  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Ada beberapa file HTML:
  - `index.html` - file utama (menggunakan script.js)
  - `index2.html` - file alternatif (menggunakan script2.js)
  - `try.html` - file testing
  - `Coba_pesan.html` - file testing form
  - `wave-top-backup.html` - backup file

**Dampak:**
- Confusion untuk developer
- Tidak jelas file mana yang digunakan
- Bisa menyebabkan deploy file yang salah

**Solusi:**
- Dokumentasikan file mana yang production
- Hapus atau pindahkan file testing ke folder terpisah
- Atau rename dengan jelas (misal: `index.production.html`)

---

### 29. **setInterval Tidak Pernah Di-Clear - Memory Leak**
**Lokasi:** `index.html:1390`  
**Severity:** 🟠 MEDIUM  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
```javascript
setInterval(updateCountdown, 1000);
```
- `setInterval` tidak pernah di-clear
- Akan terus berjalan bahkan setelah halaman tidak digunakan
- Bisa menyebabkan memory leak

**Dampak:**
- Memory leak
- Performance degradation
- Battery drain di mobile

**Solusi:**
```javascript
let countdownInterval = setInterval(updateCountdown, 1000);

// Clear saat halaman unload
window.addEventListener('beforeunload', () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
```

---

### 30. **setTimeout Tidak Di-Clear - Potensi Memory Leak**
**Lokasi:** Multiple locations  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Banyak `setTimeout` yang tidak di-clear
- Jika komponen di-unmount sebelum timeout selesai, bisa menyebabkan memory leak
- Contoh di:
  - `js/script.js:145, 177, 189, 336, 459, 475`
  - `js/script2.js:113, 129`
  - `js/script_form.js:164, 173, 186`

**Dampak:**
- Potensi memory leak
- Callback bisa dieksekusi setelah komponen sudah tidak ada

**Solusi:**
- Simpan timeout ID dan clear saat cleanup
- Atau gunakan AbortController untuk cancel async operations

---

### 31. **Event Listeners Tidak Di-Cleanup**
**Lokasi:** Multiple locations  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Banyak event listeners yang tidak di-remove
- Bisa menyebabkan memory leak jika komponen di-unmount
- Terutama di:
  - Scroll listeners
  - Resize listeners
  - Intersection Observer

**Dampak:**
- Memory leak
- Event listeners bisa tetap aktif setelah komponen di-unmount

**Solusi:**
- Simpan reference ke event listeners
- Remove saat cleanup atau unmount
- Gunakan AbortController untuk event listeners modern

---

### 32. **Script Loading Order Issue**
**Lokasi:** `index.html` dan `index2.html`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- `index.html` menggunakan `script.js` yang memiliki logika landing page
- `index2.html` menggunakan `script2.js` yang tidak memiliki logika landing page
- Script loading order berbeda:
  - `index.html`: Supabase di head dengan defer, script.js di body
  - `index2.html`: Supabase di body tanpa defer, script2.js di body

**Dampak:**
- Inconsistent behavior
- Bisa menyebabkan race condition
- Script mungkin tidak ter-load dengan benar

**Solusi:**
- Standardize script loading order
- Gunakan defer atau async dengan konsisten
- Atau gunakan module type untuk better dependency management

---

### 33. **Intersection Observer Tidak Di-Disconnect**
**Lokasi:** `js/script.js:290-310` dan `js/script2.js:64-83`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
```javascript
const observer = new IntersectionObserver(...);
sections.forEach((section) => {
  observer.observe(section);
});
```
- Observer tidak pernah di-disconnect
- Bisa menyebabkan memory leak

**Dampak:**
- Memory leak
- Observer tetap aktif meskipun tidak diperlukan

**Solusi:**
```javascript
// Disconnect saat cleanup
window.addEventListener('beforeunload', () => {
  observer.disconnect();
});
```

---

### 34. **AOS Refresh Terlalu Sering - Performance Issue**
**Lokasi:** `index.html:1345-1351` dan `index2.html:625-631`  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
```javascript
document.querySelectorAll(".overflow-y-auto").forEach(function (container) {
  container.addEventListener("scroll", function () {
    AOS.refresh();
  });
});
```
- `AOS.refresh()` dipanggil setiap kali scroll
- Tidak ada debounce atau throttle
- Bisa menyebabkan performance issue

**Dampak:**
- Performance degradation saat scroll
- Bisa menyebabkan lag atau jank

**Solusi:**
```javascript
// Gunakan debounce atau throttle
const debouncedRefresh = debounce(() => {
  AOS.refresh();
}, 100);

document.querySelectorAll(".overflow-y-auto").forEach(function (container) {
  container.addEventListener("scroll", debouncedRefresh, { passive: true });
});
```

---

### 35. **Null Check Tidak Konsisten**
**Lokasi:** Multiple locations  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Beberapa tempat melakukan null check dengan benar
- Beberapa tempat tidak melakukan null check
- Inconsistent pattern

**Contoh:**
- `js/script.js:46` - Tidak check jika `musicIcon` null sebelum menggunakan
- `js/script.js:452` - Check null dengan benar

**Dampak:**
- Bisa menyebabkan runtime error
- Inconsistent error handling

**Solusi:**
- Standardize null checking pattern
- Gunakan optional chaining (`?.`) jika memungkinkan
- Atau gunakan guard clauses secara konsisten

---

### 36. **Error Handling Tidak Lengkap**
**Lokasi:** Multiple locations  
**Severity:** 🟡 MINOR  
**Status:** ⚠️ PERLU DIPERBAIKI

**Masalah:**
- Beberapa async operations tidak memiliki error handling
- Clipboard API tidak memiliki error handling
- Audio play tidak memiliki proper error handling

**Contoh:**
```javascript
// js/script.js:43
backgroundMusic.play().catch((e) => {
  /* Menangani error jika autoplay gagal */
});
// Comment kosong, tidak ada handling

// js/script2.js:110
navigator.clipboard.writeText(el.textContent.trim());
// Tidak ada error handling
```

**Dampak:**
- Error bisa terjadi tanpa diketahui user
- User experience kurang baik
- Sulit untuk debug

**Solusi:**
- Tambahkan proper error handling
- Tampilkan error message ke user jika diperlukan
- Log error untuk debugging

---

## 📊 RINGKASAN STATISTIK

- **Total Bug Ditemukan:** 36
- **Bug Kritis:** 3
- **Bug Minor:** 8
- **Masalah Keamanan:** 2
- **Masalah Performa:** 6
- **Masalah Aksesibilitas:** 4
- **Masalah SEO:** 3
- **Masalah UX/UI:** 3
- **Masalah Konfigurasi:** 2
- **Masalah Kode Duplikasi & Konflik:** 5

---

## ✅ KESIMPULAN

Website undangan pernikahan ini memiliki struktur yang baik dan fitur yang lengkap. Namun, ada beberapa masalah yang perlu diperbaiki sebelum production:

1. **Konfigurasi penting masih kosong** (Supabase, links, nomor rekening)
2. **Beberapa bug minor** yang bisa menyebabkan masalah
3. **Optimasi performa dan aksesibilitas** perlu ditingkatkan
4. **SEO** perlu ditambahkan untuk visibility yang lebih baik

**Rekomendasi:** Perbaiki semua bug kritis terlebih dahulu sebelum deploy ke production.

**Catatan Penting:**
- Ada **36 masalah** yang ditemukan setelah analisis mendalam
- **10 masalah baru** ditemukan setelah membaca lebih detail:
  - Memory leaks (setInterval, setTimeout, event listeners)
  - Code duplication antara script.js dan script2.js
  - Multiple HTML files yang membingungkan
  - Error handling tidak lengkap
  - Performance issues dengan AOS refresh
- Beberapa masalah bisa menyebabkan **memory leaks** yang akan terasa setelah penggunaan jangka panjang
- **Code duplication** membuat maintenance lebih sulit dan berisiko inconsistency

---

**Dibuat oleh:** Bug Tester & Full Stack Developer  
**Tanggal:** 25 December 2025  
**Versi Laporan:** 1.0.0

