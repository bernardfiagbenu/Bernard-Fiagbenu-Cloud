# Sub-6 GHz Phased Array Antenna Calculator & Beamformer CLI (Prototype)

An open-source electromagnetic simulation engine for uniform linear array (ULA) antenna analysis, targeting 3.5 GHz Fixed Wireless Access (FWA) and rural cellular connectivity deployments in Ghana.

## Author
BERNARD FIAGBENU (Computer Scientist)

## Target Problems Addressed
1. High cost and complex licensing of commercial electromagnetic solver tools in Ghanaian universities.
2. Unplanned grating lobe interference when steering beams across rural fixed-wireless corridors.

## Running the Prototype
Requires Python 3.8+ (standard library only).

```bash
# Run simulation CLI
python3 phased_array_calculator.py

# Run test suite
python3 -m unittest test_array_calculator.py
```

## Maturity Level
`Simulated` (Electromagnetic array factor formulation verified against published Balanis analytical benchmarks with 100% test pass rate).

## License
MIT License
