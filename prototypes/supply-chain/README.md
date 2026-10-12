# China Xpress Consignment Manifest Verifier & Audit Ledger (Prototype)

An open-source cryptographic audit and milestone verification module extending the China Xpress web platform (`https://shipingtracker.vercel.app/`), designed for Ghana's maritime port logistics corridor (Tema and Takoradi).

## Author
BERNARD FIAGBENU (Computer Scientist)

## Target Problems Addressed
1. Backdating and documentation fraud during cross-border cargo customs clearance.
2. Demurrage penalties caused by lack of verifiable container discharge timestamps.

## Running the Prototype
Requires Python 3.8+ (standard library only).

```bash
# Run demonstration
python3 manifest_milestone_verifier.py

# Run test suite
python3 -m unittest test_manifest_verifier.py
```

## Maturity Level
`Prototype built` (Cryptographic hash chaining and tamper-evident auditing verified with 100% test pass rate).

## License
MIT License
