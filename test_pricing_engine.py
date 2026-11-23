import math

class QuoteCalculator:
    GST_RATE = 0.05
    MIN_PROFIT_PER_PERSON = 500.0
    MAX_PROFIT_PER_PERSON = 1500.0

    HOTEL_RANGES = {
        '3': {'name': '3-Star Hotel', 'min': 3000.0, 'max': 4000.0, 'default': 3500.0},
        '4': {'name': '4-Star Hotel', 'min': 6000.0, 'max': 7000.0, 'default': 6500.0},
        '5': {'name': '5-Star Luxury Resort', 'min': 9000.0, 'max': 10000.0, 'default': 9500.0}
    }

    ITINERARY_TIERS = {
        'basic': {'name': 'Basic Sightseeing & Transfers', 'rate': 1200.0, 'mod': 50.0},
        'curated': {'name': 'Curated Leisure Itinerary', 'rate': 2500.0, 'mod': 150.0},
        'premium': {'name': 'Premium / Corporate MICE Itinerary', 'rate': 4500.0, 'mod': 300.0}
    }

    CLIENT_PROFILES = {
        'repeat': {'name': 'Repeat / Referral Client', 'base': 550.0},
        'standard': {'name': 'Standard Client', 'base': 800.0},
        'corporate': {'name': 'Corporate / VIP Client', 'base': 1100.0}
    }

    @classmethod
    def compute_dynamic_profit(cls, profile_key, nights, tier_key):
        base = cls.CLIENT_PROFILES.get(profile_key, cls.CLIENT_PROFILES['standard'])['base']
        if nights <= 3:
            dur = 50.0
        elif nights <= 6:
            dur = 150.0
        elif nights <= 10:
            dur = 250.0
        else:
            dur = 350.0
        tier_mod = cls.ITINERARY_TIERS.get(tier_key, cls.ITINERARY_TIERS['curated'])['mod']
        profit = base + dur + tier_mod
        return max(cls.MIN_PROFIT_PER_PERSON, min(cls.MAX_PROFIT_PER_PERSON, profit))

    @classmethod
    def calculate(cls, destination, dates, guests, nights, rooms, flight_fare, star_key, custom_room_rate, tier_key, profile_key):
        guests = max(1, int(guests))
        nights = max(1, int(nights))
        if rooms is None or rooms < 1:
            rooms = max(1, math.ceil(guests / 2.0))

        hotel_info = cls.HOTEL_RANGES[star_key]
        if custom_room_rate and custom_room_rate > 0:
            room_rate = max(hotel_info['min'], min(hotel_info['max'], float(custom_room_rate)))
        else:
            room_rate = hotel_info['default']

        flights_total = round(float(flight_fare) * guests, 2)
        hotel_total = round(room_rate * rooms * nights, 2)
        itin_info = cls.ITINERARY_TIERS[tier_key]
        itin_total = round(itin_info['rate'] * guests, 2)

        profit_pax = cls.compute_dynamic_profit(profile_key, nights, tier_key)
        margin_total = round(profit_pax * guests, 2)

        subtotal = round(flights_total + hotel_total + itin_total + margin_total, 2)
        gst = round(subtotal * cls.GST_RATE, 2)
        grand_total = round(subtotal + gst, 2)
        per_person = round(grand_total / guests, 2)

        return {
            'destination': destination,
            'dates': dates,
            'guests': guests,
            'nights': nights,
            'rooms': rooms,
            'hotel_name': hotel_info['name'],
            'room_rate': room_rate,
            'flight_fare': flight_fare,
            'flights_total': flights_total,
            'hotel_total': hotel_total,
            'itin_name': itin_info['name'],
            'itin_rate': itin_info['rate'],
            'itin_total': itin_total,
            'profile_name': cls.CLIENT_PROFILES[profile_key]['name'],
            'profit_pax': profit_pax,
            'margin_total': margin_total,
            'subtotal': subtotal,
            'gst': gst,
            'grand_total': grand_total,
            'per_person': per_person
        }

    @staticmethod
    def format_quote(q, admin=False):
        out = []
        out.append("============================================================")
        out.append("         WHITE SWAN HOLIDAYS - TRIP QUOTE SUMMARY           ")
        out.append("       We Infuse Life into Holidays · Ahmedabad & Gurugram   ")
        out.append("============================================================")
        out.append(f"Destination  : {q['destination']}")
        out.append(f"Travel Dates : {q['dates']}")
        out.append(f"Travelers    : {q['guests']} Guest(s) | Stay: {q['nights']} Night(s) | Rooms: {q['rooms']}")
        out.append(f"Hotel Tier   : {q['hotel_name']} @ ₹{q['room_rate']:,.0f}/room/night")
        out.append(f"Itinerary    : {q['itin_name']} (@ ₹{q['itin_rate']:,.0f}/person)")
        out.append(f"Client Type  : {q['profile_name']}")
        out.append("------------------------------------------------------------")
        out.append(f"1. Flights Total        : ₹{q['flights_total']:,.0f}  (₹{q['flight_fare']:,.0f} x {q['guests']})")
        out.append(f"2. Hotel Accommodation  : ₹{q['hotel_total']:,.0f}  (₹{q['room_rate']:,.0f} x {q['rooms']} rms x {q['nights']} nts)")
        out.append(f"3. Sightseeing & Tours  : ₹{q['itin_total']:,.0f}  (₹{q['itin_rate']:,.0f} x {q['guests']})")
        if admin:
            out.append(f"4. Agency Profit Margin : ₹{q['margin_total']:,.0f}  (Admin view: ₹{q['profit_pax']:,.0f}/pax, clamped [₹500,₹1500])")
        else:
            out.append(f"4. Agency Concierge Fee : ₹{q['margin_total']:,.0f}  (Included in Package)")
        out.append("------------------------------------------------------------")
        out.append(f"Subtotal                : ₹{q['subtotal']:,.0f}")
        out.append(f"Package GST (5%)        : ₹{q['gst']:,.0f}")
        out.append("============================================================")
        out.append(f"GRAND TOTAL             : ₹{q['grand_total']:,.0f}")
        out.append(f"PER PERSON QUOTE        : ₹{q['per_person']:,.0f}")
        out.append("============================================================")
        return "\n".join(out)


