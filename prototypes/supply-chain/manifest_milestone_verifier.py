"""
Cryptographic Port Consignment Manifest Verifier (Extending China Xpress)
Enforces immutable milestone chaining for China-Ghana maritime freight forwarding.
Author: BERNARD FIAGBENU (Computer Scientist)
License: MIT
"""

import hashlib
import json
import time
from typing import Dict, List, Optional, Tuple

class ShipmentMilestone:
    def __init__(self, step_name: str, location: str, details: str, prev_hash: str):
        self.timestamp = int(time.time())
        self.step_name = step_name
        self.location = location
        self.details = details
        self.prev_hash = prev_hash
        self.block_hash = self.calculate_hash()

    def calculate_hash(self) -> str:
        payload = f"{self.prev_hash}|{self.timestamp}|{self.step_name}|{self.location}|{self.details}"
        return hashlib.sha256(payload.encode('utf-8')).hexdigest()

    def to_dict(self) -> Dict:
        return {
            'step_name': self.step_name,
            'location': self.location,
            'details': self.details,
            'timestamp': self.timestamp,
            'prev_hash': self.prev_hash,
            'block_hash': self.block_hash,
        }


class ConsignmentAuditLedger:
    """
    Lightweight append-only cryptographic ledger extending the China Xpress platform
    to provide verifiable consignment provenance for Tema and Takoradi ports.
    """
    def __init__(self, tracking_number: str):
        self.tracking_number = tracking_number
        self.chain: List[ShipmentMilestone] = []
        # Initialize Genesis Block
        genesis = ShipmentMilestone("CONSIGNMENT_REGISTERED", "China Supplier", f"Tracking {tracking_number} created", "0"*64)
        self.chain.append(genesis)

    def append_milestone(self, step_name: str, location: str, details: str) -> ShipmentMilestone:
        prev_hash = self.chain[-1].block_hash
        milestone = ShipmentMilestone(step_name, location, details, prev_hash)
        self.chain.append(milestone)
        return milestone

    def verify_integrity(self) -> Tuple[bool, Optional[str]]:
        """
        Validates hash linkage throughout the consignment lifecycle.
        Returns (True, None) if completely tamper-free, or (False, error_details).
        """
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i - 1]

            # Check pointer integrity
            if current.prev_hash != previous.block_hash:
                return False, f"Broken hash pointer at step {i}: {current.step_name}"

            # Check block re-calculation integrity
            recalculated = current.calculate_hash()
            if current.block_hash != recalculated:
                return False, f"Tampered block content at step {i}: {current.step_name}"

        return True, None


if __name__ == '__main__':
    ledger = ConsignmentAuditLedger("CX-2026-GH8821")
    ledger.append_milestone("ORIGIN_LOADING", "Guangzhou Terminal", "Loaded into 40ft Container CX-882")
    ledger.append_milestone("VESSEL_DEPARTURE", "Nansha Port", "Vessel MV Volta Pioneer departed")
    ledger.append_milestone("PORT_DISCHARGE", "Tema Port (MPS Terminal 3)", "Container discharged on berth 2")
    ledger.append_milestone("CUSTOMS_RELEASE", "ICUMS Clearing Gateway", "Duty assessed and cleared by GRA")

    valid, err = ledger.verify_integrity()
    print("China Xpress Consignment Cryptographic Audit Ledger:")
    print("=" * 65)
    print(f"Tracking Number: {ledger.tracking_number}")
    print(f"Total Verified Milestones: {len(ledger.chain)}")
    print(f"Latest Terminal Hash: {ledger.chain[-1].block_hash[:24]}...")
    print(f"Cryptographic Audit Integrity Valid: {valid}")
