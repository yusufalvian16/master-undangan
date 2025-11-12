document.addEventListener("DOMContentLoaded", () => {
  // Mengambil elemen-elemen DOM utama yang akan digunakan
  const openInviteBtn = document.getElementById("open-invite-btn");
  const landingPage = document.getElementById("landing-page");
  const mainInvitePage = document.getElementById("main-invite-page");
  const mainScrollContainer = mainInvitePage; // Menggunakan mainInvitePage sebagai container scroll

  // Mengambil elemen-elemen terkait musik
  const backgroundMusic = document.getElementById("background-music");
  const musicControls = document.getElementById("music-controls");
  const musicToggleButton = document.getElementById("music-toggle-btn");
  const musicIcon = document.getElementById("music-icon");

  // Fungsi untuk memutar musik
  const playMusic = () => {
    if (backgroundMusic) {
      backgroundMusic.play().catch((e) => {
        /* Menangani error jika autoplay gagal */
      });
      musicIcon.classList.remove("bi-play-fill");
      musicIcon.classList.add("bi-pause-fill");
    }
  };

  // Fungsi untuk menghentikan musik
  const pauseMusic = () => {
    if (backgroundMusic) {
      backgroundMusic.pause();
      musicIcon.classList.remove("bi-pause-fill");
      musicIcon.classList.add("bi-play-fill");
    }
  };

  // Logika transisi halaman awal ke halaman utama undangan
  if (openInviteBtn && landingPage && mainInvitePage) {
    openInviteBtn.addEventListener("click", () => {
      // Menyembunyikan halaman awal dengan transisi
      landingPage.classList.remove("opacity-100");
      landingPage.classList.add("opacity-0");
      landingPage.addEventListener(
        "transitionend",
        () => {
          // Setelah transisi selesai, sembunyikan sepenuhnya dan aktifkan halaman utama
          landingPage.classList.add("pointer-events-none");
          landingPage.classList.add("hidden");

          // Menampilkan halaman utama undangan
          mainInvitePage.classList.remove("opacity-0");
          mainInvitePage.classList.remove("pointer-events-none");
          mainInvitePage.classList.add("opacity-100");
          mainInvitePage.scrollTo(0, 0); // Scroll ke atas halaman utama

          // Inisialisasi AOS (Animasi saat Scroll) dan refresh posisi
          if (typeof AOS !== "undefined") {
            AOS.init({}); // Inisialisasi AOS
            AOS.refresh(); // Memindai ulang elemen-elemen AOS yang baru terlihat
          }

          // Menampilkan kontrol musik dan mulai memutar lagu
          musicControls.classList.remove("opacity-0");
          musicControls.classList.remove("pointer-events-none");
          musicControls.classList.add("opacity-100", "pointer-events-auto");
          playMusic();

          // Inisialisasi status aktif navbar setelah halaman utama terbuka
          const initialHash = window.location.hash.substring(1);
          if (initialHash && document.getElementById(initialHash)) {
            addActiveClass(initialHash);
          } else {
            addActiveClass("welcome-section"); // Default ke welcome-section
            history.replaceState(null, "", "#welcome-section");
          }
        },
        { once: true }
      );
    });
  }

  // Logika tombol play/pause musik
  if (musicToggleButton && backgroundMusic && musicIcon) {
    musicToggleButton.addEventListener("click", () => {
      if (backgroundMusic.paused) {
        playMusic();
      } else {
        pauseMusic();
      }
    });
  }

  // --- Logika Navbar Aktif (DIMULAI DI SINI) ---
  const menuItems = document.querySelectorAll(".menu-item");
  // sections diambil dari mainInvitePage karena itu adalah kontainer yang discroll
  const sections = mainInvitePage.querySelectorAll(".wedding-section"); // Menggunakan kelas yang sudah disepakati

  // Fungsi untuk menghapus kelas 'active' dari semua item menu
  const removeActiveClass = () => {
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });
  };

  // Fungsi untuk menambahkan kelas 'active' ke item menu tertentu
  const addActiveClass = (targetId) => {
    removeActiveClass();
    const activeItem = document.querySelector(
      `.menu-item[data-target-id="${targetId}"]`
    );
    if (activeItem) {
      activeItem.classList.add("active");
    }
  };

  // Gulir halus dan atur status aktif saat mengklik item menu
  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // e.preventDefault(); // Menggunakan scroll-smooth di HTML, jadi preventDefault tidak selalu diperlukan
      const targetId = this.getAttribute("data-target-id");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Gulir ke section target
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        addActiveClass(targetId);
        // Perbarui hash URL tanpa menggulir secara instan lagi
        history.pushState(null, "", `#${targetId}`);
      }
    });
  });

  // Intersection Observer untuk memperbarui status aktif saat menggulir
  // Root observer menggunakan viewport default
  const observerOptions = {
    root: null, // Menggunakan viewport
    rootMargin: "0px",
    threshold: 0.7, // Saat 70% dari bagian terlihat
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        addActiveClass(entry.target.id);
        // Perbarui hash URL saat bagian terlihat di viewport
        history.replaceState(null, "", `#${entry.target.id}`);
      }
    });
  }, observerOptions);

  // Amati setiap section
  sections.forEach((section) => {
    observer.observe(section);
  });
  // --- Logika Navbar Aktif (BERAKHIR DI SINI) ---

  // Logika tombol salin nomor rekening
  const copyButtons = document.querySelectorAll(
    'button[data-action="copy-rekening"]'
  );
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const accountNumber = button.dataset.account;
      if (accountNumber) {
        // Menyalin teks ke clipboard (metode lebih kompatibel)
        const tempInput = document.createElement("textarea");
        tempInput.value = accountNumber;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          document.execCommand("copy");
          alert("Nomor rekening berhasil disalin: " + accountNumber);
        } catch (err) {
          alert("Gagal menyalin nomor rekening. Silakan salin secara manual.");
        } finally {
          document.body.removeChild(tempInput);
        }
      }
    });
  });

  // Logika tombol Google Maps
  const googleMapsBtn = document.querySelector("button.bg-purple-600");
  if (googleMapsBtn) {
    googleMapsBtn.addEventListener("click", () => {
      window.open("https://maps.app.goo.gl/contoh-lokasi-anda", "_blank"); // Membuka tautan Maps di tab baru
    });
  }

  // Logika mengambil nama tamu dari parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  const guestNameParam = urlParams.get("to"); // Mengambil nilai dari parameter 'to' (contoh: ?to=Nama%20Tamu)
  if (guestNameParam) {
    const guestNameDisplayElements = document.querySelectorAll(
      "#main-invite-page .text-2xl.font-semibold"
    );
    guestNameDisplayElements.forEach((element) => {
      if (
        element.textContent.includes("Nama Tamu") ||
        element.textContent.trim() === ""
      ) {
        element.textContent = decodeURIComponent(
          guestNameParam.replace(/\+/g, " ")
        ); // Mengganti nama tamu di UI
      }
    });
  }

  // --- GIFT SECTION LOGIC ---
  const giftSection = document.getElementById("gift-section");
  const giftBlurOverlay = document.getElementById("gift-blur-overlay");
  const openGiftBtn = document.getElementById("open-gift-btn");
  if (openGiftBtn && giftBlurOverlay) {
    openGiftBtn.onclick = function () {
      giftBlurOverlay.style.display = "none";
    };
  }

  // Fungsi untuk membuka blur nomor rekening
  function revealRekening(rekeningId, btnId) {
    const rekeningEl = document.getElementById(rekeningId);
    const btnEl = document.getElementById(btnId);
    if (rekeningEl && btnEl) {
      rekeningEl.classList.remove("blur-sm", "select-none");
      rekeningEl.classList.add("select-all");
      btnEl.style.display = "none";
    }
  }

  // Fungsi copy rekening
  function copyToClipboard(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      const text = el.textContent;
      navigator.clipboard.writeText(text);
      showNotification("", "success");
    }
  }

  // Fungsi copy Dana
  function copyToClipboardText(text) {
    navigator.clipboard.writeText(text);
    showNotification("Nomor berhasil disalin!", "success");
  }

  // Fungsi konfirmasi WhatsApp
  function confirmGiftWA(namaBank, nomor, namaPemilik) {
    const pesan = encodeURIComponent(
      `Halo, saya sudah mengirim wedding gift via ${namaBank} (${nomor}) a.n. ${namaPemilik}.`
    );
    window.open(`https://wa.me/6281234567890?text=${pesan}`, "_blank");
  }

  // Inisialisasi tombol-tombol gift section jika ada
  if (giftSection) {
    // Blur nomor rekening di awal
    const rekeningBca = document.getElementById("rekening-bca");
    const openRekeningBtn = document.getElementById("open-rekening-btn");
    if (openRekeningBtn) {
      openRekeningBtn.onclick = function () {
        revealRekening("rekening-bca", "open-rekening-btn");
      };
    }
    // Copy rekening
    const copyRekeningBtn = document.getElementById("copy-rekening-btn");
    const notifRekening = document.getElementById("notif-rekening");
    if (copyRekeningBtn && notifRekening) {
      copyRekeningBtn.onclick = function () {
        const el = document.getElementById("rekening-bca");
        if (el) {
          navigator.clipboard.writeText(el.textContent);
          notifRekening.classList.remove("hidden");
          notifRekening.textContent = "Nomor berhasil disalin!";
          setTimeout(() => notifRekening.classList.add("hidden"), 2000);
        }
      };
    }
    // Copy Dana
    const copyDanaBtn = document.getElementById("copy-dana-btn");
    const notifDana = document.getElementById("notif-dana");
    if (copyDanaBtn && notifDana) {
      copyDanaBtn.onclick = function () {
        navigator.clipboard.writeText("081234567890");
        notifDana.classList.remove("hidden");
        notifDana.textContent = "Nomor berhasil disalin!";
        setTimeout(() => notifDana.classList.add("hidden"), 2000);
      };
    }
    // Konfirmasi WhatsApp
    const waGiftBtns = document.querySelectorAll(".wa-gift-btn");
    waGiftBtns.forEach((btn) => {
      btn.onclick = function () {
        const bank = btn.dataset.bank;
        const nomor = btn.dataset.nomor;
        const nama = btn.dataset.nama;
        confirmGiftWA(bank, nomor, nama);
      };
    });
  }
});
