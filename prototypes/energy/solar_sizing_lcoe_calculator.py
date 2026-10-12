"""
Accra Household Rooftop Solar Sizing, LCOE & PURC Tariff Calculator
Incorporates NASA POWER irradiance data for Accra, Ghana and PURC residential tariffs.
Author: BERNARD FIAGBENU (Computer Scientist)
License: MIT
"""

from typing import Dict, List, Tuple

class AccraSolarCalculator:
    """
    Techno-economic sizing and investment return engine for residential
    solar photovoltaic systems in Greater Accra Region, Ghana.
    """
    # Location Parameters for Accra (5.6037 N, -0.1870 W)
    ANNUAL_AVG_GHI_KWH_M2_DAY = 5.14
    PERFORMANCE_RATIO = 0.78  # Temperature derating & inverter efficiency
    USD_TO_GHS_EXCHANGE_RATE = 15.50  # October 2026 exchange benchmark
    
    # Capital and Operating Cost Benchmarks (Turnkey Tier-1 Mono + Inverter)
    CAPEX_USD_PER_KWP = 850.0
    OPEX_USD_PER_KWP_YR = 15.0
    LIFESPAN_YEARS = 25
    ANNUAL_DEGRADATION = 0.005  # 0.5% per year

    # Gazetted PURC Ghana Electricity Tariffs (approximate USD conversion)
    # Tier 1 (Lifeline <= 50 kWh): ~0.65 GHS/kWh ($0.042/kWh)
    # Tier 2 (51 - 300 kWh): ~1.48 GHS/kWh ($0.095/kWh)
    # Tier 3 (> 300 kWh): ~2.20 GHS/kWh ($0.142/kWh)
    PURC_TARIFFS_USD = {
        'lifeline': 0.042,
        'standard_residential': 0.095,
        'high_consumption': 0.142,
    }

    def __init__(self, daily_load_kwh: float = 12.0, discount_rate: float = 0.10):
        self.daily_load = daily_load_kwh
        self.discount_rate = discount_rate

    def recommend_system_size_kwp(self) -> float:
        """
        Calculates recommended grid-tied PV array capacity to cover daily load.
        Capacity (kWp) = Daily Load / (Daily GHI * Performance Ratio)
        """
        raw_size = self.daily_load / (self.ANNUAL_AVG_GHI_KWH_M2_DAY * self.PERFORMANCE_RATIO)
        # Round up to standard 0.5 kWp modular steps
        return round(round(raw_size * 2) / 2, 1)

    def calculate_lcoe_and_payback(
        self,
        system_kwp: float,
        tariff_tier: str = 'high_consumption'
    ) -> Dict[str, float]:
        capex_total_usd = system_kwp * self.CAPEX_USD_PER_KWP
        annual_ghi_kwh_m2 = self.ANNUAL_AVG_GHI_KWH_M2_DAY * 365.25

        discounted_energy_kwh = 0.0
        discounted_costs_usd = capex_total_usd
        
        annual_energy_y1 = system_kwp * annual_ghi_kwh_m2 * self.PERFORMANCE_RATIO
        grid_tariff_usd = self.PURC_TARIFFS_USD.get(tariff_tier, 0.142)

        cumulative_cashflow_usd = -capex_total_usd
        simple_payback_years = None
        npv_usd = -capex_total_usd

        for t in range(1, self.LIFESPAN_YEARS + 1):
            gen_t = annual_energy_y1 * ((1.0 - self.ANNUAL_DEGRADATION) ** (t - 1))
            discounted_energy_kwh += gen_t / ((1.0 + self.discount_rate) ** t)

            cost_t = system_kwp * self.OPEX_USD_PER_KWP_YR
            if t == 12:
                # Inverter replacement at year 12
                cost_t += system_kwp * 250.0
            discounted_costs_usd += cost_t / ((1.0 + self.discount_rate) ** t)

            # Annual savings vs PURC grid electricity
            savings_t = gen_t * grid_tariff_usd - cost_t
            npv_usd += savings_t / ((1.0 + self.discount_rate) ** t)
            cumulative_cashflow_usd += savings_t

            if cumulative_cashflow_usd >= 0 and simple_payback_years is None:
                simple_payback_years = t

        lcoe_usd = discounted_costs_usd / discounted_energy_kwh
        lcoe_ghs = lcoe_usd * self.USD_TO_GHS_EXCHANGE_RATE

        return {
            'system_size_kwp': system_kwp,
            'capex_usd': round(capex_total_usd, 2),
            'capex_ghs': round(capex_total_usd * self.USD_TO_GHS_EXCHANGE_RATE, 2),
            'lcoe_usd_kwh': round(lcoe_usd, 4),
            'lcoe_ghs_kwh': round(lcoe_ghs, 4),
            'npv_usd': round(npv_usd, 2),
            'npv_ghs': round(npv_usd * self.USD_TO_GHS_EXCHANGE_RATE, 2),
            'simple_payback_years': simple_payback_years or 25,
            'grid_tariff_usd_kwh': grid_tariff_usd,
        }

    @staticmethod
    def get_ohs_safety_protocol() -> List[str]:
        return [
            "Mandatory OSHA/Act 328 certified fall arrest harness anchoring for all roof slopes > 10 deg.",
            "DC disconnect switch rated to 1,000V DC installed within line of sight of inverter.",
            "Arc-flash compliant insulated tools (1,000V rated) during string combiner box termination.",
            "Midday thermal stress mitigation: scheduled hydration breaks during 11:00-14:00 solar peaks.",
            "Class D fire extinguisher on-site during lithium-ion battery bank installation and commissioning.",
        ]


if __name__ == '__main__':
    calc = AccraSolarCalculator(daily_load_kwh=15.0, discount_rate=0.10)
    rec_size = calc.recommend_system_size_kwp()
    results = calc.calculate_lcoe_and_payback(rec_size, tariff_tier='high_consumption')

    print("Accra Rooftop Solar PV Sizing & Techno-Economic Engine:")
    print("=" * 65)
    print(f"Recommended System Size: {rec_size} kWp")
    print(f"Turnkey Capex: ${results['capex_usd']} (GH¢ {results['capex_ghs']:,})")
    print(f"LCOE: ${results['lcoe_usd_kwh']}/kWh (GH¢ {results['lcoe_ghs_kwh']}/kWh)")
    print(f"Net Present Value: ${results['npv_usd']} (GH¢ {results['npv_ghs']:,})")
    print(f"Simple Payback Period: {results['simple_payback_years']} Years")
    print("\nMandatory OHS Compliance Items:")
    for item in calc.get_ohs_safety_protocol()[:3]:
        print(f" - {item}")
