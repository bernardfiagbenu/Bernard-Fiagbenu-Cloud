import unittest
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from phased_array_calculator import PhasedArrayCalculator

class TestPhasedArrayCalculator(unittest.TestCase):
    def setUp(self):
        self.calc = PhasedArrayCalculator(3.5e9)

    def test_wavelength(self):
        # 3.5 GHz wavelength should be ~0.08565 m (85.65 mm)
        self.assertAlmostEqual(self.calc.wavelength, 0.085655, places=4)

    def test_broadside_peak_angle(self):
        metrics = self.calc.scan_pattern(N=8, d_over_lambda=0.5, scan_angle_deg=0.0)
        self.assertEqual(metrics['peak_angle_deg'], 0.0)
        self.assertAlmostEqual(metrics['sll_db'], -13.26, delta=0.5)

    def test_hpbw_contraction_with_element_doubling(self):
        m4 = self.calc.scan_pattern(N=4, d_over_lambda=0.5, scan_angle_deg=0.0)
        m8 = self.calc.scan_pattern(N=8, d_over_lambda=0.5, scan_angle_deg=0.0)
        # N=8 HPBW should be roughly half of N=4 HPBW
        self.assertLess(m8['hpbw_deg'], m4['hpbw_deg'])
        self.assertAlmostEqual(m8['hpbw_deg'] / m4['hpbw_deg'], 0.5, delta=0.1)

    def test_grating_lobe_hazard_detection(self):
        # At 45 deg scan, grating lobe emerges if d > 1 / (1 + sin(45)) ≈ 0.585 lambda
        safe = self.calc.scan_pattern(N=8, d_over_lambda=0.5, scan_angle_deg=45.0)
        unsafe = self.calc.scan_pattern(N=8, d_over_lambda=0.75, scan_angle_deg=45.0)
        self.assertFalse(safe['has_grating_lobe_hazard'])
        self.assertTrue(unsafe['has_grating_lobe_hazard'])

if __name__ == '__main__':
    unittest.main()
