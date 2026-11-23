package com.whiteswan.pricing;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * White Swan Holidays - Booking Service
 *
 * Coordinates travel quote generation, formal booking inquiries,
 * WhatsApp link generation, and quote history logging.
 */
public class BookingService {

    public static class BookingInquiry {
        private final String inquiryId;
        private final String customerName;
        private final String contactPhone;
        private final String contactEmail;
        private final QuoteCalculator.QuoteResult quote;
        private final long timestamp;

        public BookingInquiry(String customerName,
                              String contactPhone,
                              String contactEmail,
                              QuoteCalculator.QuoteResult quote) {
            this.inquiryId = "WSH-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            this.customerName = customerName;
            this.contactPhone = contactPhone;
            this.contactEmail = contactEmail;
            this.quote = quote;
            this.timestamp = System.currentTimeMillis();
        }

        public String getInquiryId() { return inquiryId; }
        public String getCustomerName() { return customerName; }
        public String getContactPhone() { return contactPhone; }
        public String getContactEmail() { return contactEmail; }
        public QuoteCalculator.QuoteResult getQuote() { return quote; }
        public long getTimestamp() { return timestamp; }

        /**
         * Generates URL-encoded WhatsApp text inquiry payload.
         */
        public String generateWhatsAppMessage() {
            QuoteCalculator.QuoteRequest req = quote.getRequest();
            StringBuilder sb = new StringBuilder();
            sb.append("Hello White Swan Holidays,\n\n");
            sb.append("I would like to request a formal quote for our upcoming trip:\n");
            sb.append("• Reference ID: ").append(inquiryId).append("\n");
            sb.append("• Destination: ").append(req.getDestination()).append("\n");
            sb.append("• Dates: ").append(req.getTravelDates()).append("\n");
            sb.append("• Travelers: ").append(req.getGuests()).append(" Guest(s) | ").append(req.getNights()).append(" Night(s)\n");
            sb.append("• Hotel: ").append(req.getHotelCategory().getDisplayName()).append(" (").append(req.getRooms()).append(" Room(s))\n");
            sb.append("• Itinerary Tier: ").append(req.getItineraryTier().getDisplayName()).append("\n");
            sb.append("• Estimated Total: ₹").append((long) Math.round(quote.getGrandTotal())).append(" (₹").append((long) Math.round(quote.getPerPersonTotal())).append(" per person)\n\n");
            sb.append("Customer Details:\n");
            sb.append("• Name: ").append(customerName).append("\n");
            sb.append("• Phone: ").append(contactPhone).append("\n");
            if (contactEmail != null && !contactEmail.isEmpty()) {
                sb.append("• Email: ").append(contactEmail).append("\n");
            }
            sb.append("\nPlease review availability and share our finalized day-wise itinerary.");
            return sb.toString();
        }
    }

    private final List<BookingInquiry> inquiryLog = new ArrayList<>();

    /**
     * Creates and records a formal booking inquiry.
     */
    public BookingInquiry createInquiry(String customerName,
                                        String phone,
                                        String email,
                                        QuoteCalculator.QuoteRequest request) {
        QuoteCalculator.QuoteResult quote = QuoteCalculator.calculate(request);
        BookingInquiry inquiry = new BookingInquiry(customerName, phone, email, quote);
        inquiryLog.add(inquiry);
        return inquiry;
    }

    public List<BookingInquiry> getInquiryLog() {
        return new ArrayList<>(inquiryLog);
    }
}
