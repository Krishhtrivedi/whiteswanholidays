package com.whiteswan.pricing;

/**
 * White Swan Holidays - Pricing Engine Unit Validation & Demonstration Runner
 *
 * Can be compiled and executed directly without external libraries:
 *   javac src/com/whiteswan/pricing/*.java
 *   java -cp src com.whiteswan.pricing.QuoteCalculatorTest
 */
public class QuoteCalculatorTest {

    public static void main(String[] args) {
        System.out.println("==============================================================");
        System.out.println("   WHITE SWAN HOLIDAYS - PRICING ENGINE VALIDATION SUITE      ");
        System.out.println("==============================================================");

        int passed = 0;
        int total = 0;

        total++;
        if (testRepeatClientShortTrip()) {
            System.out.println("✔ Test 1: Repeat Client Short Trip Margin (₹600–₹750) PASSED");
            passed++;
        } else {
            System.err.println("✘ Test 1 FAILED");
        }

        total++;
        if (testStandardClientCuratedTrip()) {
            System.out.println("✔ Test 2: Standard Client Mid-length Curated Trip Margin (₹950–₹1,150) PASSED");
            passed++;
        } else {
            System.err.println("✘ Test 2 FAILED");
        }

        total++;
        if (testCorporateVipLongTripClamp()) {
            System.out.println("✔ Test 3: Corporate VIP Extended MICE Clamp [₹1400–₹1500] PASSED");
            passed++;
        } else {
            System.err.println("✘ Test 3 FAILED");
        }

        total++;
        if (testHotelRateClamping()) {
            System.out.println("✔ Test 4: Hotel Category Rate Bounds Clamping PASSED");
            passed++;
        } else {
            System.err.println("✘ Test 4 FAILED");
        }

        total++;
        if (testGstAndTotalCalculations()) {
            System.out.println("✔ Test 5: Mathematical GST (5%) & Grand Total Parity PASSED");
            passed++;
        } else {
            System.err.println("✘ Test 5 FAILED");
        }

        total++;
        if (testRoomAutoSuggestion()) {
            System.out.println("✔ Test 6: Room Auto-Suggestion Algorithm PASSED");
            passed++;
        } else {
            System.err.println("✘ Test 6 FAILED");
        }

        total++;
        if (testBookingServiceIntegration()) {
            System.out.println("✔ Test 7: Booking Service & WhatsApp Payload Generation PASSED");
            passed++;
        } else {
            System.err.println("✘ Test 7 FAILED");
        }

        System.out.println("--------------------------------------------------------------");
        System.out.printf("RESULTS: %d / %d Tests Passed Successfully!\n", passed, total);
        System.out.println("--------------------------------------------------------------\n");

        // Run detailed sample demonstration
        demonstrateSampleQuotes();

        if (passed != total) {
            System.exit(1);
        }
    }

    private static boolean testRepeatClientShortTrip() {
        // Repeat client (550), 3 nights (50), Basic (50) => 650
        double profit = QuoteCalculator.computeDynamicProfitPerPerson(
                QuoteCalculator.ClientProfile.REPEAT_REFERRAL, 3, QuoteCalculator.ItineraryTier.BASIC
        );
        return profit >= 600.0 && profit <= 750.0 && profit == 650.0;
    }

    private static boolean testStandardClientCuratedTrip() {
        // Standard client (800), 5 nights (150), Curated (150) => 1100
        double profit = QuoteCalculator.computeDynamicProfitPerPerson(
                QuoteCalculator.ClientProfile.STANDARD, 5, QuoteCalculator.ItineraryTier.CURATED
        );
        return profit >= 950.0 && profit <= 1150.0 && profit == 1100.0;
    }

    private static boolean testCorporateVipLongTripClamp() {
        // Corporate VIP (1100), 8 nights (250), Premium MICE (300) => 1650 -> clamped to 1500
        double clampedProfit = QuoteCalculator.computeDynamicProfitPerPerson(
                QuoteCalculator.ClientProfile.CORPORATE_VIP, 8, QuoteCalculator.ItineraryTier.PREMIUM_MICE
        );
        if (clampedProfit != 1500.0) return false;

        // Corporate VIP (1100), 4 nights (150), Curated (150) => 1400 (within 1400-1500)
        double vipProfit = QuoteCalculator.computeDynamicProfitPerPerson(
                QuoteCalculator.ClientProfile.CORPORATE_VIP, 4, QuoteCalculator.ItineraryTier.CURATED
        );
        return vipProfit == 1400.0;
    }

    private static boolean testHotelRateClamping() {
        QuoteCalculator.HotelCategory threeStar = QuoteCalculator.HotelCategory.THREE_STAR;
        if (threeStar.clampRate(2500.0) != 3000.0) return false;
        if (threeStar.clampRate(4500.0) != 4000.0) return false;
        if (threeStar.clampRate(3400.0) != 3400.0) return false;

        QuoteCalculator.HotelCategory fourStar = QuoteCalculator.HotelCategory.FOUR_STAR;
        if (fourStar.clampRate(5000.0) != 6000.0) return false;
        if (fourStar.clampRate(7500.0) != 7000.0) return false;

        QuoteCalculator.HotelCategory fiveStar = QuoteCalculator.HotelCategory.FIVE_STAR;
        if (fiveStar.clampRate(8000.0) != 9000.0) return false;
        if (fiveStar.clampRate(12000.0) != 10000.0) return false;

        return true;
    }

