"""
Ghanaian Indigenous Language Identification and N-Gram Text Classifier
Supports: Akan (Twi), Ewe, Ga, and Ghanaian English.
Author: BERNARD FIAGBENU (Computer Scientist)
License: MIT
"""

import math
import re
from typing import Dict, List, Tuple

class GhanaLanguageClassifier:
    """
    Lightweight, deterministic character n-gram language classifier for
    low-resource Ghanaian language processing in bandwidth-constrained environments.
    """
    
    # Representative linguistic character profile markers
    # Akan (Twi): frequent 'ɛ', 'ɔ', 'gy', 'ky', 'hy', 'dw', 'tw', 'mu', 'wo', 'na'
    # Ewe: frequent 'ɖ', 'ƒ', 'ɣ', 'ŋ', 'ɔ', 'ʋ', 'wo', 'nye', 'le', 'kple'
    # Ga: frequent 'ɛ', 'ɔ', 'ŋ', 'ts', 'kp', 'gb', 'ni', 'kɛ', 'yɛ', 'mli'
    # English: standard Latin orthography without special phonetic vowels
    
    STOPWORDS_AND_AFFIXES = {
      'twi': [
        'wo', 'na', 'mu', 'ne', 'no', 'saa', 'se', 'wɔ', 'yi', 'deɛ', 'enti', 
        'koraa', 'papa', 'berɛ', 'nnipa', 'obi', 'pɛ', 'kasa', 'nyame', 'nhoma'
      ],
      'ewe': [
        'le', 'kple', 'wo', 'na', 'nye', 'esia', 'be', 'la', 'ɖe', 'vɔ', 'tɔ',
        'ame', 'fia', 'agbe', 'mawu', 'nuto', 'gake', 'kpɔ', 'ale'
      ],
      'ga': [
        'kɛ', 'ni', 'yɛ', 'mli', 'lɛ', 'kɛjɛ', 'fɛɛ', 'bɔ', 'gbeyi', 'noko',
        'gbɔmɔ', 'shika', 'nyɛŋ', 'tsɔɔ', 'hewɔ', 'wiemɔ'
      ],
      'english': [
        'the', 'and', 'to', 'of', 'in', 'is', 'that', 'for', 'it', 'as', 'was',
        'with', 'on', 'are', 'by', 'this', 'from', 'at', 'system', 'data'
      ]
    }

    def __init__(self, ngram_range: Tuple[int, int] = (2, 3)):
        self.min_n, self.max_n = ngram_range
        self.profiles: Dict[str, Dict[str, float]] = {}
        self._build_profiles()

    def _tokenize_words(self, text: str) -> List[str]:
        cleaned = re.sub(r'[^\w\s\u0190\u025B\u0186\u0254\u0189\u0256\u0191\u0192\u0194\u0263\u014A\u014B\u01B2\u028B]', ' ', text.lower())
        return [w for w in cleaned.split() if w]

    def _extract_ngrams(self, text: str) -> Dict[str, int]:
        counts: Dict[str, int] = {}
        words = self._tokenize_words(text)
        for word in words:
            padded = f"_{word}_"
            length = len(padded)
            for n in range(self.min_n, self.max_n + 1):
                for i in range(length - n + 1):
                    gram = padded[i:i+n]
                    counts[gram] = counts.get(gram, 0) + 1
        return counts

    def _build_profiles(self):
        # Build language model weight distributions
        for lang, words in self.STOPWORDS_AND_AFFIXES.items():
            combined_text = " ".join(words * 4)
            ngram_counts = self._extract_ngrams(combined_text)
            total = sum(ngram_counts.values()) or 1
            self.profiles[lang] = {gram: count / total for gram, count in ngram_counts.items()}

    def predict(self, text: str) -> Dict[str, float]:
        """
        Calculates log-likelihood similarity scores across candidate languages.
        Returns normalized probability distribution.
        """
        input_ngrams = self._extract_ngrams(text)
        if not input_ngrams:
            return {lang: 0.25 for lang in self.profiles}

        raw_scores: Dict[str, float] = {}
        for lang, profile in self.profiles.items():
            score = 0.0
            matched = 0
            for gram, count in input_ngrams.items():
                if gram in profile:
                    # Log probability match
                    score += count * math.log(profile[gram] + 1e-5)
                    matched += 1
                else:
                    score += count * math.log(1e-6)
            raw_scores[lang] = score

        # Softmax normalization for numerical stability
        max_score = max(raw_scores.values())
        exp_scores = {lang: math.exp(score - max_score) for lang, score in raw_scores.items()}
        sum_exp = sum(exp_scores.values()) or 1.0
        return {lang: round(val / sum_exp, 4) for lang, val in exp_scores.items()}

    def classify(self, text: str) -> Tuple[str, float]:
        probs = self.predict(text)
        best_lang = max(probs, key=probs.get)
        return best_lang, probs[best_lang]


if __name__ == '__main__':
    classifier = GhanaLanguageClassifier()
    samples = [
        ("Medaase paara, mepɛ sɛ mesua computer science wɔ Ghana.", "twi"),
        ("Akpe na mi kple amesiame le Mawu ƒe nunana ta.", "ewe"),
        ("Oyiwaladɔŋŋ kɛ shika nɛɛ ni eha wɔ.", "ga"),
        ("The deployment of artificial intelligence requires robust data governance in Accra.", "english")
    ]
    
    print("Testing Ghanaian Language Classifier Prototype:")
    print("=" * 65)
    for text, expected in samples:
        pred, conf = classifier.classify(text)
        print(f"Text: '{text}'")
        print(f"Predicted: {pred.upper()} (Confidence: {conf*100:.1f}%) | Expected: {expected.upper()}")
        print("-" * 65)
