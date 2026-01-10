// Countdown Timer untuk Hari Pernikahan
document.addEventListener('DOMContentLoaded', function() {
  function updateCountdown() {
    // Ambil tanggal dari konfigurasi
    const countdownDateStr = weddingConfig?.welcome?.countdownDate;
    
    if (!countdownDateStr) {
      console.error('Countdown date not found in weddingConfig');
      return;
    }

    // Parse tanggal pernikahan dari config
    const weddingDate = new Date(countdownDateStr).getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (distance < 0) {
      // Jika tanggal sudah lewat
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    // Hitung waktu tersisa
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update tampilan
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Update countdown setiap detik
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
