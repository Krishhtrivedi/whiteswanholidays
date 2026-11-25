/**
 * White Swan Holidays — Centralized Data Store & WhatsApp Lead Engine
 * Manages Packages (Domestic & International), Referral Codes, Inquiries CRM,
 * and structured WhatsApp URL generation.
 */

(function () {
  'use strict';

  const STORAGE_KEYS = {
    PACKAGES: 'wsh_packages_v2',
    REFERRALS: 'wsh_referrals_v2',
    INQUIRIES: 'wsh_inquiries_v2',
    EVENTS: 'wsh_events_v2',
    ADMIN_AUTH: 'wsh_admin_auth_v2'
  };

  const WHATSAPP_DESK_NUMBER = '919925811770';
  const INSTAGRAM_URL = 'https://www.instagram.com/whiteswanholidays/?hl=en';
  const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61579766578124';

  const DEFAULT_PACKAGES = [
    // ================= DOMESTIC INDIA =================
    {
      id: 'pkg-ksh01',
      slug: 'kashmir-paradise',
      refCode: 'WSH-DOM-KSH01',
      title: 'Kashmir Paradise',
      category: 'Domestic',
      destination: 'Srinagar, Gulmarg, Pahalgam, Sonmarg',
      region: 'Jammu & Kashmir, India',
      duration: '5 Nights / 6 Days',
      nights: 5,
      price: 28500,
      style: 'Family & Honeymoon',
      visaType: 'No Visa Required (Domestic)',
      flightInfo: 'Direct flights from Ahmedabad (AMD) to Srinagar (SXR)',
      bestSeason: 'March – October & Winter Snow',
      image: 'img/domestic-tour/kashmir.jpg',
      featured: true,
      active: true,
      highlights: ['Dal Lake Cedar Houseboat', 'Gulmarg Phase 2 Gondola', 'Pahalgam Lidder Valley', 'Private Heated Innova'],
      overview: 'Experience the alpine stillness of Kashmir with private shikara rides across Dal Lake, Phase 2 Gondola ascents in Gulmarg, and scenic drives through Sonmarg and Pahalgam.',
      inclusions: [
        '5 Nights accommodation in 4-Star resorts & luxury Dal Lake houseboat',
        'Daily breakfast & traditional Kashmiri Wazwan dinner',
        'Private AC/Heated Innova Crysta for all transfers & sightseeing',
        '1-Hour private Shikara ride on Dal Lake',
        'All toll taxes, parking & driver allowances'
      ],
      exclusions: [
        'Airfare / Train tickets (available at special AMD desk rates)',
        'Gulmarg Gondola Phase 1 & 2 tickets & pony rides',
        '5% GST & personal expenses'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Srinagar & Dal Lake Shikara', desc: 'Meet & greet at Srinagar Airport, check-in to handcrafted cedar houseboat, sunset shikara cruise.' },
        { day: 2, title: 'Srinagar to Sonmarg Meadow of Gold', desc: 'Full-day scenic excursion to Sonmarg glacier viewpoints along the Sindh River.' },
        { day: 3, title: 'Gulmarg Gondola & Snow Bowl', desc: 'Drive to Gulmarg, ascend Apharwat Peak via Gondola cable car, evening leisure.' },
        { day: 4, title: 'Pahalgam Valley of Shepherds', desc: 'Transfer via Pampore saffron fields to Pahalgam; explore Betaab & Aru Valleys.' },
        { day: 5, title: 'Mughal Gardens & Local Crafts', desc: 'Return to Srinagar, tour Nishat Bagh, Shalimar Bagh, and heritage carpet ateliers.' },
        { day: 6, title: 'Departure from Srinagar', desc: 'Morning breakfast and private transfer to Srinagar Airport.' }
      ]
    },
    {
      id: 'pkg-ker02',
      slug: 'scenic-kerala-backwaters',
      refCode: 'WSH-DOM-KER02',
      title: 'Scenic Kerala Backwaters',
      category: 'Domestic',
      destination: 'Munnar, Wayanad, Alleppey, Kumarakom, Trivandrum',
      region: 'Kerala, India',
      duration: '5 Nights / 6 Days',
      nights: 5,
      price: 22500,
      style: 'Honeymoon & Wellness',
      visaType: 'No Visa Required (Domestic)',
      flightInfo: 'Direct flights from Ahmedabad (AMD) to Kochi (COK)',
      bestSeason: 'September – March',
      image: 'img/tours/kerala.jpg',
      featured: true,
      active: true,
      highlights: ['Munnar Tea Plantations', 'Private Alleppey Houseboat', 'Kumarakom Lagoon', 'Kathakali Cultural Show'],
      overview: 'Glide through palm-fringed emerald backwaters on a private teakwood houseboat, wake up in misty Munnar tea estates, and unwind by Kumarakom lagoons.',
      inclusions: [
        '5 Nights stay across Munnar, Kumarakom & private Alleppey Houseboat',
        'All meals onboard the private houseboat + daily hotel breakfast',
        'Private chauffeur-driven sedan/SUV throughout Kerala',
        'Spice plantation guided tour in Thekkady/Munnar'
      ],
      exclusions: [
        'Airfare to Kochi / Trivandrum',
        'Ayurvedic spa treatments & boating entry tickets',
        '5% GST'
      ],
      itinerary: [
        { day: 1, title: 'Kochi Arrival & Munnar Hills', desc: 'Drive past Cheeyappara waterfalls into misty Munnar tea gardens.' },
        { day: 2, title: 'Eravikulam Park & Tea Museum', desc: 'Explore tea estates, Mattupetty Dam, and Echo Point.' },
        { day: 3, title: 'Kumarakom Backwater Resort', desc: 'Descend to serene Vembanad Lake resort for sunset boat cruise.' },
        { day: 4, title: 'Private Alleppey Houseboat Cruise', desc: 'Board exclusive AC houseboat with personal chef for canal cruising.' },
        { day: 5, title: 'Wayanad / Trivandrum Coastal Leisure', desc: 'Morning canal views followed by Kovalam / Trivandrum beach sunset.' },
        { day: 6, title: 'Departure', desc: 'Private transfer to airport for return flight.' }
      ]
    },
    {
      id: 'pkg-sik03',
      slug: 'mystic-sikkim-himalayas',
      refCode: 'WSH-DOM-SIK03',
      title: 'Mystic Sikkim & Himalayas',
      category: 'Domestic',
      destination: 'Gangtok, Pelling, Lachung, Kalimpong',
      region: 'Sikkim & North Bengal, India',
      duration: '5 Nights / 6 Days',
      nights: 5,
      price: 26000,
      style: 'Adventure & Family',
      visaType: 'No Visa Required (Inner Line Permit Included)',
      flightInfo: 'Flights from Ahmedabad (AMD) to Bagdogra (IXB)',
      bestSeason: 'March – June & October – December',
      image: 'img/tours/sikkim.jpg',
      featured: true,
      active: true,
      highlights: ['Tsomgo Glacial Lake', 'Yumthang Valley of Flowers', 'Pelling Skywalk', 'Rumtek Monastery'],
      overview: 'Journey into the Eastern Himalayas across sacred monasteries, alpine rhododendron valleys in Lachung, and panoramic Kanchenjunga viewpoints in Pelling.',
      inclusions: [
        '5 Nights in boutique mountain hotels in Gangtok, Lachung & Pelling',
        'All meals in Lachung + daily breakfast in Gangtok & Pelling',
        'Protected Area Permits (PAP) & Nathula Pass documentation',
        'Exclusive Innova / Xylo for mountain terrain'
      ],
      exclusions: [
        'Flights to Bagdogra (IXB)',
        'Nathula Pass permit supplement & ropeway tickets',
        '5% GST'
      ],
      itinerary: [
        { day: 1, title: 'Bagdogra to Gangtok', desc: 'Scenic Teesta River valley drive into Gangtok capital.' },
        { day: 2, title: 'Tsomgo Lake & Baba Mandir', desc: 'High-altitude excursion to frozen/emerald Tsomgo glacial lake.' },
        { day: 3, title: 'Gangtok to Lachung Valley', desc: 'Travel north past Seven Sisters waterfalls to Lachung.' },
        { day: 4, title: 'Yumthang Valley & Return', desc: 'Morning visit to Yumthang alpine meadows and hot springs.' },
        { day: 5, title: 'Pelling Skywalk & Kalimpong', desc: 'Visit Pemayangtse Monastery and glass skywalk facing Kanchenjunga.' },
        { day: 6, title: 'Departure via Bagdogra', desc: 'Transfer to Bagdogra Airport with mountain memories.' }
      ]
    },
    {
      id: 'pkg-guj04',
      slug: 'vibrant-gujarat-heritage',
      refCode: 'WSH-DOM-GUJ04',
      title: 'Vibrant Gujarat Heritage & Coast',
      category: 'Domestic',
      destination: 'Girnar, Somnath, Dwarka, Statue of Unity, Diu & Daman',
      region: 'Gujarat, India',
      duration: '4 Nights / 5 Days',
      nights: 4,
      price: 19500,
      style: 'Spiritual & Family',
      visaType: 'No Visa Required (Domestic)',
      flightInfo: 'Convenient departures directly from Ahmedabad (AMD)',
      bestSeason: 'October – March',
      image: 'img/tours/gujarat.jpg',
      featured: false,
      active: true,
      highlights: ['Somnath & Dwarka Jyotirlinga', 'Sasan Gir Lion Safari', 'Statue of Unity View', 'Diu Coastal Forts'],
      overview: 'A curated spiritual and heritage circuit across Gujarat — from sacred Dwarkadhish and Somnath temples to Asiatic lions in Gir, Portuguese forts in Diu, and the Statue of Unity.',
      inclusions: [
        '4 Nights stay in premier heritage & beach resorts',
        'Daily breakfast & Gujarati/multi-cuisine dinners',
        'Private AC SUV departing directly from Ahmedabad',
        'Statue of Unity Viewing Gallery & Laser Show passes'
      ],
      exclusions: [
        'Gir Jungle Safari permit fees (assisted booking available)',
        'Girnar Ropeway tickets',
        '5% GST'
      ],
      itinerary: [
        { day: 1, title: 'Ahmedabad to Dwarka', desc: 'Morning departure, visit Dwarkadhish Temple & Gomti Ghat evening aarti.' },
        { day: 2, title: 'Dwarka to Somnath via Porbandar', desc: 'Visit Kirti Mandir & Somnath Jyotirlinga Light & Sound Show.' },
        { day: 3, title: 'Sasan Gir Safari & Girnar', desc: 'Early morning Gir Lion Safari followed by Junagadh Girnar visit.' },
        { day: 4, title: 'Diu Beaches & Statue of Unity', desc: 'Explore Diu Naida Caves & Nagoa Beach before Kevadia transfer.' },
        { day: 5, title: 'Statue of Unity & Return to Ahmedabad', desc: 'Viewing gallery, Valley of Flowers & evening drop at Ahmedabad.' }
      ]
    },

    // ================= INTERNATIONAL =================
    {
      id: 'pkg-uae01',
      slug: 'dubai-abu-dhabi-luxe',
      refCode: 'WSH-INT-UAE01',
      title: 'Dubai & Abu Dhabi Luxe Escape',
      category: 'International',
      destination: 'Dubai & Abu Dhabi, UAE',
      region: 'Middle East (UAE)',
      duration: '4 Nights / 5 Days',
      nights: 4,
      price: 48000,
      style: 'Family & Luxury',
      visaType: 'E-Visa',
      flightInfo: 'Non-stop 3h 20m flights from Ahmedabad (AMD) to DXB',
      bestSeason: 'October – April',
      image: 'img/tours/dubai.jpg',
      featured: true,
      active: true,
      highlights: ['Burj Khalifa 124th Floor', 'Marina Dhow Dinner Cruise', 'Desert Safari BBQ', 'Abu Dhabi Grand Mosque'],
      overview: 'Experience architectural marvels, golden Arabian dunes, private Marina yacht cruises, and Abu Dhabi’s Sheikh Zayed Grand Mosque with fast-track UAE E-Visa assistance.',
      inclusions: [
        '4 Nights in 4-Star/5-Star Downtown or Marina Hotel with breakfast',
        'UAE Single-Entry E-Visa & Travel Insurance',
        'Burj Khalifa Non-Prime Entry + Dubai Mall Fountain Show',
        'Premium Desert Safari with Dune Bashing & Tanoura BBQ Dinner',
        'Abu Dhabi City Tour & Sheikh Zayed Grand Mosque'
      ],
      exclusions: [
        'Return airfare from Ahmedabad (AMD) — available on quote',
        'Tourism Dirham fee payable at hotel',
        '5% GST & 5% TCS'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Dubai & Marina Cruise', desc: 'Private airport pickup, hotel check-in, evening Marina Dhow Dinner Cruise.' },
        { day: 2, title: 'Dubai City Tour & Burj Khalifa', desc: 'Palm Jumeirah monorail view, Museum of the Future photo stop & Burj Khalifa.' },
        { day: 3, title: 'Golden Desert Safari', desc: 'Morning shopping leisure; afternoon 4x4 Land Cruiser dune safari & gala dinner.' },
        { day: 4, title: 'Abu Dhabi Grand Mosque & Ferrari World', desc: 'Full-day guided tour to Abu Dhabi Corniche, Grand Mosque & Yas Island.' },
        { day: 5, title: 'Departure to Ahmedabad', desc: 'Gold Souk visit & private transfer to Dubai International Airport.' }
      ]
    },
    {
      id: 'pkg-tha02',
      slug: 'thailand-island-culture',
      refCode: 'WSH-INT-THA02',
      title: 'Thailand Island & Culture Trail',
      category: 'International',
      destination: 'Phuket, Krabi, Bangkok, Pattaya, Chiang Mai',
      region: 'Southeast Asia',
      duration: '5 Nights / 6 Days',
      nights: 5,
      price: 38000,
      style: 'Family & Honeymoon',
      visaType: 'Visa-Free',
      flightInfo: 'Direct & 1-stop connections from Ahmedabad (AMD) to BKK/HKT',
      bestSeason: 'November – April',
      image: 'img/international/thailand.jpg',
      featured: true,
      active: true,
      highlights: ['Phi Phi Speedboat Tour', 'Krabi 4-Island Hopping', 'Bangkok Chao Phraya Cruise', 'Coral Island Pattaya'],
      overview: 'Turquoise limestone karsts of Krabi and Phi Phi Island paired with vibrant Bangkok floating markets, golden temples, and luxury beachfront resorts.',
      inclusions: [
        '5 Nights across Phuket, Krabi & Bangkok luxury resorts',
        'Phi Phi Island Big Boat / Speedboat tour with Indian/Thai lunch',
        'Krabi 4-Island emerald lagoon tour',
        'Bangkok Temple Tour & Chao Phraya Dinner Cruise',
        'All private airport & inter-city transfers'
      ],
      exclusions: [
        'International & internal Thailand flights',
        'National Park Marine Fees (payable locally)',
        '5% GST & TCS'
      ],
      itinerary: [
        { day: 1, title: 'Arrive Phuket & Patong Sunset', desc: 'Airport transfer to beach resort, evening Bangla Road & beach stroll.' },
        { day: 2, title: 'Phi Phi & Maya Bay Speedboat', desc: 'Snorkeling at Pileh Lagoon, Monkey Beach & Maya Bay.' },
        { day: 3, title: 'Transfer to Krabi 4-Islands', desc: 'Scenic coastal transfer & sunset at Ao Nang cliffs.' },
        { day: 4, title: 'Fly to Bangkok & River Cruise', desc: 'Short flight to Bangkok; evening Chao Phraya luxury dinner cruise.' },
        { day: 5, title: 'Bangkok Temples & Safari World', desc: 'Golden Buddha, Wat Arun & evening shopping at Siam Paragon.' },
        { day: 6, title: 'Return Flight', desc: 'Private airport drop for flight back home.' }
      ]
    },
    {
      id: 'pkg-jpn03',
      slug: 'japan-cherry-blossom-bullet-train',
      refCode: 'WSH-INT-JPN03',
      title: 'Japan Cherry Blossom & Bullet Train',
      category: 'International',
      destination: 'Tokyo, Kyoto, Osaka, Hiroshima',
      region: 'East Asia',
      duration: '7 Nights / 8 Days',
      nights: 7,
      price: 145000,
      style: 'Luxury & Cultural',
      visaType: 'Sticker Visa',
      flightInfo: '1-Stop flights from Ahmedabad (AMD) via Singapore / Bangkok / Delhi',
      bestSeason: 'March – May (Sakura) & Oct – Nov (Autumn)',
      image: 'img/international/japan.jpg',
      featured: true,
      active: true,
      highlights: ['Shinkansen Bullet Train', 'Mt. Fuji 5th Station', 'Kyoto Arashiyama Bamboo', 'Hiroshima Peace Park'],
      overview: 'Ride the 320 km/h Shinkansen bullet train from neon Tokyo to ancient Kyoto shrines, Hakone Mt. Fuji views, Osaka street food, and Hiroshima heritage.',
      inclusions: [
        '7 Nights in 4-Star central hotels in Tokyo, Kyoto & Osaka',
        '7-Day JR Shinkansen Bullet Train Pass / Point-to-Point Tickets',
        'Full-day Mt. Fuji, Lake Ashi Cruise & Hakone Ropeway tour',
        'Complete Japan Sticker Visa filing & itinerary documentation'
      ],
      exclusions: [
        'Return international airfare',
        'Lunches & personal meals',
        '5% GST & TCS'
      ],
      itinerary: [
        { day: 1, title: 'Tokyo Arrival & Shinjuku', desc: 'Airport limousine transfer, evening Shibuya Crossing & Tokyo Tower view.' },
        { day: 2, title: 'Tokyo Asakusa & TeamLab', desc: 'Senso-ji Temple, Meiji Shrine & digital art museum.' },
        { day: 3, title: 'Mt. Fuji & Hakone Cruise', desc: 'Bullet train / coach to Mt. Fuji 5th Station & Lake Ashi pirate ship.' },
        { day: 4, title: 'Shinkansen to Kyoto', desc: 'Ride the bullet train; visit Fushimi Inari Red Gates & Gion.' },
        { day: 5, title: 'Arashiyama Bamboo & Kinkaku-ji', desc: 'Golden Pavilion & traditional Nishiki Market.' },
        { day: 6, title: 'Hiroshima & Miyajima Island', desc: 'Day trip by Shinkansen to floating Torii Gate & Peace Memorial.' },
        { day: 7, title: 'Osaka Castle & Dotonbori', desc: 'Transfer to Osaka; evening culinary walk in Dotonbori.' },
        { day: 8, title: 'Departure from Kansai', desc: 'Transfer to Kansai Airport for return flight.' }
      ]
    },
    {
      id: 'pkg-can04',
      slug: 'canadian-rockies-niagara',
      refCode: 'WSH-INT-CAN04',
      title: 'Canadian Rockies & Niagara Explorer',
      category: 'International',
      destination: 'Toronto, Banff, Vancouver',
      region: 'North America',
      duration: '8 Nights / 9 Days',
      nights: 8,
      price: 185000,
      style: 'Family & Scenic',
      visaType: 'Sticker Visa',
      flightInfo: '1-Stop flights from Ahmedabad (AMD) via Dubai / Doha / London',
      bestSeason: 'May – October',
      image: 'img/international/canada.jpg',
      featured: false,
      active: true,
      highlights: ['Niagara Falls Hornblower Cruise', 'Banff & Lake Louise', 'Columbia Icefields Explorer', 'Capilano Suspension Bridge'],
      overview: 'Traverse Canada from the thunderous Niagara Falls and Toronto CN Tower to the turquoise glacial lakes of Banff, Jasper Icefields, and coastal Vancouver.',
      inclusions: [
        '8 Nights in premier hotels across Toronto, Banff, Calgary & Vancouver',
        'Niagara Falls Hornblower Boat Cruise & CN Tower Admission',
        'Banff Gondola & Columbia Icefield Glacier Adventure',
        'Canada Tourist Visa documentation & biometric scheduling support'
      ],
      exclusions: [
        'International & internal Canadian flights',
        'Canada Visa embassy biometric fee',
        '5% GST & TCS'
      ],
      itinerary: [
        { day: 1, title: 'Arrive Toronto', desc: 'Transfer to downtown hotel, evening Harbourfront stroll.' },
        { day: 2, title: 'Niagara Falls Full Day', desc: 'Hornblower cruise to the mist, Niagara-on-the-Lake winery.' },
        { day: 3, title: 'Toronto CN Tower & Fly to Calgary', desc: 'City skyline view & domestic flight to Calgary / Banff.' },
        { day: 4, title: 'Banff National Park & Gondola', desc: 'Sulphur Mountain Gondola & Bow Falls.' },
        { day: 5, title: 'Lake Louise & Moraine Lake', desc: 'Turquoise alpine lakes & Icefields Parkway drive.' },
        { day: 6, title: 'Columbia Icefield & Glacier Walk', desc: 'Ice Explorer ride onto Athabasca Glacier.' },
        { day: 7, title: 'Fly to Vancouver & Stanley Park', desc: 'Flight to Vancouver; totem poles & Gastown.' },
        { day: 8, title: 'Capilano Bridge & Grouse Mountain', desc: 'Rainforest canopy walk & Skyride cable car.' },
        { day: 9, title: 'Departure', desc: 'Transfer to Vancouver International Airport.' }
      ]
    },
    {
      id: 'pkg-bal05',
      slug: 'bali-tropical-retreat',
      refCode: 'WSH-INT-BAL05',
      title: 'Bali Tropical Retreat',
      category: 'International',
      destination: 'Ubud, Seminyak, Nusa Penida',
      region: 'Indonesia (Southeast Asia)',
      duration: '5 Nights / 6 Days',
      nights: 5,
      price: 42000,
      style: 'Honeymoon & Leisure',
      visaType: 'Visa-Free',
      flightInfo: 'Smooth 1-stop flights from Ahmedabad (AMD) via Singapore / KL',
      bestSeason: 'April – October',
      image: 'img/international/indonesia.jpg',
      featured: true,
      active: true,
      highlights: ['Private Pool Villa in Ubud', 'Nusa Penida Kelingking Cliff', 'Uluwatu Kecak Sunset', 'Bali Swing & Rice Terraces'],
      overview: 'Private infinity-pool villas nestled in Ubud’s emerald jungle, speedboat adventures to Nusa Penida’s dramatic cliffs, and sunset dining in Seminyak.',
      inclusions: [
        '3 Nights in Seminyak/Kuta Beach Resort + 2 Nights in Ubud Private Pool Villa',
        'Floating Breakfast in Private Pool Villa',
        'Full-day Nusa Penida West Island Tour by fast boat',
        'Ubud Monkey Forest, Tegallalang Rice Terraces & Kintamani Volcano view',
        'Private AC MPV with English-speaking Balinese driver'
      ],
      exclusions: [
        'Return international airfare',
        'Indonesia Visa on Arrival (~USD 35 paid at airport)',
        '5% GST & TCS'
      ],
      itinerary: [
        { day: 1, title: 'Arrive Bali & Seminyak Sunset', desc: 'VIP flower garland welcome, check-in to beach resort.' },
        { day: 2, title: 'Nusa Penida Island Escape', desc: 'Fast boat to Kelingking Beach, Angel’s Billabong & Broken Beach.' },
        { day: 3, title: 'Uluwatu Temple & Jimbaran BBQ', desc: 'Cliffside Kecak fire dance & beachfront seafood dinner.' },
        { day: 4, title: 'Transfer to Ubud Private Pool Villa', desc: 'Tegenungan Waterfall, coffee tasting & pool villa check-in.' },
        { day: 5, title: 'Tegallalang & Bali Swing', desc: 'Floating breakfast, rice terrace swing & Ubud Art Market.' },
        { day: 6, title: 'Departure', desc: 'Private transfer to Ngurah Rai Airport.' }
      ]
    }
  ];

  const DEFAULT_REFERRALS = [
    {
      id: 'ref-1',
      code: 'SWAN10',
      partnerName: 'VIP Partner — Ahmedabad',
      type: 'B2B Travel Agent',
      perk: '₹2,500 Off on International Packages + Priority Visa Assistance',
      usageLimit: 100,
      usedCount: 18,
      expiry: '2027-03-31',
      active: true
    },
    {
      id: 'ref-2',
      code: 'FRIEND-AMD',
      partnerName: 'White Swan Alumni & Friends',
      type: 'Friend / Alumni',
      perk: 'Complimentary Private Airport Transfer from Ahmedabad (AMD)',
      usageLimit: 50,
      usedCount: 11,
      expiry: '2027-06-30',
      active: true
    },
    {
      id: 'ref-3',
      code: 'CORP-VIP',
      partnerName: 'Gujarat Corporate Circle',
      type: 'Corporate Client',
      perk: 'Priority MICE Desk + Complimentary Lounge Upgrade',
      usageLimit: 200,
      usedCount: 9,
      expiry: '2027-12-31',
      active: true
    },
    {
      id: 'ref-4',
      code: 'JAINAM-VIP',
      partnerName: 'Jainam Consultancy Desk',
      type: 'Social / Influencer',
      perk: 'Flat ₹3,000 Off on Family & Honeymoon Circuits',
      usageLimit: 40,
      usedCount: 6,
      expiry: '2026-12-31',
      active: true
    }
  ];

  const DEFAULT_INQUIRIES = [
    {
      id: 'INQ-WSH-2026-8492',
      createdAt: '2026-11-24T10:15:00Z',
      category: 'International',
      packageTitle: 'Dubai & Abu Dhabi Luxe Escape',
      packageRef: 'WSH-INT-UAE01',
      referralCode: 'SWAN10',
      referredBy: 'VIP Partner — Ahmedabad',
      travelerName: 'Aarav Patel',
      phone: '+91 98250 11234',
      email: 'aarav.patel@example.in',
      city: 'Ahmedabad',
      travelDates: '15 Dec – 20 Dec 2026',
      adults: 2,
      children: 1,
      hotelTier: '5-Star Luxury',
      notes: 'Looking for Burj Khalifa fountain view room.',
      status: 'Quote Sent'
    },
    {
      id: 'INQ-WSH-2026-8491',
      createdAt: '2026-11-23T16:40:00Z',
      category: 'Domestic',
      packageTitle: 'Kashmir Paradise',
      packageRef: 'WSH-DOM-KSH01',
      referralCode: 'FRIEND-AMD',
      referredBy: 'White Swan Alumni & Friends',
      travelerName: 'Meera Shah',
      phone: '+91 98980 44556',
      email: 'meera.shah@example.in',
      city: 'Ahmedabad',
      travelDates: '10 Jan – 15 Jan 2027',
      adults: 4,
      children: 0,
      hotelTier: '4-Star',
      notes: 'Family trip, need Gondola Phase 2 assistance.',
      status: 'New'
    },
    {
      id: 'INQ-WSH-2026-8489',
      createdAt: '2026-11-22T12:10:00Z',
      category: 'International',
      packageTitle: 'Japan Cherry Blossom & Bullet Train',
      packageRef: 'WSH-INT-JPN03',
      referralCode: 'CORP-VIP',
      referredBy: 'Gujarat Corporate Circle',
      travelerName: 'Rohan Desai',
      phone: '+91 97240 88990',
      email: 'rohan.desai@example.in',
      city: 'Surat',
      travelDates: '02 Apr – 10 Apr 2027',
      adults: 2,
      children: 0,
      hotelTier: '4-Star',
      notes: 'Cherry blossom season honeymoon.',
      status: 'In Progress'
    }
  ];

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length ? parsed : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write skipped:', e);
    }
  }

  const DEFAULT_EVENTS = [
    {
      id: 'evt-1',
      entryType: 'Trip Memory',
      mediaFormat: 'Photo',
      title: '45-Member Gujarat Group Tour to Kashmir',
      locationDate: 'Gulmarg & Dal Lake, Kashmir • Oct 2026',
      caption: 'Handcrafted cedar houseboat stays, Phase 2 Gondola snow ascent, and private Wazwan welcome dinner curated by our Ahmedabad team.',
      mediaUrl: 'img/domestic-tour/kashmir.jpg',
      posterUrl: 'img/domestic-tour/kashmir.jpg',
      showInSlider: true
    },
    {
      id: 'evt-2',
      entryType: 'Organized Event',
      mediaFormat: 'Photo',
      title: 'Annual Pharma MICE Gala — Goa',
      locationDate: 'Candolim Beachfront Resort, Goa • Sep 2026',
      caption: 'Full-scale 120-delegate corporate incentive retreat featuring oceanfront conference staging, AV production, and sunset yacht awards.',
      mediaUrl: 'img/services/mice.jpg',
      posterUrl: 'img/services/mice.jpg',
      showInSlider: true
    },
    {
      id: 'evt-3',
      entryType: 'Trip Memory',
      mediaFormat: 'Video',
      title: 'Dubai Marina Yacht & Desert Sunset Reel',
      locationDate: 'Dubai, UAE • Aug 2026',
      caption: 'Private 52ft luxury yacht sailing across Palm Jumeirah followed by golden desert dune bashing and Level 148 Burj Khalifa reception.',
      mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      posterUrl: 'img/tours/dubai.jpg',
      showInSlider: true
    },
    {
      id: 'evt-4',
      entryType: 'Organized Event',
      mediaFormat: 'Photo',
      title: 'Royal Udaipur Destination Wedding Hospitality',
      locationDate: 'Lake Pichola Palace, Udaipur • Nov 2026',
      caption: 'End-to-end guest logistics, airport luxury fleet transfers, and 180-room palace block management.',
      mediaUrl: 'img/services/destination-wedding.jpg',
      posterUrl: 'img/services/destination-wedding.jpg',
      showInSlider: true
    },
    {
      id: 'evt-5',
      entryType: 'Trip Memory',
      mediaFormat: 'Photo',
      title: 'Japan Cherry Blossom Executive Family Tour',
      locationDate: 'Tokyo & Kyoto, Japan • Apr 2026',
      caption: 'Shinkansen bullet train journey, Mt. Fuji 5th Station excursion, and traditional Kyoto ryokan dining.',
      mediaUrl: 'img/international/japan.jpg',
      posterUrl: 'img/international/japan.jpg',
      showInSlider: true
    },
    {
      id: 'evt-6',
      entryType: 'Organized Event',
      mediaFormat: 'Video',
      title: 'Corporate Leadership Summit Highlight',
      locationDate: 'Downtown Dubai • Oct 2026',
      caption: 'Executive boardroom summit and gala awards night coordinated seamlessly from Ahmedabad.',
      mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      posterUrl: 'img/services/corporate-wedding.jpg',
      instagramUrl: 'https://www.instagram.com/whiteswanholidays/?hl=en',
      showInSlider: false
    },
    {
      id: 'evt-7',
      entryType: 'Trip Memory',
      mediaFormat: 'Instagram',
      title: 'Featured @whiteswanholidays Travel Reel',
      locationDate: 'Bali & Thailand • Sep 2026',
      caption: 'Live group tour stories, private pool villa sunsets, and honeymoon surprises straight from our official Instagram feed.',
      mediaUrl: 'img/instagram/post-1.jpg',
      posterUrl: 'img/instagram/post-1.jpg',
      instagramUrl: 'https://www.instagram.com/whiteswanholidays/?hl=en',
      showInSlider: true
    }
  ];

  function ensureSeeded() {
    if (!localStorage.getItem(STORAGE_KEYS.PACKAGES)) {
      writeJSON(STORAGE_KEYS.PACKAGES, DEFAULT_PACKAGES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.REFERRALS)) {
      writeJSON(STORAGE_KEYS.REFERRALS, DEFAULT_REFERRALS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
      writeJSON(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
      writeJSON(STORAGE_KEYS.EVENTS, DEFAULT_EVENTS);
    }
  }

  ensureSeeded();

  function formatINR(amount) {
    const num = Number(amount);
    if (isNaN(num)) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  }

  function getPackages(opts = {}) {
    let list = readJSON(STORAGE_KEYS.PACKAGES, DEFAULT_PACKAGES);
    if (opts.onlyActive) list = list.filter(p => p.active !== false);
    if (opts.category) list = list.filter(p => p.category.toLowerCase() === opts.category.toLowerCase());
    return list;
  }

  function getPackageBySlugOrRef(identifier) {
    if (!identifier) return null;
    const list = getPackages();
    return list.find(p => p.slug === identifier || p.refCode === identifier || p.id === identifier) || null;
  }

  function savePackage(pkg) {
    const list = getPackages();
    if (!pkg.id) pkg.id = 'pkg-' + Date.now();
    if (!pkg.slug) {
      pkg.slug = pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const idx = list.findIndex(p => p.id === pkg.id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...pkg };
    } else {
      list.unshift(pkg);
    }
    writeJSON(STORAGE_KEYS.PACKAGES, list);
    return pkg;
  }

  function deletePackage(id) {
    const list = getPackages().filter(p => p.id !== id);
    writeJSON(STORAGE_KEYS.PACKAGES, list);
  }

  function getReferrals() {
    return readJSON(STORAGE_KEYS.REFERRALS, DEFAULT_REFERRALS);
  }

  function verifyReferralCode(codeInput) {
    if (!codeInput) return null;
    const clean = codeInput.trim().toUpperCase();
    const list = getReferrals();
    const found = list.find(r => r.code.toUpperCase() === clean && r.active !== false);
    if (!found) return null;
    if (found.usageLimit && found.usedCount >= found.usageLimit) return { ...found, expiredOrFull: true };
    if (found.expiry && new Date(found.expiry) < new Date(new Date().toDateString())) {
      return { ...found, expiredOrFull: true };
    }
    return found;
  }

  function saveReferral(ref) {
    const list = getReferrals();
    ref.code = (ref.code || '').trim().toUpperCase();
    if (!ref.id) ref.id = 'ref-' + Date.now();
    const idx = list.findIndex(r => r.id === ref.id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...ref };
    } else {
      ref.usedCount = ref.usedCount || 0;
      list.unshift(ref);
    }
    writeJSON(STORAGE_KEYS.REFERRALS, list);
    return ref;
  }

  function deleteReferral(id) {
    const list = getReferrals().filter(r => r.id !== id);
    writeJSON(STORAGE_KEYS.REFERRALS, list);
  }

  function incrementReferralUse(codeInput) {
    if (!codeInput) return;
    const clean = codeInput.trim().toUpperCase();
    const list = getReferrals();
    const idx = list.findIndex(r => r.code.toUpperCase() === clean);
    if (idx >= 0) {
      list[idx].usedCount = (list[idx].usedCount || 0) + 1;
      writeJSON(STORAGE_KEYS.REFERRALS, list);
    }
  }

  function getInquiries() {
    return readJSON(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
  }

  function addInquiry(data) {
    const list = getInquiries();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const id = data.id || `INQ-WSH-2026-${randomNum}`;
    const record = {
      id,
      createdAt: new Date().toISOString(),
      category: data.category || 'Domestic',
      packageTitle: data.packageTitle || 'Custom Holiday Package',
      packageRef: data.packageRef || 'CUSTOM',
      referralCode: (data.referralCode || '').trim().toUpperCase(),
      referredBy: data.referredBy || '',
      travelerName: data.travelerName || 'Guest',
      phone: data.phone || '',
      email: data.email || '',
      city: data.city || 'Ahmedabad',
      travelDates: data.travelDates || 'Flexible',
      adults: Number(data.adults) || 2,
      children: Number(data.children) || 0,
      hotelTier: data.hotelTier || '4-Star',
      notes: data.notes || '',
      status: 'New'
    };
    list.unshift(record);
    writeJSON(STORAGE_KEYS.INQUIRIES, list);
    if (record.referralCode) {
      incrementReferralUse(record.referralCode);
    }
    return record;
  }

  function updateInquiryStatus(id, status) {
    const list = getInquiries();
    const idx = list.findIndex(i => i.id === id);
    if (idx >= 0) {
      list[idx].status = status;
      writeJSON(STORAGE_KEYS.INQUIRIES, list);
    }
  }

  /**
   * Builds structured WhatsApp Inquiry URL for White Swan Holidays Ahmedabad Desk
   */
  function buildWhatsAppInquiryURL(data) {
    const lines = [
      '*New Holiday Inquiry — White Swan Holidays*',
      ''
    ];
    if (data.id) lines.push(`🆔 *Inquiry ID:* ${data.id}`);
    lines.push(`🌍 *Category:* ${data.category || 'Custom'}`);
    lines.push(`📦 *Package / Destination:* ${data.packageTitle || 'Custom Route'}${data.packageRef ? ` (Ref: ${data.packageRef})` : ''}`);
    if (data.referralCode || data.referredBy) {
      lines.push(`🎟️ *Reference / Referral:* ${data.referralCode || 'Direct'}${data.referredBy ? ` — ${data.referredBy}` : ''}`);
    }
    lines.push('');
    lines.push(`👤 *Traveler:* ${data.travelerName || 'Prospective Guest'}`);
    if (data.phone) lines.push(`📞 *Phone:* ${data.phone}`);
    lines.push(`🛫 *Departure City:* ${data.city || 'Ahmedabad'}`);
    lines.push(`📅 *Travel Dates:* ${data.travelDates || 'Flexible'}`);
    lines.push(`👥 *Pax:* ${data.adults || 2} Adults, ${data.children || 0} Children`);
    lines.push(`🏨 *Hotel Tier:* ${data.hotelTier || '4-Star'}`);
    if (data.notes) lines.push(`📝 *Notes:* ${data.notes}`);
    lines.push('');
    lines.push('_Sent via White Swan Holidays Website_');

    return `https://wa.me/${WHATSAPP_DESK_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  function buildPackageWhatsAppURL(pkg) {
    const lines = [
      '*Package Quote Request — White Swan Holidays*',
      '',
      `📦 *Package:* ${pkg.title}`,
      `🔖 *Package Ref ID:* ${pkg.refCode}`,
      `🌍 *Category:* ${pkg.category}`,
      `⏱️ *Duration:* ${pkg.duration}`,
      `🛫 *Departure City:* Ahmedabad`,
      '',
      'Please share the latest tailored quotation and available departure dates.'
    ];
    return `https://wa.me/${WHATSAPP_DESK_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  function buildPackageEmailURL(pkg) {
    const subject = `Quote Inquiry: ${pkg.title} [${pkg.refCode}]`;
    const body = [
      'Namaste White Swan Holidays Team,',
      '',
      'I would like to request a tailored quote for the following package:',
      `Package Name: ${pkg.title}`,
      `Package Reference ID: ${pkg.refCode}`,
      `Category: ${pkg.category}`,
      `Duration: ${pkg.duration}`,
      `Destinations: ${pkg.destination || ''}`,
      'Departure City: Ahmedabad',
      '',
      'Please share the best available pricing and itinerary options.',
      '',
      'Thank you!'
    ].join('\n');
    return `mailto:info@whiteswanholidays.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function buildFollowUpWhatsAppURL(inq) {
    const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
    const targetPhone = cleanPhone.length >= 10 ? (cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`) : WHATSAPP_DESK_NUMBER;
    const msg = `Namaste ${inq.travelerName}! Greetings from *White Swan Holidays (CG Road, Ahmedabad)* 🦢\n\nThank you for your inquiry *${inq.id}* for *${inq.packageTitle}* (${inq.packageRef}).\n\nWe are preparing your personalized itinerary & best rates for ${inq.travelDates || 'your upcoming dates'}. When is a good time to connect?`;
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
  }

  // Theme Engine (Sunlit Light Mode & Midnight Dark Mode)
  function getTheme() {
    try {
      const saved = localStorage.getItem('wsh_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {}
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function setTheme(theme) {
    const clean = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', clean);
    try {
      localStorage.setItem('wsh_theme', clean);
    } catch (e) {}
    return clean;
  }

  function toggleTheme() {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    return setTheme(next);
  }

  function getEvents(opts = {}) {
    let list = readJSON(STORAGE_KEYS.EVENTS, DEFAULT_EVENTS);
    if (opts.sliderOnly) list = list.filter(e => e.showInSlider !== false);
    if (opts.entryType && opts.entryType !== 'all') {
      if (opts.entryType === 'Instagram') {
        list = list.filter(e => e.mediaFormat === 'Instagram' || e.entryType === 'Instagram Highlight' || Boolean(e.instagramUrl && e.instagramUrl.includes('/p/') || e.instagramUrl && e.instagramUrl.includes('/reel/')));
      } else {
        list = list.filter(e => e.entryType === opts.entryType);
      }
    }
    return list;
  }

  function saveEvent(ev) {
    const list = getEvents();
    if (!ev.id) ev.id = 'evt-' + Date.now();
    const idx = list.findIndex(x => x.id === ev.id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...ev };
    } else {
      list.unshift(ev);
    }
    writeJSON(STORAGE_KEYS.EVENTS, list);
    return ev;
  }

  function deleteEvent(id) {
    const list = getEvents().filter(e => e.id !== id);
    writeJSON(STORAGE_KEYS.EVENTS, list);
  }

  // Apply immediately to prevent flash of wrong theme
  setTheme(getTheme());

  window.WSHStore = {
    WHATSAPP_DESK_NUMBER,
    INSTAGRAM_URL,
    FACEBOOK_URL,
    formatINR,
    getTheme,
    setTheme,
    toggleTheme,
    getPackages,
    getPackageBySlugOrRef,
    savePackage,
    deletePackage,
    getReferrals,
    verifyReferralCode,
    saveReferral,
    deleteReferral,
    getInquiries,
    addInquiry,
    updateInquiryStatus,
    getEvents,
    saveEvent,
    deleteEvent,
    buildWhatsAppInquiryURL,
    buildPackageWhatsAppURL,
    buildPackageEmailURL,
    buildFollowUpWhatsAppURL,
    isAdminLoggedIn: () => localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true',
    setAdminLoggedIn: (val) => localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, val ? 'true' : 'false')
  };
})();
