/**
 * Wedding Configuration File
 * 
 * Edit this file to customize your wedding invitation.
 * All changes here will automatically update the website.
 */

const weddingConfig = {
  // ==================== SEO & META TAGS ====================
  seo: {
    pageTitle: "Undangan Pernikahan [Male] & [Female]",
    metaDescription: "Undangan Pernikahan [Male] & [Female]. Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.",
    metaKeywords: "undangan pernikahan, wedding invitation, [Male], [Female], pernikahan digital",
    
    openGraph: {
      title: "The Wedding of [Male] & [Female]",
      description: "Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.",
      image: "./images/galery/portrait/8.webp",
      url: "https://bahagiakita.my.id/",
      type: "website"
    },
    
    twitter: {
      card: "summary_large_image",
      title: "The Wedding of [Male] & [Female]",
      description: "Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.",
      image: "./images/galery/portrait/8.webp"
    },
    
    favicon: "./images/logo/logo.png"
  },

  // ==================== COUPLE INFORMATION ====================
  male: {
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

  female: {
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

  // ==================== DOA SECTION ====================
  doa: {
    enabled: true,
    ayat: {
      arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
      translation: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
      source: "Q.S Ar-Rum : 21"
    }
  },

  // ==================== EVENT DETAILS ====================
  events: {
    akadNikah: {
      enabled: true,
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
      enabled: true,
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
      enabled: true,
      title: "Live Streaming",
      description: "Temui kami secara virtual untuk menyaksikan acara pernikahan kami yang insyaaAllah akan disiarkan langsung melalui link dibawah ini.",
      link: "https://www.youtube.com/live/YOUR_LIVE_STREAM_ID", // Ganti dengan link streaming platform Anda (YouTube Live, Instagram Live, dll)
      buttonText: "Lihat live Streaming"
    }
  },

  // ==================== DRESS CODE & THEME ====================
  dressCode: {
    enabled: false,
    theme: "Garden Wedding",
    colors: ["#E8B4B8", "#C9A9A6", "#8B7D7B"],
    recommendations: {
      men: "Batik atau Kemeja Formal (warna pastel)",
      women: "Dress atau Kebaya (hindari warna putih)",
      note: "Mohon menghindari warna hitam dan putih"
    },
    inspirationImages: [
      "./images/dresscode/men-example.webp",
      "./images/dresscode/women-example.webp"
    ]
  },

  // ==================== PROTOKOL KESEHATAN & ATURAN ACARA ====================
  protocols: {
    enabled: false,
    healthProtocols: [
      "Tamu diharapkan dalam kondisi sehat",
      "Tersedia hand sanitizer di lokasi",
      "Patuhi protokol kesehatan yang berlaku"
    ],
    eventRules: [
      "Mohon tiba 15 menit sebelum acara dimulai",
      "Harap mematikan suara ponsel selama akad",
      "Dilarang membawa bunga atau kado berukuran besar"
    ],
    parkingInfo: {
      available: true,
      location: "Basement Hotel Santika",
      capacity: "200 mobil",
      valetService: true
    }
  },

  // ==================== LOVE STORY ====================
  loveStory: {
    enabled: true,
    stories: [
      {
        showImage: true,
        image: "./images/galery/landscape/2.webp",
        title: "💜 Awal Pertemuan Sederhana",
        description: "Berawal dari tempat pekerjaan Cianjur-2023, kami mengenal satu sama lain dan belum ada benih cinta kala itu, hanya sebatas teman kerja."
      },
      {
        showImage: true,
        image: "./images/galery/landscape/3.webp",
        title: "💞 Benih Cinta dalam Ujian",
        description: "Setelah cukup mengenal satu sama lain, satu tahun kurang lebih nya kami menjalin hubungan. Akhirnya kita memutuskan untuk melanjutkan ke Hubungan yang lebih serius mempertemukan kedua keluarga."
      },
      {
        showImage: true,
        image: "./images/galery/landscape/4.webp",
        title: "💍 Langkah Menuju Ridha Allah",
        description: "Sampai tanggal ini kami melaksanakan akad terlebih dahulu dan akhirnya kami mengubah status hingga menjadi pasangan suami istri. Semoga allah swt. Memberikan keberkahan pernikahan ini. AMIN"
      }
    ]
  },

  // ==================== GALLERY ====================
  gallery: {
    enabled: true,
    title: "Our Moment",
    showYoutubeVideo: true,
    youtubeVideo: "https://www.youtube.com/embed/j1xQzsrorVQ?si=q-iyRzsdq3fAJ2_a", // Ganti dengan link YouTube Anda
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
    enabled: true,
    title: "Wedding Gift",
    description: "Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.",
    bankAccounts: [
      {
        enabled: true,
        bank: "BCA",
        accountName: "Muhammad Aprianto",
        accountNumber: "1234567890",
        logo: "./images/bank/bca.png"
      },
      {
        enabled: true,
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
    enabled: true,
    title: "Ucapan & RSVP",
    description: "Berikan ucapan terbaik untuk kami",
    whatsappNumber: "6281234567890", // Format: 62xxx (tanpa +)
    whatsappMessage: "Halo, saya ingin konfirmasi kehadiran untuk acara pernikahan Rian & Nisa",
    formEndpoint: "https://your-backend-endpoint.com/rsvp" // Ganti dengan endpoint Anda
  },
  
  // ==================== SUPABASE CONFIGURATION ====================
  supabase: {
    enabled: true, // Set false untuk disable integrasi Supabase
    url: "https://btxznwjdpirejzqbeabp.supabase.co", // URL proyek Supabase Anda (contoh: https://xxxxx.supabase.co)
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0eHpud2pkcGlyZWp6cWJlYWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5MzY3OTgsImV4cCI6MjA4MzUxMjc5OH0.YL_sFX5xPa_HYW_3oftEyPRcW3EPT2TANTbqRGf4Zjs", // Anon/Public key dari Supabase project settings
    tableName: "template_utama" // Nama tabel untuk menyimpan pesan tamu
  },

  // ==================== THANK YOU ====================
  thankYou: {
    title: "Terima Kasih",
    message: "Kehadiran dan doa restu dari Anda adalah hadiah terindah bagi kami. Semoga kita semua selalu dalam lindungan Allah SWT.",
    closing: "Hormat Kami Yang Mengundang",
    // Note: Couple names auto-generated from male.nickname & female.nickname
  },

  // ==================== MUSIC ====================
  music: {
    file: "./audio/background-music.mp3",
    autoplay: true
  },

  // ==================== SOCIAL MEDIA ====================
  socialMedia: {
    instagram: {
      male: "@muahmandaprianto",
      female: "@anisariskifirmani"
    },
    hashtag: "#RianNisaWedding"
  }
};

// Export untuk digunakan di script lain
if (typeof module !== 'undefined' && module.exports) {
  module.exports = weddingConfig;
}
