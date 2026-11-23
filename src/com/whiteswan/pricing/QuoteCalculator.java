package com.whiteswan.pricing;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.NumberFormat;
import java.util.Locale;
import java.util.Objects;

/**
 * White Swan Holidays - Pricing & Package Quote Engine
 *
 * Implements luxury travel quotation formulas with dynamic agency margin calculation,
 * hotel tier range validation, itinerary tier pricing, and 5% GST computation.
 * Zero external dependencies; compatible with Java 8, 11, 17, and 21+.
 */
public class QuoteCalculator {

    public static final double GST_RATE = 0.05; // 5% Travel Package GST
    public static final double MIN_PROFIT_PER_PERSON = 500.0;
    public static final double MAX_PROFIT_PER_PERSON = 1500.0;

    public enum HotelCategory {
        THREE_STAR("3-Star Hotel", 3000.0, 4000.0, 3500.0),
        FOUR_STAR("4-Star Hotel", 6000.0, 7000.0, 6500.0),
        FIVE_STAR("5-Star Luxury Resort", 9000.0, 10000.0, 9500.0);

        private final String displayName;
        private final double minRate;
        private final double maxRate;
        private final double defaultRate;

        HotelCategory(String displayName, double minRate, double maxRate, double defaultRate) {
            this.displayName = displayName;
            this.minRate = minRate;
            this.maxRate = maxRate;
            this.defaultRate = defaultRate;
        }

        public String getDisplayName() { return displayName; }
        public double getMinRate() { return minRate; }
        public double getMaxRate() { return maxRate; }
        public double getDefaultRate() { return defaultRate; }

        public double clampRate(double requestedRate) {
            if (requestedRate <= 0) return defaultRate;
            return Math.max(minRate, Math.min(maxRate, requestedRate));
        }
    }

    public enum ItineraryTier {
        BASIC("Basic Sightseeing & Transfers", 1200.0, 50.0),
        CURATED("Curated Leisure Itinerary", 2500.0, 150.0),
        PREMIUM_MICE("Premium / Corporate MICE Itinerary", 4500.0, 300.0);

        private final String displayName;
        private final double ratePerPerson;
        private final double marginModifier;

        ItineraryTier(String displayName, double ratePerPerson, double marginModifier) {
            this.displayName = displayName;
            this.ratePerPerson = ratePerPerson;
            this.marginModifier = marginModifier;
        }

        public String getDisplayName() { return displayName; }
        public double getRatePerPerson() { return ratePerPerson; }
        public double getMarginModifier() { return marginModifier; }
    }

    public enum ClientProfile {
        REPEAT_REFERRAL("Repeat / Referral Client", 550.0),
        STANDARD("Standard Client", 800.0),
        CORPORATE_VIP("Corporate / VIP Client", 1100.0);

        private final String displayName;
        private final double baseMargin;

        ClientProfile(String displayName, double baseMargin) {
            this.displayName = displayName;
            this.baseMargin = baseMargin;
        }

        public String getDisplayName() { return displayName; }
        public double getBaseMargin() { return baseMargin; }
    }

    /**
     * Input specification for calculating a travel quote.
     */
    public static class QuoteRequest {
        private String destination;
        private String travelDates;
        private int guests = 2;
        private int nights = 5;
        private int rooms = 1;
        private double flightFarePerPerson = 7500.0;
        private HotelCategory hotelCategory = HotelCategory.FOUR_STAR;
        private double customRoomRate = 0.0; // If 0, uses hotelCategory.getDefaultRate()
        private ItineraryTier itineraryTier = ItineraryTier.CURATED;
        private ClientProfile clientProfile = ClientProfile.STANDARD;

        public QuoteRequest() {}

        public QuoteRequest destination(String destination) { this.destination = destination; return this; }
        public QuoteRequest travelDates(String dates) { this.travelDates = dates; return this; }
        public QuoteRequest guests(int guests) { this.guests = guests; return this; }
        public QuoteRequest nights(int nights) { this.nights = nights; return this; }
        public QuoteRequest rooms(int rooms) { this.rooms = rooms; return this; }
        public QuoteRequest flightFarePerPerson(double fare) { this.flightFarePerPerson = fare; return this; }
        public QuoteRequest hotelCategory(HotelCategory cat) { this.hotelCategory = cat; return this; }
        public QuoteRequest customRoomRate(double rate) { this.customRoomRate = rate; return this; }
        public QuoteRequest itineraryTier(ItineraryTier tier) { this.itineraryTier = tier; return this; }
        public QuoteRequest clientProfile(ClientProfile profile) { this.clientProfile = profile; return this; }

