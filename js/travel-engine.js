/**
 * White Swan Holidays - Travel Engine & Shared Data Architecture
 * Powers "The Iceland Travel Website" aesthetic:
 * Destination catalog, dynamic story renderer, flight route engine,
 * scroll reveal observer, and circular flight button micro-animations.
 */

(function () {
  'use strict';

  // Centralized Destination Store
  const DESTINATIONS = [
    {
      slug: 'iceland-glaciers',
      title: 'Iceland Glaciers & Northern Lights',
      region: 'Nordic Arctic',
      category: 'glacial',
      coords: "64°08'N 21°56'W",
      elevation: '840m ASL',
      climate: 'Arctic Marine',
      temp: '-3°C to 4°C',
      bestSeason: 'October – March (Peak Aurora)',
      duration: '7 Days / 6 Nights',
      flightTime: '9h 40m via Helsinki/London',
      airportCode: 'KEF (Reykjavik)',
      startingPrice: 125000,
      heroImage: 'img/banner-1.jpg',
      gallery: ['img/banner-1.jpg', 'img/banner-2.jpg', 'img/international/new-zeland.jpg'],
      tagline: 'Black basalt volcanic beaches, blue ice caverns, and celestial aurora ribbons.',
      overview: 'Experience the raw geological power of the North Atlantic. From the geothermal mists of the Blue Lagoon to the calving icebergs of Jökulsárlón glacier lagoon, this expedition puts you in private luxury 4x4 super-jeeps with expert glaciologists and aurora trackers.',
      highlights: [
        'Private night expedition into Vatnajökull crystal blue ice caves with crampon gear.',
        'Super-Jeep traversal across Landmannalaugar rhyolite volcanic highlands.',
        'Zodiac boat navigation among floating icebergs at Jökulsárlón glacier lagoon.',
        'Boutique glass-domed lodge stay with 360-degree aurora wake-up alerts.',
        'Diamond Beach black sand ice crystal photography at sunrise.'
      ],
      itineraryDays: [
        { day: '01', title: 'Arrival in Reykjavik & Geothermal Springs', desc: 'Land at Keflavík Airport, private chauffeur transfer to The Retreat at Blue Lagoon for mineral soak.' },
        { day: '02', title: 'Golden Circle & Thingvellir Rift Valley', desc: 'Walk between North American and Eurasian tectonic plates, witness Strokkur geyser erupting 30m high.' },
        { day: '03', title: 'South Coast Waterfalls & Black Sand Basalt', desc: 'Walk behind Seljalandsfoss waterfall, explore Reynisfjara roaring basalt columns and puffin cliffs.' },
        { day: '04', title: 'Vatnajökull Glacier Expedition', desc: 'Ascend Europe largest ice cap in specialized super-jeeps; explore hidden subterranean sapphire ice caves.' },
        { day: '05', title: 'Jökulsárlón & Diamond Beach Icebergs', desc: 'Watch blue icebergs drift towards the Atlantic ocean; sunset photography along black quartz shoreline.' },
        { day: '06', title: 'Aurora Hunting & Secret Highland Lagoon', desc: 'Dark-sky night journey with expert astronomer; soak in secluded natural hot rivers under celestial lights.' },
        { day: '07', title: 'Reykjavik Harpa Hall & Departure', desc: 'Explore Nordic architecture and coastal seafood before private transfer to Keflavík for return flight.' }
      ],
      packing: [
        'Waterproof windbreaker shell with GORE-TEX rating',
        'Thermal merino wool base layers (200+ GSM)',
        'Sturdy ankle-support waterproof hiking boots',
        'Tripod and wide-angle lens for Northern Lights capture',
        'Fleece-lined touch-screen gloves and balaclava'
      ]
    },
    {
      slug: 'kashmir-alpine',
      title: 'Kashmir Alpine & High Mountain Passes',
      region: 'Western Himalayas',
      category: 'glacial',
      coords: "34°05'N 74°47'E",
      elevation: '2,730m ASL',
      climate: 'Sub-Alpine Montane',
      temp: '4°C to 18°C',
      bestSeason: 'April – October & Winter Snow',
      duration: '6 Days / 5 Nights',
      flightTime: '2h 15m Direct from Delhi/Ahmedabad',
      airportCode: 'SXR (Srinagar)',
      startingPrice: 28500,
      heroImage: 'img/domestic-tour/kashmir.jpg',
      gallery: ['img/domestic-tour/kashmir.jpg', 'img/tours/manali.jpg', 'img/domestic-tour/leh-ladakh.jpg'],
      tagline: 'Whispering pine valleys, tranquil cedar houseboats, and snow-capped Pir Panjal peaks.',
      overview: 'Often revered as paradise on earth, Kashmir offers deep alpine stillness. From heritage cedar houseboats floating on mirror-still Dal Lake to Gondola cable cars ascending 4,000 meters into Apharwat snow basins, our bespoke itinerary ensures private heated transport, local wazwan banquets, and premier valley chalets.',
      highlights: [
        'Private sunrise shikara cruise through Dal Lake floating flower and spice markets.',
        'Gondola Phase II ascent to 3,980m Apharwat Peak for panoramic snow skiing.',
        'Betaab Valley and Aru Valley private guided horse trails along turquoise Lidder river.',
        'Heritage stay at a handcrafted hand-carved walnut cedar wood luxury houseboat.',
        'Saffron farm visit in Pampore and private copperware artisan workshop.'
      ],
      itineraryDays: [
        { day: '01', title: 'Arrival in Srinagar & Dal Lake Sunset', desc: 'Land at Sheikh ul-Alam Airport, private transfer to luxury cedar houseboat, evening shikara cruise.' },
        { day: '02', title: 'Mughal Terraced Gardens & Old City', desc: 'Stroll Shalimar and Nishat imperial gardens; explore ancient Jamia Masjid and paper-mache ateliers.' },
        { day: '03', title: 'Ascent to Gulmarg & Apharwat Gondola', desc: 'Drive through pine forests to Gulmarg bowl; ride Phase 2 cable car high above cloud level.' },
        { day: '04', title: 'Pahalgam Valley of Shepherds', desc: 'Scenic transfer along saffron fields to Pahalgam; riverside walk along glacial Lidder river.' },
        { day: '05', title: 'Aru & Betaab Glacial Sanctuaries', desc: 'Private 4x4 excursion into pristine Aru Valley meadows and Betaab pine amphitheater.' },
        { day: '06', title: 'Kashmir Departure & Souvenir Connoisseur', desc: 'Pashmina shawl certification check, fresh walnut shopping, and private airport escort.' }
      ],
      packing: [
        'Layered lightweight down jacket or fleece sweater',
        'Polarized UV sunglasses for snow reflection',
        'Comfortable walking shoes with deep traction',
        'Moisturizing lip balm and cold cream',
        'Universal power bank for cold-temperature battery backup'
      ]
    },
    {
      slug: 'swiss-alps',
      title: 'Swiss Alps & Glacial Fjord Lakes',
      region: 'Central Europe',
      category: 'alpine',
      coords: "46°35'N 8°02'E",
      elevation: '3,454m ASL',
      climate: 'High Alpine Temperate',
      temp: '10°C to 22°C',
      bestSeason: 'May – October (Hiking) / Dec – Mar (Ski)',
      duration: '8 Days / 7 Nights',
      flightTime: '8h 50m Direct to Zurich',
      airportCode: 'ZRH (Zurich)',
      startingPrice: 165000,
      heroImage: 'img/international/canada.jpg',
      gallery: ['img/international/canada.jpg', 'img/banner-2.jpg', 'img/international/new-zeland.jpg'],
      tagline: 'Cogwheel mountain railways, Top of Europe ice palaces, and crystal fjord-like lakes.',
      overview: 'Switzerland represents the pinnacle of alpine luxury. Glide across emerald lakes on Belle Époque steamers, traverse high mountain passes aboard the glass-roofed Glacier Express, and wake to the sheer granite face of the Matterhorn from a heated infinity pool.',
      highlights: [
        'Jungfraujoch Top of Europe cogwheel railway to 3,454 meters altitude.',
        'First-Class Swiss Travel Pass with unlimited scenic panoramic rail and lake steamers.',
        'Private chocolate workshop with master confiseur in Lucerne.',
        'Zermatt car-free village stay with uninterrupted Matterhorn views.',
        'Lake Geneva private vintage wooden boat cruise at sunset.'
      ],
      itineraryDays: [
        { day: '01', title: 'Zurich Arrival & Lucerne Lakeside', desc: 'Arrival at Zurich Airport, scenic panoramic train transfer to Lucerne and Chapel Bridge walk.' },
        { day: '02', title: 'Mount Pilatus Golden Roundtrip', desc: 'Steamer boat across Lake Lucerne, ascend world steepest cogwheel railway to 2,132m Pilatus Kulm.' },
        { day: '03', title: 'Interlaken & Lauterbrunnen 72 Waterfalls', desc: 'Transfer to Bernese Oberland, walk beneath cliff-hanging Staubbach and Trümmelbach waterfalls.' },
        { day: '04', title: 'Jungfraujoch Glacier Palace', desc: 'Eiger Express tri-cable gondola to Eigergletscher, train inside the mountain to the Sphinx Observatory.' },
        { day: '05', title: 'Scenic Train to Zermatt & Matterhorn', desc: 'Panoramic journey into Valais valley; check-in at luxury chalet overlooking the Matterhorn peak.' },
        { day: '06', title: 'Gornergrat Cogwheel & Alpine Reflection Lake', desc: 'Ascend to 3,089m Gornergrat platform; photograph the Matterhorn mirrored in Riffelsee.' },
        { day: '07', title: 'Montreux & Chillon Castle Lake Geneva', desc: 'Descend to Swiss Riviera vineyards, explore medieval Château de Chillon on water edge.' },
        { day: '08', title: 'Geneva / Zurich Departure', desc: 'Gourmet Swiss fondue luncheon and airport limousine transfer.' }
      ],
      packing: [
        'Smart-casual layers for mountain dining and chalets',
        'Waterproof windbreaker jacket with fleece lining',
        'Comfortable trail running shoes or light hikers',
        'Type J Swiss electrical travel adapter',
        'Daypack for scenic train and mountain excursions'
      ]
    },
    {
      slug: 'leh-ladakh',
      title: 'Ladakh Moonscape & Pangong Lake',
      region: 'Trans-Himalayan Plateau',
      category: 'highlands',
      coords: "34°09'N 77°34'E",
      elevation: '4,350m ASL',
      climate: 'High-Altitude Cold Desert',
      temp: '2°C to 16°C',
      bestSeason: 'May – September (Passes Open)',
      duration: '7 Days / 6 Nights',
      flightTime: '1h 30m from Delhi/Chandigarh',
      airportCode: 'IXL (Leh)',
      startingPrice: 38000,
      heroImage: 'img/domestic-tour/leh-ladakh.jpg',
      gallery: ['img/domestic-tour/leh-ladakh.jpg', 'img/domestic-tour/kashmir.jpg', 'img/tours/manali.jpg'],
      tagline: 'High mountain passes, 1,000-year-old cliffside gompas, and shifting turquoise waters.',
      overview: 'A realm of stark raw grandeur above the tree line. Cross Khardung La at 5,359 meters, ride double-humped Bactrian camels across the high-altitude sand dunes of Hunder, and watch the surreal color shifts of Pangong Lake along the Tibetan border.',
      highlights: [
        'Khardung La pass crossing at 17,582 ft — one of the highest motorable roads on earth.',
        'Glamping in heated luxury geodesic domes under the Milky Way at Pangong Tso.',
        'Morning prayer chants and butter-lamp illumination at Thiksey Monastery.',
        'Diskit Monastery 106-ft Maitreya Buddha facing the Nubra Valley confluence.',
        'Magnetic Hill anti-gravity phenomenon and Sangam Indus-Zanskar river confluence.'
      ],
      itineraryDays: [
        { day: '01', title: 'Leh Arrival & Oxygen Acclimatization', desc: 'Breathtaking flight over snow peaks; complete restful acclimatization at luxury heritage hotel.' },
        { day: '02', title: 'Shanti Stupa, Leh Palace & Monasteries', desc: 'Panoramic sunset view from Shanti Stupa; visit ancient Shey Palace and Thiksey gompa.' },
        { day: '03', title: 'Across Khardung La to Nubra Valley', desc: 'Ascend the world-famous Khardung La pass; descend into surreal white sand dunes of Hunder.' },
        { day: '04', title: 'Bactrian Camel Safari & Diskit', desc: 'Double-humped camel safari; explore ancient monastery library and statue of Buddha.' },
        { day: '05', title: 'Shyok River Route to Pangong Tso', desc: 'Drive alongside turquoise Shyok gorge; arrive at 134km long high-altitude Pangong Lake.' },
        { day: '06', title: 'Chang La Return to Leh City', desc: 'Sunrise over turquoise waters; cross Chang La pass back to Leh; evening craft shopping.' },
        { day: '07', title: 'Ladakh Farewell Flight', desc: 'Morning takeoff over rugged snow-capped Himalayan ranges.' }
      ],
      packing: [
        'Thermal innerwear and windproof down parka',
        'Sunscreen SPF 50+ and polarized UV sunglasses',
        'Hydration flask and electrolyte drink sachets',
        'Moisturizing skin balm and saline nasal drops',
        'Valid Government photo ID for border inner line permits'
      ]
    },
    {
      slug: 'bali-volcanic',
      title: 'Bali Volcanic Ridges & Nusa Fjords',
      region: 'Southeast Asia Island',
      category: 'volcanic',
      coords: "8°20'S 115°13'E",
      elevation: '1,717m ASL',
      climate: 'Tropical Maritime',
      temp: '24°C to 30°C',
      bestSeason: 'April – October (Dry Season)',
      duration: '7 Days / 6 Nights',
      flightTime: '7h 15m via Singapore/Kuala Lumpur',
      airportCode: 'DPS (Denpasar)',
      startingPrice: 42000,
      heroImage: 'img/international/indonesia.jpg',
      gallery: ['img/international/indonesia.jpg', 'img/banner-1.jpg', 'img/tours/kerala.jpg'],
      tagline: 'Emerald terraced ravines, active volcano sunrises, and private cliffside villas.',
      overview: 'A sanctuary of spirit and untamed nature. From jungle pool villas perched over Ubud sacred Ayung river to 4x4 black volcanic sand safaris beneath Mount Batur, Bali combines bespoke wellness with dramatic oceanic panoramas.',
      highlights: [
        'Private 4x4 open-top jeep safari across Mount Batur black lava fields at dawn.',
        'Private speed boat charter to Nusa Penida Kelingking T-Rex cliff and Angel Billabong.',
        'Floating champagne breakfast in private cliffside villa overlooking the Indian Ocean.',
        'Traditional sound healing and flower purification ritual at Tirta Empul water temple.',
        'Uluwatu clifftop Kecak fire dance against dramatic ocean sunset.'
      ],
      itineraryDays: [
        { day: '01', title: 'Arrive in Denpasar & Ubud Jungle Check-in', desc: 'VIP fast-track airport escort, transfer to luxury rainforest villa with infinity plunge pool.' },
        { day: '02', title: 'Tegallalang Terraces & Sacred Water Temple', desc: 'Early morning bamboo swing over rice terraces; private blessing at Tirta Empul.' },
        { day: '03', title: 'Mount Batur Sunrise Jeep & Geothermal Hot Springs', desc: 'Ascend volcanic ridge in vintage 4x4; soak in lakeside thermal waters overlooking Lake Batur.' },
        { day: '04', title: 'Transfer to Seminyak / Uluwatu Coast', desc: 'Scenic coastal transfer; visit Uluwatu clifftop temple perched 70 meters above sea.' },
        { day: '05', title: 'Private Nusa Penida Island Expedition', desc: 'Speedboat to Nusa Penida; discover Kelingking cliff, Broken Beach, and crystal bays.' },
        { day: '06', title: 'Beach Club Cabana & Sunset Seafood', desc: 'Daybed relaxation at premier clifftop beach club; beachfront candlelit dining at Jimbaran.' },
        { day: '07', title: 'Artisan Markets & Return Flight', desc: 'Artisan silver and batik shopping; private transfer to Ngurah Rai International Airport.' }
      ],
      packing: [
        'Breathable linen shirts and resort wear',
        'Swimwear and reef-safe sunscreen',
        'Light hiking trainers for volcano and cliff paths',
        'Waterproof dry-bag for island speedboat trips',
        'Type C/F two-pin European style adapter'
      ]
    },
    {
      slug: 'dubai-skylines',
      title: 'Dubai & Arabian Desert Horizons',
      region: 'Middle East',
      category: 'volcanic',
      coords: "25°12'N 55°16'E",
      elevation: '16m ASL',
      climate: 'Subtropical Desert',
      temp: '20°C to 29°C',
      bestSeason: 'October – April (Cool Breeze)',
      duration: '6 Days / 5 Nights',
      flightTime: '3h 30m Direct from Ahmedabad/Delhi',
      airportCode: 'DXB (Dubai)',
      startingPrice: 48000,
      heroImage: 'img/tours/dubai.jpg',
      gallery: ['img/tours/dubai.jpg', 'img/banner-2.jpg', 'img/tours/jaisalmer.jpg'],
      tagline: 'Gilded desert dunes, futuristic glass towers, and private Arabian Gulf yachts.',
      overview: 'Where ultra-modern architectural audacity meets timeless Arabian hospitality. Ascend the VIP lounges of the Burj Khalifa, embark on private vintage Land Rover desert safaris among Arabian oryx, and cruise Dubai Marina on a private luxury motor yacht.',
      highlights: [
        'Private 52-ft luxury yacht cruise along Dubai Marina and Atlantis The Palm.',
        'Burj Khalifa Level 148 Sky Lounge private fast-track observation deck.',
        'Platinum Heritage vintage 1950s Land Rover desert safari with royal dinner.',
        'Louvre Abu Dhabi and Sheikh Zayed Grand Mosque VIP guided architecture tour.',
        'Helicopter flight over The World Islands and Palm Jumeirah.'
      ],
      itineraryDays: [
        { day: '01', title: 'Arrival in Dubai & Marina Skyline Cruise', desc: 'Chauffeur limousine arrival to luxury 5-star hotel; evening private yacht sail at sunset.' },
        { day: '02', title: 'Modern Wonders: Museum of the Future & Burj Khalifa', desc: 'Explore the calligraphy-wrapped torus museum; ascend to highest observation deck on earth.' },
        { day: '03', title: 'Royal Desert Conservation Reserve Expedition', desc: 'Wildlife safari spotting gazelles and oryx; starlit private banquet in desert dunes.' },
        { day: '04', title: 'Abu Dhabi Presidential Palace & Grand Mosque', desc: 'Day trip to UAE capital; visit Qasr Al Watan and the magnificent white marble Sheikh Zayed Mosque.' },
        { day: '05', title: 'Old Dubai Gold Souks & Palm Jumeirah Beachfront', desc: 'Wooden abra boat across Dubai Creek; afternoon cabana relaxation at Palm Jumeirah.' },
        { day: '06', title: 'Dubai Departure with Duty Free Escort', desc: 'Gourmet breakfast, luxury shopping collection, and private airport terminal escort.' }
      ],
      packing: [
        'Lightweight cotton and elegant evening dinner attire',
        'Respectful attire covering shoulders and knees for mosques',
        'UV polarized sunglasses and desert sun hat',
        'Type G British three-pin electrical adapter',
        'Comfortable leather loafers or stylish sandals'
      ]
    }
  ];

  // Helper: Format INR currency
  function formatINR(val) {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  }

  // Theme System (Dark / Light with System Preference Detection & Persistence)
  const THEME_STORAGE_KEY = 'wsh_theme';

  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) {}
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function updateThemeToggleButtons(theme) {
    const btns = document.querySelectorAll('.btn-theme-toggle');
    const isDark = theme === 'dark';
    btns.forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
      btn.title = isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme';
      btn.innerHTML = isDark
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    });
  }

  function setTheme(theme) {
    const validTheme = (theme === 'light') ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', validTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, validTheme);
    } catch (e) {}
    updateThemeToggleButtons(validTheme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  function initThemeSystem() {
    const initial = getPreferredTheme();
    setTheme(initial);

    // Bind all theme toggles
    document.addEventListener('click', e => {
      const toggleBtn = e.target.closest('.btn-theme-toggle');
      if (toggleBtn) {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Listen for OS theme change if user hasn't explicitly set preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        try {
          if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            setTheme(e.matches ? 'dark' : 'light');
          }
        } catch (err) {}
      });
    }
  }

  // Mobile Slide-Up Glass Drawer Handler
  function initMobileDrawer() {
    const drawer = document.getElementById('mobileSlideDrawer');
    if (!drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Toggle triggers
    document.addEventListener('click', e => {
      const openBtn = e.target.closest('#mobileNavToggle, .js-drawer-open');
      if (openBtn) {
        e.preventDefault();
        openDrawer();
        return;
      }

      const closeBtn = e.target.closest('#drawerCloseBtn, .js-drawer-close');
      if (closeBtn) {
        e.preventDefault();
        closeDrawer();
        return;
      }

      // Backdrop click closes
      if (e.target.matches('.mobile-drawer-backdrop')) {
        closeDrawer();
      }
    });

    // Escape key closes drawer
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // Scroll Reveal Observer
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-init');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('reveal-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    reveals.forEach(el => observer.observe(el));
  }

  // Floating Nav Island Scroll Handler
  function initNavIsland() {
    const nav = document.getElementById('icelandNav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      const island = nav.querySelector('.nav-island');
      if (island) {
        island.classList.toggle('nav-island-scrolled', window.scrollY > 30);
      }
    });
  }

  // Route Swap Micro-Animation in Flight Booking
  function initRouteSwap() {
    const swapBtn = document.getElementById('routeSwapBtn');
    const originInput = document.getElementById('flightOrigin');
    const destInput = document.getElementById('flightDest');

    if (swapBtn && originInput && destInput) {
      swapBtn.addEventListener('click', () => {
        const temp = originInput.value;
        originInput.value = destInput.value;
        destInput.value = temp;

        swapBtn.style.transform = 'rotate(180deg) scale(1.15)';
        setTimeout(() => {
          swapBtn.style.transform = '';
        }, 300);

        if (window.WhiteSwanFlightEngine) {
          window.WhiteSwanFlightEngine.recalculateFares();
        }
      });
    }
  }

  // Expose Global API
  window.WhiteSwanTravelData = {
    destinations: DESTINATIONS,
    getDestinationBySlug: slug => DESTINATIONS.find(d => d.slug === slug) || DESTINATIONS[0],
    formatINR,
    theme: {
      get: () => document.documentElement.getAttribute('data-theme') || 'dark',
      set: setTheme,
      toggle: toggleTheme
    }
  };

  // Run Theme Immediately
  initThemeSystem();

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavIsland();
    initRouteSwap();
    initMobileDrawer();
  });
})();
