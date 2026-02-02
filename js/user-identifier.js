// User Identification System for RSVP Messages
// Uses localStorage to track message ownership

/**
 * Generate a unique user ID (UUID v4)
 * @returns {string} UUID string
 */
function generateUserId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get or create user ID from localStorage
 * @returns {string} User ID
 */
function getUserId() {
  let userId = localStorage.getItem("wedding_user_id");
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem("wedding_user_id", userId);
  }
  return userId;
}

/**
 * Check if current user owns a message
 * @param {string} messageUserId - The user_id from the message
 * @returns {boolean} True if current user owns the message
 */
function isMessageOwner(messageUserId) {
  // If message has no user_id (old messages), it's not owned by anyone
  if (!messageUserId) {
    return false;
  }
  return messageUserId === getUserId();
}

// Initialize user ID on page load
document.addEventListener("DOMContentLoaded", function () {
  getUserId();
});