        public void validate() {
            if (guests < 1) throw new IllegalArgumentException("Guests must be at least 1");
            if (nights < 1) throw new IllegalArgumentException("Stay duration (nights) must be at least 1");
            if (rooms < 1) {
                // Auto-suggest rooms if invalid or zero
                rooms = Math.max(1, (int) Math.ceil(guests / 2.0));
            }
            if (flightFarePerPerson < 0) throw new IllegalArgumentException("Flight fare cannot be negative");
            Objects.requireNonNull(hotelCategory, "Hotel category must be provided");
            Objects.requireNonNull(itineraryTier, "Itinerary tier must be provided");
            Objects.requireNonNull(clientProfile, "Client profile must be provided");
        }

        public int getSuggestedRooms() {
            return Math.max(1, (int) Math.ceil(guests / 2.0));
        }

        public String getDestination() { return destination != null ? destination : "Custom Itinerary"; }
        public String getTravelDates() { return travelDates != null ? travelDates : "Flexible Dates"; }
        public int getGuests() { return guests; }
        public int getNights() { return nights; }
        public int getRooms() { return rooms > 0 ? rooms : getSuggestedRooms(); }
        public double getFlightFarePerPerson() { return flightFarePerPerson; }
        public HotelCategory getHotelCategory() { return hotelCategory; }
        public double getCustomRoomRate() { return customRoomRate; }
        public ItineraryTier getItineraryTier() { return itineraryTier; }
        public ClientProfile getClientProfile() { return clientProfile; }
    }

    /**
     * Immutable breakdown of a generated quote.
     */
    public static class QuoteResult {
        private final QuoteRequest request;
        private final double effectiveRoomRate;
        private final double flightsTotal;
        private final double hotelTotal;
        private final double itineraryTotal;
        private final double profitPerPerson;
        private final double agencyMarginTotal;
        private final double subtotal;
        private final double gstAmount;
        private final double grandTotal;
        private final double perPersonTotal;

        public QuoteResult(QuoteRequest request,
                           double effectiveRoomRate,
                           double flightsTotal,
                           double hotelTotal,
                           double itineraryTotal,
                           double profitPerPerson,
                           double agencyMarginTotal,
                           double subtotal,
                           double gstAmount,
                           double grandTotal,
                           double perPersonTotal) {
            this.request = request;
            this.effectiveRoomRate = effectiveRoomRate;
            this.flightsTotal = flightsTotal;
            this.hotelTotal = hotelTotal;
            this.itineraryTotal = itineraryTotal;
            this.profitPerPerson = profitPerPerson;
            this.agencyMarginTotal = agencyMarginTotal;
            this.subtotal = subtotal;
            this.gstAmount = gstAmount;
            this.grandTotal = grandTotal;
            this.perPersonTotal = perPersonTotal;
        }

        public QuoteRequest getRequest() { return request; }
        public double getEffectiveRoomRate() { return effectiveRoomRate; }
        public double getFlightsTotal() { return flightsTotal; }
        public double getHotelTotal() { return hotelTotal; }
        public double getItineraryTotal() { return itineraryTotal; }
        public double getProfitPerPerson() { return profitPerPerson; }
        public double getAgencyMarginTotal() { return agencyMarginTotal; }
        public double getSubtotal() { return subtotal; }
        public double getGstAmount() { return gstAmount; }
        public double getGrandTotal() { return grandTotal; }
        public double getPerPersonTotal() { return perPersonTotal; }

        private static String inr(double val) {
            NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("en", "IN"));
            // Keep output clean with standard ₹ prefix
            return nf.format(Math.round(val)).replace("INR", "₹").trim();
        }

