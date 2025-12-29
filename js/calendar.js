// Save to Date Button Functionality
document.addEventListener('DOMContentLoaded', function() {
  const saveToDateBtn = document.getElementById('save-to-date-btn');
  if (saveToDateBtn) {
    saveToDateBtn.addEventListener('click', function() {
      // Tanggal pernikahan: 28 Desember 2025, 08:00 WIB
      const weddingDate = new Date('2025-12-28T08:00:00+07:00');
      
      // Format tanggal untuk Google Calendar
      const formatDate = (date) => {
        return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
      };
      
      const startDate = formatDate(weddingDate);
      const endDate = formatDate(new Date(weddingDate.getTime() + 8 * 60 * 60 * 1000)); // 8 jam kemudian
      
      // Detail event
      const title = encodeURIComponent('Pernikahan Rian & Nisa');
      const details = encodeURIComponent('Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami.');
      const location = encodeURIComponent('Menara 165, Jl. TB Simatupang Jakarta Selatan');
      
      // Google Calendar URL
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
      
      // Buka Google Calendar
      window.open(googleCalendarUrl, '_blank');
    });
  }
});
