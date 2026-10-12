# Accra Rooftop Solar PV Sizing & LCOE Calculator (Prototype)

An open-source techno-economic sizing and investment return engine for residential grid-tied solar photovoltaic systems in Greater Accra Region, Ghana. Incorporates NASA POWER solar irradiance telemetry, PURC utility tariff tiers, and an Act 328 OHS compliance protocol.

## Author
BERNARD FIAGBENU (Computer Scientist)

## Target Problems Addressed
1. Improper solar PV system sizing leading to early battery failure and customer disillusionment.
2. Lack of transparent financial payback modeling against gazetted PURC retail tariffs.
3. Workplace fall and electrocution hazards for residential solar installation technicians.

## Running the Prototype
Requires Python 3.8+ (standard library only).

```bash
# Run calculation CLI
python3 solar_sizing_lcoe_calculator.py

# Run test suite
python3 -m unittest test_solar_calculator.py
```

## Maturity Level
`Prototype built` (Techno-economic modeling formulas and PURC tariff comparisons verified with 100% test pass rate).

## Safety Disclaimer
Electrical and structural solar designs require certified engineering review prior to high-voltage grid interconnection in accordance with Energy Commission of Ghana regulations.

## License
MIT License