    private static boolean testGstAndTotalCalculations() {
        QuoteCalculator.QuoteRequest req = new QuoteCalculator.QuoteRequest()
                .destination("Kashmir Paradise")
                .travelDates("15 Oct - 20 Oct")
                .guests(2)
                .nights(5)
                .rooms(1)
                .flightFarePerPerson(7500.0)
                .hotelCategory(QuoteCalculator.HotelCategory.FOUR_STAR)
                .customRoomRate(6500.0)
                .itineraryTier(QuoteCalculator.ItineraryTier.CURATED) // 2500 per person
                .clientProfile(QuoteCalculator.ClientProfile.STANDARD);

        QuoteCalculator.QuoteResult res = QuoteCalculator.calculate(req);

        // Flights: 7500 * 2 = 15000
        // Hotel: 6500 * 1 room * 5 nights = 32500
        // Itinerary: 2500 * 2 = 5000
        // Margin: Standard (800) + 5 nights (150) + Curated (150) = 1100 per person * 2 = 2200
        // Subtotal: 15000 + 32500 + 5000 + 2200 = 54700
        // GST (5%): 54700 * 0.05 = 2735
        // Grand Total: 54700 + 2735 = 57435
        // Per Person: 57435 / 2 = 28717.5

        if (res.getFlightsTotal() != 15000.0) return false;
        if (res.getHotelTotal() != 32500.0) return false;
        if (res.getItineraryTotal() != 5000.0) return false;
        if (res.getAgencyMarginTotal() != 2200.0) return false;
        if (res.getSubtotal() != 54700.0) return false;
        if (res.getGstAmount() != 2735.0) return false;
        if (res.getGrandTotal() != 57435.0) return false;
        if (res.getPerPersonTotal() != 28717.5) return false;

        return true;
    }

    private static boolean testRoomAutoSuggestion() {
        QuoteCalculator.QuoteRequest r1 = new QuoteCalculator.QuoteRequest().guests(1);
        if (r1.getSuggestedRooms() != 1) return false;

        QuoteCalculator.QuoteRequest r2 = new QuoteCalculator.QuoteRequest().guests(2);
        if (r2.getSuggestedRooms() != 1) return false;

        QuoteCalculator.QuoteRequest r3 = new QuoteCalculator.QuoteRequest().guests(3);
        if (r3.getSuggestedRooms() != 2) return false;

        QuoteCalculator.QuoteRequest r4 = new QuoteCalculator.QuoteRequest().guests(5);
        if (r4.getSuggestedRooms() != 3) return false;

        return true;
    }

    private static boolean testBookingServiceIntegration() {
        BookingService service = new BookingService();
        QuoteCalculator.QuoteRequest req = new QuoteCalculator.QuoteRequest()
                .destination("Dubai Luxury Escapade")
                .travelDates("10 Nov - 15 Nov")
                .guests(4)
                .nights(5)
                .rooms(2)
                .flightFarePerPerson(18000.0)
                .hotelCategory(QuoteCalculator.HotelCategory.FIVE_STAR)
                .customRoomRate(9500.0)
                .itineraryTier(QuoteCalculator.ItineraryTier.PREMIUM_MICE)
                .clientProfile(QuoteCalculator.ClientProfile.CORPORATE_VIP);

        BookingService.BookingInquiry inquiry = service.createInquiry(
                "Rajesh Mehra", "+91 98250 12345", "rajesh@mehraexports.com", req
        );

        if (inquiry.getInquiryId() == null || !inquiry.getInquiryId().startsWith("WSH-")) return false;
        String msg = inquiry.generateWhatsAppMessage();
        return msg.contains("Dubai Luxury Escapade") && msg.contains("Rajesh Mehra");
    }

    private static void demonstrateSampleQuotes() {
        System.out.println("SAMPLE QUOTATION DEMONSTRATION:");

        QuoteCalculator.QuoteRequest sample = new QuoteCalculator.QuoteRequest()
                .destination("Switzerland & Paris Grand Tour")
                .travelDates("10 Dec - 17 Dec")
                .guests(2)
                .nights(7)
                .rooms(1)
                .flightFarePerPerson(42000.0)
                .hotelCategory(QuoteCalculator.HotelCategory.FIVE_STAR)
                .customRoomRate(9800.0)
                .itineraryTier(QuoteCalculator.ItineraryTier.PREMIUM_MICE)
                .clientProfile(QuoteCalculator.ClientProfile.CORPORATE_VIP);

        QuoteCalculator.QuoteResult quote = QuoteCalculator.calculate(sample);

        System.out.println("\n--- Customer Facing Quote Summary ---");
        System.out.println(quote.formatSummary(false));

        System.out.println("\n--- Internal Admin Breakdown ---");
        System.out.println(quote.formatSummary(true));
    }
}