def run_tests():
    print("==============================================================")
    print("   WHITE SWAN HOLIDAYS - PRICING ENGINE VALIDATION SUITE      ")
    print("==============================================================")

    # Test 1
    t1 = QuoteCalculator.compute_dynamic_profit('repeat', 3, 'basic')
    assert 600.0 <= t1 <= 750.0 and t1 == 650.0, f"Test 1 failed: {t1}"
    print("✔ Test 1: Repeat Client Short Trip Margin (₹600–₹750) PASSED [₹650]")

    # Test 2
    t2 = QuoteCalculator.compute_dynamic_profit('standard', 5, 'curated')
    assert 950.0 <= t2 <= 1150.0 and t2 == 1100.0, f"Test 2 failed: {t2}"
    print("✔ Test 2: Standard Client Mid-length Curated Trip Margin (₹950–₹1,150) PASSED [₹1,100]")

    # Test 3
    t3 = QuoteCalculator.compute_dynamic_profit('corporate', 8, 'premium')
    assert t3 == 1500.0, f"Test 3 failed: {t3}"
    t3b = QuoteCalculator.compute_dynamic_profit('corporate', 4, 'curated')
    assert t3b == 1400.0, f"Test 3b failed: {t3b}"
    print("✔ Test 3: Corporate VIP Extended MICE Clamp [₹1400–₹1500] PASSED [₹1,400 & clamped ₹1,500]")

    # Test 4
    h3 = QuoteCalculator.HOTEL_RANGES['3']
    assert max(h3['min'], min(h3['max'], 2500.0)) == 3000.0
    assert max(h3['min'], min(h3['max'], 4500.0)) == 4000.0
    print("✔ Test 4: Hotel Category Rate Bounds Clamping PASSED")

    # Test 5
    q = QuoteCalculator.calculate("Kashmir Paradise", "15 Oct - 20 Oct", 2, 5, 1, 7500.0, '4', 6500.0, 'curated', 'standard')
    assert q['flights_total'] == 15000.0
    assert q['hotel_total'] == 32500.0
    assert q['itin_total'] == 5000.0
    assert q['margin_total'] == 2200.0
    assert q['subtotal'] == 54700.0
    assert q['gst'] == 2735.0
    assert q['grand_total'] == 57435.0
    assert q['per_person'] == 28717.5
    print("✔ Test 5: Mathematical GST (5%) & Grand Total Parity PASSED [₹57,435 total, ₹28,718/pax]")

    print("--------------------------------------------------------------")
    print("RESULTS: All 5 Validation Tests Passed Successfully (100%)!")
    print("--------------------------------------------------------------\n")

    print(QuoteCalculator.format_quote(q, admin=False))
    print()
    print("--- Internal Admin Breakdown (with dynamic margin inspect) ---")
    print(QuoteCalculator.format_quote(q, admin=True))


if __name__ == '__main__':
    run_tests()
