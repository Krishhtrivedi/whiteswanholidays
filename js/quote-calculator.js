/**
 * White Swan Holidays - Dynamic Trip & Package Quote Calculator
 *
 * Implements real-time luxury travel pricing, hotel tier slider controls,
 * dynamic ₹500–₹1,500 per-person agency margin calculation, 5% GST computation,
 * secure password-protected staff portal, and WhatsApp formal inquiry generation.
 * Parity-matched with com.whiteswan.pricing.QuoteCalculator.java.
 */

(function () {
  'use strict';

  // Constants & Formulas
  const GST_RATE = 0.05;
  const MIN_PROFIT = 500;
  const MAX_PROFIT = 1500;
  const WA_NUMBER = '919925811770';

  // Authorized Passkeys for Staff Margin View
  const AUTHORIZED_PASSKEYS = ['whiteswan2026', 'swan@2026', 'admin123'];

  // Hotel Category Definitions
  const HOTEL_CONFIG = {
    '3': { min: 3000, max: 4000, defaultRate: 3500, name: '3-Star Hotel', desc: 'Comfortable boutique stays & reliable amenities' },
    '4': { min: 6000, max: 7000, defaultRate: 6500, name: '4-Star Premium Hotel', desc: 'Refined comfort, central locations & breakfast' },
    '5': { min: 9000, max: 10000, defaultRate: 9500, name: '5-Star Luxury Resort', desc: 'Bespoke hospitality, panoramic suites & spa' }
  };

  // Itinerary Tier Definitions
  const ITINERARY_CONFIG = {
    'basic': { rate: 1200, marginMod: 50, name: 'Basic Sightseeing & Transfers', desc: 'Airport transfers & primary landmarks' },
    'curated': { rate: 2500, marginMod: 150, name: 'Curated Leisure Itinerary', desc: 'Private guides, experiential dining & entry tickets' },
    'premium': { rate: 4500, marginMod: 300, name: 'Premium / Corporate MICE', desc: 'VIP access, bespoke banquets & dedicated concierge' }
  };

  // Client Profile Definitions
  const CLIENT_CONFIG = {
    'repeat': { base: 550, name: 'Repeat / Referral Client' },
    'standard': { base: 800, name: 'Standard Client' },
    'corporate': { base: 1100, name: 'Corporate / VIP Client' }
  };

  // Route / Flight Fare Presets
  const ROUTE_PRESETS = [
    { label: 'Short Domestic', destination: 'Goa / Udaipur / Rajasthan', flight: 4500, nights: 3, tier: 'basic', star: '3' },
    { label: 'Metro / Long Domestic', destination: 'Kashmir / Kerala / Leh-Ladakh', flight: 7500, nights: 5, tier: 'curated', star: '4' },
    { label: 'International / MICE', destination: 'Dubai / Thailand / Bali / Singapore', flight: 18000, nights: 5, tier: 'curated', star: '4' },
    { label: 'Luxury Long-Haul', destination: 'Switzerland / Japan / Australia', flight: 45000, nights: 7, tier: 'premium', star: '5' }
  ];

  // State
  const state = {
    destination: 'Kashmir Paradise',
    travelDates: '',
    guests: 2,
    nights: 5,
    rooms: 1,
    manualRoomsOverride: false,
    flightFarePerPerson: 7500,
    hotelStar: '4',
    roomRate: 6500,
    itineraryTier: 'curated',
    clientProfile: 'standard',
    staffAuthenticated: false
  };

  // Check existing session auth safely
  try {
    state.staffAuthenticated = (sessionStorage.getItem('wsh_staff_auth') === 'true');
  } catch (e) {
    state.staffAuthenticated = false;
  }

  // Helper: Format INR currency
  function formatINR(amount) {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
  }

  // Calculate dynamic profit per person strictly clamped in [500, 1500]
  function computeDynamicProfit(profileKey, nights, tierKey) {
    const base = CLIENT_CONFIG[profileKey]?.base || 800;

    let durationMod = 50;
    if (nights > 10) {
      durationMod = 350;
    } else if (nights >= 7) {
      durationMod = 250;
    } else if (nights >= 4) {
      durationMod = 150;
    }

    const tierMod = ITINERARY_CONFIG[tierKey]?.marginMod || 150;
    const rawProfit = base + durationMod + tierMod;

    // Strict clamp [500, 1500]
    return Math.max(MIN_PROFIT, Math.min(MAX_PROFIT, rawProfit));
  }

  // Calculate complete quotation
  function calculateQuote() {
    const guests = Math.max(1, parseInt(state.guests, 10) || 1);
    const nights = Math.max(1, parseInt(state.nights, 10) || 1);

    // Auto-suggest rooms if not manually overridden
    if (!state.manualRoomsOverride) {
      state.rooms = Math.max(1, Math.ceil(guests / 2));
    }
    const rooms = Math.max(1, parseInt(state.rooms, 10) || 1);

    // Clamp room rate within star category range
    const hotelConf = HOTEL_CONFIG[state.hotelStar] || HOTEL_CONFIG['4'];
    const effectiveRoomRate = Math.max(hotelConf.min, Math.min(hotelConf.max, state.roomRate || hotelConf.defaultRate));

    // Flight total
    const flightFare = Math.max(0, parseFloat(state.flightFarePerPerson) || 0);
    const flightsTotal = flightFare * guests;

    // Hotel total
    const hotelTotal = effectiveRoomRate * rooms * nights;

    // Itinerary total
    const itinRate = ITINERARY_CONFIG[state.itineraryTier]?.rate || 2500;
    const itineraryTotal = itinRate * guests;

    // Agency Margin
    const profitPerPerson = computeDynamicProfit(state.clientProfile, nights, state.itineraryTier);
    const agencyMarginTotal = profitPerPerson * guests;

    // Subtotal
    const subtotal = flightsTotal + hotelTotal + itineraryTotal + agencyMarginTotal;

    // GST (5%)
    const gstAmount = subtotal * GST_RATE;

    // Grand Total & Per Person
    const grandTotal = subtotal + gstAmount;
    const perPersonTotal = grandTotal / guests;

    return {
      guests,
      nights,
      rooms,
      effectiveRoomRate,
      flightFare,
      flightsTotal,
      hotelTotal,
      itineraryTotal,
      profitPerPerson,
      agencyMarginTotal,
      subtotal,
      gstAmount,
      grandTotal,
      perPersonTotal,
      hotelConf
    };
  }

  // DOM Elements cache
  const el = {};

  function initElements() {
    el.destination = document.getElementById('calcDestination');
    el.travelDates = document.getElementById('calcTravelDates');
    el.guests = document.getElementById('calcGuests');
    el.guestsMinus = document.getElementById('calcGuestsMinus');
    el.guestsPlus = document.getElementById('calcGuestsPlus');
    el.nights = document.getElementById('calcNights');
    el.nightsMinus = document.getElementById('calcNightsMinus');
    el.nightsPlus = document.getElementById('calcNightsPlus');
    el.rooms = document.getElementById('calcRooms');
    el.roomsMinus = document.getElementById('calcRoomsMinus');
    el.roomsPlus = document.getElementById('calcRoomsPlus');
    el.roomsSuggestedNote = document.getElementById('roomsSuggestedNote');
    el.flightFare = document.getElementById('calcFlightFare');
    el.flightPresetShort = document.getElementById('flightPresetShort');
    el.flightPresetMetro = document.getElementById('flightPresetMetro');
    el.flightPresetInt = document.getElementById('flightPresetInt');
    el.hotelSlider = document.getElementById('hotelRateSlider');
    el.hotelSliderVal = document.getElementById('hotelSliderVal');
    el.hotelMinLbl = document.getElementById('hotelMinLbl');
    el.hotelMaxLbl = document.getElementById('hotelMaxLbl');

    // Admin / Staff Margin View
    el.adminMarginSwitch = document.getElementById('adminMarginSwitch');
    el.staffActiveTag = document.getElementById('staffActiveTag');
    el.btnExitStaffMode = document.getElementById('btnExitStaffMode');
    el.staffMarginPanel = document.getElementById('staffMarginPanel');
    el.staffFormulaText = document.getElementById('adminFormulaText');
    el.staffPerPersonVal = document.getElementById('adminPerPersonVal');
    el.btnLockStaffMode = document.getElementById('btnLockStaffMode');
    el.staffPortalBtn = document.getElementById('staffPortalBtn');
    el.staffPortalBtnText = document.getElementById('staffPortalBtnText');
    el.footerStaffLogin = document.getElementById('footerStaffLogin');

    // Staff Authentication Modal
    el.staffAuthModal = document.getElementById('staffAuthModal');
    el.staffModalClose = document.getElementById('staffModalClose');
    el.staffAuthForm = document.getElementById('staffAuthForm');
    el.staffPasskey = document.getElementById('staffPasskey');
    el.staffAuthErr = document.getElementById('staffAuthErr');
    el.togglePassVisibility = document.getElementById('togglePassVisibility');

    // Receipt Line Outputs
    el.receiptFlights = document.getElementById('receiptFlights');
    el.receiptFlightsSub = document.getElementById('receiptFlightsSub');
    el.receiptHotel = document.getElementById('receiptHotel');
    el.receiptHotelSub = document.getElementById('receiptHotelSub');
    el.receiptItinerary = document.getElementById('receiptItinerary');
    el.receiptItinerarySub = document.getElementById('receiptItinerarySub');
    el.receiptAgencyRow = document.getElementById('receiptAgencyRow');
    el.receiptAgency = document.getElementById('receiptAgency');
    el.receiptAgencySub = document.getElementById('receiptAgencySub');
    el.receiptSubtotal = document.getElementById('receiptSubtotal');
    el.receiptGst = document.getElementById('receiptGst');
    el.receiptGrandTotal = document.getElementById('receiptGrandTotal');
    el.receiptPerPerson = document.getElementById('receiptPerPerson');

    // Customer Quote Modal
    el.quoteModal = document.getElementById('quoteModal');
    el.modalClose = document.getElementById('modalClose');
    el.modalForm = document.getElementById('modalQuoteForm');
    el.btnBookFormal = document.getElementById('btnBookFormal');
    el.btnDownloadSummary = document.getElementById('btnDownloadSummary');
    el.btnCopyBreakdown = document.getElementById('btnCopyBreakdown');
    el.toast = document.getElementById('luxToast');
  }

  // Update UI with calculated values
  function updateUI() {
    const q = calculateQuote();

    // Inputs sync
    if (el.guests && el.guests.value !== String(q.guests)) el.guests.value = q.guests;
    if (el.nights && el.nights.value !== String(q.nights)) el.nights.value = q.nights;
    if (el.rooms && el.rooms.value !== String(q.rooms)) el.rooms.value = q.rooms;

    if (el.roomsSuggestedNote) {
      const autoVal = Math.max(1, Math.ceil(q.guests / 2));
      el.roomsSuggestedNote.textContent = state.manualRoomsOverride
        ? `Manual (${autoVal} auto-suggested)`
        : `Auto-suggested (${autoVal} rooms for ${q.guests} guests)`;
    }

    // Hotel slider bounds & value
    if (el.hotelSlider) {
      el.hotelSlider.min = q.hotelConf.min;
      el.hotelSlider.max = q.hotelConf.max;
      el.hotelSlider.step = 100;
      el.hotelSlider.value = q.effectiveRoomRate;
    }
    if (el.hotelSliderVal) el.hotelSliderVal.textContent = formatINR(q.effectiveRoomRate) + ' /night';
    if (el.hotelMinLbl) el.hotelMinLbl.textContent = formatINR(q.hotelConf.min);
    if (el.hotelMaxLbl) el.hotelMaxLbl.textContent = formatINR(q.hotelConf.max);

    // Sync card selections
    document.querySelectorAll('.calc-option-card').forEach(card => {
      const star = card.dataset.star;
      card.classList.toggle('selected', star === state.hotelStar);
      const rateEl = card.querySelector('.calc-card-rate');
      if (rateEl && HOTEL_CONFIG[star]) {
        rateEl.textContent = formatINR(HOTEL_CONFIG[star].defaultRate) + ' avg';
      }
    });

    document.querySelectorAll('.itinerary-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.tier === state.itineraryTier);
    });

    document.querySelectorAll('.client-pill').forEach(pill => {
      pill.classList.toggle('selected', pill.dataset.client === state.clientProfile);
    });

    // Customer Receipt Updates (Always clean & luxury formatted)
    if (el.receiptFlights) el.receiptFlights.textContent = formatINR(q.flightsTotal);
    if (el.receiptFlightsSub) {
      el.receiptFlightsSub.textContent = q.flightFare > 0
        ? `${formatINR(q.flightFare)} × ${q.guests} traveler${q.guests > 1 ? 's' : ''}`
        : 'Flights not included / self-booked';
    }

    if (el.receiptHotel) el.receiptHotel.textContent = formatINR(q.hotelTotal);
    if (el.receiptHotelSub) {
      el.receiptHotelSub.textContent = `${formatINR(q.effectiveRoomRate)} × ${q.rooms} room${q.rooms > 1 ? 's' : ''} × ${q.nights} night${q.nights > 1 ? 's' : ''}`;
    }

    if (el.receiptItinerary) el.receiptItinerary.textContent = formatINR(q.itineraryTotal);
    if (el.receiptItinerarySub) {
      el.receiptItinerarySub.textContent = `${ITINERARY_CONFIG[state.itineraryTier].name} (${formatINR(ITINERARY_CONFIG[state.itineraryTier].rate)}/pax)`;
    }

    // Customer-facing Concierge row (Transparent packaging)
    if (el.receiptAgency) el.receiptAgency.textContent = formatINR(q.agencyMarginTotal);
    if (el.receiptAgencySub) {
      el.receiptAgencySub.textContent = 'Agency Concierge, On-Ground Support & 24/7 Assistance';
    }

    // Confidential Staff Margin Panel (Visible ONLY if authenticated)
    if (el.adminMarginSwitch) {
      el.adminMarginSwitch.checked = state.staffAuthenticated;
    }
    if (el.staffActiveTag) {
      el.staffActiveTag.style.display = state.staffAuthenticated ? 'inline-flex' : 'none';
    }
    if (el.receiptAgencyRow) {
      el.receiptAgencyRow.style.display = state.staffAuthenticated ? 'flex' : 'none';
    }

    if (el.staffMarginPanel) {
      if (state.staffAuthenticated) {
        el.staffMarginPanel.style.display = 'block';
        const clientBase = CLIENT_CONFIG[state.clientProfile].base;
        let durMod = q.nights > 10 ? 350 : (q.nights >= 7 ? 250 : (q.nights >= 4 ? 150 : 50));
        const tierMod = ITINERARY_CONFIG[state.itineraryTier].marginMod;
        const totalProfitPerPax = q.profitPerPerson;
        const marginPercent = ((q.agencyMarginTotal / q.subtotal) * 100).toFixed(1);

        if (el.staffPerPersonVal) {
          el.staffPerPersonVal.textContent = `${formatINR(totalProfitPerPax)} / person (${marginPercent}% of subtotal)`;
        }
        if (el.staffFormulaText) {
          el.staffFormulaText.innerHTML = `Base (${formatINR(clientBase)}) + Duration (${formatINR(durMod)}) + Tier (${formatINR(tierMod)}) = <strong>${formatINR(clientBase + durMod + tierMod)}</strong> (Clamped [₹500, ₹1500] &rarr; <strong>${formatINR(totalProfitPerPax)}</strong>). Total Agency Net: <strong>${formatINR(q.agencyMarginTotal)}</strong>`;
        }
        if (el.staffPortalBtnText) {
          el.staffPortalBtnText.textContent = '🔒 Staff Margin View Active (Click to Lock)';
        }
      } else {
        el.staffMarginPanel.style.display = 'none';
        if (el.staffPortalBtnText) {
          el.staffPortalBtnText.textContent = 'Staff Margin Access';
        }
      }
    }

    // Totals
    if (el.receiptSubtotal) el.receiptSubtotal.textContent = formatINR(q.subtotal);
    if (el.receiptGst) el.receiptGst.textContent = formatINR(q.gstAmount);
    if (el.receiptGrandTotal) el.receiptGrandTotal.textContent = formatINR(q.grandTotal);
    if (el.receiptPerPerson) el.receiptPerPerson.textContent = `${formatINR(q.perPersonTotal)} per person`;
  }

  // Toast Helper
  function showToast(message) {
    if (!el.toast) return;
    el.toast.textContent = message;
    el.toast.classList.add('show');
    setTimeout(() => el.toast.classList.remove('show'), 3200);
  }

  // Format Quote Summary Text
  function generateQuoteSummaryText(isStaffAuthenticated) {
    const q = calculateQuote();
    const dest = el.destination?.value || state.destination || 'Custom Destination';
    const dates = el.travelDates?.value || 'Flexible / Upcoming';

    let out = `============================================================\n`;
    out += `         WHITE SWAN HOLIDAYS - TRIP QUOTE BREAKDOWN         \n`;
    out += `       We Infuse Life into Holidays · Ahmedabad & Gurugram   \n`;
    out += `============================================================\n`;
    out += `Destination : ${dest}\n`;
    out += `Dates       : ${dates}\n`;
    out += `Travelers   : ${q.guests} Guest(s) | ${q.nights} Night(s) | ${q.rooms} Room(s)\n`;
    out += `Hotel Tier  : ${q.hotelConf.name} @ ${formatINR(q.effectiveRoomRate)}/room/night\n`;
    out += `Itinerary   : ${ITINERARY_CONFIG[state.itineraryTier].name}\n`;
    out += `Client Type : ${CLIENT_CONFIG[state.clientProfile].name}\n`;
    out += `------------------------------------------------------------\n`;
    out += `1. Flights Total        : ${formatINR(q.flightsTotal)} (${formatINR(q.flightFare)} × ${q.guests})\n`;
    out += `2. Hotel Stay           : ${formatINR(q.hotelTotal)} (${formatINR(q.effectiveRoomRate)} × ${q.rooms} rms × ${q.nights} nts)\n`;
    out += `3. Sightseeing & Tours  : ${formatINR(q.itineraryTotal)} (${formatINR(ITINERARY_CONFIG[state.itineraryTier].rate)} × ${q.guests})\n`;

    // Only include margin line if authorized staff
    if (isStaffAuthenticated) {
      out += `4. Agency Profit Margin : ${formatINR(q.agencyMarginTotal)} (Confidential Staff: ${formatINR(q.profitPerPerson)}/pax, clamped [₹500,₹1500])\n`;
    } else {
      out += `4. Concierge & Logistics: ${formatINR(q.agencyMarginTotal)} (Included in Package)\n`;
    }

    out += `------------------------------------------------------------\n`;
    out += `Subtotal                : ${formatINR(q.subtotal)}\n`;
    out += `Package GST (5%)        : ${formatINR(q.gstAmount)}\n`;
    out += `============================================================\n`;
    out += `ESTIMATED GRAND TOTAL   : ${formatINR(q.grandTotal)}\n`;
    out += `PER PERSON FINAL QUOTE  : ${formatINR(q.perPersonTotal)}\n`;
    out += `============================================================\n`;
    out += `Note: Subject to hotel availability and airfare volatility at\n`;
    out += `time of reservation. Issued by White Swan Holidays Pvt Ltd.\n`;
    return out;
  }

  // Pre-fill modal details
  function openBookingModal() {
    if (!el.quoteModal) return;
    const q = calculateQuote();
    const dest = el.destination?.value || state.destination || 'Tailored Holiday';

    const modalDest = document.getElementById('modalDestPreview');
    const modalTotal = document.getElementById('modalTotalPreview');
    if (modalDest) modalDest.textContent = dest;
    if (modalTotal) modalTotal.textContent = `${formatINR(q.grandTotal)} (${formatINR(q.perPersonTotal)}/person)`;

    el.quoteModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    if (!el.quoteModal) return;
    el.quoteModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Staff Authentication Modal Controls
  function openStaffAuthModal() {
    if (!el.staffAuthModal) return;
    if (el.staffAuthErr) el.staffAuthErr.style.display = 'none';
    if (el.staffPasskey) el.staffPasskey.value = '';
    el.staffAuthModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (el.staffPasskey) el.staffPasskey.focus();
    }, 200);
  }

  function closeStaffAuthModal() {
    if (!el.staffAuthModal) return;
    el.staffAuthModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function lockStaffMode() {
    state.staffAuthenticated = false;
    try {
      sessionStorage.removeItem('wsh_staff_auth');
    } catch (e) {}
    if (el.adminMarginSwitch) el.adminMarginSwitch.checked = false;
    updateUI();
    showToast('🔒 Staff mode locked. Margin view is hidden.');
  }

  // Event Listeners Binding
  function bindEvents() {
    // Steppers
    if (el.guestsMinus) {
      el.guestsMinus.addEventListener('click', () => {
        state.guests = Math.max(1, state.guests - 1);
        if (!state.manualRoomsOverride) state.rooms = Math.max(1, Math.ceil(state.guests / 2));
        updateUI();
      });
    }
    if (el.guestsPlus) {
      el.guestsPlus.addEventListener('click', () => {
        state.guests = Math.min(200, state.guests + 1);
        if (!state.manualRoomsOverride) state.rooms = Math.max(1, Math.ceil(state.guests / 2));
        updateUI();
      });
    }
    if (el.guests) {
      el.guests.addEventListener('input', (e) => {
        state.guests = Math.max(1, parseInt(e.target.value, 10) || 1);
        if (!state.manualRoomsOverride) state.rooms = Math.max(1, Math.ceil(state.guests / 2));
        updateUI();
      });
    }

    if (el.nightsMinus) {
      el.nightsMinus.addEventListener('click', () => {
        state.nights = Math.max(1, state.nights - 1);
        updateUI();
      });
    }
    if (el.nightsPlus) {
      el.nightsPlus.addEventListener('click', () => {
        state.nights = Math.min(90, state.nights + 1);
        updateUI();
      });
    }
    if (el.nights) {
      el.nights.addEventListener('input', (e) => {
        state.nights = Math.max(1, parseInt(e.target.value, 10) || 1);
        updateUI();
      });
    }

    if (el.roomsMinus) {
      el.roomsMinus.addEventListener('click', () => {
        state.manualRoomsOverride = true;
        state.rooms = Math.max(1, state.rooms - 1);
        updateUI();
      });
    }
    if (el.roomsPlus) {
      el.roomsPlus.addEventListener('click', () => {
        state.manualRoomsOverride = true;
        state.rooms = Math.min(100, state.rooms + 1);
        updateUI();
      });
    }
    if (el.rooms) {
      el.rooms.addEventListener('input', (e) => {
        state.manualRoomsOverride = true;
        state.rooms = Math.max(1, parseInt(e.target.value, 10) || 1);
        updateUI();
      });
    }

    // Flight Fare Input & Presets
    if (el.flightFare) {
      el.flightFare.addEventListener('input', (e) => {
        state.flightFarePerPerson = Math.max(0, parseFloat(e.target.value) || 0);
        updateUI();
      });
    }
    if (el.flightPresetShort) {
      el.flightPresetShort.addEventListener('click', () => {
        state.flightFarePerPerson = 4500;
        if (el.flightFare) el.flightFare.value = 4500;
        updateUI();
      });
    }
    if (el.flightPresetMetro) {
      el.flightPresetMetro.addEventListener('click', () => {
        state.flightFarePerPerson = 7500;
        if (el.flightFare) el.flightFare.value = 7500;
        updateUI();
      });
    }
    if (el.flightPresetInt) {
      el.flightPresetInt.addEventListener('click', () => {
        state.flightFarePerPerson = 18000;
        if (el.flightFare) el.flightFare.value = 18000;
        updateUI();
      });
    }

    // Hotel Category Cards Click
    document.querySelectorAll('.calc-option-card').forEach(card => {
      card.addEventListener('click', () => {
        const star = card.dataset.star;
        if (HOTEL_CONFIG[star]) {
          state.hotelStar = star;
          state.roomRate = HOTEL_CONFIG[star].defaultRate;
          updateUI();
        }
      });
    });

    // Hotel Slider
    if (el.hotelSlider) {
      el.hotelSlider.addEventListener('input', (e) => {
        state.roomRate = parseFloat(e.target.value) || HOTEL_CONFIG[state.hotelStar].defaultRate;
        updateUI();
      });
    }

    // Itinerary Cards Click
    document.querySelectorAll('.itinerary-card').forEach(card => {
      card.addEventListener('click', () => {
        state.itineraryTier = card.dataset.tier;
        updateUI();
      });
    });

    // Client Profile Pills Click
    document.querySelectorAll('.client-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.clientProfile = pill.dataset.client;
        updateUI();
      });
    });

    // Route Presets Pills Click
    document.querySelectorAll('.route-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.route-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const idx = parseInt(pill.dataset.preset, 10);
        const preset = ROUTE_PRESETS[idx];
        if (preset) {
          if (el.destination) el.destination.value = preset.destination;
          state.destination = preset.destination;
          state.flightFarePerPerson = preset.flight;
          if (el.flightFare) el.flightFare.value = preset.flight;
          state.nights = preset.nights;
          state.itineraryTier = preset.tier;
          state.hotelStar = preset.star;
          state.roomRate = HOTEL_CONFIG[preset.star].defaultRate;
          updateUI();
        }
      });
    });

    // Customer Quote Modal Events
    if (el.btnBookFormal) {
      el.btnBookFormal.addEventListener('click', openBookingModal);
    }
    if (el.modalClose) {
      el.modalClose.addEventListener('click', closeBookingModal);
    }
    if (el.quoteModal) {
      el.quoteModal.addEventListener('click', (e) => {
        if (e.target === el.quoteModal) closeBookingModal();
      });
    }

    // Copy Quote Summary
    if (el.btnCopyBreakdown) {
      el.btnCopyBreakdown.addEventListener('click', () => {
        const text = generateQuoteSummaryText(state.staffAuthenticated);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            showToast('✓ Quote breakdown copied to clipboard!');
          }).catch(() => {
            showToast('Could not copy automatically. You can download summary instead.');
          });
        } else {
          showToast('Clipboard not accessible on this device.');
        }
      });
    }

    // Download/Print Summary
    if (el.btnDownloadSummary) {
      el.btnDownloadSummary.addEventListener('click', () => {
        const text = generateQuoteSummaryText(state.staffAuthenticated);
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `WhiteSwan_Quote_${(el.destination?.value || 'Holiday').replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('✓ Quote summary downloaded!');
      });
    }

    // Modal Form Submit -> Open WhatsApp with pre-filled formal quote
    if (el.modalForm) {
      el.modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('modalCustName')?.value.trim() || 'Valued Traveler';
        const phone = document.getElementById('modalCustPhone')?.value.trim() || '';
        const email = document.getElementById('modalCustEmail')?.value.trim() || '';
        const notes = document.getElementById('modalCustNotes')?.value.trim() || '';

        const q = calculateQuote();
        const dest = el.destination?.value || state.destination || 'Tailored Holiday';
        const dates = el.travelDates?.value || 'Upcoming dates';

        let msg = `Hello White Swan Holidays,\n\n`;
        msg += `I would like to request a formal booking quote for our upcoming holiday:\n\n`;
        msg += `• Destination: ${dest}\n`;
        msg += `• Dates: ${dates}\n`;
        msg += `• Travelers: ${q.guests} Adult(s) | ${q.nights} Night(s) | ${q.rooms} Room(s)\n`;
        msg += `• Hotel Tier: ${q.hotelConf.name} (${formatINR(q.effectiveRoomRate)}/room/night)\n`;
        msg += `• Itinerary: ${ITINERARY_CONFIG[state.itineraryTier].name}\n`;
        msg += `• Estimated Total: ${formatINR(q.grandTotal)} (${formatINR(q.perPersonTotal)} per person)\n\n`;
        msg += `Client Information:\n`;
        msg += `• Full Name: ${name}\n`;
        msg += `• Mobile: ${phone}\n`;
        if (email) msg += `• Email: ${email}\n`;
        if (notes) msg += `• Notes / Preferences: ${notes}\n`;
        msg += `\nPlease check room availability and share our finalized itinerary options.`;

        const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank', 'noopener');
        closeBookingModal();
        showToast('✓ Quote sent! Opening WhatsApp to chat with our travel concierge...');
      });
    }

    // Admin Margin View Switch Event
    if (el.adminMarginSwitch) {
      el.adminMarginSwitch.addEventListener('change', () => {
        if (el.adminMarginSwitch.checked) {
          if (!state.staffAuthenticated) {
            el.adminMarginSwitch.checked = false;
            openStaffAuthModal();
          } else {
            updateUI();
          }
        } else {
          lockStaffMode();
        }
      });
    }

    // Staff Portal & Authentication Events
    if (el.staffPortalBtn) {
      el.staffPortalBtn.addEventListener('click', () => {
        if (state.staffAuthenticated) {
          lockStaffMode();
        } else {
          openStaffAuthModal();
        }
      });
    }

    if (el.footerStaffLogin) {
      el.footerStaffLogin.addEventListener('click', openStaffAuthModal);
    }

    if (el.btnLockStaffMode) {
      el.btnLockStaffMode.addEventListener('click', lockStaffMode);
    }

    if (el.btnExitStaffMode) {
      el.btnExitStaffMode.addEventListener('click', lockStaffMode);
    }

    if (el.staffModalClose) {
      el.staffModalClose.addEventListener('click', closeStaffAuthModal);
    }

    if (el.staffAuthModal) {
      el.staffAuthModal.addEventListener('click', (e) => {
        if (e.target === el.staffAuthModal) closeStaffAuthModal();
      });
    }

    // Toggle password visibility
    if (el.togglePassVisibility) {
      el.togglePassVisibility.addEventListener('click', () => {
        if (el.staffPasskey) {
          const isPass = el.staffPasskey.type === 'password';
          el.staffPasskey.type = isPass ? 'text' : 'password';
          el.togglePassVisibility.textContent = isPass ? 'Hide' : 'Show';
        }
      });
    }

    // Staff Authentication Form Submit
    if (el.staffAuthForm) {
      el.staffAuthForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = (el.staffPasskey?.value || '').trim();
        if (AUTHORIZED_PASSKEYS.includes(pwd.toLowerCase())) {
          state.staffAuthenticated = true;
          try {
            sessionStorage.setItem('wsh_staff_auth', 'true');
          } catch (err) {}
          closeStaffAuthModal();
          updateUI();
          showToast('✓ Staff authenticated! Internal agency margin analysis unlocked.');
          const calcSec = document.getElementById('quote-calculator');
          if (calcSec) calcSec.scrollIntoView({ behavior: 'smooth' });
        } else {
          if (el.staffAuthErr) {
            el.staffAuthErr.textContent = 'Invalid passkey. Access is restricted to authorized White Swan staff.';
            el.staffAuthErr.style.display = 'block';
          }
          if (el.staffPasskey) el.staffPasskey.focus();
        }
      });
    }

    // Keyboard shortcut for staff access: Ctrl+Shift+M or Cmd+Shift+M
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'M' || e.key === 'm')) {
        e.preventDefault();
        if (state.staffAuthenticated) {
          lockStaffMode();
        } else {
          openStaffAuthModal();
        }
      }
    });

    // Global "Quote This Package" Trigger from any destination card
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-calc-dest]');
      if (trigger) {
        const destName = trigger.dataset.calcDest;
        const nights = parseInt(trigger.dataset.calcNights, 10) || 5;
        const flight = parseInt(trigger.dataset.calcFlight, 10) || 7500;
        const star = trigger.dataset.calcStar || '4';

        if (el.destination) el.destination.value = destName;
        state.destination = destName;
        state.nights = nights;
        state.flightFarePerPerson = flight;
        if (el.flightFare) el.flightFare.value = flight;
        state.hotelStar = star;
        state.roomRate = HOTEL_CONFIG[star].defaultRate;
        updateUI();

        const calcSection = document.getElementById('quote-calculator');
        if (calcSection) {
          calcSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    // Floating Quote Button Scroll
    const floatingBtn = document.getElementById('floatingQuoteBtn');
    if (floatingBtn) {
      floatingBtn.addEventListener('click', () => {
        const calcSection = document.getElementById('quote-calculator');
        if (calcSection) {
          calcSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initElements();
    bindEvents();
    updateUI();

    // Check URL hash for direct staff entry (e.g. quote.html#staff or quote.html#staffAuthModal)
    if (window.location.hash === '#staff' || window.location.hash === '#staffAuthModal' || window.location.hash === '#admin') {
      setTimeout(() => {
        if (!state.staffAuthenticated) openStaffAuthModal();
      }, 150);
    }
  });

  // Expose API for staff or unit inspection
  window.WhiteSwanQuoteCalculator = {
    calculateQuote,
    computeDynamicProfit,
    getState: () => ({ ...state }),
    setState: (newState) => {
      Object.assign(state, newState);
      updateUI();
    },
    authenticateStaff: (pwd) => {
      if (AUTHORIZED_PASSKEYS.includes(pwd.toLowerCase())) {
        state.staffAuthenticated = true;
        try { sessionStorage.setItem('wsh_staff_auth', 'true'); } catch (e) {}
        updateUI();
        return true;
      }
      return false;
    },
    lockStaffMode
  };
})();
