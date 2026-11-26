/**
 * White Swan Holidays — Centralized Data Store & WhatsApp Lead Engine
 * Manages Packages (Domestic & International), Referral Codes, Inquiries CRM,
 * and structured WhatsApp URL generation.
 */

(function () {
  'use strict';

  const STORAGE_KEYS = {
    PACKAGES: 'wsh_packages_v3',
    REFERRALS: 'wsh_referrals_v2',
    INQUIRIES: 'wsh_inquiries_v2',
    EVENTS: 'wsh_events_v3',
    ADMIN_AUTH: 'wsh_admin_auth_v2'
  };

  const WHATSAPP_DESK_NUMBER = '919925811770';
  const INSTAGRAM_URL = 'https://www.instagram.com/whiteswanholidays/?hl=en';
  const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61579766578124';

  const DEFAULT_PACKAGES = [
  {
    "id": "pkg-dom-01",
    "slug": "kerala-gods-own-country",
    "refCode": "WSH-DOM-KER01",
    "title": "God's Own Country: Munnar, Thekkady & Alleppey Houseboat",
    "category": "Domestic",
    "destination": "Kochi, Munnar, Thekkady & Alleppey",
    "region": "Kerala, India",
    "duration": "6 Days / 5 Nights",
    "nights": 5,
    "price": 24500,
    "style": "Honeymoon & Family",
    "visaType": "No Visa Required (Domestic)",
    "flightInfo": "Direct flights from Ahmedabad (AMD) to Kochi (COK)",
    "bestSeason": "September – March",
    "image": "img/tours/kerala.jpg",
    "featured": true,
    "active": true,
    "highlights": [
      "Kochi Fort Heritage",
      "Munnar Tea Estates & Eravikulam",
      "Periyar Wildlife & Spice Plantations",
      "Private Luxury Alleppey Houseboat"
    ],
    "overview": "Glide through palm-fringed emerald backwaters on a private teakwood houseboat, wake up amidst misty Munnar tea estates, and explore Periyar spice plantations.",
    "inclusions": [
      "5 Nights luxury resort & private Alleppey houseboat stay",
      "Daily breakfast + all meals onboard houseboat",
      "Private AC sedan/SUV with chauffeur",
      "Periyar spice plantation guided walk"
    ],
    "exclusions": [
      "Airfare to/from Kochi",
      "Entry tickets & Ayurvedic spa treatments",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Kochi & Fort Kochi Heritage",
        "desc": "Airport welcome, explore Chinese Fishing Nets, Mattancherry Palace, and sunset Marine Drive."
      },
      {
        "day": 2,
        "title": "Kochi to Munnar Tea Hills",
        "desc": "Scenic drive past Cheeyappara waterfalls into misty Munnar tea gardens."
      },
      {
        "day": 3,
        "title": "Munnar Sightseeing & Eravikulam",
        "desc": "Visit Eravikulam National Park, Tea Museum, Mattupetty Dam, and Echo Point."
      },
      {
        "day": 4,
        "title": "Thekkady Periyar Wildlife & Spices",
        "desc": "Drive to Thekkady, Periyar Lake boat safari, aromatic spice tour & Kathakali show."
      },
      {
        "day": 5,
        "title": "Private Alleppey Backwater Houseboat",
        "desc": "Board exclusive AC houseboat with personal chef for tranquil canal cruising."
      },
      {
        "day": 6,
        "title": "Alleppey to Kochi Departure",
        "desc": "Morning backwater breakfast and private airport transfer."
      }
    ]
  },
  {
    "id": "pkg-dom-02",
    "slug": "manali-himalayan-escape",
    "refCode": "WSH-DOM-MAN02",
    "title": "Himalayan Escape: Manali, Solang Valley & Atal Tunnel",
    "category": "Domestic",
    "destination": "Manali, Solang Valley, Atal Tunnel, Sissu & Kullu",
    "region": "Himachal Pradesh, India",
    "duration": "5 Days / 4 Nights",
    "nights": 4,
    "price": 18500,
    "style": "Adventure & Honeymoon",
    "visaType": "No Visa Required (Domestic)",
    "flightInfo": "Flights to Chandigarh (IXC) or Bhuntar (KUU) from Ahmedabad",
    "bestSeason": "October – June",
    "image": "img/tours/manali.jpg",
    "featured": true,
    "active": true,
    "highlights": [
      "Hadimba Devi Temple",
      "Old Manali Cafes",
      "Solang Valley Adventure Sports",
      "Atal Tunnel & Sissu Valley",
      "Kullu River Rafting"
    ],
    "overview": "Breathe crisp alpine air in cedar-forested Manali, cross the engineering marvel Atal Tunnel into Sissu Valley, and enjoy snow adventures at Solang.",
    "inclusions": [
      "4 Nights boutique mountain resort stay",
      "Daily breakfast & dinner",
      "Private SUV for local sightseeing & Atal Tunnel excursion",
      "All hill permits & toll taxes"
    ],
    "exclusions": [
      "Airfare / Volvo tickets",
      "Paragliding, zorbing, skiing & rafting fees",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Manali & Mall Road",
        "desc": "Check-in to mountain resort, evening stroll along Mall Road & Van Vihar."
      },
      {
        "day": 2,
        "title": "Hadimba Temple & Old Manali",
        "desc": "Visit Hadimba Devi Temple, Vashisht Hot Springs, Tibetan Monastery & Old Manali cafes."
      },
      {
        "day": 3,
        "title": "Solang Valley Adventure Day",
        "desc": "Full day at Solang Valley for ropeway, paragliding, ATV rides, and snow activities."
      },
      {
        "day": 4,
        "title": "Atal Tunnel & Sissu Valley Excursion",
        "desc": "Drive through Atal Tunnel to Lahaul’s Sissu Waterfall & snow peaks."
      },
      {
        "day": 5,
        "title": "Kullu River Rafting & Departure",
        "desc": "Optional Beas river rafting & Kullu shawl factory stop en route departure."
      }
    ]
  },
  {
    "id": "pkg-dom-03",
    "slug": "kashmir-paradise-on-earth",
    "refCode": "WSH-DOM-KSH03",
    "title": "Paradise on Earth: Srinagar, Gulmarg, Pahalgam & Sonamarg",
    "category": "Domestic",
    "destination": "Srinagar, Gulmarg, Pahalgam & Sonamarg",
    "region": "Jammu & Kashmir, India",
    "duration": "6 Days / 5 Nights",
    "nights": 5,
    "price": 28500,
    "style": "Family & Honeymoon",
    "visaType": "No Visa Required (Domestic)",
    "flightInfo": "Direct flights from Ahmedabad (AMD) to Srinagar (SXR)",
    "bestSeason": "March – October & Winter Snow",
    "image": "img/domestic-tour/kashmir.jpg",
    "featured": true,
    "active": true,
    "highlights": [
      "Dal Lake Luxury Shikara & Houseboat",
      "Mughal Gardens",
      "Gulmarg Gondola Phase 1 & 2",
      "Betaab & Aru Valley",
      "Thajiwas Glacier"
    ],
    "overview": "Experience the alpine stillness of Kashmir with private Dal Lake shikara cruises, Gulmarg Gondola rides, Betaab Valley meadows, and Thajiwas Glacier.",
    "inclusions": [
      "5 Nights stay in 4-Star resorts & luxury Dal Lake houseboat",
      "Daily breakfast & Kashmiri dinner",
      "Private Innova Crysta for all transfers",
      "1-Hour private Shikara ride on Dal Lake"
    ],
    "exclusions": [
      "Airfare to Srinagar",
      "Gulmarg Gondola tickets & pony rides",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Srinagar & Dal Lake Shikara",
        "desc": "Airport pickup, check-in to luxury cedar houseboat, sunset Shikara ride."
      },
      {
        "day": 2,
        "title": "Sonamarg & Thajiwas Glacier",
        "desc": "Day excursion to Sonamarg Meadow of Gold and Thajiwas Glacier."
      },
      {
        "day": 3,
        "title": "Gulmarg Gondola Phase 1 & 2",
        "desc": "Drive to Gulmarg, ascend Apharwat Peak via Gondola cable car."
      },
      {
        "day": 4,
        "title": "Pahalgam Betaab & Aru Valley",
        "desc": "Transfer via Pampore saffron fields; explore Betaab & Aru Valleys."
      },
      {
        "day": 5,
        "title": "Srinagar Mughal Gardens",
        "desc": "Return to Srinagar, tour Nishat Bagh, Shalimar Bagh, and Shankaracharya Hill."
      },
      {
        "day": 6,
        "title": "Departure from Srinagar",
        "desc": "Morning breakfast and private transfer to Srinagar Airport."
      }
    ]
  },
  {
    "id": "pkg-dom-04",
    "slug": "andaman-tropical-island-retreat",
    "refCode": "WSH-DOM-AND04",
    "title": "Tropical Island Retreat: Port Blair, Havelock & Neil Island",
    "category": "Domestic",
    "destination": "Port Blair, Havelock Island & Neil Island",
    "region": "Andaman & Nicobar Islands, India",
    "duration": "6 Days / 5 Nights",
    "nights": 5,
    "price": 29500,
    "style": "Honeymoon & Luxury",
    "visaType": "No Visa Required (Domestic)",
    "flightInfo": "Connecting flights from Ahmedabad (AMD) to Port Blair (IXZ)",
    "bestSeason": "October – May",
    "image": "img/packages/andaman-nicobar.jpg",
    "featured": true,
    "active": true,
    "highlights": [
      "Cellular Jail Light & Sound Show",
      "Radhanagar Beach Sunset",
      "Elephant Beach Snorkeling/Scuba",
      "Kalapathar Beach & Natural Bridge"
    ],
    "overview": "Unwind on turquoise coral beaches across Havelock and Neil Islands with private catamaran transfers, snorkeling reefs, and Radhanagar sunsets.",
    "inclusions": [
      "5 Nights beachfront resort stay",
      "Daily breakfast",
      "Private AC transfers + Makruzz/Nautika ferry tickets",
      "Cellular Jail Light & Sound Show tickets"
    ],
    "exclusions": [
      "Airfare to Port Blair",
      "Scuba diving, sea walk & personal water sports",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Port Blair & Cellular Jail",
        "desc": "Airport pickup, Corbyn’s Cove Beach, and evening Cellular Jail Light & Sound Show."
      },
      {
        "day": 2,
        "title": "Port Blair to Havelock & Radhanagar Beach",
        "desc": "High-speed cruise to Havelock Island; sunset at Asia’s finest Radhanagar Beach."
      },
      {
        "day": 3,
        "title": "Elephant Beach Snorkeling & Coral Reefs",
        "desc": "Speedboat to Elephant Beach for snorkeling, glass-bottom boat & water sports."
      },
      {
        "day": 4,
        "title": "Kalapathar Beach & Neil Island Cruise",
        "desc": "Sunrise at Kalapathar Beach, ferry to serene Neil Island, Laxmanpur Beach sunset."
      },
      {
        "day": 5,
        "title": "Natural Bridge & Return to Port Blair",
        "desc": "Visit Natural Rock Bridge & Bharatpur Beach; afternoon ferry to Port Blair."
      },
      {
        "day": 6,
        "title": "Departure from Port Blair",
        "desc": "Morning breakfast and drop at Veer Savarkar Airport."
      }
    ]
  },
  {
    "id": "pkg-dom-05",
    "slug": "rajasthan-royal-heritage-trail",
    "refCode": "WSH-DOM-RAJ05",
    "title": "Royal Heritage Trail: Jaipur, Jodhpur, Jaisalmer & Udaipur",
    "category": "Domestic",
    "destination": "Jaipur, Jodhpur, Jaisalmer & Udaipur",
    "region": "Rajasthan, India",
    "duration": "8 Days / 7 Nights",
    "nights": 7,
    "price": 34500,
    "style": "Luxury & Family",
    "visaType": "No Visa Required (Domestic)",
    "flightInfo": "Direct flights/trains from Ahmedabad (AMD) to Udaipur / Jaipur",
    "bestSeason": "October – March",
    "image": "img/tours/jaisalmer.jpg",
    "featured": true,
    "active": true,
    "highlights": [
      "Amber Fort & Hawa Mahal",
      "Mehrangarh Fort",
      "Sam Sand Dunes Luxury Desert Camp",
      "City Palace & Lake Pichola Boat Ride"
    ],
    "overview": "Step into royal palaces, golden desert dunes, and shimmering lakefronts across Rajasthan’s four iconic heritage cities.",
    "inclusions": [
      "7 Nights heritage havelis, luxury desert camp & 4-Star hotels",
      "Daily breakfast + desert camp cultural dinner",
      "Private AC Innova/Tempo Traveller",
      "Camel safari & folk evening at Sam Sand Dunes"
    ],
    "exclusions": [
      "Airfare / Rail tickets",
      "Monument entry fees & Lake Pichola boat tickets",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Jaipur — Pink City Welcome",
        "desc": "Check-in, evening Chokhi Dhani or Birla Mandir & Albert Hall illumination."
      },
      {
        "day": 2,
        "title": "Amber Fort, Hawa Mahal & City Palace",
        "desc": "Full-day Jaipur royal palaces, Jantar Mantar & Johari Bazaar."
      },
      {
        "day": 3,
        "title": "Jaipur to Jodhpur — The Blue City",
        "desc": "Drive to Jodhpur; explore Mehrangarh Fort, Jaswant Thada & Clock Tower."
      },
      {
        "day": 4,
        "title": "Jodhpur to Jaisalmer Golden Fort",
        "desc": "Proceed to Jaisalmer; visit Sonar Quila and Patwon Ki Haveli."
      },
      {
        "day": 5,
        "title": "Sam Sand Dunes Luxury Desert Camp",
        "desc": "Dune bashing, camel sunset safari, Rajasthani folk dance & gala camp dinner."
      },
      {
        "day": 6,
        "title": "Jaisalmer to Udaipur City of Lakes",
        "desc": "Scenic drive to Udaipur; evening leisure by Fateh Sagar Lake."
      },
      {
        "day": 7,
        "title": "Udaipur City Palace & Lake Pichola",
        "desc": "Tour City Palace, Jagdish Temple, Saheliyon Ki Bari & sunset Lake Pichola boat ride."
      },
      {
        "day": 8,
        "title": "Departure from Udaipur",
        "desc": "Breakfast and transfer to Udaipur Airport or Railway Station."
      }
    ]
  },
  {
    "id": "pkg-dom-06",
    "slug": "vibrant-gujarat-circuit",
    "refCode": "WSH-DOM-GUJ06",
    "title": "Vibrant Gujarat: Gir, Somnath, Dwarka & Rann of Kutch",
    "category": "Domestic",
    "destination": "Statue of Unity, Gir, Somnath, Dwarka & Rann of Kutch",
    "region": "Gujarat, India",
    "duration": "7 Days / 6 Nights",
    "nights": 6,
    "price": 24900,
    "style": "Family & Spiritual",
    "visaType": "No Visa Required (Domestic)",
    "flightInfo": "Ex-Ahmedabad (AMD) Private Chauffeur Circuit",
    "bestSeason": "November – March (Rann Utsav)",
    "image": "img/tours/gujarat.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "Statue of Unity",
      "Gir National Park Jeep Safari",
      "Somnath Jyotirlinga Aarti",
      "Dwarkadhish & Bet Dwarka",
      "White Rann Cultural Night"
    ],
    "overview": "A signature ex-Ahmedabad circuit combining the Statue of Unity, Asiatic lions in Gir, sacred Jyotirlinga temples, and the White Rann of Kutch.",
    "inclusions": [
      "6 Nights luxury tents & 4-Star hotels",
      "Daily breakfast & pure-veg/Jain-friendly meals",
      "Private AC vehicle ex-Ahmedabad",
      "White Rann permit & cultural evening"
    ],
    "exclusions": [
      "Gir Safari & Statue of Unity viewing gallery tickets",
      "Personal expenses",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Ahmedabad to Statue of Unity",
        "desc": "Morning pickup, Kevadia Valley of Flowers, Statue of Unity & laser show."
      },
      {
        "day": 2,
        "title": "Drive to Sasan Gir Forest",
        "desc": "Proceed to Gir National Park, evening jungle resort leisure."
      },
      {
        "day": 3,
        "title": "Gir Lion Safari & Somnath Jyotirlinga",
        "desc": "Early morning Gir Jeep Safari; afternoon drive to Somnath for evening Aarti."
      },
      {
        "day": 4,
        "title": "Porbandar & Dwarkadhish Temple",
        "desc": "Stop at Kirti Mandir Porbandar; evening Dwarkadhish Temple Darshan."
      },
      {
        "day": 5,
        "title": "Bet Dwarka & Nageshwar Jyotirlinga",
        "desc": "Morning ferry to Bet Dwarka, Rukmini Temple, and Nageshwar Jyotirlinga."
      },
      {
        "day": 6,
        "title": "Bhuj & White Rann of Kutch Sunset",
        "desc": "Drive to Kutch, check-in to Rann tent city, sunset over salt flats & folk show."
      },
      {
        "day": 7,
        "title": "Bhuj Handicrafts & Return to Ahmedabad",
        "desc": "Morning Kalo Dungar / Bhujodi artisans visit and drop in Ahmedabad."
      }
    ]
  },
  {
    "id": "pkg-dom-07",
    "slug": "madhya-pradesh-incredible-india",
    "refCode": "WSH-DOM-MP07",
    "title": "Heart of Incredible India: Khajuraho, Bandhavgarh & Pachmarhi",
    "category": "Domestic",
    "destination": "Khajuraho, Bandhavgarh, Bhedaghat & Pachmarhi",
    "region": "Madhya Pradesh, India",
    "duration": "7 Days / 6 Nights",
    "nights": 6,
    "price": 27900,
    "style": "Adventure & Family",
    "visaType": "No Visa Required (Domestic)",
    "flightInfo": "Flights from Ahmedabad (AMD) to Khajuraho / Jabalpur / Bhopal",
    "bestSeason": "October – June",
    "image": "img/domestic-tour/mp.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "UNESCO Khajuraho Temples",
      "Bandhavgarh Tiger Reserve Safari",
      "Bhedaghat Marble Rocks & Dhuandhar Falls",
      "Satpura Queen Pachmarhi Hills"
    ],
    "overview": "Discover UNESCO temple artistry, thrilling Royal Bengal tiger safaris, dramatic Narmada marble gorges, and serene Satpura hillscapes.",
    "inclusions": [
      "6 Nights wildlife lodges & heritage hotels",
      "Daily breakfast & jungle lodge dinners",
      "Private AC SUV throughout",
      "1 Core-Zone Bandhavgarh Jeep Safari"
    ],
    "exclusions": [
      "Airfare / Train tickets",
      "Additional safari permits & boat tickets",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Khajuraho & Western Temples",
        "desc": "Explore UNESCO Khajuraho Western Group of Temples & evening Sound & Light Show."
      },
      {
        "day": 2,
        "title": "Khajuraho to Bandhavgarh Tiger Reserve",
        "desc": "Morning Eastern Temples; scenic drive to Bandhavgarh wildlife lodge."
      },
      {
        "day": 3,
        "title": "Bandhavgarh Morning & Afternoon Safaris",
        "desc": "Track Royal Bengal Tigers across bamboo groves and sal forests."
      },
      {
        "day": 4,
        "title": "Jabalpur Bhedaghat & Dhuandhar Falls",
        "desc": "Drive to Jabalpur, boat ride through Marble Rocks & roaring Dhuandhar Falls."
      },
      {
        "day": 5,
        "title": "Transfer to Pachmarhi — Queen of Satpura",
        "desc": "Ascend to lush Pachmarhi plateau; sunset at Dhoopgarh Peak."
      },
      {
        "day": 6,
        "title": "Bee Falls, Pandav Caves & Jata Shankar",
        "desc": "Full day exploring Pachmarhi’s waterfalls, caves, and forest viewpoints."
      },
      {
        "day": 7,
        "title": "Bhopal / Pipariya Departure",
        "desc": "Breakfast and transfer to Bhopal Airport or railway station."
      }
    ]
  },
  {
    "id": "pkg-dom-08",
    "slug": "north-india-golden-triangle-rishikesh",
    "refCode": "WSH-DOM-NOR08",
    "title": "Golden Triangle & Himalayan Foothills: Delhi, Agra, Jaipur & Rishikesh",
    "category": "Domestic",
    "destination": "Delhi, Agra, Jaipur, Haridwar & Rishikesh",
    "region": "North India",
    "duration": "8 Days / 7 Nights",
    "nights": 7,
    "price": 31500,
    "style": "Family & Spiritual",
    "visaType": "No Visa Required (Domestic)",
    "flightInfo": "Direct flights from Ahmedabad (AMD) to Delhi (DEL)",
    "bestSeason": "October – April",
    "image": "img/packages/north-india.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "Old & New Delhi Heritage",
      "Taj Mahal Sunrise & Agra Fort",
      "Jaipur Pink City Palaces",
      "Haridwar Ganga Aarti & Rishikesh Laxman Jhula"
    ],
    "overview": "Combine India’s celebrated Golden Triangle monuments with tranquil Himalayan foothills along the sacred Ganga in Rishikesh.",
    "inclusions": [
      "7 Nights 4-Star hotels across Delhi, Agra, Jaipur & Rishikesh",
      "Daily breakfast",
      "Private AC Innova/Sedan throughout",
      "Licensed monument guides in Delhi, Agra & Jaipur"
    ],
    "exclusions": [
      "Airfare to Delhi",
      "Monument entrance tickets",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Delhi & New Delhi Landmarks",
        "desc": "Airport pickup, India Gate, Qutub Minar, and Humayun’s Tomb."
      },
      {
        "day": 2,
        "title": "Old Delhi Heritage & Drive to Agra",
        "desc": "Jama Masjid, Red Fort, Chandni Chowk rickshaw ride, then Agra transfer."
      },
      {
        "day": 3,
        "title": "Taj Mahal Sunrise & Jaipur Transfer",
        "desc": "Sunrise at Taj Mahal, Agra Fort, Fatehpur Sikri en route Jaipur."
      },
      {
        "day": 4,
        "title": "Jaipur Royal Palaces",
        "desc": "Amber Fort, Hawa Mahal, City Palace & Jantar Mantar."
      },
      {
        "day": 5,
        "title": "Jaipur to Haridwar Ganga Aarti",
        "desc": "Drive to Haridwar; witness evening Har Ki Pauri Ganga Aarti."
      },
      {
        "day": 6,
        "title": "Rishikesh Laxman Jhula & Ashrams",
        "desc": "Explore Ram Jhula, Laxman Jhula, Beatles Ashram & Triveni Ghat."
      },
      {
        "day": 7,
        "title": "Rishikesh Adventure & Return to Delhi",
        "desc": "Optional river rafting / yoga session, afternoon drive back to Delhi."
      },
      {
        "day": 8,
        "title": "Departure from Delhi",
        "desc": "Morning breakfast and transfer to Delhi Airport."
      }
    ]
  },
  {
    "id": "pkg-dom-09",
    "slug": "south-india-southern-splendor",
    "refCode": "WSH-DOM-SOU09",
    "title": "Southern Splendor: Bengaluru, Mysuru, Ooty, Kodaikanal & Madurai",
    "category": "Domestic",
    "destination": "Bengaluru, Mysuru, Ooty, Kodaikanal & Madurai",
    "region": "South India",
    "duration": "8 Days / 7 Nights",
    "nights": 7,
    "price": 32500,
    "style": "Family & Honeymoon",
    "visaType": "No Visa Required (Domestic)",
    "flightInfo": "Direct flights from Ahmedabad (AMD) to Bengaluru (BLR) / Madurai (IXM)",
    "bestSeason": "September – May",
    "image": "img/packages/south-india.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "Mysore Palace",
      "Nilgiri Mountain Railway & Ooty Gardens",
      "Kodaikanal Coaker’s Walk & Pillar Rocks",
      "Meenakshi Amman Temple"
    ],
    "overview": "Traverse royal Mysuru, misty Nilgiri tea hills of Ooty, Kodaikanal pine forests, and ancient temple grandeur in Madurai.",
    "inclusions": [
      "7 Nights 4-Star hotels & hill resorts",
      "Daily breakfast",
      "Private AC SUV for entire South India circuit",
      "All interstate taxes & parking"
    ],
    "exclusions": [
      "Airfare",
      "Toy Train & monument entry tickets",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Bengaluru & Drive to Mysuru",
        "desc": "Explore Lalbagh Gardens, transfer to Mysuru, Brindavan Gardens musical fountain."
      },
      {
        "day": 2,
        "title": "Mysore Palace & Chamundi Hills",
        "desc": "Tour opulent Mysore Palace, Chamundeshwari Temple & St. Philomena’s Church."
      },
      {
        "day": 3,
        "title": "Mysuru to Ooty via Bandipur",
        "desc": "Scenic drive through Bandipur forest into Ooty; Botanical Gardens & Ooty Lake."
      },
      {
        "day": 4,
        "title": "Coonoor & Nilgiri Mountain Railway",
        "desc": "Toy train ride, Sim’s Park, Lamb’s Rock & Doddabetta Peak."
      },
      {
        "day": 5,
        "title": "Ooty to Kodaikanal Princess of Hills",
        "desc": "Transfer to Kodaikanal; evening stroll at Kodai Lake."
      },
      {
        "day": 6,
        "title": "Kodaikanal Coaker’s Walk & Pillar Rocks",
        "desc": "Visit Bryant Park, Coaker’s Walk, Pillar Rocks, and Guna Caves."
      },
      {
        "day": 7,
        "title": "Kodaikanal to Madurai Meenakshi Temple",
        "desc": "Drive to Madurai; evening Darshan at iconic Meenakshi Amman Temple."
      },
      {
        "day": 8,
        "title": "Departure from Madurai",
        "desc": "Visit Thirumalai Nayakkar Palace and drop at Madurai Airport."
      }
    ]
  },
  {
    "id": "pkg-dom-10",
    "slug": "tamil-nadu-temple-coastal-charm",
    "refCode": "WSH-DOM-TN10",
    "title": "Temple Architecture & Coastal Charm: Chennai, Mahabalipuram, Thanjavur & Rameswaram",
    "category": "Domestic",
    "destination": "Chennai, Mahabalipuram, Pondicherry, Thanjavur & Rameswaram",
    "region": "Tamil Nadu, India",
    "duration": "6 Days / 5 Nights",
    "nights": 5,
    "price": 23500,
    "style": "Spiritual & Family",
    "visaType": "No Visa Required (Domestic)",
    "flightInfo": "Direct flights from Ahmedabad (AMD) to Chennai (MAA)",
    "bestSeason": "October – March",
    "image": "img/domestic-tour/tamilnadu.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "Mahabalipuram Shore Temple",
      "Pondicherry French Quarter",
      "Brihadeeswarar Temple",
      "Rameswaram & Dhanushkodi"
    ],
    "overview": "Explore UNESCO Chola & Pallava temple masterpieces, Pondicherry’s serene French promenade, and sacred Rameswaram island.",
    "inclusions": [
      "5 Nights heritage & coastal 4-Star hotels",
      "Daily breakfast",
      "Private AC vehicle ex-Chennai",
      "All toll & interstate fees"
    ],
    "exclusions": [
      "Airfare",
      "Temple special darshan & monument tickets",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Chennai & Mahabalipuram Shore Temple",
        "desc": "Explore Kapaleeshwarar Temple, Marina Beach & UNESCO Shore Temple."
      },
      {
        "day": 2,
        "title": "Pondicherry French Quarter & Auroville",
        "desc": "Drive along East Coast Road to Pondicherry; Promenade Beach & Matrimandir."
      },
      {
        "day": 3,
        "title": "Thanjavur Brihadeeswarar Big Temple",
        "desc": "Visit UNESCO Chola Brihadeeswarar Temple & Thanjavur Royal Palace."
      },
      {
        "day": 4,
        "title": "Rameswaram Pamban Bridge & Temple",
        "desc": "Cross Pamban Sea Bridge to Rameswaram; evening Ramanathaswamy Temple Darshan."
      },
      {
        "day": 5,
        "title": "Dhanushkodi & APJ Abdul Kalam Memorial",
        "desc": "Sunrise Agni Theertham bath, Dhanushkodi tip & Dr. Kalam Memorial."
      },
      {
        "day": 6,
        "title": "Madurai / Chennai Departure",
        "desc": "Morning breakfast and transfer to Madurai/Trichy/Chennai airport."
      }
    ]
  },
  {
    "id": "pkg-dom-11",
    "slug": "char-dham-sacred-himalayan-yatra",
    "refCode": "WSH-DOM-CHD11",
    "title": "Sacred Himalayan Yatra: Yamunotri, Gangotri, Kedarnath & Badrinath",
    "category": "Domestic",
    "destination": "Haridwar, Barkot, Uttarkashi, Guptkashi, Kedarnath & Badrinath",
    "region": "Uttarakhand, India",
    "duration": "11 Days / 10 Nights",
    "nights": 10,
    "price": 38500,
    "style": "Pilgrimage & Spiritual",
    "visaType": "Yatra Registration Included",
    "flightInfo": "Direct flights from Ahmedabad (AMD) to Dehradun (DED) / Delhi (DEL)",
    "bestSeason": "May – June & September – October",
    "image": "img/packages/char-dham.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "Haridwar/Rishikesh Departure",
      "Barkot & Yamunotri Trek",
      "Uttarkashi & Gangotri Dham",
      "Kedarnath Darshan",
      "Badrinath & Mana Village"
    ],
    "overview": "Complete spiritual pilgrimage across Uttarakhand’s four sacred shrines with comfortable stays, pure-vegetarian meals, and dedicated yatra logistics.",
    "inclusions": [
      "10 Nights best-available yatra hotels & camps",
      "Daily pure-veg breakfast & dinner",
      "Private hill-experienced Tempo Traveller/Innova",
      "Char Dham Yatra registration assistance"
    ],
    "exclusions": [
      "Airfare",
      "Kedarnath Helicopter / Pony / Palki charges",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Haridwar Arrival & Ganga Aarti",
        "desc": "Pickup from Dehradun/Haridwar, evening Har Ki Pauri Aarti."
      },
      {
        "day": 2,
        "title": "Haridwar to Barkot via Mussoorie",
        "desc": "Scenic mountain drive past Kempty Falls to Barkot."
      },
      {
        "day": 3,
        "title": "Yamunotri Dham Darshan",
        "desc": "Drive to Janki Chatti, 6 km trek/pony to Yamunotri Temple & hot springs."
      },
      {
        "day": 4,
        "title": "Barkot to Uttarkashi",
        "desc": "Drive to Uttarkashi; visit Kashi Vishwanath Temple."
      },
      {
        "day": 5,
        "title": "Gangotri Dham Sacred Darshan",
        "desc": "Excursion to Gangotri Temple along Bhagirathi River & Harsil Valley."
      },
      {
        "day": 6,
        "title": "Uttarkashi to Guptkashi",
        "desc": "Full-day scenic transfer along Mandakini River to Guptkashi."
      },
      {
        "day": 7,
        "title": "Sonprayag to Kedarnath Dham",
        "desc": "Trek or fly by helicopter from Phata/Sirsi to Kedarnath; evening Aarti."
      },
      {
        "day": 8,
        "title": "Kedarnath Morning Darshan & Return",
        "desc": "Morning temple prayers and descend back to Guptkashi."
      },
      {
        "day": 9,
        "title": "Guptkashi to Badrinath Dham",
        "desc": "Drive via Joshimath to Badrinath; Tapt Kund bath & evening Aarti."
      },
      {
        "day": 10,
        "title": "Mana Village & Drive to Rudraprayag",
        "desc": "Visit India’s last village Mana, Vyas Gufa, then proceed to Rudraprayag/Srinagar."
      },
      {
        "day": 11,
        "title": "Rishikesh & Haridwar Departure",
        "desc": "Stop at Devprayag Sangam & Rishikesh before airport/station drop."
      }
    ]
  },
  {
    "id": "pkg-dom-12",
    "slug": "kedarnath-divine-himalayan-pilgrimage",
    "refCode": "WSH-DOM-KED12",
    "title": "Divine Himalayan Pilgrimage: Haridwar, Guptkashi & Kedarnath Dham",
    "category": "Domestic",
    "destination": "Haridwar, Devprayag, Guptkashi & Kedarnath",
    "region": "Uttarakhand, India",
    "duration": "5 Days / 4 Nights",
    "nights": 4,
    "price": 19500,
    "style": "Pilgrimage & Spiritual",
    "visaType": "Yatra Registration Included",
    "flightInfo": "Flights from Ahmedabad (AMD) to Dehradun (DED)",
    "bestSeason": "May – June & September – October",
    "image": "img/packages/kedarnath.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "Devprayag Sangam",
      "Sonprayag & Gaurikund Base",
      "Kedarnath Temple Darshan",
      "Triyuginarayan Temple Visit"
    ],
    "overview": "Focused 5-day pilgrimage to sacred Kedarnath Dham with flexible trek or helicopter support, pure-veg meals, and Triyuginarayan darshan.",
    "inclusions": [
      "4 Nights comfortable mountain stays",
      "Daily pure-veg breakfast & dinner",
      "Private vehicle ex-Haridwar/Dehradun",
      "Yatra e-pass registration"
    ],
    "exclusions": [
      "Airfare",
      "Helicopter tickets, pony or palki charges",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Haridwar / Dehradun to Guptkashi",
        "desc": "Drive past Devprayag & Rudraprayag confluences to Guptkashi."
      },
      {
        "day": 2,
        "title": "Sonprayag, Gaurikund & Kedarnath Dham",
        "desc": "Ascend to Kedarnath via trek or helicopter; attend evening Sandhya Aarti."
      },
      {
        "day": 3,
        "title": "Kedarnath Morning Abhishek & Descend",
        "desc": "Morning darshan at Kedarnath Temple and descend to Guptkashi/Sitapur."
      },
      {
        "day": 4,
        "title": "Triyuginarayan Temple & Rishikesh",
        "desc": "Visit sacred Triyuginarayan Temple; drive down to Rishikesh."
      },
      {
        "day": 5,
        "title": "Haridwar Ganga Aarti & Departure",
        "desc": "Morning Rishikesh temples and transfer to Dehradun/Haridwar."
      }
    ]
  },
  {
    "id": "pkg-dom-13",
    "slug": "sikkim-eastern-himalayan-bliss",
    "refCode": "WSH-DOM-SIK13",
    "title": "Eastern Himalayan Bliss: Gangtok, Tsomgo Lake, Lachung & Yumthang Valley",
    "category": "Domestic",
    "destination": "Gangtok, Tsomgo Lake, Nathula Pass, Lachung & Yumthang",
    "region": "Sikkim, India",
    "duration": "6 Days / 5 Nights",
    "nights": 5,
    "price": 26500,
    "style": "Family & Adventure",
    "visaType": "Inner Line & Restricted Area Permits Included",
    "flightInfo": "Flights from Ahmedabad (AMD) to Bagdogra (IXB) / Pakyong",
    "bestSeason": "March – June & October – December",
    "image": "img/tours/sikkim.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "MG Marg Gangtok",
      "Tsomgo Glacial Lake & Baba Mandir",
      "Nathula Pass Excursion",
      "Lachung & Yumthang Valley of Flowers"
    ],
    "overview": "Journey into the Eastern Himalayas across glacial high-altitude lakes, alpine rhododendron valleys in Lachung, and vibrant Gangtok.",
    "inclusions": [
      "5 Nights boutique hotels in Gangtok & Lachung",
      "Daily breakfast + Lachung all meals",
      "Private Innova/Xylo transfers ex-Bagdogra",
      "Tsomgo & North Sikkim permits"
    ],
    "exclusions": [
      "Airfare to Bagdogra",
      "Nathula Pass special permit fee & Zero Point",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Bagdogra & Drive to Gangtok",
        "desc": "Scenic Teesta River valley drive to Gangtok; evening walk at MG Marg."
      },
      {
        "day": 2,
        "title": "Tsomgo Lake, Baba Mandir & Nathula Pass",
        "desc": "High-altitude excursion to frozen Tsomgo Lake and Indo-China Nathula border."
      },
      {
        "day": 3,
        "title": "Gangtok to Lachung Mountain Village",
        "desc": "Drive past Seven Sisters & Naga Waterfalls into scenic Lachung."
      },
      {
        "day": 4,
        "title": "Yumthang Valley of Flowers & Return",
        "desc": "Morning excursion to Yumthang Valley (optional Zero Point) & return to Gangtok."
      },
      {
        "day": 5,
        "title": "Gangtok Monasteries & Ropeway",
        "desc": "Visit Rumtek Monastery, Do Drul Chorten, Flower Exhibition & Gangtok Ropeway."
      },
      {
        "day": 6,
        "title": "Departure to Bagdogra",
        "desc": "Morning breakfast and private transfer to Bagdogra Airport."
      }
    ]
  },
  {
    "id": "pkg-dom-14",
    "slug": "west-bengal-heritage-hills",
    "refCode": "WSH-DOM-WB14",
    "title": "Heritage & Hills: Kolkata, Darjeeling & Sundarbans",
    "category": "Domestic",
    "destination": "Kolkata, Darjeeling & Sundarbans",
    "region": "West Bengal, India",
    "duration": "6 Days / 5 Nights",
    "nights": 5,
    "price": 25500,
    "style": "Family & Heritage",
    "visaType": "No Visa Required (Domestic)",
    "flightInfo": "Direct flights from Ahmedabad (AMD) to Kolkata (CCU)",
    "bestSeason": "October – April",
    "image": "img/domestic-tour/darjeeling.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "Victoria Memorial & Howrah Bridge",
      "Tiger Hill Kanchenjunga Sunrise",
      "Darjeeling Toy Train & Tea Gardens",
      "Sundarbans Mangrove Boat Safari"
    ],
    "overview": "Blend Kolkata’s colonial elegance, Darjeeling’s misty tea estates and Tiger Hill sunrise, and Sundarbans’ wild mangrove creeks.",
    "inclusions": [
      "5 Nights heritage hotels, hill resort & eco-lodge",
      "Daily breakfast + Sundarbans full board",
      "Private transfers + Bagdogra connecting sector support",
      "Sundarbans boat safari & forest permits"
    ],
    "exclusions": [
      "Airfare",
      "Toy Train joyride & museum tickets",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Kolkata & City Heritage",
        "desc": "Visit Victoria Memorial, St. Paul’s Cathedral, and sunset at Howrah Bridge."
      },
      {
        "day": 2,
        "title": "Sundarbans Mangrove Boat Safari",
        "desc": "Full-day creek cruise through Sundarbans Biosphere Reserve watchtowers."
      },
      {
        "day": 3,
        "title": "Fly/Transfer to Darjeeling Hills",
        "desc": "Proceed to Bagdogra & ascend to Darjeeling; evening Chowrasta Mall walk."
      },
      {
        "day": 4,
        "title": "Tiger Hill Sunrise & Toy Train",
        "desc": "Kanchenjunga dawn at Tiger Hill, Batasia Loop, Ghoom Monastery & Toy Train."
      },
      {
        "day": 5,
        "title": "Happy Valley Tea Estate & HMI",
        "desc": "Explore tea gardens, Himalayan Mountaineering Institute & Japanese Peace Pagoda."
      },
      {
        "day": 6,
        "title": "Departure via Bagdogra / Kolkata",
        "desc": "Morning breakfast and airport transfer."
      }
    ]
  },
  {
    "id": "pkg-dom-15",
    "slug": "meghalaya-abode-of-clouds",
    "refCode": "WSH-DOM-MEG15",
    "title": "Abode of Clouds: Shillong, Cherrapunji, Dawki & Mawlynnong",
    "category": "Domestic",
    "destination": "Guwahati, Shillong, Cherrapunji, Dawki & Mawlynnong",
    "region": "Meghalaya, India",
    "duration": "6 Days / 5 Nights",
    "nights": 5,
    "price": 26900,
    "style": "Adventure & Family",
    "visaType": "No Visa Required (Domestic)",
    "flightInfo": "Direct/1-stop flights from Ahmedabad (AMD) to Guwahati (GAU)",
    "bestSeason": "October – May",
    "image": "img/domestic-tour/meghalay.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "Umiam Lake",
      "Nohkalikai Falls & Mawsmai Caves",
      "Double Decker Living Root Bridge",
      "Crystal-Clear Dawki Umngot River",
      "Mawlynnong Cleanest Village"
    ],
    "overview": "Walk across centuries-old living root bridges, boat on crystal-clear emerald waters in Dawki, and chase misty waterfalls in Cherrapunji.",
    "inclusions": [
      "5 Nights boutique resorts in Shillong & Cherrapunji",
      "Daily breakfast",
      "Private AC SUV ex-Guwahati",
      "Dawki country boat ride & parking fees"
    ],
    "exclusions": [
      "Airfare to Guwahati",
      "Entry tickets & local guides for Nongriat trek",
      "5% GST"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Guwahati & Shillong Umiam Lake",
        "desc": "Kamakhya Temple stop, drive to Shillong via panoramic Umiam Lake."
      },
      {
        "day": 2,
        "title": "Shillong to Cherrapunji Waterfalls",
        "desc": "Visit Elephant Falls, Mawkdok Valley, Nohkalikai Falls & Mawsmai Limestone Caves."
      },
      {
        "day": 3,
        "title": "Double Decker Living Root Bridge Trek",
        "desc": "Guided trek through Tyrna village to Nongriat’s Double Decker Living Root Bridge."
      },
      {
        "day": 4,
        "title": "Dawki Umngot River & Mawlynnong",
        "desc": "Boating on crystal-clear Umngot River; visit Asia’s cleanest village Mawlynnong."
      },
      {
        "day": 5,
        "title": "Krang Suri Falls & Shillong Police Bazar",
        "desc": "Explore turquoise Krang Suri Falls and Shillong Don Bosco Museum."
      },
      {
        "day": 6,
        "title": "Departure from Guwahati",
        "desc": "Morning drive to Guwahati Airport for onward flight."
      }
    ]
  },
  {
    "id": "pkg-int-16",
    "slug": "dubai-luxury-arabian-escape",
    "refCode": "WSH-INT-UAE16",
    "title": "Luxury Arabian Escape: Dubai City, Burj Khalifa, Desert Safari & Abu Dhabi",
    "category": "International",
    "destination": "Dubai & Abu Dhabi, UAE",
    "region": "Middle East",
    "duration": "5 Days / 4 Nights",
    "nights": 4,
    "price": 49900,
    "style": "Luxury & Family",
    "visaType": "30-Day UAE Tourist E-Visa Included",
    "flightInfo": "Direct daily flights from Ahmedabad (AMD) to Dubai (DXB)",
    "bestSeason": "October – April",
    "image": "img/tours/dubai.jpg",
    "featured": true,
    "active": true,
    "highlights": [
      "Dubai Marina Dhow Cruise",
      "Burj Khalifa 124th/125th & Fountain",
      "Premium Red Dunes Desert Safari",
      "Museum of the Future & Sheikh Zayed Mosque"
    ],
    "overview": "Experience futuristic skylines, golden desert dunes, and Abu Dhabi’s architectural grandeur with direct Ahmedabad flights and 5-star hospitality.",
    "inclusions": [
      "4 Nights 4-Star/5-Star Downtown/Marina hotel",
      "Daily breakfast + Marina Cruise & Desert BBQ dinners",
      "30-Day UAE Tourist Visa + Insurance",
      "Burj Khalifa 124th/125th Floor + Abu Dhabi Mosque tour"
    ],
    "exclusions": [
      "Return international airfare",
      "Tourism Dirham fee & Museum of the Future entry",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Dubai & Marina Dhow Cruise",
        "desc": "Private airport pickup, hotel check-in, evening Dubai Marina Dhow Cruise with dinner."
      },
      {
        "day": 2,
        "title": "Dubai City Tour, Burj Khalifa & Fountain",
        "desc": "Museum of the Future photo stop, Palm Jumeirah, Dubai Mall & Burj Khalifa 124th/125th Floor."
      },
      {
        "day": 3,
        "title": "Premium Red Dunes Desert Safari",
        "desc": "Morning leisure; 4x4 Land Cruiser dune bashing, camel ride, Tanoura show & BBQ dinner."
      },
      {
        "day": 4,
        "title": "Abu Dhabi Grand Mosque & Yas Island",
        "desc": "Full-day tour to Sheikh Zayed Grand Mosque, Corniche & Ferrari World photo stop."
      },
      {
        "day": 5,
        "title": "Gold Souk & Departure",
        "desc": "Morning shopping at Gold & Spice Souk and private transfer to DXB Airport."
      }
    ]
  },
  {
    "id": "pkg-int-17",
    "slug": "almaty-central-asian-gem",
    "refCode": "WSH-INT-KAZ17",
    "title": "Central Asian Gem: Almaty City, Shymbulak Ski Resort & Charyn Canyon",
    "category": "International",
    "destination": "Almaty, Shymbulak, Charyn Canyon & Kolsai Lakes",
    "region": "Kazakhstan, Central Asia",
    "duration": "5 Days / 4 Nights",
    "nights": 4,
    "price": 44500,
    "style": "Adventure & Family",
    "visaType": "Visa-Free Entry for Indian Passports (14 Days)",
    "flightInfo": "Direct/1-stop flights from Ahmedabad (AMD) / Delhi (DEL) to Almaty (ALA)",
    "bestSeason": "April – October & Winter Ski (Dec – Feb)",
    "image": "img/international/kazakhstan.jpg",
    "featured": true,
    "active": true,
    "highlights": [
      "Panfilov Park & Zenkov Cathedral",
      "Kok-Tobe Hill Cable Car",
      "Medeu & Shymbulak Mountain Resort",
      "Charyn Canyon & Kolsai Lakes"
    ],
    "overview": "Discover Kazakhstan’s alpine peaks, turquoise mountain lakes, and dramatic red-rock canyons — visa-free for Indian travelers.",
    "inclusions": [
      "4 Nights 4-Star central Almaty hotel",
      "Daily breakfast",
      "Medeu–Shymbulak 3-level cable car & Kok-Tobe gondola",
      "Private transfers & English-speaking guide"
    ],
    "exclusions": [
      "International airfare",
      "Lunches & dinners",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Almaty & Kok-Tobe Sunset",
        "desc": "Airport welcome, check-in, evening Kok-Tobe Hill cable car overlooking the city."
      },
      {
        "day": 2,
        "title": "Panfilov Park, Zenkov Cathedral & Green Bazaar",
        "desc": "Guided Almaty city tour, Republic Square, and local dry-fruit market."
      },
      {
        "day": 3,
        "title": "Medeu Skating Rink & Shymbulak Ski Resort",
        "desc": "Ascend Tian Shan mountains via gondola to 3,200m Talgar Pass."
      },
      {
        "day": 4,
        "title": "Charyn Canyon & Kolsai Lakes Day Tour",
        "desc": "Full-day expedition to Valley of Castles at Charyn Canyon and emerald Kolsai Lake."
      },
      {
        "day": 5,
        "title": "Arbat Street & Departure",
        "desc": "Morning souvenir shopping and transfer to Almaty Airport."
      }
    ]
  },
  {
    "id": "pkg-int-18",
    "slug": "baku-land-of-fire",
    "refCode": "WSH-INT-AZE18",
    "title": "Land of Fire: Baku Old City, Flame Towers, Gobustan & Shahdag",
    "category": "International",
    "destination": "Baku, Absheron, Gobustan & Shahdag",
    "region": "Azerbaijan, Caucasus",
    "duration": "5 Days / 4 Nights",
    "nights": 4,
    "price": 46500,
    "style": "Luxury & Family",
    "visaType": "Azerbaijan ASAN E-Visa Included",
    "flightInfo": "Flights from Ahmedabad (AMD) to Baku (GYD) via Sharjah/Delhi",
    "bestSeason": "April – November & Winter Snow",
    "image": "img/international/azerbaijan.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "Icherisheher Old City & Maiden Tower",
      "Heydar Aliyev Center",
      "Ateshgah Fire Temple & Yanar Dag",
      "Gobustan Mud Volcanoes & Shahdag Cable Car"
    ],
    "overview": "Explore Caspian boulevards, UNESCO medieval stone alleys, eternal fire temples, and Caucasus snow peaks in vibrant Baku.",
    "inclusions": [
      "4 Nights 4-Star/5-Star Baku hotel",
      "Daily breakfast",
      "Azerbaijan ASAN E-Visa",
      "All sightseeing tours with private AC vehicle & guide"
    ],
    "exclusions": [
      "International airfare",
      "Shahdag cable car & museum entry tickets",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Baku & Flame Towers Boulevard",
        "desc": "Airport pickup, Highland Park sunset & illuminated Flame Towers."
      },
      {
        "day": 2,
        "title": "Icherisheher Old City & Heydar Aliyev Center",
        "desc": "Explore Maiden Tower, Shirvanshahs Palace, Nizami Street & Heydar Aliyev Center."
      },
      {
        "day": 3,
        "title": "Ateshgah Fire Temple, Yanar Dag & Gobustan",
        "desc": "Visit ancient Zoroastrian Fire Temple, Burning Mountain & Gobustan mud volcanoes."
      },
      {
        "day": 4,
        "title": "Shahdag Mountain Resort Excursion",
        "desc": "Full-day Caucasus mountain escape with cable car & alpine views."
      },
      {
        "day": 5,
        "title": "Carpet Museum & Departure",
        "desc": "Morning Caspian promenade walk and transfer to Heydar Aliyev Airport."
      }
    ]
  },
  {
    "id": "pkg-int-19",
    "slug": "thailand-tropical-wonders",
    "refCode": "WSH-INT-THA19",
    "title": "Tropical Wonders: Bangkok, Pattaya & Phuket Island Hopping",
    "category": "International",
    "destination": "Bangkok, Pattaya & Phuket",
    "region": "Thailand, Southeast Asia",
    "duration": "6 Days / 5 Nights",
    "nights": 5,
    "price": 38900,
    "style": "Honeymoon & Family",
    "visaType": "Visa-Free / E-Arrival Support for Indians",
    "flightInfo": "Direct flights from Ahmedabad (AMD) to Bangkok (BKK) & Phuket (HKT)",
    "bestSeason": "November – April",
    "image": "img/international/thailand.jpg",
    "featured": true,
    "active": true,
    "highlights": [
      "Coral Island Speedboat & Alcazar Show",
      "Chao Phraya Dinner Cruise & Golden Buddha",
      "Phi Phi Islands & Maya Bay",
      "Patong Coastal Nightlife"
    ],
    "overview": "Sail across emerald Andaman limestone cliffs, enjoy vibrant Bangkok river cruises, and unwind on Pattaya & Phuket beaches.",
    "inclusions": [
      "5 Nights 4-Star hotels across Pattaya, Bangkok & Phuket",
      "Daily breakfast + Coral Island & Phi Phi lunches",
      "Speedboat excursions + Alcazar Show & Chao Phraya Cruise",
      "Private airport & intercity transfers"
    ],
    "exclusions": [
      "International & domestic flights",
      "National Park fee (~400 THB)",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Bangkok to Pattaya & Alcazar Show",
        "desc": "Private transfer to Pattaya; evening glittering Alcazar Cabaret Show."
      },
      {
        "day": 2,
        "title": "Coral Island Speedboat Excursion",
        "desc": "Speedboat to Koh Larn Coral Island for parasailing, snorkeling & beach lunch."
      },
      {
        "day": 3,
        "title": "Bangkok Temples & Chao Phraya Dinner Cruise",
        "desc": "Transfer to Bangkok, Golden Buddha & Marble Temple, evening river dinner cruise."
      },
      {
        "day": 4,
        "title": "Fly to Phuket & Patong Sunset",
        "desc": "Domestic flight to Phuket, Old Phuket Town & Patong Beach leisure."
      },
      {
        "day": 5,
        "title": "Phi Phi Islands & Maya Bay Speedboat",
        "desc": "Full-day Phi Phi Don, Maya Bay, Viking Cave & snorkeling excursion."
      },
      {
        "day": 6,
        "title": "Departure from Phuket",
        "desc": "Morning breakfast and transfer to Phuket International Airport."
      }
    ]
  },
  {
    "id": "pkg-int-20",
    "slug": "vietnam-heritage-and-bays",
    "refCode": "WSH-INT-VNM20",
    "title": "Heritage & Bays: Hanoi, Ha Long Bay, Da Nang & Ho Chi Minh City",
    "category": "International",
    "destination": "Hanoi, Ha Long Bay, Da Nang, Hoi An & Ho Chi Minh City",
    "region": "Vietnam, Southeast Asia",
    "duration": "7 Days / 6 Nights",
    "nights": 6,
    "price": 54900,
    "style": "Family & Honeymoon",
    "visaType": "Vietnam E-Visa Included",
    "flightInfo": "Direct flights from Ahmedabad (AMD) to Hanoi (HAN) / Da Nang (DAD)",
    "bestSeason": "October – April",
    "image": "img/international/vietnam.jpg",
    "featured": true,
    "active": true,
    "highlights": [
      "Hanoi Old Quarter",
      "Overnight Luxury Ha Long Bay Cruise",
      "Ba Na Hills Golden Hand Bridge & Hoi An",
      "Cu Chi Tunnels"
    ],
    "overview": "Cruise past limestone karsts in Ha Long Bay, walk the iconic Golden Bridge in Da Nang, and explore lantern-lit Hoi An.",
    "inclusions": [
      "6 Nights 4-Star hotels + 5-Star Ha Long Bay overnight cruise",
      "Daily breakfast + cruise meals",
      "Vietnam E-Visa & Ba Na Hills cable car",
      "Private transfers & English-speaking guides"
    ],
    "exclusions": [
      "International & domestic Vietnam flights",
      "Personal expenses & tips",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Hanoi & Old Quarter Cyclo Tour",
        "desc": "Airport welcome, Hoan Kiem Lake, Train Street & Water Puppet Show."
      },
      {
        "day": 2,
        "title": "Overnight Luxury Ha Long Bay Cruise",
        "desc": "Board 5-star cruise, Sung Sot Cave, kayaking & sunset deck dinner."
      },
      {
        "day": 3,
        "title": "Ha Long Tai Chi & Fly to Da Nang",
        "desc": "Morning bay cruise, return to Hanoi for short flight to coastal Da Nang."
      },
      {
        "day": 4,
        "title": "Ba Na Hills Golden Hand Bridge",
        "desc": "Ride world’s longest cable car to Golden Bridge, French Village & Fantasy Park."
      },
      {
        "day": 5,
        "title": "Hoi An Lantern Town & Fly to Ho Chi Minh",
        "desc": "Basket boat coconut forest, Hoi An Old Town, evening flight to Saigon."
      },
      {
        "day": 6,
        "title": "Cu Chi Tunnels & Saigon City Tour",
        "desc": "Explore Cu Chi Tunnels, Notre-Dame Cathedral, War Museum & Ben Thanh Market."
      },
      {
        "day": 7,
        "title": "Departure from Ho Chi Minh City",
        "desc": "Morning breakfast and private airport transfer."
      }
    ]
  },
  {
    "id": "pkg-int-21",
    "slug": "japan-land-of-the-rising-sun",
    "refCode": "WSH-INT-JPN21",
    "title": "Land of the Rising Sun: Tokyo, Mount Fuji, Kyoto & Osaka",
    "category": "International",
    "destination": "Tokyo, Mount Fuji, Kyoto & Osaka",
    "region": "Japan, East Asia",
    "duration": "8 Days / 7 Nights",
    "nights": 7,
    "price": 158000,
    "style": "Luxury & Family",
    "visaType": "Japan Sticker / E-Visa Assistance Included",
    "flightInfo": "Connecting flights from Ahmedabad (AMD) to Tokyo (HND/NRT)",
    "bestSeason": "March – May (Cherry Blossom) & Oct – Nov (Autumn)",
    "image": "img/international/japan.jpg",
    "featured": true,
    "active": true,
    "highlights": [
      "Asakusa Senso-ji & Shibuya Crossing",
      "Mount Fuji 5th Station & Lake Kawaguchiko",
      "Shinkansen Bullet Train",
      "Fushimi Inari & Arashiyama Bamboo Grove",
      "Osaka Dotonbori"
    ],
    "overview": "Ride 320 km/h Shinkansen bullet trains between neon-lit Tokyo, serene Mount Fuji, ancient Kyoto shrines, and Osaka’s culinary streets.",
    "inclusions": [
      "7 Nights 4-Star city-center hotels",
      "Daily breakfast",
      "Nozomi Shinkansen Bullet Train tickets",
      "Japan Visa documentation & guided tours"
    ],
    "exclusions": [
      "International airfare",
      "Lunches, dinners & teamLab/USJ optional tickets",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Tokyo & Shinjuku Lights",
        "desc": "Narita/Haneda pickup, hotel check-in, evening Shinjuku & Shibuya Crossing."
      },
      {
        "day": 2,
        "title": "Asakusa Senso-ji, Skytree & Ginza",
        "desc": "Explore Senso-ji Temple, Nakamise Street, Tokyo Skytree & Meiji Shrine."
      },
      {
        "day": 3,
        "title": "Mount Fuji 5th Station & Lake Kawaguchiko",
        "desc": "Full-day Mt. Fuji excursion, Lake Kawaguchiko cruise & Oshino Hakkai."
      },
      {
        "day": 4,
        "title": "Shinkansen Bullet Train to Kyoto",
        "desc": "Board high-speed Shinkansen; afternoon Kiyomizu-dera & Gion Geisha district."
      },
      {
        "day": 5,
        "title": "Fushimi Inari, Kinkaku-ji & Arashiyama",
        "desc": "Walk 10,000 vermilion torii gates, Golden Pavilion & Arashiyama Bamboo Grove."
      },
      {
        "day": 6,
        "title": "Nara Deer Park & Transfer to Osaka",
        "desc": "Feed friendly Nara deer, Todai-ji Temple, evening Osaka Dotonbori canal."
      },
      {
        "day": 7,
        "title": "Osaka Castle & Kuromon Market",
        "desc": "Explore Osaka Castle, Umeda Sky Building & Shinsaibashi shopping."
      },
      {
        "day": 8,
        "title": "Departure from Kansai Airport",
        "desc": "Breakfast and private airport transfer for return flight."
      }
    ]
  },
  {
    "id": "pkg-int-22",
    "slug": "europe-grand-european-classic",
    "refCode": "WSH-INT-EUR22",
    "title": "Grand European Classic: Paris, Swiss Alps, Venice & Rome",
    "category": "International",
    "destination": "Paris, Lucerne, Engelberg, Venice, Florence & Rome",
    "region": "Europe (Schengen)",
    "duration": "10 Days / 9 Nights",
    "nights": 9,
    "price": 185000,
    "style": "Honeymoon & Luxury",
    "visaType": "Schengen Visa Assistance Included",
    "flightInfo": "Connecting flights from Ahmedabad (AMD) to Paris (CDG) / Rome (FCO)",
    "bestSeason": "April – October",
    "image": "img/packages/europe.jpg",
    "featured": true,
    "active": true,
    "highlights": [
      "Eiffel Tower & Seine River Cruise",
      "Lucerne & Mount Titlis Ice Flyer",
      "Venice Gondola Ride",
      "Florence & Rome Colosseum / Vatican City"
    ],
    "overview": "A quintessential multi-country European journey across Parisian boulevards, snow-capped Swiss Alps, Venetian canals, and ancient Rome.",
    "inclusions": [
      "9 Nights 4-Star European hotels",
      "Daily continental breakfast",
      "Eiffel Tower 2nd Level, Seine Cruise & Mt. Titlis Rotair",
      "Schengen Visa filing & intercity coach/rail"
    ],
    "exclusions": [
      "International airfare",
      "City tourist taxes & lunches/dinners",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Paris — City of Light",
        "desc": "Airport welcome, hotel check-in, evening Champs-Élysées orientation."
      },
      {
        "day": 2,
        "title": "Eiffel Tower, Louvre & Seine Cruise",
        "desc": "Ascend Eiffel Tower, Arc de Triomphe, Louvre exterior & romantic Seine River Cruise."
      },
      {
        "day": 3,
        "title": "Paris to Switzerland — Lucerne",
        "desc": "Scenic TGV/coach journey into Switzerland; Lion Monument & Chapel Bridge."
      },
      {
        "day": 4,
        "title": "Mount Titlis & Ice Flyer Excursion",
        "desc": "Rotating Rotair cable car to snowy Mt. Titlis summit & Cliff Walk."
      },
      {
        "day": 5,
        "title": "Interlaken / Rhine Falls Leisure",
        "desc": "Explore Lake Lucerne or optional Jungfraujoch Top of Europe."
      },
      {
        "day": 6,
        "title": "Swiss Alps to Venice Island",
        "desc": "Cross alpine passes into Italy; St. Mark’s Square & Doge’s Palace."
      },
      {
        "day": 7,
        "title": "Venice Gondola & Transfer to Florence",
        "desc": "Classic Venetian Gondola ride, Murano glass demo, proceed to Florence."
      },
      {
        "day": 8,
        "title": "Florence Duomo, Pisa & Drive to Rome",
        "desc": "Piazzale Michelangelo, Leaning Tower of Pisa photo stop, arrive Rome."
      },
      {
        "day": 9,
        "title": "Rome Colosseum, Trevi & Vatican City",
        "desc": "Guided Colosseum, Roman Forum, Trevi Fountain & St. Peter’s Basilica."
      },
      {
        "day": 10,
        "title": "Departure from Rome",
        "desc": "Morning breakfast and transfer to Rome Fiumicino Airport."
      }
    ]
  },
  {
    "id": "pkg-int-23",
    "slug": "united-kingdom-royal-britain-highlands",
    "refCode": "WSH-INT-UK23",
    "title": "Royal Britain & Highlands: London, Edinburgh, Lake District & Oxford",
    "category": "International",
    "destination": "London, Oxford, Cotswolds, Lake District & Edinburgh",
    "region": "United Kingdom",
    "duration": "7 Days / 6 Nights",
    "nights": 6,
    "price": 148000,
    "style": "Family & Luxury",
    "visaType": "UK Standard Visitor Visa Assistance",
    "flightInfo": "Direct/1-stop flights from Ahmedabad (AMD) to London (LHR/LGW)",
    "bestSeason": "May – September",
    "image": "img/packages/united-kingdom.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "London Eye, Buckingham Palace & Tower Bridge",
      "Oxford University & Cotswolds",
      "Lake District Scenic Cruise",
      "Edinburgh Castle & Royal Mile"
    ],
    "overview": "Discover London’s royal heritage, storybook Cotswolds villages, Lake Windermere cruises, and Scotland’s dramatic capital Edinburgh.",
    "inclusions": [
      "6 Nights 4-Star central hotels",
      "Daily English breakfast",
      "London Eye & Lake Windermere cruise",
      "UK Visa assistance & rail/coach transfers"
    ],
    "exclusions": [
      "International airfare",
      "Lunches & dinners",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive London & Thames Evening",
        "desc": "Airport pickup, check-in, evening walk at Piccadilly Circus & Leicester Square."
      },
      {
        "day": 2,
        "title": "London Icons & London Eye",
        "desc": "Buckingham Palace Changing of Guard, Big Ben, Tower Bridge & London Eye."
      },
      {
        "day": 3,
        "title": "Oxford University & Cotswolds Villages",
        "desc": "Day trip to historic Oxford colleges and stone villages of the Cotswolds."
      },
      {
        "day": 4,
        "title": "Lake District National Park & Cruise",
        "desc": "Travel north to Lake Windermere for a scenic steamboat cruise."
      },
      {
        "day": 5,
        "title": "Arrive Edinburgh — Scotland’s Capital",
        "desc": "Proceed to Edinburgh; evening walk along Princes Street & Calton Hill."
      },
      {
        "day": 6,
        "title": "Edinburgh Castle & Royal Mile",
        "desc": "Guided visit to Edinburgh Castle, Holyrood Palace & Royal Mile."
      },
      {
        "day": 7,
        "title": "Departure from Edinburgh / London",
        "desc": "Breakfast and transfer to airport for return flight."
      }
    ]
  },
  {
    "id": "pkg-int-24",
    "slug": "canada-coast-to-rockies",
    "refCode": "WSH-INT-CAN24",
    "title": "Coast to Rockies: Toronto, Niagara Falls, Banff & Vancouver",
    "category": "International",
    "destination": "Toronto, Niagara Falls, Calgary, Banff, Lake Louise & Vancouver",
    "region": "Canada, North America",
    "duration": "8 Days / 7 Nights",
    "nights": 7,
    "price": 175000,
    "style": "Family & Adventure",
    "visaType": "Canada Visitor Visa Assistance Included",
    "flightInfo": "Flights from Ahmedabad (AMD) to Toronto (YYZ) & Vancouver (YVR)",
    "bestSeason": "May – October",
    "image": "img/international/canada.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "CN Tower & Hornblower Niagara Cruise",
      "Banff National Park",
      "Lake Louise & Moraine Lake",
      "Icefields Parkway",
      "Vancouver Stanley Park & Capilano"
    ],
    "overview": "Experience thunderous Niagara Falls, glacial turquoise lakes in the Canadian Rockies, and Pacific coastal beauty in Vancouver.",
    "inclusions": [
      "7 Nights 4-Star hotels in Toronto, Banff & Vancouver",
      "Daily breakfast",
      "CN Tower, Niagara Hornblower & Capilano Suspension Bridge",
      "Canada Visa documentation support"
    ],
    "exclusions": [
      "International & internal domestic flights",
      "Banff Gondola & Columbia Icefield optional tickets",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Toronto & CN Tower",
        "desc": "Airport welcome, Harbourfront walk & panoramic CN Tower observation deck."
      },
      {
        "day": 2,
        "title": "Niagara Falls & Hornblower Cruise",
        "desc": "Full-day Niagara excursion, Hornblower boat ride & Niagara-on-the-Lake."
      },
      {
        "day": 3,
        "title": "Fly to Calgary & Drive to Banff",
        "desc": "Internal flight to Calgary; scenic drive into Banff National Park."
      },
      {
        "day": 4,
        "title": "Lake Louise & Moraine Lake",
        "desc": "Visit emerald Lake Louise, Moraine Lake Valley of Ten Peaks & Bow Falls."
      },
      {
        "day": 5,
        "title": "Icefields Parkway & Athabasca Glacier",
        "desc": "Drive one of the world’s greatest highways past Peyto Lake & glaciers."
      },
      {
        "day": 6,
        "title": "Fly to Vancouver & Gastown",
        "desc": "Flight from Calgary to Vancouver; evening Gastown Steam Clock & Canada Place."
      },
      {
        "day": 7,
        "title": "Stanley Park & Capilano Suspension Bridge",
        "desc": "Tour Stanley Park totems, Granville Island & Capilano Canyon."
      },
      {
        "day": 8,
        "title": "Departure from Vancouver",
        "desc": "Breakfast and private airport transfer."
      }
    ]
  },
  {
    "id": "pkg-int-25",
    "slug": "usa-coast-to-coast-icons",
    "refCode": "WSH-INT-USA25",
    "title": "Coast-to-Coast Icons: New York, Washington D.C., Las Vegas & San Francisco",
    "category": "International",
    "destination": "New York, Washington D.C., Las Vegas, Grand Canyon & San Francisco",
    "region": "United States, North America",
    "duration": "10 Days / 9 Nights",
    "nights": 9,
    "price": 215000,
    "style": "Family & Luxury",
    "visaType": "USA B1/B2 Visa Appointment Assistance",
    "flightInfo": "Flights from Ahmedabad (AMD) to New York (JFK/EWR) & San Francisco (SFO)",
    "bestSeason": "April – October",
    "image": "img/packages/united-states.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "Statue of Liberty, Times Square & Empire State",
      "Smithsonian & Capitol Hill",
      "Grand Canyon Excursion from Vegas",
      "Golden Gate Bridge & Yosemite"
    ],
    "overview": "From Manhattan skyscrapers and Washington monuments to Grand Canyon vistas and San Francisco’s Golden Gate Bridge.",
    "inclusions": [
      "9 Nights 4-Star centrally located hotels",
      "Daily breakfast",
      "Statue of Liberty ferry, Empire State & Las Vegas Strip tour",
      "USA Visa DS-160 & slot guidance"
    ],
    "exclusions": [
      "International & internal US domestic flights",
      "ESTA/Visa embassy fee & meals",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive New York & Times Square",
        "desc": "Airport transfer to Manhattan hotel; evening neon glow of Times Square."
      },
      {
        "day": 2,
        "title": "Statue of Liberty & Empire State Building",
        "desc": "Battery Park ferry to Liberty Island, Wall Street, 9/11 Memorial & Empire State."
      },
      {
        "day": 3,
        "title": "Central Park & Transfer to Washington D.C.",
        "desc": "Morning Fifth Avenue & Central Park; afternoon train/coach to Washington D.C."
      },
      {
        "day": 4,
        "title": "Washington D.C. Smithsonian & Capitol Hill",
        "desc": "White House photo stop, Lincoln Memorial, Capitol & Air & Space Museum."
      },
      {
        "day": 5,
        "title": "Fly to Las Vegas — Entertainment Capital",
        "desc": "Flight to Las Vegas; evening Limo/Strip tour & Bellagio Fountains."
      },
      {
        "day": 6,
        "title": "Grand Canyon West Rim Excursion",
        "desc": "Full-day Grand Canyon tour with Eagle Point & Guano Point viewpoints."
      },
      {
        "day": 7,
        "title": "Fly to San Francisco & Fisherman’s Wharf",
        "desc": "Short flight to SFO; evening Pier 39 sea lions & Ghirardelli Square."
      },
      {
        "day": 8,
        "title": "Golden Gate Bridge & Bay Cruise",
        "desc": "Cross Golden Gate Bridge, Sausalito, Lombard Street & Bay Cruise."
      },
      {
        "day": 9,
        "title": "Yosemite National Park Day Tour",
        "desc": "Full-day excursion to Yosemite Valley waterfalls & El Capitan."
      },
      {
        "day": 10,
        "title": "Departure from San Francisco",
        "desc": "Breakfast and transfer to SFO International Airport."
      }
    ]
  },
  {
    "id": "pkg-int-26",
    "slug": "south-africa-wilderness-coastline",
    "refCode": "WSH-INT-RSA26",
    "title": "Wilderness & Coastline: Cape Town, Garden Route & Kruger Safari",
    "category": "International",
    "destination": "Cape Town, Hermanus, Knysna, Kruger National Park & Sun City",
    "region": "South Africa",
    "duration": "8 Days / 7 Nights",
    "nights": 7,
    "price": 138000,
    "style": "Adventure & Luxury",
    "visaType": "South Africa Tourist E-Visa Assistance",
    "flightInfo": "Connecting flights from Ahmedabad (AMD) to Cape Town (CPT) & Johannesburg (JNB)",
    "bestSeason": "May – October (Safari) & Nov – Mar (Cape Coast)",
    "image": "img/international/south-africa.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "Table Mountain Cableway & Cape Peninsula",
      "Hermanus & Knysna Lagoon",
      "Big Five Kruger Game Drives",
      "Sun City Resort"
    ],
    "overview": "Pair Table Mountain ocean panoramas and the scenic Garden Route with thrilling Big Five 4x4 safaris in Kruger National Park.",
    "inclusions": [
      "7 Nights 4-Star hotels, Knysna resort & safari lodge",
      "Daily breakfast + safari lodge dinners",
      "Table Mountain cableway, Cape Point & Kruger 4x4 game drives",
      "South Africa Visa assistance"
    ],
    "exclusions": [
      "International & internal domestic flights",
      "Conservation fees & personal expenses",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Cape Town & V&A Waterfront",
        "desc": "Airport welcome, check-in, sunset at Victoria & Alfred Waterfront."
      },
      {
        "day": 2,
        "title": "Table Mountain & Cape Peninsula Tour",
        "desc": "Cableway up Table Mountain, Chapman’s Peak, Cape Point & Boulders Penguins."
      },
      {
        "day": 3,
        "title": "Hermanus Whale Coast to Knysna",
        "desc": "Scenic Garden Route drive along Hermanus coast to Knysna Lagoon."
      },
      {
        "day": 4,
        "title": "Knysna Heads, Cango Caves & Ostrich Farm",
        "desc": "Explore Oudtshoorn’s Cango Caves and sunset Knysna Featherbed cruise."
      },
      {
        "day": 5,
        "title": "Fly to Kruger / Mpumalanga Safari Lodge",
        "desc": "Transfer to George Airport for flight toward Kruger; evening bush dinner."
      },
      {
        "day": 6,
        "title": "Kruger National Park Big Five Safari",
        "desc": "Full-day open 4x4 game drive spotting lion, leopard, elephant, rhino & buffalo."
      },
      {
        "day": 7,
        "title": "Transfer to Sun City / Johannesburg",
        "desc": "Drive to Sun City Valley of Waves or Johannesburg Nelson Mandela Square."
      },
      {
        "day": 8,
        "title": "Departure from Johannesburg",
        "desc": "Morning breakfast and transfer to O.R. Tambo Airport."
      }
    ]
  },
  {
    "id": "pkg-int-27",
    "slug": "singapore-lion-city-luxury",
    "refCode": "WSH-INT-SGP27",
    "title": "Lion City Luxury: Marina Bay, Sentosa Island & Universal Studios",
    "category": "International",
    "destination": "Singapore, Marina Bay & Sentosa Island",
    "region": "Singapore, Southeast Asia",
    "duration": "5 Days / 4 Nights",
    "nights": 4,
    "price": 52500,
    "style": "Family & Luxury",
    "visaType": "Singapore Tourist E-Visa Included",
    "flightInfo": "Direct flights from Ahmedabad (AMD) to Singapore (SIN)",
    "bestSeason": "Year-Round (Feb – Oct Ideal)",
    "image": "img/packages/singapore.jpg",
    "featured": true,
    "active": true,
    "highlights": [
      "Night Safari",
      "Gardens by the Bay Cloud Forest",
      "Marina Bay Sands SkyPark",
      "Universal Studios & Sentosa Wings of Time"
    ],
    "overview": "A family-favorite luxury city break featuring futuristic Gardens by the Bay, thrilling Universal Studios rides, and Sentosa beachfront fun.",
    "inclusions": [
      "4 Nights 4-Star central Singapore hotel",
      "Daily breakfast",
      "Singapore E-Visa + Night Safari, Gardens by the Bay & Universal Studios tickets",
      "Private airport & attraction transfers"
    ],
    "exclusions": [
      "Return international airfare",
      "Lunches & dinners",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Singapore & Night Safari",
        "desc": "Changi Airport pickup, check-in, evening tram ride at world-famous Night Safari."
      },
      {
        "day": 2,
        "title": "City Tour, Marina Bay SkyPark & Gardens by the Bay",
        "desc": "Merlion Park, Marina Bay Sands SkyPark observation deck, Cloud Forest & Supertrees."
      },
      {
        "day": 3,
        "title": "Universal Studios Singapore Full Day",
        "desc": "Thrilling Hollywood, Sci-Fi City & Jurassic Park rides at Resorts World Sentosa."
      },
      {
        "day": 4,
        "title": "Sentosa Cable Car, S.E.A. Aquarium & Wings of Time",
        "desc": "Mount Faber cable car, Madame Tussauds / S.E.A. Aquarium & Wings of Time laser show."
      },
      {
        "day": 5,
        "title": "Jewel Changi & Departure",
        "desc": "Explore Orchard Road & Jewel Changi Rain Vortex before flight home."
      }
    ]
  },
  {
    "id": "pkg-int-28",
    "slug": "sri-lanka-pearl-indian-ocean",
    "refCode": "WSH-INT-LKA28",
    "title": "Pearl of the Indian Ocean: Kandy, Nuwara Eliya, Bentota & Colombo",
    "category": "International",
    "destination": "Kandy, Nuwara Eliya, Bentota & Colombo",
    "region": "Sri Lanka, South Asia",
    "duration": "6 Days / 5 Nights",
    "nights": 5,
    "price": 34900,
    "style": "Family & Honeymoon",
    "visaType": "Sri Lanka ETA Visa Assistance",
    "flightInfo": "Flights from Ahmedabad (AMD) to Colombo (CMB)",
    "bestSeason": "December – April (West/South Coast)",
    "image": "img/packages/sri-lanka.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "Pinnawala & Temple of Tooth Relic",
      "Scenic Tea Plantation Train Ride",
      "Bentota Beach & Madu River Safari",
      "Colombo City Tour"
    ],
    "overview": "Discover misty Ceylon tea estates, emerald highland train rides, golden Bentota beaches, and vibrant Colombo hospitality.",
    "inclusions": [
      "5 Nights 4-Star hill & beachfront resorts",
      "Daily breakfast & dinner",
      "Private AC chauffeur-guide vehicle",
      "Madu River boat safari & Kandy cultural dance"
    ],
    "exclusions": [
      "International airfare",
      "Sri Lanka ETA & monument entry fees",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Colombo to Pinnawala & Kandy",
        "desc": "Airport welcome, Pinnawala Elephant Orphanage, Kandy Tooth Relic Temple & dance show."
      },
      {
        "day": 2,
        "title": "Kandy to Nuwara Eliya Tea Hills",
        "desc": "Peradeniya Botanical Gardens, Ramboda Falls & Ceylon tea factory tasting."
      },
      {
        "day": 3,
        "title": "Scenic Highland Train & Horton / Gregory Lake",
        "desc": "Iconic hill train segment, Gregory Lake & colonial Nuwara Eliya."
      },
      {
        "day": 4,
        "title": "Nuwara Eliya to Bentota Coastal Resort",
        "desc": "Descend to sunny Bentota beach; Turtle Hatchery & golden sunset."
      },
      {
        "day": 5,
        "title": "Madu River Boat Safari & Colombo City",
        "desc": "Mangrove boat safari, drive to Colombo for Galle Face Green & Lotus Tower."
      },
      {
        "day": 6,
        "title": "Departure from Colombo",
        "desc": "Morning shopping at Odel/One Galle Face and airport transfer."
      }
    ]
  },
  {
    "id": "pkg-int-29",
    "slug": "indonesia-bali-island-of-the-gods",
    "refCode": "WSH-INT-IDN29",
    "title": "Island of the Gods: Bali Ubud, Kintamani Volcano, Nusa Penida & Seminyak",
    "category": "International",
    "destination": "Ubud, Kintamani, Nusa Penida & Seminyak, Bali",
    "region": "Indonesia, Southeast Asia",
    "duration": "6 Days / 5 Nights",
    "nights": 5,
    "price": 42900,
    "style": "Honeymoon & Luxury",
    "visaType": "Indonesia Visa on Arrival (~USD 35)",
    "flightInfo": "Connecting flights from Ahmedabad (AMD) to Bali (DPS)",
    "bestSeason": "April – October",
    "image": "img/international/indonesia.jpg",
    "featured": true,
    "active": true,
    "highlights": [
      "Ubud Rice Terraces & Monkey Forest",
      "Kintamani Mount Batur & Bali Swing",
      "Nusa Penida Kelingking Beach",
      "Uluwatu Kecak Dance"
    ],
    "overview": "Split your stay between a lush Ubud private pool villa and Seminyak’s golden coastline, complete with a Nusa Penida speedboat escape.",
    "inclusions": [
      "5 Nights stay (Seminyak 4-Star + Ubud Private Pool Villa)",
      "Daily breakfast + Nusa Penida lunch",
      "Fast boat to Nusa Penida West Tour",
      "Private AC MPV with English-speaking driver"
    ],
    "exclusions": [
      "International airfare",
      "Indonesia Visa on Arrival (~USD 35)",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Bali & Seminyak Sunset",
        "desc": "VIP flower garland welcome, check-in to Seminyak beach resort."
      },
      {
        "day": 2,
        "title": "Nusa Penida Kelingking Beach Speedboat",
        "desc": "Fast boat to Kelingking Cliff, Broken Beach, Angel’s Billabong & Crystal Bay."
      },
      {
        "day": 3,
        "title": "Uluwatu Temple & Kecak Fire Dance",
        "desc": "Water sports at Tanjung Benoa, Uluwatu cliff temple & Jimbaran sunset dinner."
      },
      {
        "day": 4,
        "title": "Transfer to Ubud & Sacred Monkey Forest",
        "desc": "Tegenungan Waterfall, Ubud Monkey Forest & private pool villa check-in."
      },
      {
        "day": 5,
        "title": "Kintamani Mount Batur & Bali Swing",
        "desc": "Volcano panorama, Tegallalang Rice Terraces, Bali Swing & coffee plantation."
      },
      {
        "day": 6,
        "title": "Departure from Denpasar",
        "desc": "Floating breakfast and private transfer to Ngurah Rai Airport."
      }
    ]
  },
  {
    "id": "pkg-int-30",
    "slug": "nepal-himalayan-serenity",
    "refCode": "WSH-INT-NEP30",
    "title": "Himalayan Serenity: Kathmandu, Pokhara & Chitwan Wildlife",
    "category": "International",
    "destination": "Kathmandu, Pokhara & Chitwan National Park",
    "region": "Nepal, Himalayas",
    "duration": "6 Days / 5 Nights",
    "nights": 5,
    "price": 29900,
    "style": "Family & Spiritual",
    "visaType": "No Visa Required for Indian Citizens (Passport / Voter ID)",
    "flightInfo": "Flights from Ahmedabad (AMD) to Kathmandu (KTM)",
    "bestSeason": "September – May",
    "image": "img/packages/nepal.jpg",
    "featured": false,
    "active": true,
    "highlights": [
      "Pashupatinath, Boudhanath & Patan Square",
      "Sarangkot Annapurna Sunrise & Phewa Lake",
      "Chitwan National Park Jungle Safari",
      "Manakamana Cable Car"
    ],
    "overview": "Experience ancient Kathmandu temples, Annapurna sunrise over Phewa Lake in Pokhara, and one-horned rhino safaris in Chitwan.",
    "inclusions": [
      "5 Nights 4-Star hotels & Chitwan jungle resort",
      "Daily breakfast + Chitwan all meals",
      "Private AC vehicle throughout Nepal",
      "Chitwan jungle safari & Phewa Lake boat ride"
    ],
    "exclusions": [
      "International airfare",
      "Manakamana cable car & monument entry fees",
      "5% GST & TCS"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Kathmandu & Boudhanath Stupa",
        "desc": "Airport welcome, hotel check-in, evening prayers at Boudhanath Stupa."
      },
      {
        "day": 2,
        "title": "Pashupatinath, Patan Durbar & Drive to Pokhara",
        "desc": "Morning Pashupatinath Temple Darshan, Patan Square, scenic drive to Pokhara."
      },
      {
        "day": 3,
        "title": "Sarangkot Annapurna Sunrise & Phewa Lake",
        "desc": "Dawn Himalayan panorama at Sarangkot, Davis Falls, Gupteshwor Cave & Phewa boating."
      },
      {
        "day": 4,
        "title": "Pokhara to Chitwan National Park",
        "desc": "Drive to Chitwan jungle lodge; afternoon Tharu village walk & cultural dance."
      },
      {
        "day": 5,
        "title": "Chitwan Jungle Safari & Return to Kathmandu",
        "desc": "Morning jeep/canoe safari for one-horned rhinos, drive back to Kathmandu."
      },
      {
        "day": 6,
        "title": "Departure from Kathmandu",
        "desc": "Morning Thamel souvenir shopping and airport transfer."
      }
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
    },
    {
      id: 'evt-8',
      entryType: 'Trip Memory',
      mediaFormat: 'Photo',
      title: 'International Group Tour Welcome & Briefing',
      locationDate: 'Ahmedabad & International Departures • White Swan Archive',
      caption: 'Curated group departure welcome with White Swan Holidays tour directors ensuring seamless airport check-in and hospitality.',
      mediaUrl: 'img/events/event-01.jpg',
      posterUrl: 'img/events/event-01.jpg',
      showInSlider: true
    },
    {
      id: 'evt-9',
      entryType: 'Trip Memory',
      mediaFormat: 'Photo',
      title: 'Signature Scenic Sightseeing Expedition',
      locationDate: 'Curated Group Departure • White Swan Archive',
      caption: 'Guided sightseeing highlights and milestone group portraits from our flagship holiday departures.',
      mediaUrl: 'img/events/event-02.jpg',
      posterUrl: 'img/events/event-02.jpg',
      showInSlider: true
    },
    {
      id: 'evt-10',
      entryType: 'Trip Memory',
      mediaFormat: 'Photo',
      title: 'Family & Couple Holiday Celebration',
      locationDate: 'Signature Leisure Escape • White Swan Archive',
      caption: 'Handcrafted multi-generational family vacation moments with private transfers and handpicked stays.',
      mediaUrl: 'img/events/event-03.jpg',
      posterUrl: 'img/events/event-03.jpg',
      showInSlider: true
    },
    {
      id: 'evt-11',
      entryType: 'Organized Event',
      mediaFormat: 'Photo',
      title: 'Corporate Team Retreat & Evening Gala',
      locationDate: 'MICE & Corporate Group • White Swan Archive',
      caption: 'Dedicated corporate hospitality, team bonding activities, and hosted celebration dinner.',
      mediaUrl: 'img/events/event-04.jpg',
      posterUrl: 'img/events/event-04.jpg',
      showInSlider: false
    },
    {
      id: 'evt-12',
      entryType: 'Trip Memory',
      mediaFormat: 'Photo',
      title: 'Scenic Mountain & Valley Group Excursion',
      locationDate: 'Highland Group Tour • White Swan Archive',
      caption: 'Panoramic mountain sightseeing and curated local experiences organized by our CG Road travel desk.',
      mediaUrl: 'img/events/event-05.jpg',
      posterUrl: 'img/events/event-05.jpg',
      showInSlider: false
    },
    {
      id: 'evt-13',
      entryType: 'Trip Memory',
      mediaFormat: 'Photo',
      title: 'Cultural Heritage & City Discovery Tour',
      locationDate: 'Guided Heritage Trail • White Swan Archive',
      caption: 'Immersive city discovery and heritage landmarks explored with our experienced tour managers.',
      mediaUrl: 'img/events/event-06.jpg',
      posterUrl: 'img/events/event-06.jpg',
      showInSlider: false
    },
    {
      id: 'evt-14',
      entryType: 'Organized Event',
      mediaFormat: 'Photo',
      title: 'VIP Hospitality & Group Networking Night',
      locationDate: 'Executive Event Series • White Swan Archive',
      caption: 'Seamless end-to-end event coordination, welcome reception, and VIP guest management.',
      mediaUrl: 'img/events/event-07.jpg',
      posterUrl: 'img/events/event-07.jpg',
      showInSlider: false
    },
    {
      id: 'evt-15',
      entryType: 'Trip Memory',
      mediaFormat: 'Photo',
      title: 'Coastal Resort & Sunset Cruise Memories',
      locationDate: 'Beachfront Holiday Group • White Swan Archive',
      caption: 'Relaxed coastal stays, private cruise excursions, and memorable group dinners by the water.',
      mediaUrl: 'img/events/event-08.jpg',
      posterUrl: 'img/events/event-08.jpg',
      showInSlider: false
    },
    {
      id: 'evt-16',
      entryType: 'Trip Memory',
      mediaFormat: 'Photo',
      title: 'Gujarat Community Special Departure',
      locationDate: 'Customized Group Tour • White Swan Archive',
      caption: 'Pure vegetarian / Jain-friendly dining arrangements and comfortable group logistics from start to finish.',
      mediaUrl: 'img/events/event-09.jpg',
      posterUrl: 'img/events/event-09.jpg',
      showInSlider: false
    },
    {
      id: 'evt-17',
      entryType: 'Organized Event',
      mediaFormat: 'Photo',
      title: 'Destination Celebration & Festive Showcase',
      locationDate: 'Special Occasion Travel • White Swan Archive',
      caption: 'Bespoke destination celebration featuring themed decor, entertainment, and concierge guest care.',
      mediaUrl: 'img/events/event-10.jpg',
      posterUrl: 'img/events/event-10.jpg',
      showInSlider: false
    },
    {
      id: 'evt-18',
      entryType: 'Trip Memory',
      mediaFormat: 'Photo',
      title: 'Luxury Coach & Guided Sightseeing Day',
      locationDate: 'Grand Tour Itinerary • White Swan Archive',
      caption: 'Comfortable luxury coach touring with curated photo stops and priority attraction entry.',
      mediaUrl: 'img/events/event-11.jpg',
      posterUrl: 'img/events/event-11.jpg',
      showInSlider: false
    },
    {
      id: 'evt-19',
      entryType: 'Trip Memory',
      mediaFormat: 'Photo',
      title: 'Farewell Gala & Group Tour Finale',
      locationDate: 'White Swan Signature Tour • White Swan Archive',
      caption: 'Closing celebration dinner with our happy travelers before flying back home.',
      mediaUrl: 'img/events/event-12.jpg',
      posterUrl: 'img/events/event-12.jpg',
      showInSlider: false
    },
    {
      id: 'evt-20',
      entryType: 'Organized Event',
      mediaFormat: 'Photo',
      title: 'Corporate Meetings & Executive Boardrooms',
      locationDate: 'MICE Solutions • India & International',
      caption: 'Turnkey corporate meeting venues, AV setup, hospitality desks, and executive travel logistics.',
      mediaUrl: 'img/events/mice-meeting.jpg',
      posterUrl: 'img/events/mice-meeting.jpg',
      showInSlider: true
    },
    {
      id: 'evt-21',
      entryType: 'Organized Event',
      mediaFormat: 'Photo',
      title: 'Corporate Incentive Tours & Dealer Meets',
      locationDate: 'MICE Incentive Programs • Global Destinations',
      caption: 'Reward top performers and channel partners with bespoke incentive retreats and gala awards.',
      mediaUrl: 'img/events/mice-incentive.jpg',
      posterUrl: 'img/events/mice-incentive.jpg',
      showInSlider: true
    },
    {
      id: 'evt-22',
      entryType: 'Organized Event',
      mediaFormat: 'Photo',
      title: 'Large-Scale Conferences & Conventions',
      locationDate: 'MICE Conferences • End-to-End Management',
      caption: 'Complete delegate registration, hotel room blocks, stage production, and airport transfers.',
      mediaUrl: 'img/events/mice-conference.jpg',
      posterUrl: 'img/events/mice-conference.jpg',
      showInSlider: false
    },
    {
      id: 'evt-23',
      entryType: 'Organized Event',
      mediaFormat: 'Photo',
      title: 'Trade Exhibitions & Brand Showcases',
      locationDate: 'MICE Exhibitions • Global Trade Events',
      caption: 'Seamless exhibitor travel, accommodation blocks, and on-ground hospitality support.',
      mediaUrl: 'img/events/mice-exhibition.jpg',
      posterUrl: 'img/events/mice-exhibition.jpg',
      showInSlider: false
    }
  ];

  function ensureSeeded() {
    const existingPkgs = readJSON(STORAGE_KEYS.PACKAGES, null);
    if (!Array.isArray(existingPkgs) || existingPkgs.length === 0) {
      writeJSON(STORAGE_KEYS.PACKAGES, DEFAULT_PACKAGES);
    } else {
      let changed = false;
      const seenIds = new Set(existingPkgs.map(p => p.id));
      const seenSlugs = new Set(existingPkgs.map(p => p.slug));
      for (const defPkg of DEFAULT_PACKAGES) {
        if (!seenIds.has(defPkg.id) && !seenSlugs.has(defPkg.slug)) {
          existingPkgs.push(defPkg);
          seenIds.add(defPkg.id);
          seenSlugs.add(defPkg.slug);
          changed = true;
        }
      }
      if (changed) writeJSON(STORAGE_KEYS.PACKAGES, existingPkgs);
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
