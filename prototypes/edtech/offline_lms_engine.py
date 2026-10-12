"""
Offline-First Learning Content Engine for Bandwidth-Constrained Ghanaian Institutions
Simulates zero-rated text-first pedagogical content delivery and asynchronous sync.
Author: BERNARD FIAGBENU (Computer Scientist)
License: MIT
"""

import hashlib
import json
import time
from typing import Dict, List, Optional

class OfflineCourseModule:
    def __init__(self, course_id: str, title: str):
        self.course_id = course_id
        self.title = title
        self.lessons: List[Dict] = []
        self.quizzes: List[Dict] = []

    def add_lesson(self, lesson_id: str, title: str, text_content: str):
        # Calculate raw payload size in bytes
        raw_bytes = len(text_content.encode('utf-8'))
        content_hash = hashlib.sha256(text_content.encode('utf-8')).hexdigest()
        self.lessons.append({
            'lesson_id': lesson_id,
            'title': title,
            'content': text_content,
            'size_bytes': raw_bytes,
            'sha256': content_hash,
        })

    def add_quiz(self, quiz_id: str, question: str, options: List[str], correct_idx: int):
        self.quizzes.append({
            'quiz_id': quiz_id,
            'question': question,
            'options': options,
            'correct_idx': correct_idx,
        })


class StudentOfflineSession:
    """
    Manages local student offline cache, progress tracking, and batch submission queue.
    """
    def __init__(self, student_id: str):
        self.student_id = student_id
        self.completed_lessons: List[str] = []
        self.quiz_submissions: List[Dict] = []
        self.outbox_queue: List[Dict] = []

    def read_lesson(self, module: OfflineCourseModule, lesson_id: str) -> bool:
        for lesson in module.lessons:
            if lesson['lesson_id'] == lesson_id:
                if lesson_id not in self.completed_lessons:
                    self.completed_lessons.append(lesson_id)
                return True
        return False

    def submit_quiz_answer(self, quiz_id: str, selected_idx: int):
        submission = {
            'student_id': self.student_id,
            'quiz_id': quiz_id,
            'selected_idx': selected_idx,
            'timestamp': int(time.time()),
        }
        self.quiz_submissions.append(submission)
        # Queue in offline outbox
        self.outbox_queue.append(submission)

    def calculate_data_usage_kb(self, module: OfflineCourseModule) -> float:
        total_bytes = sum(l['size_bytes'] for l in module.lessons)
        return round(total_bytes / 1024.0, 2)

    def sync_outbox(self, network_connected: bool) -> int:
        """
        Synchronizes queued submissions when cellular connection is restored.
        Returns count of synced records.
        """
        if not network_connected:
            return 0
        synced_count = len(self.outbox_queue)
        self.outbox_queue.clear()
        return synced_count


if __name__ == '__main__':
    module = OfflineCourseModule("CS101", "Introduction to Computing at GCTU")
    module.add_lesson("L1", "Von Neumann Architecture", "The computer architecture consists of CPU, Memory, and I/O devices.")
    module.add_lesson("L2", "Algorithms & Complexity", "An algorithm is a finite sequence of well-defined computer-implementable instructions.")
    module.add_quiz("Q1", "What component performs arithmetic operations?", ["ALU", "Control Unit", "RAM", "Bus"], 0)

    student = StudentOfflineSession("GCTU-2026-0042")
    student.read_lesson(module, "L1")
    student.submit_quiz_answer("Q1", 0)

    print("Ghana Offline-First EdTech LMS Engine:")
    print("=" * 60)
    print(f"Course: {module.title}")
    print(f"Total Text Payload: {student.calculate_data_usage_kb(module)} KB (Near-Zero Mobile Data Consumption)")
    print(f"Pending Outbox Submissions: {len(student.outbox_queue)}")
    synced = student.sync_outbox(network_connected=True)
    print(f"Synced to Campus Server on Wi-Fi Reconnection: {synced} submissions")
