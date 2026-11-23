# 🕊️ White Swan Holidays — Luxury Travel & Quote Engine

Official web application for **White Swan Holidays Pvt Ltd** — bespoke international & domestic luxury holidays, corporate travel, MICE, visa assistance, and flight booking from Ahmedabad and Gurugram.

🌐 **Live Website**: [https://whiteswanholidays.onrender.com/](https://whiteswanholidays.onrender.com/)

---

## ✨ Overview of Modern Upgrades

The platform has been redesigned into an **editorial luxury travel & SaaS booking experience** inspired by top-featured Dribbble travel products, coupled with a dynamic **Trip & Package Quote Calculator** and a clean **Java backend pricing engine**.

### 1. 🎨 Dribbble-Grade Aesthetic & Luxury Design System
* **Refined Color Palette**: Warm alabaster & crisp ivory surfaces (`#FBFBFA`, `#FFFFFF`), deep midnight navy (`#0A192F`), warm champagne-gold (`#C5A059`, `#D4AF37`), and ocean-teal (`#0D9488`).
* **High-Contrast Editorial Typography**: Serif display headings (`Cormorant Garamond`) paired with ultra-clean modern UI text (`Inter`) and tabular numerals (`font-variant-numeric: tabular-nums`) for aligned financial breakdowns.
* **Hero Experience**: Full-bleed hero visuals with floating instant quote triggers, trust markers (5,000+ journeys, 99.4% satisfaction, IATA partner, 24/7 concierge), and smooth scroll transitions.
* **Curated Packages Showcase**: High-res destination imagery, duration badges, star rating pills, starting prices, and direct "Get Quote" triggers that pre-populate the calculator.
* **Flawless Responsiveness**: Touch-friendly controls, 0 horizontal overflow, and fully responsive across 375px mobile, tablet, and desktop viewports.

---

### 2. 🧮 Dynamic Trip & Package Quote Calculator
An interactive real-time calculator located directly on the homepage (`#quote-calculator`):
* **Inputs & Route Presets**:
  * Quick Route Presets: Short Domestic (~₹4.5k air), Metro/Long Domestic (~₹7.5k air), International/MICE (~₹18k air), Luxury Long-Haul (~₹45k air).
  * Guests (Adults) with stepper controls.
  * Stay Duration (Nights) with stepper controls.
  * Rooms counter with smart auto-suggestion (`Math.ceil(guests / 2)`) and manual override.
  * Flight fare input per person with quick preset chips.
  * Hotel Category cards & interactive slider within rates:
    * **3-Star Hotel**: ₹3,000 – ₹4,000 / room / night (default ₹3,500)
    * **4-Star Hotel**: ₹6,000 – ₹7,000 / room / night (default ₹6,500)
    * **5-Star Luxury Resort**: ₹9,000 – ₹10,000 / room / night (default ₹9,500)
  * Itinerary Tiers:
    * **Basic Sightseeing & Transfers**: ₹1,200 / person
    * **Curated Leisure Itinerary**: ₹2,500 / person
    * **Premium / Corporate MICE Itinerary**: ₹4,500 / person
  * Client Relationship Profile:
    * Repeat / Referral Client (loyalty base ₹550)
    * Standard Client (base ₹800)
    * Corporate / VIP Client (priority base ₹1,100)
* **Dynamic Profit Margin & Pricing Formula**:
  $$\text{Flights Total} = \text{flightFarePerPerson} \times \text{guests}$$
  $$\text{Hotel Total} = \text{selectedRoomRate} \times \text{rooms} \times \text{nights}$$
  $$\text{Itinerary Total} = \text{itineraryRatePerPerson} \times \text{guests}$$
  $$\text{profitPerPerson} = \text{clamp}(\text{baseProfit} + \text{durationBonus} + \text{tierBonus}, 500, 1500)$$
  $$\text{Agency Margin Total} = \text{profitPerPerson} \times \text{guests}$$
  $$\text{Subtotal} = \text{Flights} + \text{Hotel} + \text{Itinerary} + \text{Agency Margin}$$
  $$\text{GST (5\%)} = \text{Subtotal} \times 0.05$$
  $$\text{Grand Total} = \text{Subtotal} + \text{GST}$$
  $$\text{Per Person Quote} = \frac{\text{Grand Total}}{\text{guests}}$$
* **Admin Margin View Toggle**: Allows agency staff to inspect internal margin mechanics, clamping, and net profit percentage, while customer mode displays a clean all-inclusive package fee.
* **Instant Actions**:
  * "Book / Request Formal Quote" modal dialog with instant WhatsApp inquiry compilation.
  * "Copy Quote Summary" to clipboard.
  * "Download Quote Summary" as `.txt` invoice.

---

### 3. ☕ Java Backend Pricing Engine (`com.whiteswan.pricing`)
Modular, dependency-free Java 8/11/17/21+ backend classes ready for academic submission and backend service execution:

* **`src/com/whiteswan/pricing/QuoteCalculator.java`**:
  * Enums for `HotelCategory` (with clamping), `ItineraryTier`, and `ClientProfile`.
  * `QuoteRequest` with validation (guests $\ge 1$, nights $\ge 1$, auto-suggested rooms).
  * `QuoteResult` immutable breakdown with formatted text receipt generator.
  * Dynamic profit margin method with strict `[500, 1500]` bounds.
  * 5% travel package GST computation.
* **`src/com/whiteswan/pricing/BookingService.java`**:
  * Coordinates inquiries, generates reference IDs (`WSH-XXXX`), logs booking requests, and produces WhatsApp-formatted query strings.
* **`src/com/whiteswan/pricing/QuoteCalculatorTest.java`**:
  * Comprehensive test suite verifying all 7 test vectors:
    1. Repeat Client Short Trip margin (₹600–₹750).
    2. Standard Client Curated Trip margin (₹950–₹1,150).
    3. Corporate VIP Extended MICE Clamp strictly at ₹1,500.
    4. Hotel category rate bounds clamping.
    5. Mathematical GST & Grand Total parity.
    6. Room auto-suggestion algorithm.
    7. Booking Service & WhatsApp message generator.

#### Compilation & Execution
```bash
# Compile all Java pricing classes
javac src/com/whiteswan/pricing/*.java

# Run test harness and sample quote demonstration
java -cp src com.whiteswan.pricing.QuoteCalculatorTest
```

---

## 📁 Project Structure

```text
├── index.html                           # Redesigned luxury homepage & quote calculator
├── css/
│   └── luxury-theme.css                 # Dribbble luxury design system
├── js/
│   └── quote-calculator.js              # Reactive JavaScript pricing engine
├── src/com/whiteswan/pricing/
│   ├── QuoteCalculator.java             # Core Java pricing module & formulas
│   ├── BookingService.java              # Booking inquiry coordinator
│   └── QuoteCalculatorTest.java         # Test suite & demonstration runner
├── about.html                           # Company overview & founders
├── domestic.html                        # 16 India destinations & itineraries
├── international.html                   # 12 International destinations
├── mice.html                            # Corporate MICE management
├── medical-tourism.html                 # Medical travel facilitation
├── visa-air-ticket.html                 # Visa advisory & flight ticketing
├── corporate-gifting.html               # Luxury corporate gifting
├── gallery.html                         # Destination photo gallery
├── img/                                 # Brand assets & destination photography
├── render.yaml                          # Render Cloud deployment blueprint
└── README.md                            # Documentation & architecture guide
```

---

## 🛠️ Local Development

To run the web application locally:

```bash
# Clone the repository
git clone https://github.com/Krishhtrivedi/whiteswanholidays.git
cd whiteswanholidays

# Run local web server (Python 3)
python3 -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🚀 Render Cloud Deployment

The repository is configured for zero-downtime continuous deployment on [Render](https://render.com/) via `render.yaml`. Every push to `main` automatically triggers a build and deploys live to production:

```yaml
services:
  - type: web
    name: whiteswanholidays
    runtime: static
    buildCommand: ""
    staticPublishPath: .
```
