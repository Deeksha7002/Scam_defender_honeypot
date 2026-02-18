import re
import logging
from textblob import TextBlob

class ScamAnalyzer:
    """
    Advanced analysis of conversation history to determine scammer sophistication,
    intent, and psychological tactics.
    """
    
    def __init__(self):
        self.sophistication_score = 0.0
        self.intent = "unknown"
        self.sentiment_trend = []
        
    def analyze_behavior(self, history):
        """
        Analyzes conversation history for sophistication, sentiment, and specific scam intents.
        """
        if not history:
            return 0.0, "unknown"

        scammer_msgs = [m["content"] for m in history if m["role"] == "scammer"]
        if not scammer_msgs:
            return 0.0, "unknown"

        # 1. Text Analysis (Sentiment & Vocabulary)
        full_text = " ".join(scammer_msgs)
        blob = TextBlob(full_text)
        sentiment_score = blob.sentiment.polarity # -1.0 to +1.0
        
        # Vocabulary richness (Type-Token Ratio)
        words = full_text.split()
        unique_words = set(words)
        vocab_richness = len(unique_words) / len(words) if words else 0

        # 2. Intent Classification
        self.intent = self._classify_intent(full_text)

        # 3. Sophistication Scoring
        # Base score on vocabulary + message length variance
        lengths = [len(m) for m in scammer_msgs]
        length_variance = (max(lengths) - min(lengths)) if lengths else 0
        
        score = 0.5 # Neutral start
        
        # Penalties for scripted behavior
        if vocab_richness < 0.4: score -= 0.2
        if "kindly" in full_text.lower(): score -= 0.1
        
        # Bonuses for complexity
        if length_variance > 50: score += 0.1
        if len(scammer_msgs) > 5: score += 0.1
        if blob.sentiment.subjectivity > 0.5: score += 0.1 # Manipulative/Emotional

        self.sophistication_score = max(0.0, min(1.0, score))
        
        categorization = "scripted_bot"
        if self.sophistication_score > 0.7: categorization = "sophisticated_human"
        elif self.sophistication_score > 0.4: categorization = "human_operator"

        logging.info(f"[Analyzer] Score: {self.sophistication_score:.2f} | Intent: {self.intent}")
        return self.sophistication_score, categorization

    def _classify_intent(self, text):
        text = text.lower()
        if any(w in text for w in ['btc', 'crypto', 'wallet', 'invest']): return "CRYPTO_SCAM"
        if any(w in text for w in ['bank', 'transfer', 'wired', 'account']): return "FINANCIAL_THEFT"
        if any(w in text for w in ['love', 'darling', 'honey', 'gift']): return "ROMANCE_SCAM"
        if any(w in text for w in ['job', 'hiring', 'salary', 'remote']): return "JOB_SCAM"
        if any(w in text for w in ['urgent', 'police', 'arrest', 'legal']): return "AUTHORITY_IMPERSONATION"
        return "GENERAL_PHISHING"
