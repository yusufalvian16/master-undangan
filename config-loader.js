/**
 * Wedding Configuration Loader - Simplified ID-based Mapping
 * 
 * This script loads wedding data from wedding-config.js and updates
 * HTML elements based on their IDs. Much simpler than data-config approach!
 * 
 * Usage: Just add an ID to any element you want to be dynamic.
 * Example: <h1 id="couple-names">Default Name</h1>
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check if weddingConfig is loaded
  if (typeof weddingConfig === 'undefined') {
    console.error('wedding-config.js not loaded! Make sure it\'s included before config-loader.js');
    return;
  }

  // console.log('Loading wedding configuration...', weddingConfig);

  // Auto-generate couple names from nicknames
  const coupleNames = `${weddingConfig.groom.nickname} & ${weddingConfig.bride.nickname}`;

  // Helper function to safely update element
  function updateElement(id, value, attribute = 'textContent') {
    const element = document.getElementById(id);
    if (element && value !== undefined && value !== null) {
      if (attribute === 'textContent') {
        element.textContent = value;
      } else if (attribute === 'href') {
        element.setAttribute('href', value);
      } else if (attribute === 'src') {
        element.setAttribute('src', value);
      }
      // console.log(`✓ Updated #${id}:`, value);
    } else if (!element) {
      console.warn(`⚠ Element #${id} not found in HTML`);
    }
  }

  // Update meta tags
  document.title = `Undangan Pernikahan ${coupleNames}`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', `Undangan Pernikahan ${coupleNames}. Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.`);
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', `The Wedding of ${coupleNames}`);
  }
  const twitterTitle = document.querySelector('meta[property="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', `The Wedding of ${coupleNames}`);
  }

  // ==================== WELCOME SECTION ====================
  updateElement('couple-names-landing', coupleNames);
  updateElement('couple-names-landing-mobile', coupleNames);
  updateElement('couple-names-welcome', coupleNames);
  updateElement('wedding-date', weddingConfig.welcome.weddingDate);
  updateElement('welcome-message', weddingConfig.welcome.message);

  // ==================== MEMPELAI SECTION ====================
  // Groom
  updateElement('groom-fullname', weddingConfig.groom.fullName);
  updateElement('groom-child-order', weddingConfig.groom.childOrder);
  updateElement('groom-parents', `Bapak ${weddingConfig.groom.parents.father} & Ibu ${weddingConfig.groom.parents.mother}`);
  updateElement('groom-instagram', weddingConfig.groom.instagram);
  updateElement('groom-instagram-link', weddingConfig.groom.instagramLink, 'href');
  updateElement('groom-photo', weddingConfig.groom.photo, 'src');

  // Bride
  updateElement('bride-fullname', weddingConfig.bride.fullName);
  updateElement('bride-child-order', weddingConfig.bride.childOrder);
  updateElement('bride-parents', `Bapak ${weddingConfig.bride.parents.father} & Ibu ${weddingConfig.bride.parents.mother}`);
  updateElement('bride-instagram', weddingConfig.bride.instagram);
  updateElement('bride-instagram-link', weddingConfig.bride.instagramLink, 'href');
  updateElement('bride-photo', weddingConfig.bride.photo, 'src');

  // ==================== EVENT DETAILS ====================
  // Akad Nikah
  updateElement('akad-day', weddingConfig.events.akadNikah.day);
  updateElement('akad-month', weddingConfig.events.akadNikah.month);
  updateElement('akad-day-name', weddingConfig.events.akadNikah.dayName);
  updateElement('akad-time', weddingConfig.events.akadNikah.time);
  updateElement('akad-venue', weddingConfig.events.akadNikah.venue);
  updateElement('akad-address', weddingConfig.events.akadNikah.address);
  updateElement('akad-maps-link', weddingConfig.events.akadNikah.mapsLink, 'href');

  // Resepsi
  updateElement('resepsi-day', weddingConfig.events.resepsi.day);
  updateElement('resepsi-month', weddingConfig.events.resepsi.month);
  updateElement('resepsi-day-name', weddingConfig.events.resepsi.dayName);
  updateElement('resepsi-time', weddingConfig.events.resepsi.time);
  updateElement('resepsi-venue', weddingConfig.events.resepsi.venue);
  updateElement('resepsi-address', weddingConfig.events.resepsi.address);
  updateElement('resepsi-maps-link', weddingConfig.events.resepsi.mapsLink, 'href');

  // Live Streaming
  updateElement('livestream-description', weddingConfig.events.liveStreaming.description);
  updateElement('livestream-link', weddingConfig.events.liveStreaming.link, 'href');
  updateElement('livestream-button-text', weddingConfig.events.liveStreaming.buttonText);

  // ==================== GIFT SECTION ====================
  // Bank account names (a.n.)
  updateElement('gift-account-name-1', `a.n. ${coupleNames}`);
  updateElement('gift-account-name-2', `a.n. ${coupleNames}`);

  // Delivery Address
  updateElement('gift-recipient', weddingConfig.gift.deliveryAddress.recipient);
  updateElement('gift-address', weddingConfig.gift.deliveryAddress.address);
  updateElement('gift-phone', weddingConfig.gift.deliveryAddress.phone);

  // ==================== RSVP ====================
  const whatsappNumber = weddingConfig.rsvp.whatsappNumber;
  const whatsappMessage = encodeURIComponent(weddingConfig.rsvp.whatsappMessage);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  updateElement('rsvp-whatsapp-link', whatsappLink, 'href');

  // ==================== THANK YOU ====================
  updateElement('thankyou-message', weddingConfig.thankYou.message);
  updateElement('thankyou-couple-names', coupleNames);

  // ==================== COUNTDOWN TIMER ====================
  // Update countdown target date
  if (weddingConfig.welcome.countdownDate) {
    const countdownDate = new Date(weddingConfig.welcome.countdownDate).getTime();
    
    // Update countdown every second
    const countdownInterval = setInterval(function() {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(countdownInterval);
        updateElement('days', '00');
        updateElement('hours', '00');
        updateElement('minutes', '00');
        updateElement('seconds', '00');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      updateElement('days', String(days).padStart(2, '0'));
      updateElement('hours', String(hours).padStart(2, '0'));
      updateElement('minutes', String(minutes).padStart(2, '0'));
      updateElement('seconds', String(seconds).padStart(2, '0'));
    }, 1000);
  }

  // console.log('✓ Wedding configuration loaded successfully!');
});
