import unittest
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from manifest_milestone_verifier import ConsignmentAuditLedger

class TestConsignmentAuditLedger(unittest.TestCase):
    def setUp(self):
        self.ledger = ConsignmentAuditLedger("CX-TEST-001")
        self.ledger.append_milestone("ORIGIN_DISPATCH", "Yiwu Warehouse", "Package packaged")
        self.ledger.append_milestone("PORT_DEPARTURE", "Ningbo Port", "Vessel departed")
        self.ledger.append_milestone("TEMA_ARRIVAL", "Tema Port MPS T3", "Container arrived")

    def test_ledger_valid_integrity(self):
        is_valid, err = self.ledger.verify_integrity()
        self.assertTrue(is_valid)
        self.assertIsNone(err)

    def test_tamper_detection_in_details(self):
        # Malicious actor tampers with historic timestamp or location
        self.ledger.chain[1].details = "Tampered details attempting fraud"
        is_valid, err = self.ledger.verify_integrity()
        self.assertFalse(is_valid)
        self.assertIn("Tampered block content", err)

    def test_tamper_detection_in_hash_pointer(self):
        # Malicious actor replaces previous hash
        self.ledger.chain[2].prev_hash = "f" * 64
        is_valid, err = self.ledger.verify_integrity()
        self.assertFalse(is_valid)
        self.assertIn("Broken hash pointer", err)

if __name__ == '__main__':
    unittest.main()
