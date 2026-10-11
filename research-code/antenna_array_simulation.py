"""
Electromagnetic Simulation of Linear and Phased Array Antennas
Calculates Array Factor (AF), Half-Power Beamwidth (HPBW), First-Null Beamwidth (FNBW),
and Sidelobe Level (SLL in dB) across element counts N, spacings d/lambda, and scan angles.

Author: BERNARD FIAGBENU (Computer Scientist)
Language: Python 3.10 standard library (math, json, cmath)
"""

import math
import cmath
import json

def calculate_array_factor(N, d_over_lambda, scan_angle_deg, theta_deg):
    """
    Computes normalized array factor |AF(theta)| for an N-element linear array along z-axis.
    theta: angle from broadside (or endfire depending on convention; here broadside is 0 deg).
    k = 2*pi / lambda
    psi = k*d*(sin(theta) - sin(theta_0))
    """
    theta_rad = math.radians(theta_deg)
    theta0_rad = math.radians(scan_angle_deg)
    k_d = 2.0 * math.pi * d_over_lambda
    psi = k_d * (math.sin(theta_rad) - math.sin(theta0_rad))
    
    # Sum over elements n = 0 to N-1
    af_complex = sum(cmath.exp(1j * n * psi) for n in range(N))
    af_mag = abs(af_complex) / N  # Normalize to 1.0 peak
    return af_mag

def analyze_linear_array(N, d_over_lambda, scan_angle_deg):
    # Sample theta from -90 to +90 degrees in 0.1 degree steps
    angles = [i * 0.1 for i in range(-900, 901)]
    pattern = [calculate_array_factor(N, d_over_lambda, scan_angle_deg, th) for th in angles]
    
    # Peak index and value
    peak_val = max(pattern)
    peak_idx = pattern.index(peak_val)
    peak_angle = angles[peak_idx]
    
    # HPBW (-3 dB = 1 / sqrt(2) ≈ 0.7071)
    threshold_3db = peak_val / math.sqrt(2.0)
    
    # Scan right from peak to find -3dB point
    right_3db = angles[-1]
    for i in range(peak_idx, len(pattern)):
        if pattern[i] <= threshold_3db:
            right_3db = angles[i]
            break
            
    # Scan left from peak to find -3dB point
    left_3db = angles[0]
    for i in range(peak_idx, -1, -1):
        if pattern[i] <= threshold_3db:
            left_3db = angles[i]
            break
            
    hpbw = right_3db - left_3db
    
    # Sidelobes (local maxima outside mainlobe)
    # First null right
    first_null_right = angles[-1]
    for i in range(peak_idx + 1, len(pattern) - 1):
        if pattern[i] <= pattern[i-1] and pattern[i] <= pattern[i+1]:
            first_null_right = angles[i]
            break
            
    # First null left
    first_null_left = angles[0]
    for i in range(peak_idx - 1, 0, -1):
        if pattern[i] <= pattern[i-1] and pattern[i] <= pattern[i+1]:
            first_null_left = angles[i]
            break
            
    fnbw = first_null_right - first_null_left
    
    # Find maximum sidelobe outside [first_null_left, first_null_right]
    sidelobe_peak = 0.0
    for i, th in enumerate(angles):
        if th < first_null_left or th > first_null_right:
            if pattern[i] > sidelobe_peak:
                sidelobe_peak = pattern[i]
                
    sll_db = 20.0 * math.log10(sidelobe_peak) if sidelobe_peak > 1e-6 else -60.0
    
    return {
        'N': N,
        'd_lambda': d_over_lambda,
        'scan_angle_deg': scan_angle_deg,
        'peak_angle_deg': round(peak_angle, 2),
        'hpbw_deg': round(hpbw, 2),
        'fnbw_deg': round(fnbw, 2),
        'sll_db': round(sll_db, 2)
    }

def main():
    element_counts = [4, 8, 16, 32]
    spacings = [0.25, 0.5, 0.75]
    scan_angles = [0, 15, 30, 45]
    
    results = []
    
    for N in element_counts:
        for d in spacings:
            for theta0 in scan_angles:
                res = analyze_linear_array(N, d, theta0)
                results.append(res)
                
    with open('research-code/antenna_simulation_results.json', 'w') as f:
        json.dump(results, f, indent=2)
        
    print(f"Antenna array simulation completed. {len(results)} configurations computed.")

if __name__ == '__main__':
    main()
