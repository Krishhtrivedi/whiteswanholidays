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
    "slug": "kashmir-alpine",
    "title": "Kashmir Alpine & Gulmarg Glaciers",
    "region": "Western Himalayas, India",
    "category": "domestic",
    "coords": "34\u00b005'N 74\u00b047'E",
    "elevation": "2,730m ASL",
    "climate": "Sub-Alpine Montane",
    "temp": "4\u00b0C to 18\u00b0C",
    "bestSeason": "April \u2013 October & Winter Snow",
    "duration": "6 Days / 5 Nights",
    "flightTime": "2h 15m Direct from Delhi/Ahmedabad",
    "airportCode": "SXR (Srinagar)",
    "startingPrice": 28500,
    "heroImage": "img/domestic-tour/kashmir.jpg",
    "gallery": [
      "img/domestic-tour/kashmir.jpg",
      "img/tours/manali.jpg",
      "img/domestic-tour/leh-ladakh.jpg"
    ],
    "tagline": "Whispering pine valleys, tranquil cedar houseboats, and Apharwat snow bowls.",
    "overview": "Revered as paradise on earth, Kashmir offers deep alpine stillness. From heritage cedar houseboats floating on mirror-still Dal Lake to Gondola cable cars ascending 4,000 meters into Apharwat snow basins, our bespoke itinerary ensures private heated transport, local wazwan banquets, and premier valley chalets.",
    "highlights": [
      "Private sunrise shikara cruise through Dal Lake floating flower and spice markets.",
      "Gondola Phase II ascent to 3,980m Apharwat Peak for panoramic snow skiing.",
      "Betaab Valley and Aru Valley private guided horse trails along turquoise Lidder river.",
      "Heritage stay at a handcrafted hand-carved walnut cedar wood luxury houseboat.",
      "Saffron farm visit in Pampore and private copperware artisan workshop."
    ],
    "itineraryDays": [
      {
        "day": "01",
        "title": "Arrival in Srinagar & Dal Lake Sunset",
        "desc": "Land at Sheikh ul-Alam Airport, private transfer to luxury cedar houseboat, evening shikara cruise."
      },
      {
        "day": "02",
        "title": "Mughal Terraced Gardens & Old City",
        "desc": "Stroll Shalimar and Nishat imperial gardens; explore ancient Jamia Masjid and paper-mache ateliers."
      },
      {
        "day": "03",
        "title": "Ascent to Gulmarg & Apharwat Gondola",
        "desc": "Drive through pine forests to Gulmarg bowl; ride Phase 2 cable car high above cloud level."
      },
      {
        "day": "04",
        "title": "Pahalgam Valley of Shepherds",
        "desc": "Scenic transfer along saffron fields to Pahalgam; riverside walk along glacial Lidder river."
      },
      {
        "day": "05",
        "title": "Aru & Betaab Glacial Sanctuaries",
        "desc": "Private 4x4 excursion into pristine Aru Valley meadows and Betaab pine amphitheater."
      },
      {
        "day": "06",
        "title": "Kashmir Departure & Souvenir Connoisseur",
        "desc": "Pashmina shawl certification check, fresh walnut shopping, and private airport escort."
      }
    ],
    "packing": [
      "Layered lightweight down jacket or fleece sweater",
      "Polarized UV sunglasses for snow reflection",
      "Comfortable walking shoes with deep traction",
      "Moisturizing lip balm and cold cream",
      "Universal power bank for cold-temperature battery backup"
    ]
  },
  {
    "slug": "rajasthan-heritage",
    "title": "Royal Rajasthan Heritage Circuit",
    "region": "Thar & Mewar, India",
    "category": "domestic",
    "coords": "24\u00b035'N 73\u00b041'E",
    "elevation": "598m ASL",
    "climate": "Semi-Arid Regal",
    "temp": "18\u00b0C to 30\u00b0C",
    "bestSeason": "October \u2013 March (Royal Season)",
    "duration": "5 Days / 4 Nights",
    "flightTime": "1h 15m from Mumbai/Delhi",
    "airportCode": "UDR (Udaipur)",
    "startingPrice": 24000,
    "heroImage": "img/tours/jaisalmer.jpg",
    "gallery": [
      "img/tours/jaisalmer.jpg",
      "img/tours/gujarat.jpg",
      "img/banner-2.jpg"
    ],
    "tagline": "Shimmering lake palaces, gilded desert forts, and starlit dune encampments.",
    "overview": "Walk through centuries of royal Rajputana chivalry. Cruise Lake Pichola beneath the white marble arches of the City Palace, explore Mehrangarh Fort towering above the blue city of Jodhpur, and sleep in handcrafted luxury desert tents under the golden stars of the Thar Desert.",
    "highlights": [
      "Private solar-powered boat cruise along Lake Pichola and Jag Mandir Island.",
      "VIP guided architectural tour of City Palace museum and crystal gallery.",
      "Exclusive private dining overlooking Mehrangarh Fort in Jodhpur.",
      "Sunset camel caravan and gypsy folk performance at Sam Sand Dunes Jaisalmer.",
      "Stay in a royal heritage haveli with authentic Rajasthani thali dining."
    ],
    "itineraryDays": [
      {
        "day": "01",
        "title": "Udaipur Venice of the East Arrival",
        "desc": "Arrival at Maharana Pratap Airport; private heritage haveli check-in and sunset boat ride on Lake Pichola."
      },
      {
        "day": "02",
        "title": "City Palace & Saheliyon-ki-Bari",
        "desc": "Explore royal courtyards, miniature paintings, and the fountains of the Queen's garden."
      },
      {
        "day": "03",
        "title": "Across Ranakpur Temples to Jodhpur",
        "desc": "Scenic drive through Aravalli hills; visit 1,444 marble pillars of Ranakpur; arrive at the Blue City."
      },
      {
        "day": "04",
        "title": "Mehrangarh Fort & Thar Golden Dunes",
        "desc": "Ascend the invincible Mehrangarh ramparts; continue to Jaisalmer luxury desert camp for sunset."
      },
      {
        "day": "05",
        "title": "Jaisalmer Living Fort & Departure",
        "desc": "Morning stroll inside the yellow sandstone living fort; afternoon airport transfer for return flight."
      }
    ],
    "packing": [
      "Light breathable cotton or linen daytime clothing",
      "Light woolen shawl or blazer for cool desert evenings",
      "Wide-brim sun hat and UV protective eyewear",
      "Comfortable slip-on walking footwear for fort stones",
      "Camera with zoom lens for palace courtyards"
    ]
  },
  {
    "slug": "kerala-backwaters",
    "title": "Kerala Backwaters & Munnar Mist",
    "region": "Western Ghats & Malabar, India",
    "category": "domestic",
    "coords": "9\u00b030'N 76\u00b020'E",
    "elevation": "1,532m ASL",
    "climate": "Tropical Monsoon Mist",
    "temp": "16\u00b0C to 28\u00b0C",
    "bestSeason": "September \u2013 March (Green Season)",
    "duration": "5 Days / 4 Nights",
    "flightTime": "2h 30m Direct to Kochi",
    "airportCode": "COK (Kochi)",
    "startingPrice": 22500,
    "heroImage": "img/tours/kerala.jpg",
    "gallery": [
      "img/tours/kerala.jpg",
      "img/domestic-tour/goa.jpg",
      "img/domestic-tour/tamilnadu.jpg"
    ],
    "tagline": "Rolling emerald tea plantations, spice-scented winds, and private kettuvallam cruises.",
    "overview": "God's Own Country presents a tranquil sensory retreat. Ascend through mist-shrouded spice valleys to the high tea estates of Munnar, drift silently through the palm-fringed backwater canals of Alleppey aboard a private luxury houseboat, and rejuvenate with authentic Ayurvedic therapies.",
    "highlights": [
      "Private air-conditioned traditional Kettuvallam houseboat stay with personal onboard chef.",
      "Sunset boat safari on Lake Periyar spotting wild elephants and native waterbirds.",
      "Walking tea tasting session in century-old Munnar colonial tea plantations.",
      "Traditional Kathakali classical dance and Kalaripayattu martial arts show.",
      "Authentic Ayurvedic Abhyanga herbal oil wellness massage."
    ],
    "itineraryDays": [
      {
        "day": "01",
        "title": "Kochi Heritage to Munnar Hills",
        "desc": "Pickup at Cochin International Airport; scenic drive past Cheeyappara waterfalls to Munnar cloud estates."
      },
      {
        "day": "02",
        "title": "Munnar Tea Plantations & Eravikulam",
        "desc": "Spot rare Nilgiri Tahr mountain goats; visit heritage tea museum and Mattupetty dam."
      },
      {
        "day": "03",
        "title": "Cardamom Hills & Thekkady Periyar",
        "desc": "Scenic transfer to Periyar spice country; guided spice walk seeing pepper, vanilla, and cloves."
      },
      {
        "day": "04",
        "title": "Alleppey Houseboat Backwater Cruise",
        "desc": "Board private luxury wooden houseboat; glide past paddy fields and village canals enjoying Karimeen lunch."
      },
      {
        "day": "05",
        "title": "Fort Kochi Chinese Fishing Nets & Departure",
        "desc": "Morning cruise breakfast; transfer to Fort Kochi colonial quarter before departure flight."
      }
    ],
    "packing": [
      "Light rain jacket or compact umbrella",
      "Casual cotton resort wear and comfortable walking sandals",
      "Light pullover or cardigan for cool Munnar mornings",
      "Mosquito repellent and natural bug spray",
      "Binoculars for bird watching on backwaters"
    ]
  },
  {
    "slug": "himachal-spiti",
    "title": "Himachal & Spiti High Passes",
    "region": "High Himalayas, India",
    "category": "domestic",
    "coords": "32\u00b014'N 77\u00b011'E",
    "elevation": "2,050m ASL",
    "climate": "Alpine Coniferous",
    "temp": "0\u00b0C to 16\u00b0C",
    "bestSeason": "April \u2013 June & Sept \u2013 Nov",
    "duration": "6 Days / 5 Nights",
    "flightTime": "1h 15m to Kullu/Chandigarh",
    "airportCode": "KUU (Bhuntar)",
    "startingPrice": 21000,
    "heroImage": "img/tours/manali.jpg",
    "gallery": [
      "img/tours/manali.jpg",
      "img/domestic-tour/kashmir.jpg",
      "img/tours/sikkim.jpg"
    ],
    "tagline": "Atal Tunnel engineering wonders, ancient deodar groves, and glacial river valleys.",
    "overview": "Traverse the dramatic alpine corridors of Himachal Pradesh. Cross the engineering marvel of Atal Tunnel to the mystical high valleys of Lahaul, walk under towering Himalayan cedar trees in Old Manali, and relax beside rushing turquoise streams in Kasol.",
    "highlights": [
      "Atal Tunnel crossing at 10,040 ft entering the stark desert valleys of Lahaul.",
      "Solang Valley adventure sports: tandem paragliding, ATV rides, and cable car.",
      "Parvati Valley riverside exploration and hot natural sulfur springs in Manikaran.",
      "Ancient Hadimba wooden pagoda temple in cedar forests.",
      "Luxury alpine resort stay with private wooden balcony overlooking snow-capped peaks."
    ],
    "itineraryDays": [
      {
        "day": "01",
        "title": "Chandigarh to Manali Scenic Drive",
        "desc": "Scenic highway drive along Beas river gorge; check-in at riverside alpine chalet."
      },
      {
        "day": "02",
        "title": "Solang Valley & Atal Tunnel Lahaul",
        "desc": "Cross the 9km tunnel into Sissu waterfall; adventure sports in Solang snow valley."
      },
      {
        "day": "03",
        "title": "Old Manali, Hadimba & Vashisht",
        "desc": "Visit 500-year-old Hadimba temple; bathe in natural hot springs and explore artisan cafes."
      },
      {
        "day": "04",
        "title": "Kasol & Parvati Valley Sanctuary",
        "desc": "Drive into lush Parvati valley; walk through pine forests along turquoise riverbanks."
      },
      {
        "day": "05",
        "title": "Manikaran Sahib & Kullu Shawl Weavers",
        "desc": "Visit sacred hot springs and langar; visit master Kullu handloom pashmina weaving cooperatives."
      },
      {
        "day": "06",
        "title": "Departure via Chandigarh / Bhuntar",
        "desc": "Panoramic morning mountain views; private highway escort to airport/railhead."
      }
    ],
    "packing": [
      "Fleece jacket and windproof hooded jacket",
      "Thermal underwear for higher altitude drives",
      "Ankle-support hiking shoes",
      "Lip balm, sunglasses, and cold cream",
      "Camera with polarizing filter for mountain skies"
    ]
  },
  {
    "slug": "andaman-islands",
    "title": "Andaman Emerald Islands & Havelock",
    "region": "Bay of Bengal, India",
    "category": "domestic",
    "coords": "11\u00b040'N 92\u00b045'E",
    "elevation": "12m ASL",
    "climate": "Tropical Ocean Maritime",
    "temp": "23\u00b0C to 30\u00b0C",
    "bestSeason": "October \u2013 May (Island Bliss)",
    "duration": "5 Days / 4 Nights",
    "flightTime": "2h 30m Direct from Kolkata/Chennai",
    "airportCode": "IXZ (Port Blair)",
    "startingPrice": 32000,
    "heroImage": "img/domestic-tour/goa.jpg",
    "gallery": [
      "img/domestic-tour/goa.jpg",
      "img/tours/kerala.jpg",
      "img/banner-1.jpg"
    ],
    "tagline": "Radhanagar white powder beaches, neon coral reefs, and private catamaran voyages.",
    "overview": "India's premier tropical island jewel. Voyage aboard high-speed private catamarans across crystal turquoise seas, walk barefoot on Radhanagar Beach (acclaimed among Asia's finest shores), snorkel alongside sea turtles at Elephant Beach, and discover the historical heritage of Cellular Jail.",
    "highlights": [
      "Radhanagar Beach Beach No. 7 sunset walk on velvet white quartz sand.",
      "Luxury high-speed catamaran cruise (Makruzz / Nautika) between islands.",
      "Guided snorkeling / sea-walk excursion among vibrant living coral reefs.",
      "Sound & Light historical show at the Cellular Jail national memorial.",
      "Private beachside candlelight seafood dinner under swaying coconut palms."
    ],
    "itineraryDays": [
      {
        "day": "01",
        "title": "Port Blair Arrival & Cellular Jail",
        "desc": "Land at Veer Savarkar Airport; check-in at oceanfront resort; visit Cellular Jail memorial."
      },
      {
        "day": "02",
        "title": "Catamaran to Havelock & Radhanagar Sunset",
        "desc": "Cruise across azure waters to Havelock Island; spend afternoon on Radhanagar beach."
      },
      {
        "day": "03",
        "title": "Elephant Beach Coral Reef Water Sports",
        "desc": "Speedboat to Elephant Beach; underwater sea walk and glass-bottom coral viewing."
      },
      {
        "day": "04",
        "title": "Neil Island Natural Bridge & Port Blair",
        "desc": "Explore natural rock bridge and Laxmanpur beach; evening catamaran back to capital."
      },
      {
        "day": "05",
        "title": "Chidiya Tapu & Departure",
        "desc": "Morning coastal sunrise and shell handicraft shopping before airport drop."
      }
    ],
    "packing": [
      "Quick-drying beachwear and UV swim rashguard",
      "Waterproof phone pouch and dry-bag",
      "Flip-flops and water reef shoes",
      "Reef-safe sunscreen and sunglasses",
      "Personal prescription snorkel mask if preferred"
    ]
  },
  {
    "slug": "meghalaya-northeast",
    "title": "North East Meghalaya & Kaziranga",
    "region": "Eastern Himalayas & Khasi Hills, India",
    "category": "domestic",
    "coords": "25\u00b034'N 91\u00b053'E",
    "elevation": "1,496m ASL",
    "climate": "Subtropical Montane",
    "temp": "12\u00b0C to 24\u00b0C",
    "bestSeason": "October \u2013 April (Clear Skies)",
    "duration": "6 Days / 5 Nights",
    "flightTime": "2h 45m to Guwahati",
    "airportCode": "GAU (Guwahati)",
    "startingPrice": 29500,
    "heroImage": "img/domestic-tour/meghalay.jpg",
    "gallery": [
      "img/domestic-tour/meghalay.jpg",
      "img/domestic-tour/darjeeling.jpg",
      "img/tours/sikkim.jpg"
    ],
    "tagline": "Bio-engineered living root bridges, crystal Umngot waters, and rhino safaris.",
    "overview": "Enter the mystical abode of clouds. Descend into subtropical gorges to witness ancient living root bridges woven by Khasi tribes, boat across the glass-like transparency of the Umngot River in Dawki, and embark on open-top jeep safaris tracking the endangered one-horned rhinoceros in Kaziranga.",
    "highlights": [
      "Trek to the iconic Living Root Bridges engineered from living Ficus elastica trees.",
      "Crystal-clear country boat ride in Dawki where boats appear suspended in air.",
      "Viewing the roaring plunge of Nohkalikai Falls from the high Cherrapunji rim.",
      "Open-top 4x4 jeep safari in Kaziranga National Park spotting wild rhinos and elephants.",
      "Stay in eco-luxury bamboo cottages overlooking sacred Khasi sacred groves."
    ],
    "itineraryDays": [
      {
        "day": "01",
        "title": "Guwahati to Shillong Scotland of the East",
        "desc": "Arrive at Guwahati Airport; scenic ascent to Shillong past Umiam Lake; evening Police Bazar."
      },
      {
        "day": "02",
        "title": "Cherrapunji Waterfalls & Caves",
        "desc": "Drive through deep gorges; explore Mawsmai limestone cave and Nohkalikai waterfall."
      },
      {
        "day": "03",
        "title": "Living Root Bridges & Dawki Glass River",
        "desc": "Walk along ancient tribal root paths; boat on crystal Umngot river along Bangladesh border."
      },
      {
        "day": "04",
        "title": "Transfer to Kaziranga National Park",
        "desc": "Descend into the fertile Brahmaputra floodplains; evening Assamese cultural dance show."
      },
      {
        "day": "05",
        "title": "Kaziranga Elephant & Jeep Wildlife Safari",
        "desc": "Early morning safari tracking one-horned rhinos, wild water buffalo, and swamp deer."
      },
      {
        "day": "06",
        "title": "Assam Tea Gardens & Guwahati Departure",
        "desc": "Visit certified organic Assam tea estate; private highway transfer to Guwahati Airport."
      }
    ],
    "packing": [
      "Comfortable trekking shoes with rubber grip",
      "Light rain jacket or windbreaker",
      "Neutral earth-tone clothing for wildlife safari",
      "Insect repellent and binoculars",
      "Camera with telephoto zoom lens"
    ]
  },
  {
    "slug": "iceland-glaciers",
    "title": "Iceland Glaciers & Northern Lights",
    "region": "Nordic Arctic",
    "category": "international",
    "coords": "64\u00b008'N 21\u00b056'W",
    "elevation": "840m ASL",
    "climate": "Arctic Marine",
    "temp": "-3\u00b0C to 4\u00b0C",
    "bestSeason": "October \u2013 March (Peak Aurora)",
    "duration": "7 Days / 6 Nights",
    "flightTime": "9h 40m via Helsinki/London",
    "airportCode": "KEF (Reykjavik)",
    "startingPrice": 125000,
    "heroImage": "img/banner-1.jpg",
    "gallery": [
      "img/banner-1.jpg",
      "img/banner-2.jpg",
      "img/international/new-zeland.jpg"
    ],
    "tagline": "Black basalt volcanic beaches, blue ice caverns, and celestial aurora ribbons.",
    "overview": "Experience the raw geological power of the North Atlantic. From the geothermal mists of the Blue Lagoon to the calving icebergs of J\u00f6kuls\u00e1rl\u00f3n glacier lagoon, this expedition puts you in private luxury 4x4 super-jeeps with expert glaciologists and aurora trackers.",
    "highlights": [
      "Private night expedition into Vatnaj\u00f6kull crystal blue ice caves with crampon gear.",
      "Super-Jeep traversal across Landmannalaugar rhyolite volcanic highlands.",
      "Zodiac boat navigation among floating icebergs at J\u00f6kuls\u00e1rl\u00f3n glacier lagoon.",
      "Boutique glass-domed lodge stay with 360-degree aurora wake-up alerts.",
      "Diamond Beach black sand ice crystal photography at sunrise."
    ],
    "itineraryDays": [
      {
        "day": "01",
        "title": "Arrival in Reykjavik & Geothermal Springs",
        "desc": "Land at Keflav\u00edk Airport, private chauffeur transfer to The Retreat at Blue Lagoon."
      },
      {
        "day": "02",
        "title": "Golden Circle & Thingvellir Rift Valley",
        "desc": "Walk between tectonic plates; witness Strokkur geyser erupting 30m high."
      },
      {
        "day": "03",
        "title": "South Coast Waterfalls & Black Sand Basalt",
        "desc": "Walk behind Seljalandsfoss waterfall; explore Reynisfjara roaring basalt columns."
      },
      {
        "day": "04",
        "title": "Vatnaj\u00f6kull Glacier Expedition",
        "desc": "Ascend Europe largest ice cap in specialized super-jeeps; explore subterranean sapphire caves."
      },
      {
        "day": "05",
        "title": "J\u00f6kuls\u00e1rl\u00f3n & Diamond Beach Icebergs",
        "desc": "Watch blue icebergs drift towards the ocean; sunset photography along black quartz shoreline."
      },
      {
        "day": "06",
        "title": "Aurora Hunting & Secret Highland Lagoon",
        "desc": "Dark-sky night journey with expert astronomer; soak in secluded natural hot rivers."
      },
      {
        "day": "07",
        "title": "Reykjavik Harpa Hall & Departure",
        "desc": "Explore Nordic architecture before private transfer to Keflav\u00edk for return flight."
      }
    ],
    "packing": [
      "Waterproof windbreaker shell with GORE-TEX rating",
      "Thermal merino wool base layers (200+ GSM)",
      "Sturdy ankle-support waterproof hiking boots",
      "Tripod and wide-angle lens for Northern Lights capture",
      "Fleece-lined touch-screen gloves and balaclava"
    ]
  },
  {
    "slug": "swiss-alps",
    "title": "Swiss Alps & Glacial Fjord Lakes",
    "region": "Central Europe",
    "category": "international",
    "coords": "46\u00b035'N 8\u00b002'E",
    "elevation": "3,454m ASL",
    "climate": "High Alpine Temperate",
    "temp": "10\u00b0C to 22\u00b0C",
    "bestSeason": "May \u2013 October & Dec \u2013 Mar",
    "duration": "8 Days / 7 Nights",
    "flightTime": "8h 50m Direct to Zurich",
    "airportCode": "ZRH (Zurich)",
    "startingPrice": 165000,
    "heroImage": "img/international/canada.jpg",
    "gallery": [
      "img/international/canada.jpg",
      "img/banner-2.jpg",
      "img/international/new-zeland.jpg"
    ],
    "tagline": "Cogwheel mountain railways, Top of Europe ice palaces, and crystal fjord-like lakes.",
    "overview": "Switzerland represents the pinnacle of alpine luxury. Glide across emerald lakes on Belle \u00c9poque steamers, traverse high mountain passes aboard the glass-roofed Glacier Express, and wake to the sheer granite face of the Matterhorn from a heated infinity pool.",
    "highlights": [
      "Jungfraujoch Top of Europe cogwheel railway to 3,454 meters altitude.",
      "First-Class Swiss Travel Pass with unlimited scenic panoramic rail and lake steamers.",
      "Private chocolate workshop with master confiseur in Lucerne.",
      "Zermatt car-free village stay with uninterrupted Matterhorn views.",
      "Lake Geneva private vintage wooden boat cruise at sunset."
    ],
    "itineraryDays": [
      {
        "day": "01",
        "title": "Zurich Arrival & Lucerne Lakeside",
        "desc": "Arrival at Zurich Airport; scenic train to Lucerne and Chapel Bridge walk."
      },
      {
        "day": "02",
        "title": "Mount Pilatus Golden Roundtrip",
        "desc": "Steamer boat across Lake Lucerne; ascend world steepest cogwheel railway."
      },
      {
        "day": "03",
        "title": "Interlaken & Lauterbrunnen Waterfalls",
        "desc": "Transfer to Bernese Oberland; walk beneath cliff-hanging Staubbach waterfalls."
      },
      {
        "day": "04",
        "title": "Jungfraujoch Glacier Palace",
        "desc": "Eiger Express gondola and train inside mountain to Sphinx Observatory."
      },
      {
        "day": "05",
        "title": "Scenic Train to Zermatt & Matterhorn",
        "desc": "Panoramic journey into Valais valley; check-in at chalet overlooking Matterhorn."
      },
      {
        "day": "06",
        "title": "Gornergrat Cogwheel & Reflection Lake",
        "desc": "Ascend to 3,089m Gornergrat platform; photograph Matterhorn in Riffelsee."
      },
      {
        "day": "07",
        "title": "Montreux & Chillon Castle Lake Geneva",
        "desc": "Descend to Swiss Riviera vineyards; explore medieval Ch\u00e2teau de Chillon."
      },
      {
        "day": "08",
        "title": "Geneva / Zurich Departure",
        "desc": "Gourmet Swiss fondue luncheon and airport limousine transfer."
      }
    ],
    "packing": [
      "Smart-casual layers for mountain dining and chalets",
      "Waterproof windbreaker jacket with fleece lining",
      "Comfortable trail running shoes or light hikers",
      "Type J Swiss electrical travel adapter",
      "Daypack for scenic train and mountain excursions"
    ]
  },
  {
    "slug": "baku-caspian",
    "title": "Baku Flame Towers & Caspian Riviera",
    "region": "Caucasus & Caspian Sea",
    "category": "international",
    "coords": "40\u00b024'N 49\u00b053'E",
    "elevation": "-28m ASL (Below Sea Level)",
    "climate": "Semi-Arid Caspian",
    "temp": "14\u00b0C to 26\u00b0C",
    "bestSeason": "April \u2013 November (Ideal Weather)",
    "duration": "5 Days / 4 Nights",
    "flightTime": "3h 40m Direct from Delhi/Mumbai",
    "airportCode": "GYD (Baku)",
    "startingPrice": 48000,
    "heroImage": "img/international/azerbaijan.jpg",
    "gallery": [
      "img/international/azerbaijan.jpg",
      "img/tours/dubai.jpg",
      "img/international/uzbekistan.jpg"
    ],
    "tagline": "Futuristic Zaha Hadid curves, medieval Silk Road caravanserais, and Caspian breezes.",
    "overview": "The dazzling Land of Fire where historic Persian, Russian, and avant-garde futuristic architecture collide. Marvel at the flowing white curves of the Heydar Aliyev Centre, explore UNESCO-listed Icherisheher old fortress walls, and witness bubbling mud volcanoes at Gobustan.",
    "highlights": [
      "Heydar Aliyev Cultural Centre VIP architectural photography tour.",
      "Gobustan National Park mud volcanoes and ancient petroglyph rock art.",
      "Private evening yacht cruise along Baku Boulevard on the Caspian Sea.",
      "Ateshgah Fire Temple and Yanar Dag natural burning mountain gas flame.",
      "Fine-dining caviar and Caspian sturgeon tasting with traditional tea ceremony."
    ],
    "itineraryDays": [
      {
        "day": "01",
        "title": "Baku Heydar Aliyev Arrival & Boulevard",
        "desc": "VIP airport transfer to luxury Baku hotel; evening sunset walk along Caspian promenade."
      },
      {
        "day": "02",
        "title": "Old City Icherisheher & Maiden Tower",
        "desc": "Walk 12th-century stone alleys; visit Shirvanshahs Palace and miniature book museum."
      },
      {
        "day": "03",
        "title": "Zaha Hadid Architecture & Fire Mountain",
        "desc": "Explore Heydar Aliyev Centre; evening visit to burning flames of Yanar Dag."
      },
      {
        "day": "04",
        "title": "Gobustan Petroglyphs & Mud Volcanoes",
        "desc": "Excursion to ancient rock engravings and surreal bubbling mud volcanic cones."
      },
      {
        "day": "05",
        "title": "Nizami Street & Departure",
        "desc": "Shopping for Azerbaijani silk and carpets before private airport transfer."
      }
    ],
    "packing": [
      "Smart casual city attire and comfortable walking shoes",
      "Windbreaker jacket for Caspian sea breezes",
      "Camera for world-class modern architecture",
      "Type C/F standard European electrical adapter",
      "Sunglasses and light day bag"
    ]
  },
  {
    "slug": "thailand-island",
    "title": "Thailand Island Luxe & Bangkok Horizons",
    "region": "Southeast Asia Andaman",
    "category": "international",
    "coords": "7\u00b053'N 98\u00b023'E",
    "elevation": "10m ASL",
    "climate": "Tropical Monsoon",
    "temp": "26\u00b0C to 32\u00b0C",
    "bestSeason": "November \u2013 April (Sunny Seas)",
    "duration": "6 Days / 5 Nights",
    "flightTime": "4h 15m Direct to Bangkok/Phuket",
    "airportCode": "BKK / HKT",
    "startingPrice": 38000,
    "heroImage": "img/international/thailand.jpg",
    "gallery": [
      "img/international/thailand.jpg",
      "img/international/indonesia.jpg",
      "img/domestic-tour/goa.jpg"
    ],
    "tagline": "Private limestone island speedboats, golden royal wats, and clifftop dining.",
    "overview": "Immerse in the Kingdom of Smiles with unparalleled luxury. From VIP private longtail boat charters across the emerald waters of Phang Nga Bay to private temple blessings in Bangkok and rooftop dining overlooking illuminated golden stupas.",
    "highlights": [
      "Private luxury catamaran charter to Phi Phi Islands and secluded Maya Bay.",
      "Private longtail boat glide through Phang Nga Bay limestone karsts.",
      "Grand Palace and Emerald Buddha private historian-guided VIP tour.",
      "Rooftop sunset cocktail dinner at Vertigo & Moon Bar overlooking Bangkok skyline.",
      "Luxury private pool villa stay in Phuket with dedicated butler."
    ],
    "itineraryDays": [
      {
        "day": "01",
        "title": "Bangkok Suvarnabhumi Arrival & Chao Phraya",
        "desc": "VIP immigration escort; luxury riverside hotel check-in; evening private river dinner."
      },
      {
        "day": "02",
        "title": "Grand Palace & Golden Wat Arun",
        "desc": "Explore royal temples and gilded stupas; afternoon private canal boat tour."
      },
      {
        "day": "03",
        "title": "Flight to Phuket & Beach Villa",
        "desc": "Domestic flight to Phuket; check-in at clifftop pool villa overlooking Andaman Sea."
      },
      {
        "day": "04",
        "title": "Phi Phi & Bamboo Island Catamaran",
        "desc": "Full-day private catamaran sailing; snorkeling in turquoise lagoons and coral reefs."
      },
      {
        "day": "05",
        "title": "Phang Nga Bay & Sea Canoe Caves",
        "desc": "Explore hidden sea caves and James Bond limestone needle; sunset seafood dinner."
      },
      {
        "day": "06",
        "title": "Phuket Old Town & Departure",
        "desc": "Sino-Portuguese heritage street walk and boutique shopping before airport transfer."
      }
    ],
    "packing": [
      "Tropical resort linen and stylish swimwear",
      "Respectful temple attire covering shoulders and knees",
      "Waterproof dry pouch for boat excursions",
      "High SPF water-resistant sunscreen",
      "Universal travel power adapter"
    ]
  },
  {
    "slug": "goa-corporate-mice",
    "title": "Goa Coastal Corporate Leadership Retreat",
    "region": "Konkan Coast, India",
    "category": "mice",
    "coords": "15\u00b029'N 73\u00b049'E",
    "elevation": "5m ASL",
    "climate": "Tropical Coastal",
    "temp": "24\u00b0C to 31\u00b0C",
    "bestSeason": "October \u2013 April (Corporate High Season)",
    "duration": "4 Days / 3 Nights",
    "flightTime": "1h 30m Direct from Mumbai/Ahmedabad/Delhi",
    "airportCode": "GOI / GOX (Goa)",
    "startingPrice": 18500,
    "heroImage": "img/services/mice.jpg",
    "gallery": [
      "img/services/mice.jpg",
      "img/domestic-tour/goa.jpg",
      "img/tours/kerala.jpg"
    ],
    "tagline": "5-star beachfront lawn conference, sunset yacht charters, and gala dinners.",
    "overview": "Energize leadership teams and reward top performers. Tailored for corporate groups of 15 to 200+ delegates, offering world-class AV ballrooms, open-air beach Olympics, private sunset catamaran cocktail charters, and centralized corporate GST billing.",
    "highlights": [
      "5-star luxury beachfront resort buyout with dedicated conference halls.",
      "Exclusive sunset catamaran cocktail charter with live saxophonist.",
      "Beach Olympics team building program curated by professional facilitators.",
      "Gala award dinner with LED backdrop, DJ soundstage, and coastal barbecue.",
      "Dedicated on-ground White Swan tour directors for 24/7 delegate logistics."
    ],
    "itineraryDays": [
      {
        "day": "01",
        "title": "Delegate Arrival & Sundowner Welcome",
        "desc": "Airport Volvo coach transfers; registration desk; beach lawn cocktail reception."
      },
      {
        "day": "02",
        "title": "Strategic Summit & Catamaran Cruise",
        "desc": "Morning conference session; afternoon sunset sailing along the Arabian Sea."
      },
      {
        "day": "03",
        "title": "Team Building & Grand Gala Awards",
        "desc": "Outdoor beach challenge games; evening black-tie gala banquet and DJ night."
      },
      {
        "day": "04",
        "title": "Wellness Breakfast & Delegate Departure",
        "desc": "Morning yoga on the beach; departure transfers coordinated with flight schedules."
      }
    ],
    "packing": [
      "Business casual conference attire and formal gala evening wear",
      "Smart swimwear and casual resort shoes",
      "Corporate ID and delegate registration documents",
      "Sunscreen, hat, and sunglasses for outdoor activities",
      "Laptop and presentation clicker for conference sessions"
    ]
  },
  {
    "slug": "dubai-corporate-summit",
    "title": "Dubai Corporate Summit & Desert Gala",
    "region": "United Arab Emirates",
    "category": "mice",
    "coords": "25\u00b012'N 55\u00b016'E",
    "elevation": "16m ASL",
    "climate": "Subtropical Desert",
    "temp": "20\u00b0C to 29\u00b0C",
    "bestSeason": "October \u2013 April (Exhibition Season)",
    "duration": "5 Days / 4 Nights",
    "flightTime": "3h 30m Direct from AMD/DEL/BOM",
    "airportCode": "DXB (Dubai)",
    "startingPrice": 42000,
    "heroImage": "img/tours/dubai.jpg",
    "gallery": [
      "img/tours/dubai.jpg",
      "img/services/mice.jpg",
      "img/tours/jaisalmer.jpg"
    ],
    "tagline": "World-class convention arenas, private mega-yacht sails, and dune banquets.",
    "overview": "Inspire global delegates with unmatched grandeur. Designed for international dealer meets, incentive trips, and corporate summits. Combines state-of-the-art ballroom technology with private desert dune banquets and luxury marina yacht networking.",
    "highlights": [
      "Private 80-ft luxury mega-yacht charter in Dubai Marina with gourmet catering.",
      "Exclusive private desert camp buyout with dune bashing and starlit entertainment.",
      "VIP fast-track Burj Khalifa observatory pass and Dubai Mall fountain show.",
      "State-of-the-art ballroom conference setup with simultaneous translation support.",
      "Single consolidated corporate invoice with verified GST input credit documentation."
    ],
    "itineraryDays": [
      {
        "day": "01",
        "title": "Dubai International Arrival & Marina Welcome",
        "desc": "Private terminal coach escort; check-in at 5-star hotel; private yacht networking sail."
      },
      {
        "day": "02",
        "title": "Full-Day Corporate Conference & Keynote",
        "desc": "General assembly keynote in grand ballroom; breakout workshops and executive lunch."
      },
      {
        "day": "03",
        "title": "Desert Conservation Reserve Gala Night",
        "desc": "Afternoon 4x4 dune safari; VIP desert amphitheater award banquet under the stars."
      },
      {
        "day": "04",
        "title": "Abu Dhabi Tech / Trade Day & Louvre",
        "desc": "Excursion to UAE capital; visit business districts and Louvre Abu Dhabi museum."
      },
      {
        "day": "05",
        "title": "Executive Debrief & Coordinated Transfers",
        "desc": "Closing ceremony breakfast; scheduled private airport transfers for returning flights."
      }
    ],
    "packing": [
      "Formal business suits for keynotes and meetings",
      "Smart evening wear for desert gala and yacht networking",
      "Business cards and presentation materials",
      "Universal Type G three-pin UK power adapter",
      "Sunglasses and light jacket for air-conditioned halls"
    ]
  }
];

  // Helper: Format INR currency strictly with Intl.NumberFormat en-IN
  const inrFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  function formatINR(val) {
    return inrFormatter.format(Math.round(val));
  }

  // Theme System (Bright Sunlit Default + Dark Ocean-Midnight with Persistence)
  const THEME_STORAGE_KEY = 'wsh_theme';

  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) {}
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function updateThemeToggleButtons(theme) {
    const btns = document.querySelectorAll('.btn-theme-toggle');
    const isDark = theme === 'dark';
    btns.forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Switch to Sunlit Bright Theme' : 'Switch to Ocean Dark Theme');
      btn.title = isDark ? 'Switch to Sunlit Bright Theme' : 'Switch to Ocean Dark Theme';
      btn.innerHTML = isDark
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    });
  }

  function setTheme(theme) {
    const validTheme = (theme === 'dark') ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', validTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, validTheme);
    } catch (e) {}
    updateThemeToggleButtons(validTheme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
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
      document.body.classList.add('drawer-open');
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.body.classList.remove('drawer-open');
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
