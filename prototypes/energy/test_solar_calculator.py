import unittest
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from solar_sizing_lcoe_calculator import AccraSolarCalculator

class TestAccraSolarCalculator(unittest.TestCase):
    def setUp(self):
        self.calc = AccraSolarCalculator(daily_load_kwh=12.0, discount_rate=0.10)

    def test_system_sizing(self):
        # 12 kWh / (5.14 * 0.78) ≈ 2.99 kWp -> rounds to 3.0 kWp
        rec_size = self.calc.recommend_system_size_kwp()
        self.assertAlmostEqual(rec_size, 3.0, delta=0.5)

    def test_lcoe_benchmark(self):
        res = self.calc.calculate_lcoe_and_payback(3.0, tariff_tier='high_consumption')
        # LCOE should fall within realistic range of $0.06 - $0.11 / kWh
        self.assertGreater(res['lcoe_usd_kwh'], 0.06)
        self.assertLess(res['lcoe_usd_kwh'], 0.11)

    def test_high_tariff_payback_viability(self):
        res = self.calc.calculate_lcoe_and_payback(5.0, tariff_tier='high_consumption')
        # High residential tariff ($0.142/kWh) should yield payback under 8 years
        self.assertLessEqual(res['simple_payback_years'], 8)
        self.assertGreater(res['npv_usd'], 0.0)

    def test_ohs_safety_checklist(self):
        checklist = self.calc.get_ohs_safety_protocol()
        self.assertGreaterEqual(len(checklist), 5)
        self.assertTrue(any("fall arrest" in item.lower() for item in checklist))

if __name__ == '__main__':
    unittest.main()