        /**
         * Formatted quote summary text ready for customer presentation or staff review.
         */
        public String formatSummary(boolean showAdminMargin) {
            StringBuilder sb = new StringBuilder();
            sb.append("============================================================\n");
            sb.append("         WHITE SWAN HOLIDAYS - TRIP QUOTE SUMMARY           \n");
            sb.append("       We Infuse Life into Holidays · Ahmedabad & Gurugram   \n");
            sb.append("============================================================\n");
            sb.append(String.format("Destination  : %s\n", request.getDestination()));
            sb.append(String.format("Travel Dates : %s\n", request.getTravelDates()));
            sb.append(String.format("Guests       : %d Traveler(s) | Stay: %d Night(s) | Rooms: %d\n",
                    request.getGuests(), request.getNights(), request.getRooms()));
            sb.append(String.format("Hotel Tier   : %s @ %s /room/night\n",
                    request.getHotelCategory().getDisplayName(), inr(effectiveRoomRate)));
            sb.append(String.format("Itinerary    : %s (@ %s/person)\n",
                    request.getItineraryTier().getDisplayName(), inr(request.getItineraryTier().getRatePerPerson())));
            sb.append(String.format("Client Type  : %s\n", request.getClientProfile().getDisplayName()));
            sb.append("------------------------------------------------------------\n");
            sb.append(String.format("1. Flights Total        : %s  (%s x %d)\n",
                    inr(flightsTotal), inr(request.getFlightFarePerPerson()), request.getGuests()));
            sb.append(String.format("2. Hotel Accommodation  : %s  (%s x %d rooms x %d nights)\n",
                    inr(hotelTotal), inr(effectiveRoomRate), request.getRooms(), request.getNights()));
            sb.append(String.format("3. Sightseeing & Tours  : %s  (%s x %d)\n",
                    inr(itineraryTotal), inr(request.getItineraryTier().getRatePerPerson()), request.getGuests()));

            if (showAdminMargin) {
                sb.append(String.format("4. Agency Profit Margin : %s  (Admin view: %s/pax, clamped [%d,%d])\n",
                        inr(agencyMarginTotal), inr(profitPerPerson), (int) MIN_PROFIT_PER_PERSON, (int) MAX_PROFIT_PER_PERSON));
            } else {
                sb.append(String.format("4. Agency Concierge Fee : %s  (Included in Package)\n",
                        inr(agencyMarginTotal)));
            }

            sb.append("------------------------------------------------------------\n");
            sb.append(String.format("Subtotal                : %s\n", inr(subtotal)));
            sb.append(String.format("Package GST (5%%)        : %s\n", inr(gstAmount)));
            sb.append("============================================================\n");
            sb.append(String.format("GRAND TOTAL             : %s\n", inr(grandTotal)));
            sb.append(String.format("PER PERSON QUOTE        : %s\n", inr(perPersonTotal)));
            sb.append("============================================================\n");
            sb.append("Note: Subject to hotel availability & airfare volatility at\n");
            sb.append("time of confirmation. Issued by White Swan Holidays Pvt Ltd.\n");
            return sb.toString();
        }

        @Override
        public String toString() {
            return formatSummary(false);
        }
    }

    /**
     * Compute dynamic per-person profit margin strictly clamped in [500, 1500].
     *
     * Formula:
     *   profit = baseProfit(ClientProfile)
     *          + durationModifier(nights)
     *          + itineraryModifier(ItineraryTier)
     *   profit = clamp(profit, 500.0, 1500.0)
     */
    public static double computeDynamicProfitPerPerson(ClientProfile profile, int nights, ItineraryTier tier) {
        double base = (profile != null ? profile : ClientProfile.STANDARD).getBaseMargin();

        // Duration modifier
        double durationModifier;
        if (nights <= 3) {
            durationModifier = 50.0;
        } else if (nights <= 6) {
            durationModifier = 150.0;
        } else if (nights <= 10) {
            durationModifier = 250.0;
        } else {
            durationModifier = 350.0;
        }

        // Itinerary tier modifier
        double tierModifier = (tier != null ? tier : ItineraryTier.CURATED).getMarginModifier();

        double calculatedProfit = base + durationModifier + tierModifier;

        // Enforce strict bounds [500, 1500]
        return Math.max(MIN_PROFIT_PER_PERSON, Math.min(MAX_PROFIT_PER_PERSON, calculatedProfit));
    }

    /**
     * Calculates the complete travel quote from a validated QuoteRequest.
     */
    public static QuoteResult calculate(QuoteRequest request) {
        Objects.requireNonNull(request, "QuoteRequest cannot be null");
        request.validate();

        int guests = request.getGuests();
        int nights = request.getNights();
        int rooms = request.getRooms();

        // 1. Flights Total
        double flightsTotal = round(request.getFlightFarePerPerson() * guests);

        // 2. Hotel Total with validated rate
        double effectiveRoomRate = request.getHotelCategory().clampRate(
                request.getCustomRoomRate() > 0 ? request.getCustomRoomRate() : request.getHotelCategory().getDefaultRate()
        );
        double hotelTotal = round(effectiveRoomRate * rooms * nights);

        // 3. Itinerary Total
        double itineraryRate = request.getItineraryTier().getRatePerPerson();
        double itineraryTotal = round(itineraryRate * guests);

        // 4. Dynamic Profit Margin & Agency Margin
        double profitPerPerson = computeDynamicProfitPerPerson(
                request.getClientProfile(), nights, request.getItineraryTier()
        );
        double agencyMarginTotal = round(profitPerPerson * guests);

        // 5. Subtotal
        double subtotal = round(flightsTotal + hotelTotal + itineraryTotal + agencyMarginTotal);

        // 6. GST 5%
        double gstAmount = round(subtotal * GST_RATE);

        // 7. Grand Total and Per-Person Final Quote
        double grandTotal = round(subtotal + gstAmount);
        double perPersonTotal = round(grandTotal / guests);

        return new QuoteResult(
                request,
                effectiveRoomRate,
                flightsTotal,
                hotelTotal,
                itineraryTotal,
                profitPerPerson,
                agencyMarginTotal,
                subtotal,
                gstAmount,
                grandTotal,
                perPersonTotal
        );
    }

    private static double round(double val) {
        return BigDecimal.valueOf(val).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }
}
