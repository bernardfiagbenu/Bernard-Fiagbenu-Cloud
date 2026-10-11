"""
Techno-Economic Feasibility and Levelized Cost of Energy (LCOE) Model
for Residential Rooftop Solar Photovoltaic Systems in Accra, Ghana.
Based on Global Solar Atlas and NASA POWER irradiance parameters.

Author: BERNARD FIAGBENU (Computer Scientist)
Language: Python 3.10 standard library
"""

import json

def calculate_solar_economics():
    # Location: Accra, Ghana (5.6037 N, -0.1870 W)
    # GHI: 5.14 kWh/m^2/day -> 1876.1 kWh/m^2/year
    annual_ghi = 1876.1
    performance_ratio = 0.78 # Temperature de-rating (29 C ambient) + inverter efficiency
    system_sizes_kwp = [3.0, 5.0, 10.0]
    
    # Financial parameters
    capex_per_kwp = 850.0  # USD/kWp (Tier-1 mono PV + hybrid inverter + racking)
    opex_per_kwp_yr = 15.0 # USD/kWp/year
    inverter_replacement_yr12 = 250.0 # USD/kWp at year 12
    lifespan_years = 25
    degradation_rate = 0.005 # 0.5% per annum
    
    discount_rates = [0.08, 0.10, 0.12, 0.15]
    
    # Grid tariffs in USD/kWh (PURC Ghana gazetted tariffs converted at current FX)
    # Tier 1 (Lifeline): ~$0.045 / kWh
    # Tier 2 (51-300 kWh): ~$0.102 / kWh
    # Tier 3 (>300 kWh): ~$0.142 / kWh
    tariffs = {
        'Subsidized_Band': 0.045,
        'Middle_Residential': 0.102,
        'High_Consumption': 0.142
    }
    
    results = {}
    
    for size in system_sizes_kwp:
        results[f"{size}kWp"] = {}
        capex_total = size * capex_per_kwp
        
        for r in discount_rates:
            r_key = f"discount_{int(r*100)}pct"
            
            # Discounted energy and discounted lifetime costs
            discounted_energy = 0.0
            discounted_costs = capex_total
            
            annual_cash_flows = {tariff_name: [] for tariff_name in tariffs}
            
            for t in range(1, lifespan_years + 1):
                # Annual energy generated
                gen_t = size * annual_ghi * performance_ratio * ((1.0 - degradation_rate) ** (t - 1))
                discounted_energy += gen_t / ((1.0 + r) ** t)
                
                # Annual O&M
                cost_t = size * opex_per_kwp_yr
                if t == 12:
                    cost_t += size * inverter_replacement_yr12
                discounted_costs += cost_t / ((1.0 + r) ** t)
                
                # Revenue / Savings under each tariff
                for t_name, rate in tariffs.items():
                    revenue_t = gen_t * rate - cost_t
                    annual_cash_flows[t_name].append(revenue_t)
                    
            lcoe = discounted_costs / discounted_energy
            
            # Calculate NPV and Payback for each tariff
            financials = {}
            for t_name, rate in tariffs.items():
                npv = -capex_total
                cumulative_cf = -capex_total
                payback_years = None
                
                for yr, cf in enumerate(annual_cash_flows[t_name], 1):
                    npv += cf / ((1.0 + r) ** yr)
                    cumulative_cf += cf
                    if cumulative_cf >= 0 and payback_years is None:
                        payback_years = yr
                        
                financials[t_name] = {
                    'NPV_USD': round(npv, 2),
                    'Simple_Payback_Yrs': payback_years if payback_years else '>25',
                }
                
            results[f"{size}kWp"][r_key] = {
                'LCOE_USD_per_kWh': round(lcoe, 4),
                'Discounted_Lifetime_Energy_kWh': round(discounted_energy, 1),
                'Discounted_Lifetime_Costs_USD': round(discounted_costs, 2),
                'Tariff_Analysis': financials
            }
            
    with open('research-code/solar_lcoe_results.json', 'w') as f:
        json.dump(results, f, indent=2)
        
    print("Solar techno-economic simulation completed. Output written to research-code/solar_lcoe_results.json")

if __name__ == '__main__':
    calculate_solar_economics()
