document.addEventListener("DOMContentLoaded", () => {
  // Pastikan navbar selalu terlihat
  const mainNavbar = document.getElementById("main-navbar");
  if (mainNavbar) {
    mainNavbar.style.display = "block";
    mainNavbar.style.opacity = "1";
    mainNavbar.style.visibility = "visible";
    mainNavbar.style.zIndex = "99999";
    mainNavbar.style.position = "fixed";
    mainNavbar.style.bottom = "0";
    mainNavbar.style.left = "0";
    mainNavbar.style.right = "0";
  }

  // --- Logika Navbar Aktif ---
  const menuItems = document.querySelectorAll(".menu-item");
  const sections = document.querySelectorAll(".wedding-section");

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
      const scrollContainer = document.querySelector(".overflow-y-auto") || window;

      if (targetSection) {
        // Hitung posisi scroll
        const sectionRect = targetSection.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = sectionRect.top + scrollTop - 80; // 80px offset untuk navbar

        // Scroll ke section target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
        addActiveClass(targetId);
        // Perbarui hash URL tanpa menggulir secara instan lagi
        history.pushState(null, "", `#${targetId}`);
      }
    });
  });

  // Intersection Observer untuk memperbarui status aktif saat menggulir
  const observerOptions = {
    root: null, // Menggunakan viewport sebagai root
    rootMargin: "-20% 0px -20% 0px", // Trigger saat section berada di tengah viewport
    threshold: 0.3, // Saat 30% dari bagian terlihat
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

  // Set active state awal berdasarkan hash URL atau section pertama
  const initialHash = window.location.hash.substring(1);
  if (initialHash && document.getElementById(initialHash)) {
    addActiveClass(initialHash);
  } else if (sections.length > 0) {
    addActiveClass(sections[0].id);
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

  // Fungsi copy rekening
  const copyRekeningBtn = document.getElementById("copy-rekening-btn");
  const notifRekening = document.getElementById("notif-rekening");
  if (copyRekeningBtn && notifRekening) {
    copyRekeningBtn.onclick = function () {
      const el = document.getElementById("rekening-bca");
      if (el) {
        navigator.clipboard.writeText(el.textContent.trim());
        notifRekening.classList.remove("hidden");
        notifRekening.style.display = "block";
        setTimeout(() => {
          notifRekening.classList.add("hidden");
          notifRekening.style.display = "none";
        }, 2000);
      }
    };
  }

  // Fungsi copy Dana
  const copyDanaBtn = document.getElementById("copy-dana-btn");
  const notifDana = document.getElementById("notif-dana");
  if (copyDanaBtn && notifDana) {
    copyDanaBtn.onclick = function () {
      navigator.clipboard.writeText("081234567890");
      notifDana.classList.remove("hidden");
      notifDana.style.display = "block";
      setTimeout(() => {
        notifDana.classList.add("hidden");
        notifDana.style.display = "none";
      }, 2000);
    };
  }
});
