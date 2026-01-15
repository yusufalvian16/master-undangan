# Auto-Fill Guest Name - Panduan Penggunaan

Fitur untuk otomatis mengisi nama tamu di form RSVP berdasarkan URL parameter.

## 🎯 Cara Kerja

Ketika tamu membuka undangan dengan URL yang berisi nama mereka, field "Nama Anda" akan otomatis terisi.

## 📝 Format URL

### Opsi 1: Parameter `to`

```
https://yourwebsite.com/?to=Budi%20Santoso
```

### Opsi 2: Parameter `name`

```
https://yourwebsite.com/?name=Siti%20Nurhaliza
```

### Dengan Section Hash

```
https://yourwebsite.com/#pesan-section?to=Ahmad%20Hidayat
```

## 🔧 Cara Membuat Link Personalisasi

### Manual (Satu per Satu)

1. **Base URL**: `https://yourwebsite.com/`
2. **Tambahkan parameter**: `?to=`
3. **Tambahkan nama tamu**: `Budi Santoso`
4. **Encode spasi**: Ganti spasi dengan `%20`
5. **Hasil**: `https://yourwebsite.com/?to=Budi%20Santoso`

### Menggunakan JavaScript (Bulk)

```javascript
const guests = [
  "Budi Santoso",
  "Siti Nurhaliza",
  "Ahmad Hidayat",
  "Dewi Lestari",
];

const baseUrl = "https://yourwebsite.com/";

guests.forEach((name) => {
  const encodedName = encodeURIComponent(name);
  const personalizedUrl = `${baseUrl}?to=${encodedName}`;
  console.log(`${name}: ${personalizedUrl}`);
});
```

### Menggunakan Spreadsheet (Excel/Google Sheets)

**Kolom A**: Nama Tamu
**Kolom B**: Formula

```
="https://yourwebsite.com/?to=" & ENCODEURL(A2)
```

Contoh:
| A (Nama) | B (URL) |
|----------|---------|
| Budi Santoso | `=ENCODEURL(A2)` akan jadi `https://.../?to=Budi%20Santoso` |

## 📱 Contoh Penggunaan Real

### WhatsApp Blast

```
Assalamualaikum Budi Santoso,

Kami mengundang Anda di pernikahan kami:
https://yourwebsite.com/?to=Budi%20Santoso

Terima kasih!
```

### Email

```html
<p>Dear Siti Nurhaliza,</p>
<p>Silakan buka undangan Anda:</p>
<a href="https://yourwebsite.com/?to=Siti%20Nurhaliza"> Buka Undangan </a>
```

### QR Code

Generate QR code dengan URL:

```
https://yourwebsite.com/?to=Ahmad%20Hidayat
```

## 🎨 Fitur Tambahan

### Auto-Scroll ke Form

Kombinasikan dengan hash untuk langsung scroll ke form:

```
https://yourwebsite.com/#pesan-section?to=Dewi%20Lestari
```

### Multiple Parameters

```
https://yourwebsite.com/?to=Rudi%20Hartono&table=5
```

## ⚙️ Technical Details

### Kode yang Ditambahkan

File: `js/script_form.js` (line 37-50)

```javascript
// Get guest name from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const guestNameFromUrl = urlParams.get("to") || urlParams.get("name");

if (guestNameFromUrl) {
  const guestNameInput = document.getElementById("guest-name");
  if (guestNameInput) {
    guestNameInput.value = decodeURIComponent(guestNameFromUrl);
    console.log("✅ Guest name auto-filled from URL:", guestNameFromUrl);
  }
}
```

### Supported Characters

- ✅ Huruf (A-Z, a-z)
- ✅ Angka (0-9)
- ✅ Spasi (auto-encoded ke %20)
- ✅ Karakter khusus (., ', -, dll)
- ✅ Unicode (emoji, aksara lain)

## 🔍 Testing

### Test URL

```
file:///path/to/index.html?to=Test%20User
```

### Browser Console

Buka Developer Tools (F12) → Console
Cari log: `✅ Guest name auto-filled from URL: Test User`

## 💡 Tips & Tricks

### 1. Nama Panjang

```
?to=Dr.%20H.%20Ahmad%20Hidayat%2C%20S.Kom%2C%20M.T.
```

### 2. Nama dengan Gelar

```
?to=Ir.%20Budi%20Santoso%2C%20M.Sc.
```

### 3. Nama dengan Apostrof

```
?to=O%27Brien
```

### 4. Shortlink

Gunakan bit.ly atau tinyurl untuk URL yang lebih pendek:

```
https://bit.ly/wedding-budi
→ redirect ke
https://yourwebsite.com/?to=Budi%20Santoso
```

## ⚠️ Catatan Penting

1. **Case Sensitive**: Nama akan muncul persis seperti di URL
2. **Encoding**: Spasi dan karakter khusus harus di-encode
3. **Privacy**: Nama tamu terlihat di URL (bukan masalah untuk undangan)
4. **Editable**: Tamu masih bisa edit nama jika salah

## 🎉 Keuntungan

- ✅ Personalisasi otomatis
- ✅ Mengurangi typo nama
- ✅ Lebih cepat untuk tamu
- ✅ Tracking siapa yang buka undangan
- ✅ Professional dan modern

## 📊 Analytics (Optional)

Gunakan Google Analytics atau tracking lain untuk monitor:  

- Siapa yang sudah buka link
- Kapan dibuka
- Dari device apa

---

**Selamat menggunakan fitur auto-fill guest name!** 🎊
