// js/script_form.js
// Form submission handler for RSVP form

document.addEventListener("DOMContentLoaded", function () {
  const rsvpForm = document.getElementById("rsvp-form");
  const guestMessagesContainer = document.getElementById("guest-messages");
  const notificationPopup = document.getElementById("notification-popup");
  const notificationMessage = document.getElementById("notification-message");
  const notificationIcon = document.getElementById("notification-icon");
  const closeNotificationBtn = document.getElementById("close-notification");

  // Load existing messages
  loadGuestMessages();

  // Form submission handler
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const guestName = document.getElementById("guest-name").value.trim();
      const attendance = document.getElementById("attendance").value;
      const message = document.getElementById("message").value.trim();

      // Validation
      let isValid = true;
      const guestNameError = document.getElementById("guest-name-error");
      const attendanceError = document.getElementById("attendance-error");

      // Reset errors
      if (guestNameError) guestNameError.classList.add("hidden");
      if (attendanceError) attendanceError.classList.add("hidden");

      // Validate name
      if (!guestName) {
        if (guestNameError) {
          guestNameError.classList.remove("hidden");
        }
        isValid = false;
      }

      // Validate attendance
      if (!attendance) {
        if (attendanceError) {
          attendanceError.classList.remove("hidden");
        }
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // Submit to Supabase if available
      if (window.supabaseClient) {
        // Loading State
        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Kirim Pesan';
        
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="bi bi-arrow-repeat animate-spin mr-2"></i>Mengirim...';
          submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
        }

        try {
          const { data, error } = await window.supabaseClient
            .from("guest_messages")
            .insert([
              {
                guest_name: guestName,
                attendance: attendance,
                message: message || null,
                created_at: new Date().toISOString(),
              },
            ])
            .select();

          if (error) {
            throw error;
          }

          // Show success notification
          showNotification("Terima kasih! Pesan Anda telah terkirim.", "success");
          
          // Reset form
          rsvpForm.reset();
          
          // Reload messages
          loadGuestMessages();
        } catch (error) {
          console.error("Error submitting form:", error);
          showNotification("Maaf, terjadi kesalahan. Silakan coba lagi.", "error");
        } finally {
          // Restore Button State
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
          }
        }
      } else {
        // Fallback: just show notification if Supabase is not configured
        showNotification("Terima kasih! Pesan Anda telah terkirim.", "success");
        rsvpForm.reset();
      }
    });
  }

  // Load guest messages from Supabase
  async function loadGuestMessages() {
    if (!window.supabaseClient || !guestMessagesContainer) {
      return;
    }

    try {
      const { data, error } = await window.supabaseClient
        .from("guest_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        guestMessagesContainer.innerHTML = "";
        data.forEach((msg) => {
          const messageDiv = document.createElement("div");
          messageDiv.className =
            "bg-white p-4 rounded-lg shadow-md border border-gray-200";
          
          const attendanceBadge =
            msg.attendance === "hadir"
              ? '<span class="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">Hadir</span>'
              : '<span class="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">Tidak Hadir</span>';

          messageDiv.innerHTML = `
            <div class="flex items-start justify-between mb-2">
              <p class="font-semibold text-gray-800">${escapeHtml(msg.guest_name)}</p>
              ${attendanceBadge}
            </div>
            ${msg.message ? `<p class="text-gray-700 text-sm mt-2">${escapeHtml(msg.message)}</p>` : ""}
            <p class="text-xs text-gray-500 mt-2">${formatDate(msg.created_at)}</p>
          `;
          guestMessagesContainer.appendChild(messageDiv);
        });
      } else {
        guestMessagesContainer.innerHTML =
          '<p class="text-gray-500 text-center py-4">Belum ada pesan dari tamu lain.</p>';
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      if (guestMessagesContainer) {
        guestMessagesContainer.innerHTML =
          '<p class="text-gray-500 text-center py-4">Gagal memuat pesan.</p>';
      }
    }
  }

  // Show notification popup
  function showNotification(message, type = "success") {
    if (!notificationPopup || !notificationMessage || !notificationIcon) {
      return;
    }

    notificationMessage.textContent = message;

    // Set icon based on type
    if (type === "success") {
      notificationIcon.innerHTML =
        '<i class="bi bi-check-circle-fill text-green-500 text-5xl"></i>';
    } else {
      notificationIcon.innerHTML =
        '<i class="bi bi-x-circle-fill text-red-500 text-5xl"></i>';
    }

    // Show popup
    notificationPopup.classList.remove("hidden");
    notificationPopup.classList.add("flex");
    setTimeout(() => {
      const popupContent = notificationPopup.querySelector("div > div");
      if (popupContent) {
        popupContent.classList.remove("scale-95", "opacity-0");
        popupContent.classList.add("scale-100", "opacity-100");
      }
    }, 10);

    // Auto close after 3 seconds
    setTimeout(() => {
      closeNotification();
    }, 3000);
  }

  // Close notification
  function closeNotification() {
    if (!notificationPopup) return;
    const popupContent = notificationPopup.querySelector("div > div");
    if (popupContent) {
      popupContent.classList.remove("scale-100", "opacity-100");
      popupContent.classList.add("scale-95", "opacity-0");
    }
    setTimeout(() => {
      notificationPopup.classList.add("hidden");
      notificationPopup.classList.remove("flex");
    }, 300);
  }

  // Close button handler
  if (closeNotificationBtn) {
    closeNotificationBtn.addEventListener("click", closeNotification);
  }

  // Helper function to escape HTML
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Helper function to format date
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("id-ID", options);
  }
});

