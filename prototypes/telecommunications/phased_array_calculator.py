"""
Sub-6 GHz Phased Array Antenna Calculator & Beamformer CLI
Calculates Array Factor, HPBW, SLL, and Grating Lobe Margins for 3.5 GHz FWA in Ghana.
Author: BERNARD FIAGBENU (Computer Scientist)
License: MIT
"""

import math
import cmath
from typing import Dict, List, Tuple

class PhasedArrayCalculator:
    """
    Computes analytical electromagnetic array factor metrics for uniform
    linear arrays (ULA) deployed in 5G Fixed Wireless Access (FWA).
    """
    C_LIGHT = 299792458.0  # m/s

    def __init__(self, frequency_hz: float = 3.5e9):
        self.freq = frequency_hz
        self.wavelength = self.C_LIGHT / frequency_hz  # ~0.08565 m (85.65 mm at 3.5 GHz)
        self.k = 2.0 * math.pi / self.wavelength

    def compute_progressive_phase(self, d_spacing_m: float, scan_angle_deg: float) -> float:
        """
        Computes required progressive element phase delay beta in radians.
        beta = -k * d * sin(theta_0)
        """
        theta0_rad = math.radians(scan_angle_deg)
        return -self.k * d_spacing_m * math.sin(theta0_rad)

    def calculate_array_factor(
        self,
        N: int,
        d_over_lambda: float,
        scan_angle_deg: float,
        theta_deg: float
    ) -> float:
        """
        Normalized Array Factor magnitude |AF(theta)|.
        """
        d_m = d_over_lambda * self.wavelength
        theta_rad = math.radians(theta_deg)
        theta0_rad = math.radians(scan_angle_deg)
        
        # Spatial phase difference psi
        psi = self.k * d_m * (math.sin(theta_rad) - math.sin(theta0_rad))
        
        # Array factor sum
        af = sum(cmath.exp(1j * n * psi) for n in range(N))
        return abs(af) / N

    def scan_pattern(
        self,
        N: int,
        d_over_lambda: float,
        scan_angle_deg: float,
        resolution_deg: float = 0.5
    ) -> Dict[str, float]:
        """
        Evaluates full radiation pattern from -90 to +90 degrees.
        Returns Peak Angle, HPBW, FNBW, and SLL (dB).
        """
        steps = int(180.0 / resolution_deg) + 1
        angles = [-90.0 + i * resolution_deg for i in range(steps)]
        pattern = [self.calculate_array_factor(N, d_over_lambda, scan_angle_deg, th) for th in angles]

        max_val = max(pattern)
        max_idx = pattern.index(max_val)
        peak_angle = angles[max_idx]

        # HPBW threshold (-3 dB = max_val / sqrt(2))
        hpbw_thresh = max_val / math.sqrt(2.0)
        
        # Right -3dB point
        right_hpbw = 90.0
        for i in range(max_idx, len(pattern)):
            if pattern[i] <= hpbw_thresh:
                right_hpbw = angles[i]
                break

        # Left -3dB point
        left_hpbw = -90.0
        for i in range(max_idx, -1, -1):
            if pattern[i] <= hpbw_thresh:
                left_hpbw = angles[i]
                break

        hpbw = round(right_hpbw - left_hpbw, 2)

        # First nulls
        right_null = 90.0
        for i in range(max_idx + 1, len(pattern) - 1):
            if pattern[i] <= pattern[i-1] and pattern[i] <= pattern[i+1]:
                right_null = angles[i]
                break

        left_null = -90.0
        for i in range(max_idx - 1, 0, -1):
            if pattern[i] <= pattern[i-1] and pattern[i] <= pattern[i+1]:
                left_null = angles[i]
                break

        fnbw = round(right_null - left_null, 2)

        # Peak sidelobe outside mainlobe
        sll_max = 0.0
        for i, th in enumerate(angles):
            if th < left_null or th > right_null:
                if pattern[i] > sll_max:
                    sll_max = pattern[i]

        sll_db = round(20.0 * math.log10(sll_max), 2) if sll_max > 1e-6 else -60.0

        # Check grating lobe hazard (d/lambda > 1 / (1 + |sin(theta_0)|))
        theta0_rad = abs(math.radians(scan_angle_deg))
        grating_limit = 1.0 / (1.0 + math.sin(theta0_rad)) if math.sin(theta0_rad) > 0 else 1.0
        has_grating_lobe = d_over_lambda > grating_limit

        return {
            'peak_angle_deg': round(peak_angle, 2),
            'hpbw_deg': hpbw,
            'fnbw_deg': fnbw,
            'sll_db': sll_db,
            'grating_limit_d_lambda': round(grating_limit, 3),
            'has_grating_lobe_hazard': has_grating_lobe,
        }

if __name__ == '__main__':
    calc = PhasedArrayCalculator(3.5e9)
    print(f"3.5 GHz Sub-6 GHz Phased Array Calculator (lambda = {calc.wavelength*1000:.2f} mm)")
    print("=" * 70)
    for N in [4, 8, 16]:
        for scan in [0.0, 30.0]:
            metrics = calc.scan_pattern(N, 0.5, scan)
            print(f"N={N:2d} Elements | Steering: {scan:4.1f}° | HPBW: {metrics['hpbw_deg']:4.1f}° | SLL: {metrics['sll_db']:6.2f} dB | Hazard: {metrics['has_grating_lobe_hazard']}")
