// js/script_form.js
// Form submission handler for RSVP form

document.addEventListener("DOMContentLoaded", function () {
  const rsvpForm = document.getElementById("rsvp-form");
  const guestMessagesContainer = document.getElementById("guest-messages");
  const notificationPopup = document.getElementById("notification-popup");
  const notificationMessage = document.getElementById("notification-message");
  const notificationIcon = document.getElementById("notification-icon");
  const closeNotificationBtn = document.getElementById("close-notification");
  
  // Delete confirmation dialog elements
  const deleteDialog = document.getElementById("delete-confirmation-dialog");
  const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
  const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
  let messageToDelete = null;
  
  // Edit mode state
  let editMode = false;
  let editingMessageId = null;
  
  // Pagination state
  let currentPage = 0;
  const messagesPerPage = 10;
  let hasMoreMessages = true;
  let isLoadingMore = false;

  // Character counter elements
  const messageTextarea = document.getElementById('message');
  const charCounter = document.getElementById('char-counter');
  const charWarning = document.getElementById('char-warning');
  const maxChars = 500;
  
  // Load more button
  const loadMoreBtn = document.getElementById('load-more-btn');

  // ==================== AUTO-FILL GUEST NAME FROM URL ====================
  // Get guest name from URL parameter (e.g., ?to=John%20Doe or ?name=John%20Doe)
  const urlParams = new URLSearchParams(window.location.search);
  const guestNameFromUrl = urlParams.get('to') || urlParams.get('name');
  
  if (guestNameFromUrl) {
    const guestNameInput = document.getElementById('guest-name');
    if (guestNameInput) {
      // Decode and set the guest name
      guestNameInput.value = decodeURIComponent(guestNameFromUrl);
    }
  }
  // ========================================================================

  // Load existing messages
  loadGuestMessages();
  
  // Character counter functionality
  if (messageTextarea && charCounter) {
    messageTextarea.addEventListener('input', function() {
      const length = this.value.length;
      charCounter.textContent = `${length}/${maxChars} karakter`;
      
      // Change color based on length
      if (length > maxChars * 0.9) { // 90%+ = red
        charCounter.classList.remove('text-gray-500', 'text-yellow-600');
        charCounter.classList.add('text-red-500');
        if (charWarning) charWarning.classList.remove('hidden');
      } else if (length > maxChars * 0.75) { // 75-90% = yellow
        charCounter.classList.remove('text-gray-500', 'text-red-500');
        charCounter.classList.add('text-yellow-600');
        if (charWarning) charWarning.classList.add('hidden');
      } else { // 0-75% = gray
        charCounter.classList.remove('text-yellow-600', 'text-red-500');
        charCounter.classList.add('text-gray-500');
        if (charWarning) charWarning.classList.add('hidden');
      }
    });
  }
  
  // Load more button handler
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', async function() {
      if (isLoadingMore || !hasMoreMessages) return;
      
      isLoadingMore = true;
      loadMoreBtn.disabled = true;
      loadMoreBtn.innerHTML = '<i class="bi bi-arrow-repeat animate-spin mr-2"></i>Memuat...';
      
      await loadGuestMessages(true); // true = append mode
      
      isLoadingMore = false;
      loadMoreBtn.disabled = false;
      loadMoreBtn.innerHTML = '<i class="bi bi-arrow-down-circle mr-2"></i>Muat Lebih Banyak';
    });
  }
  
  // Event delegation for edit/delete buttons
  if (guestMessagesContainer) {
    guestMessagesContainer.addEventListener('click', function(e) {
      const editBtn = e.target.closest('[data-action="edit"]');
      const deleteBtn = e.target.closest('[data-action="delete"]');
      
      if (editBtn) {
        const messageId = editBtn.dataset.messageId;
        const messageName = editBtn.dataset.messageName;
        const messageAttendance = editBtn.dataset.messageAttendance;
        const messageText = editBtn.dataset.messageText;
        startEditMode(messageId, messageName, messageAttendance, messageText);
      } else if (deleteBtn) {
        const messageId = deleteBtn.dataset.messageId;
        deleteMessage(messageId);
      }
    });
  }

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

      // Check if in edit mode
      if (editMode && editingMessageId) {
        await updateMessage(editingMessageId, guestName, attendance, message);
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
          // Get table name from config or use default
          const tableName = weddingConfig?.supabase?.tableName || "guest_messages";
          
          const { data, error } = await window.supabaseClient
            .from(tableName)
            .insert([
              {
                guest_name: guestName,
                attendance: attendance,
                message: message || null,
                user_id: getUserId(), // Add user ID for ownership tracking
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
  async function loadGuestMessages(append = false) {
    if (!window.supabaseClient || !guestMessagesContainer) {
      return;
    }

    try {
      // Get table name from config or use default
      const tableName = weddingConfig?.supabase?.tableName || "guest_messages";
      
      // Calculate range for pagination
      const start = append ? currentPage * messagesPerPage : 0;
      const end = start + messagesPerPage - 1;
      
      // Reset pagination if not appending
      if (!append) {
        currentPage = 0;
        hasMoreMessages = true;
      }
      
      const { data, error } = await window.supabaseClient
        .from(tableName)
        .select("*")
        .order("created_at", { ascending: false })
        .range(start, end);

      if (error) {
        throw error;
      }
      
      // Check if there are more messages
      if (data.length < messagesPerPage) {
        hasMoreMessages = false;
        if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
      } else {
        if (loadMoreBtn) loadMoreBtn.classList.remove('hidden');
      }
      
      // Increment page for next load
      if (append) {
        currentPage++;
      }

      if (data && data.length > 0) {
        // Clear container if not appending
        if (!append) {
          guestMessagesContainer.innerHTML = "";
        }
        
        data.forEach((msg) => {
          const messageDiv = document.createElement("div");
          messageDiv.className =
            "bg-primary-50 p-4 rounded-lg shadow-md border border-gray-200";
          messageDiv.dataset.messageId = msg.id;
          
          const attendanceBadge =
            msg.attendance === "hadir"
              ? '<span class="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">Hadir</span>'
              : '<span class="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">Tidak Hadir</span>';

          // Check if current user owns this message
          const isOwner = typeof isMessageOwner === 'function' && isMessageOwner(msg.user_id);
          const actionButtons = isOwner ? `
            <div class="flex gap-3 mt-3 pt-3 border-t border-gray-200">
              <button 
                data-action="edit"
                data-message-id="${msg.id}"
                data-message-name="${escapeHtml(msg.guest_name)}"
                data-message-attendance="${msg.attendance}"
                data-message-text="${escapeHtml(msg.message || '')}"
                class="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
              >
                <i class="bi bi-pencil-square"></i> Edit
              </button>
              <button 
                data-action="delete"
                data-message-id="${msg.id}"
                class="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
              >
                <i class="bi bi-trash"></i> Hapus
              </button>
            </div>
          ` : '';

          messageDiv.innerHTML = `
            <div class="flex items-start justify-between mb-2">
              <p class="font-semibold text-gray-800">${escapeHtml(msg.guest_name)}</p>
              ${attendanceBadge}
            </div>
            ${msg.message ? `<p class="text-gray-700 text-sm mt-2 message-text">${escapeHtml(msg.message)}</p>` : ""}
            <p class="text-xs text-gray-500 mt-2">${formatDate(msg.created_at)}</p>
            ${actionButtons}
          `;
          guestMessagesContainer.appendChild(messageDiv);
        });
      } else if (!append) {
        // Only show "no messages" if this is the initial load, not when appending
        guestMessagesContainer.innerHTML =
          '<p class="text-gray-500 text-center py-4">Belum ada pesan dari tamu lain.</p>';
      }
      // If append mode and no data, just do nothing (keep existing messages)
    } catch (error) {
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

  // Start edit mode - populate form with existing message data
  function startEditMode(messageId, name, attendance, messageText) {
    editMode = true;
    editingMessageId = messageId;
    
    // Populate form
    document.getElementById("guest-name").value = name;
    document.getElementById("attendance").value = attendance;
    document.getElementById("message").value = messageText;
    
    // Change submit button text and style
    const submitBtn = rsvpForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="bi bi-pencil-square mr-2"></i>Update Pesan';
      // Keep same button-main class for consistent styling
    }
    
    // Add cancel button if not exists
    let cancelBtn = document.getElementById('cancel-edit-btn');
    if (!cancelBtn) {
      cancelBtn = document.createElement('button');
      cancelBtn.id = 'cancel-edit-btn';
      cancelBtn.type = 'button';
      // Use same styling as main button but with gray color
      cancelBtn.className = 'w-full py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-offset-2 mt-3';
      cancelBtn.innerHTML = '<i class="bi bi-x-circle mr-2"></i>Batal Edit';
      cancelBtn.addEventListener('click', cancelEditMode);
      submitBtn.parentElement.appendChild(cancelBtn);
    }
    
    // Scroll to form
    rsvpForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  // Cancel edit mode
  function cancelEditMode() {
    editMode = false;
    editingMessageId = null;
    
    // Reset form
    rsvpForm.reset();
    
    // Restore submit button text to original (no icon, just "Kirim")
    const submitBtn = rsvpForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.innerHTML = 'Kirim';
      submitBtn.disabled = false; // Re-enable the button
    }
    
    // Remove cancel button
    const cancelBtn = document.getElementById('cancel-edit-btn');
    if (cancelBtn) {
      cancelBtn.remove();
    }
  }
  
  // Update message function
  async function updateMessage(messageId, name, attendance, messageText) {
    if (!window.supabaseClient) return;
    
    const submitBtn = rsvpForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Update Pesan';
    let updateSuccess = false; // Flag to track if update was successful
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bi bi-arrow-repeat animate-spin mr-2"></i>Mengupdate...';
    }
    
    try {
      const tableName = weddingConfig?.supabase?.tableName || "guest_messages";
      
      const { data, error } = await window.supabaseClient
        .from(tableName)
        .update({ 
          guest_name: name,
          attendance: attendance,
          message: messageText || null
        })
        .eq('id', messageId)
        .eq('user_id', getUserId())
        .select();
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        updateSuccess = true; // Mark as successful
        showNotification("Pesan berhasil diperbarui!", "success");
        cancelEditMode(); // This will reset the button
        loadGuestMessages();
      } else {
        showNotification("Gagal memperbarui pesan. Anda tidak memiliki izin.", "error");
      }
    } catch (error) {
      showNotification("Terjadi kesalahan saat memperbarui pesan.", "error");
    } finally {
      // Only restore button if update was not successful
      if (!updateSuccess && submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  }

  // Delete message function
  function deleteMessage(messageId) {
    messageToDelete = messageId;
    showDeleteConfirmation();
  }

  // Show delete confirmation dialog
  function showDeleteConfirmation() {
    if (!deleteDialog) return;
    
    deleteDialog.classList.remove("hidden");
    deleteDialog.classList.add("flex");
    setTimeout(() => {
      const dialogContent = deleteDialog.querySelector("div > div");
      if (dialogContent) {
        dialogContent.classList.remove("scale-95", "opacity-0");
        dialogContent.classList.add("scale-100", "opacity-100");
      }
    }, 10);
  }

  // Close delete confirmation dialog
  function closeDeleteConfirmation() {
    if (!deleteDialog) return;
    
    const dialogContent = deleteDialog.querySelector("div > div");
    if (dialogContent) {
      dialogContent.classList.remove("scale-100", "opacity-100");
      dialogContent.classList.add("scale-95", "opacity-0");
    }
    setTimeout(() => {
      deleteDialog.classList.add("hidden");
      deleteDialog.classList.remove("flex");
      messageToDelete = null;
    }, 300);
  }

  // Confirm delete handler
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", async function() {
      if (!messageToDelete) return;
      
      try {
        const tableName = weddingConfig?.supabase?.tableName || "guest_messages";
        
        const { data, error } = await window.supabaseClient
          .from(tableName)
          .delete()
          .eq('id', messageToDelete)
          .eq('user_id', getUserId()) // Security: only delete if user owns it
          .select();
        
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          closeDeleteConfirmation();
          showNotification("Pesan berhasil dihapus!", "success");
          loadGuestMessages();
        } else {
          closeDeleteConfirmation();
          showNotification("Gagal menghapus pesan. Anda tidak memiliki izin.", "error");
        }
      } catch (error) {
        closeDeleteConfirmation();
        showNotification("Terjadi kesalahan saat menghapus pesan.", "error");
      }
    });
  }

  // Cancel delete handler
  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener("click", closeDeleteConfirmation);
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

