/**
 * Wedding Configuration File
 * 
 * Edit this file to customize your wedding invitation.
 * All changes here will automatically update the website.
 */

const weddingConfig = {
  // ==================== COUPLE INFORMATION ====================
  groom: {
    fullName: "Ardi jaya",
    nickname: "Ardi",
    childOrder: "Putra kedua dari",
    parents: {
      father: "Bambang Wijaya",
      mother: "Siti Rahayu"
    },
    instagram: "@budisantoso_official",
    instagramLink: "#",
    photo: "./images/profile/male.webp"
  },

  bride: {
    fullName: "Ani Kusuma Dewi",
    nickname: "Ani",
    childOrder: "Putri ketiga dari",
    parents: {
      father: "Kusuma Wardana",
      mother: "Dewi Lestari"
    },
    instagram: "@anikusumaaa",
    instagramLink: "#",
    photo: "./images/profile/female.webp"
  },

  // ==================== WELCOME SECTION ====================
  welcome: {
    weddingDate: "15 Februari 2026",
    countdownDate: "2026-02-15T10:00:00", // Format: YYYY-MM-DDTHH:MM:SS
    message: "Dengan penuh sukacita, kami mengundang Anda untuk merayakan hari bahagia kami. Kehadiran dan doa restu Anda sangat berarti bagi kami.",
    slideshowImages: [
      "./images/galery/portrait/1.webp",
      "./images/galery/portrait/2.webp",
      "./images/galery/portrait/3.webp",
      "./images/galery/portrait/4.webp",
      "./images/galery/portrait/5.webp"
    ]
  },

  // ==================== EVENT DETAILS ====================
  events: {
    akadNikah: {
      title: "Akad Nikah",
      day: "15",
      month: "Februari 2026",
      dayName: "Minggu",
      time: "Pukul 10:00 WIB",
      venue: "Masjid Agung Al-Ikhlas",
      address: "Jl. Merdeka No. 123, Bandung, Jawa Barat",
      mapsLink: "https://maps.app.goo.gl/BandungMasjidAgung"
    },
    
    resepsi: {
      title: "Resepsi",
      day: "15",
      month: "Februari 2026",
      dayName: "Minggu",
      time: "Pukul 13:00 WIB - Selesai",
      venue: "Grand Ballroom Hotel Santika",
      address: "Jl. Asia Afrika No. 88, Bandung, Jawa Barat",
      mapsLink: "https://maps.app.goo.gl/HotelSantikaBandung"
    },
    
    liveStreaming: {
      title: "Live Streaming",
      description: "Temui kami secara virtual untuk menyaksikan acara pernikahan kami yang insyaaAllah akan disiarkan langsung melalui link dibawah ini.",
      link: "https://maps.app.goo.gl/YourGoogleMapsLinkHere",
      buttonText: "Lihat live Streaming"
    }
  },

  // ==================== LOVE STORY ====================
  loveStory: [
    {
      image: "./images/galery/landscape/2.webp",
      title: "💜 Awal Pertemuan Sederhana",
      description: "Berawal dari tempat pekerjaan Cianjur-2023, kami mengenal satu sama lain dan belum ada benih cinta kala itu, hanya sebatas teman kerja."
    },
    {
      image: "./images/galery/landscape/3.webp",
      title: "💞 Benih Cinta dalam Ujian",
      description: "Setelah cukup mengenal satu sama lain, satu tahun kurang lebih nya kami menjalin hubungan. Akhirnya kita memutuskan untuk melanjutkan ke Hubungan yang lebih serius mempertemukan kedua keluarga."
    },
    {
      image: "./images/galery/landscape/4.webp",
      title: "💍 Langkah Menuju Ridha Allah",
      description: "Sampai tanggal ini kami melaksanakan akad terlebih dahulu dan akhirnya kami mengubah status hingga menjadi pasangan suami istri. Semoga allah swt. Memberikan keberkahan pernikahan ini. \"AMIN"
    }
  ],

  // ==================== GALLERY ====================
  gallery: {
    title: "Our Moment",
    youtubeVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Ganti dengan link YouTube Anda
    images: {
      portrait: [
        "./images/galery/portrait/1.webp",
        "./images/galery/portrait/2.webp",
        "./images/galery/portrait/3.webp",
        "./images/galery/portrait/4.webp",
        "./images/galery/portrait/5.webp",
        "./images/galery/portrait/6.webp",
        "./images/galery/portrait/7.webp",
        "./images/galery/portrait/8.webp"
      ],
      landscape: [
        "./images/galery/landscape/1.webp",
        "./images/galery/landscape/2.webp",
        "./images/galery/landscape/3.webp",
        "./images/galery/landscape/4.webp",
        "./images/galery/landscape/5.webp",
        "./images/galery/landscape/6.webp"
      ]
    }
  },

  // ==================== WEDDING GIFT ====================
  gift: {
    title: "Wedding Gift",
    description: "Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.",
    bankAccounts: [
      {
        bank: "BCA",
        accountName: "Muhammad Aprianto",
        accountNumber: "1234567890",
        logo: "./images/bank/bca.png"
      },
      {
        bank: "Mandiri",
        accountName: "Annisa Riski Firmani",
        accountNumber: "0987654321",
        logo: "./images/bank/mandiri.png"
      }
    ],
    deliveryAddress: {
      title: "Kirim Kado",
      recipient: "Muhammad Aprianto & Annisa Riski Firmani",
      address: "Jl. Contoh Alamat No. 123, Jakarta Selatan, DKI Jakarta 12345",
      phone: "081234567890"
    }
  },

  // ==================== MESSAGES & RSVP ====================
  rsvp: {
    title: "Ucapan & RSVP",
    description: "Berikan ucapan terbaik untuk kami",
    whatsappNumber: "6281234567890", // Format: 62xxx (tanpa +)
    whatsappMessage: "Halo, saya ingin konfirmasi kehadiran untuk acara pernikahan Rian & Nisa",
    formEndpoint: "https://your-backend-endpoint.com/rsvp" // Ganti dengan endpoint Anda
  },

  // ==================== THANK YOU ====================
  thankYou: {
    title: "Terima Kasih",
    message: "Kehadiran dan doa restu dari Anda adalah hadiah terindah bagi kami. Semoga kita semua selalu dalam lindungan Allah SWT.",
    closing: "Hormat Kami Yang Mengundang",
    // Note: Couple names auto-generated from groom.nickname & bride.nickname
  },

  // ==================== MUSIC ====================
  music: {
    file: "./audio/background-music.mp3",
    autoplay: true
  },

  // ==================== SOCIAL MEDIA ====================
  socialMedia: {
    instagram: {
      groom: "@muahmandaprianto",
      bride: "@anisariskifirmani"
    },
    hashtag: "#RianNisaWedding"
  }
};

// Export untuk digunakan di script lain
if (typeof module !== 'undefined' && module.exports) {
  module.exports = weddingConfig;
}
