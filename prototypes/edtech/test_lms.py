import unittest
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from offline_lms_engine import OfflineCourseModule, StudentOfflineSession

class TestOfflineLMSEngine(unittest.TestCase):
    def setUp(self):
        self.module = OfflineCourseModule("CS204", "Data Structures")
        self.module.add_lesson("L1", "Arrays", "Contiguous memory allocations.")
        self.module.add_lesson("L2", "Linked Lists", "Node elements with pointers.")
        self.module.add_quiz("Q1", "Time complexity of array indexing?", ["O(1)", "O(n)", "O(log n)"], 0)
        self.student = StudentOfflineSession("STU-101")

    def test_lesson_read_and_progress(self):
        success = self.student.read_lesson(self.module, "L1")
        self.assertTrue(success)
        self.assertIn("L1", self.student.completed_lessons)

    def test_low_bandwidth_footprint(self):
        kb_usage = self.student.calculate_data_usage_kb(self.module)
        # Less than 1 KB for lightweight text modules
        self.assertLess(kb_usage, 1.0)

    def test_offline_queue_and_reconnection_sync(self):
        self.student.submit_quiz_answer("Q1", 0)
        self.assertEqual(len(self.student.outbox_queue), 1)

        # Offline failure
        synced_offline = self.student.sync_outbox(network_connected=False)
        self.assertEqual(synced_offline, 0)
        self.assertEqual(len(self.student.outbox_queue), 1)

        # Online restoration
        synced_online = self.student.sync_outbox(network_connected=True)
        self.assertEqual(synced_online, 1)
        self.assertEqual(len(self.student.outbox_queue), 0)

if __name__ == '__main__':
    unittest.main()
