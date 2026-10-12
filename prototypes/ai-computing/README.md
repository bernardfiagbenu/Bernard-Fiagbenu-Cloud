# Ghana Indigenous Language Classifier (Prototype)

An open-source, deterministic n-gram classification tool designed for low-resource Ghanaian languages (Akan/Twi, Ewe, Ga, Ghanaian English) operating under low-compute, offline-first constraints.

## Author
BERNARD FIAGBENU (Computer Scientist)

## Target Problems Addressed
1. Severe scarcity of labeled computational data for Ghanaian indigenous languages.
2. Inability to execute cloud-based transformer LLMs on low-power rural edge devices.

## Running the Prototype
Requires Python 3.8+ (standard library only, zero external dependencies).

```bash
# Run demo
python3 ghana_language_classifier.py

# Run unit tests
python3 -m unittest test_classifier.py
```

## Maturity Level
`Prototype built` (Tested locally with 100% test pass rate across synthetic linguistic corpora).

## License
MIT License
