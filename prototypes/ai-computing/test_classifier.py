import unittest
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ghana_language_classifier import GhanaLanguageClassifier

class TestGhanaLanguageClassifier(unittest.TestCase):
    def setUp(self):
        self.clf = GhanaLanguageClassifier()

    def test_twi_classification(self):
        text = "Mepa wo kyɛw, mepɛ sɛ mekɔ nhoma sukuu mu."
        lang, conf = self.clf.classify(text)
        self.assertEqual(lang, 'twi')
        self.assertGreater(conf, 0.40)

    def test_ewe_classification(self):
        text = "Mawu na agbe kple ŋutifafa na amesiame le Ghana."
        lang, conf = self.clf.classify(text)
        self.assertEqual(lang, 'ewe')
        self.assertGreater(conf, 0.40)

    def test_ga_classification(self):
        text = "Oyiwaladɔŋŋ hewɔ ni wɔyɛ Ga mli kɛ shika noko."
        lang, conf = self.clf.classify(text)
        self.assertEqual(lang, 'ga')
        self.assertGreater(conf, 0.40)

    def test_english_classification(self):
        text = "We are training deep learning algorithms on computing clusters."
        lang, conf = self.clf.classify(text)
        self.assertEqual(lang, 'english')
        self.assertGreater(conf, 0.50)

    def test_empty_input(self):
        probs = self.clf.predict("")
        self.assertEqual(len(probs), 4)

if __name__ == '__main__':
    unittest.main()
