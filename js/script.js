document.addEventListener("DOMContentLoaded", () => {
  // Prevent scroll saat landing page aktif
  document.body.style.overflow = "hidden";
  const mainContainer = document.getElementById("main-container");
  if (mainContainer) {
    mainContainer.style.overflow = "hidden";
  }

  // Mengambil elemen-elemen DOM utama yang akan digunakan
  const openInviteBtn = document.getElementById("open-invite-btn");
  const landingPage = document.getElementById("landing-page");
  const mainInvitePage = document.getElementById("main-invite-page");
  const mainScrollContainer = mainInvitePage; // Menggunakan mainInvitePage sebagai container scroll

  // Pastikan main-invite-page benar-benar tersembunyi saat landing page aktif
  if (mainInvitePage) {
    mainInvitePage.style.display = "none";
    mainInvitePage.style.visibility = "hidden";
    mainInvitePage.style.opacity = "0";
    mainInvitePage.style.pointerEvents = "none";
    mainInvitePage.style.zIndex = "2";
  }

  // Pastikan navbar tersembunyi di awal
  const mainNavbar = document.getElementById("main-navbar");
  if (mainNavbar) {
    mainNavbar.style.display = "none";
  }

  // Mengambil elemen-elemen terkait musik
  const backgroundMusic = document.getElementById("background-music");
  const musicControls = document.getElementById("music-controls");
  const musicToggleButton = document.getElementById("music-toggle-btn");
  const musicIcon = document.getElementById("music-icon");
  
  // Flag untuk track apakah sudah scroll
  let hasScrolled = false;
  let musicControlsShown = false;

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
    const mainContainer = document.getElementById("main-container");

    openInviteBtn.addEventListener("click", (e) => {
      // Prevent default dan stop propagation
      e.preventDefault();
      e.stopPropagation();

      // Menyembunyikan halaman awal dengan transisi
      landingPage.classList.remove("opacity-100");
      landingPage.classList.add("opacity-0");
      landingPage.addEventListener(
        "transitionend",
        () => {
          // Setelah transisi selesai, sembunyikan sepenuhnya dan aktifkan halaman utama
          landingPage.classList.add("pointer-events-none");
          landingPage.classList.add("hidden");
          landingPage.style.zIndex = "0";
          landingPage.style.display = "none";

          // Menampilkan halaman utama undangan
          mainInvitePage.classList.remove("hidden");
          mainInvitePage.style.display = "block";
          mainInvitePage.style.visibility = "visible";
          mainInvitePage.style.position = "relative";
          mainInvitePage.style.width = "100%";
          mainInvitePage.style.height = "auto";
          mainInvitePage.style.opacity = "1";
          mainInvitePage.style.pointerEvents = "auto";
          mainInvitePage.style.zIndex = "2";

          // Pastikan semua wedding-section terlihat
          const allSections = mainInvitePage.querySelectorAll(".wedding-section");
          allSections.forEach((section) => {
            section.style.display = "block";
            section.style.visibility = "visible";
            section.style.opacity = "1";
            section.style.position = "relative";
            section.style.zIndex = "0";
            section.classList.remove("hidden");
          });

          // Pastikan welcome-section terlihat khusus
          const welcomeSection = document.getElementById("welcome-section");
          if (welcomeSection) {
            welcomeSection.style.display = "block";
            welcomeSection.style.visibility = "visible";
            welcomeSection.style.opacity = "1";
            welcomeSection.style.position = "relative";
            welcomeSection.style.zIndex = "0";
            welcomeSection.style.minHeight = "100vh";
            welcomeSection.classList.remove("hidden");
          }

          // Enable scroll kembali
          document.body.style.overflow = "";

          // Aktifkan scroll pada container - ini yang akan di-scroll
          if (mainContainer) {
            // Ubah overflow container menjadi auto agar scroll bisa bekerja
            mainContainer.style.overflow = "auto";
            mainContainer.style.overflowY = "auto";
            mainContainer.style.overflowX = "hidden";
            mainContainer.style.height = "100vh";
            mainContainer.style.webkitOverflowScrolling = "touch"; // Untuk smooth scroll di mobile
          }

          // Pastikan main-invite-page dalam flow normal
          mainInvitePage.style.overflowY = "visible"; // Biarkan container yang handle scroll
          mainInvitePage.style.overflowX = "hidden";
          mainInvitePage.style.position = "relative"; // Ubah ke relative agar section dalam flow normal
          mainInvitePage.style.width = "100%";
          mainInvitePage.style.height = "auto"; // Biarkan tinggi mengikuti konten

          // Trigger reflow untuk memastikan transisi berjalan
          void mainInvitePage.offsetWidth;

          // Fade in main invite page
          mainInvitePage.classList.remove("opacity-0");
          mainInvitePage.classList.remove("pointer-events-none");
          mainInvitePage.classList.add("opacity-100");
          mainInvitePage.style.pointerEvents = "auto";

          // Scroll ke welcome section setelah transisi selesai
          setTimeout(() => {
            // Force reflow
            void mainContainer.offsetHeight;
            void mainInvitePage.offsetHeight;

            const welcomeSection = document.getElementById("welcome-section");
            if (welcomeSection && mainContainer) {
              // Scroll container ke welcome section
              const containerRect = mainContainer.getBoundingClientRect();
              const sectionRect = welcomeSection.getBoundingClientRect();
              const scrollTop =
                mainContainer.scrollTop + (sectionRect.top - containerRect.top);

              mainContainer.scrollTo({
                top: scrollTop,
                behavior: "smooth",
              });
            } else if (mainContainer) {
              mainContainer.scrollTo(0, 0);
            }
          }, 300);

          // Inisialisasi AOS (Animasi saat Scroll) dan refresh posisi
          if (typeof AOS !== "undefined") {
            AOS.init({}); // Inisialisasi AOS
            AOS.refresh(); // Memindai ulang elemen-elemen AOS yang baru terlihat
          }

          // Mulai memutar lagu
          playMusic();
          
          // Tampilkan kontrol musik setelah 5 detik (tanpa animasi slide)
          setTimeout(() => {
            if (!hasScrolled && !musicControlsShown) {
              musicControls.classList.remove("opacity-0", "pointer-events-none", "translate-x-full");
              musicControls.classList.add("opacity-100", "pointer-events-auto");
              musicControls.style.transform = "translateX(0)";
              musicControlsShown = true;
            }
          }, 5000);

          // Menampilkan navbar setelah halaman utama terbuka
          const mainNavbar = document.getElementById("main-navbar");
          if (mainNavbar) {
            setTimeout(() => {
              mainNavbar.style.display = "block";
              mainNavbar.style.opacity = "1";
              mainNavbar.style.pointerEvents = "auto";
            }, 500);
          }

          // Inisialisasi status aktif navbar setelah halaman utama terbuka
          const initialHash = window.location.hash.substring(1);
          if (initialHash && document.getElementById(initialHash)) {
            addActiveClass(initialHash);
          } else {
            addActiveClass("welcome-section"); // Default ke welcome-section
            history.replaceState(null, "", "#welcome-section");
          }
          
          // Pastikan gift button listener terpasang setelah halaman utama terbuka
          setTimeout(() => {
            attachDirectGiftButtonListener();
          }, 500);
          
          setTimeout(() => {
            attachDirectGiftButtonListener();
          }, 1500);
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

  // Logic untuk menampilkan music controls dengan animasi saat scroll
  const mainContainerForScroll = document.getElementById("main-container");
  if (mainContainerForScroll && musicControls) {
    mainContainerForScroll.addEventListener("scroll", () => {
      if (!hasScrolled) {
        hasScrolled = true;
      }
      
      // Tampilkan music controls dengan animasi slide dari kanan saat scroll
      if (!musicControlsShown) {
        musicControls.classList.remove("opacity-0", "pointer-events-none", "translate-x-full");
        musicControls.classList.add("opacity-100", "pointer-events-auto", "music-controls-visible");
        musicControls.style.transform = "translateX(0)";
        musicControlsShown = true;
      }
    }, { passive: true });
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
      e.preventDefault();
      const targetId = this.getAttribute("data-target-id");
      const targetSection = document.getElementById(targetId);
      const mainContainer = document.getElementById("main-container");

      if (targetSection && mainContainer) {
        // Hitung posisi scroll relatif ke container
        const containerRect = mainContainer.getBoundingClientRect();
        const sectionRect = targetSection.getBoundingClientRect();
        const scrollTop = mainContainer.scrollTop + (sectionRect.top - containerRect.top);

        // Scroll ke section target
        mainContainer.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
        addActiveClass(targetId);
        // Perbarui hash URL tanpa menggulir secara instan lagi
        history.pushState(null, "", `#${targetId}`);
      }
    });
  });

  // Intersection Observer untuk memperbarui status aktif saat menggulir
  // Root observer menggunakan mainContainer karena container yang di-scroll
  const mainContainerForObserver = document.getElementById("main-container");
  const observerOptions = {
    root: mainContainerForObserver, // Menggunakan mainContainer sebagai root
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

  // Inisialisasi: Set active state untuk section yang pertama kali terlihat
  const checkInitialActive = () => {
    const mainContainer = document.getElementById("main-container");
    if (!mainContainer) return;

    // Cek section mana yang terlihat pertama kali
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const containerRect = mainContainer.getBoundingClientRect();
      const isVisible = rect.top >= containerRect.top && rect.top <= containerRect.bottom;

      if (isVisible) {
        addActiveClass(section.id);
        return;
      }
    });

    // Jika tidak ada yang terlihat, set welcome-section sebagai default
    if (!document.querySelector(".menu-item.active")) {
      addActiveClass("welcome-section");
    }
  };

  // Jalankan setelah navbar muncul
  setTimeout(() => {
    checkInitialActive();
  }, 500);
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
  // Fungsi untuk toggle gift content
  function toggleGiftContent() {
    const openGiftBtn = document.getElementById("open-gift-btn");
    const giftContent = document.getElementById("gift-content");
    
    if (!openGiftBtn || !giftContent) {
      return;
    }
    
    // Cek status saat ini berdasarkan opacity
    const currentOpacity = giftContent.style.opacity || window.getComputedStyle(giftContent).opacity;
    const isCurrentlyOpen = currentOpacity === "1" || parseFloat(currentOpacity) > 0.5;
    
    if (!isCurrentlyOpen) {
      // Tampilkan konten dengan animasi expand
      giftContent.style.maxHeight = "none";
      const height = giftContent.scrollHeight;
      giftContent.style.maxHeight = "0";
      // Trigger reflow
      void giftContent.offsetHeight;
      // Animate to full height
      giftContent.style.maxHeight = height + "px";
      giftContent.style.opacity = "1";
      
      // Ubah tombol menjadi "Close"
      openGiftBtn.innerHTML = '<i class="bi bi-x-circle mr-2"></i>Close';
    } else {
      // Sembunyikan konten dengan animasi collapse
      const currentHeight = giftContent.scrollHeight;
      giftContent.style.maxHeight = currentHeight + "px";
      // Trigger reflow
      void giftContent.offsetHeight;
      giftContent.style.maxHeight = "0";
      giftContent.style.opacity = "0";
      
      // Ubah tombol menjadi "Open"
      openGiftBtn.innerHTML = '<i class="bi bi-gift mr-2"></i>Open';
    }
  }
  
  // Event listener untuk tombol Open - menggunakan event delegation
  document.addEventListener('click', function(e) {
    const clickedElement = e.target;
    let targetButton = null;
    
    // Cek apakah yang diklik adalah tombol open-gift-btn atau child element-nya
    if (clickedElement && clickedElement.id === 'open-gift-btn') {
      targetButton = clickedElement;
    } else if (clickedElement && clickedElement.closest) {
      targetButton = clickedElement.closest('#open-gift-btn');
    }
    
    if (targetButton) {
      e.preventDefault();
      e.stopPropagation();
      toggleGiftContent();
    }
  }, true);
  
  // Juga pasang event listener langsung pada button setelah elemen tersedia
  function attachDirectGiftButtonListener() {
    const openGiftBtn = document.getElementById("open-gift-btn");
    if (openGiftBtn) {
      // Hapus event listener lama dengan clone element
      const newBtn = openGiftBtn.cloneNode(true);
      openGiftBtn.parentNode.replaceChild(newBtn, openGiftBtn);
      
      // Pasang event listener baru
      newBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleGiftContent();
      };
      
      newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleGiftContent();
      }, { once: false, capture: false });
      
      // Pastikan z-index dan pointer-events
      newBtn.style.zIndex = '30';
      newBtn.style.position = 'relative';
      newBtn.style.pointerEvents = 'auto';
      newBtn.style.cursor = 'pointer';
    }
  }
  
  // Coba pasang event listener saat DOM ready
  attachDirectGiftButtonListener();
  
  const giftSection = document.getElementById("gift-section");

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
          notifRekening.classList.add("block");
          notifRekening.textContent = "Nomor berhasil disalin!";
          setTimeout(() => {
            notifRekening.classList.add("hidden");
            notifRekening.classList.remove("block");
          }, 2000);
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
        notifDana.classList.add("block");
        notifDana.textContent = "Nomor berhasil disalin!";
        setTimeout(() => {
          notifDana.classList.add("hidden");
          notifDana.classList.remove("block");
        }, 2000);
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
