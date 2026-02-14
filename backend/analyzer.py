import re
import logging

class ScamAnalyzer:
    """
    Analyzes conversation history to determine scammer sophistication and intent.
    """
    
    def __init__(self):
        self.sophistication_score = 0.0 # 0.0 (scripted/bot) to 1.0 (human/sophisticated)
        self.categorization = "unknown"

    def analyze_behavior(self, history):
        """
        Analyzes the conversation history to return a sophistication score.
        """
        if not history:
            return 0.0, "unknown"

        scammer_msgs = [m["content"] for m in history if m["role"] == "scammer"]
        if not scammer_msgs:
            return 0.0, "unknown"

        # 1. Analyze message length variance and timing (simulated)
        # In a real system, we'd check timestamps. Here we check text complexity.
        avg_len = sum(len(m) for m in scammer_msgs) / len(scammer_msgs)
        unique_msgs = len(set(scammer_msgs))
        repetition_ratio = unique_msgs / len(scammer_msgs)

        # 2. Key behavioral indicators
        latest_msg = scammer_msgs[-1].lower()
        
        # Indicators of scripts
        script_keywords = ["kindly", "verify", "click here", "urgent", "immediate action"]
        
        # Indicators of human/responsiveness
        human_keywords = ["why", "what do you mean", "no", "explain", "listen"]
        
        score = 0.5 # start neutral

        # Penalize for script-like tokens
        if any(kw in latest_msg for kw in script_keywords):
            score -= 0.2
            
        # Penalize for exact repetition
        if repetition_ratio < 0.8:
            score -= 0.3

        # Boost for conversational flow
        if any(kw in latest_msg for kw in human_keywords):
            score += 0.3
            
        # Boost for length variability (simple proxy for non-template)
        if len(scammer_msgs) > 2:
            lengths = [len(m) for m in scammer_msgs]
            variance = max(lengths) - min(lengths)
            if variance > 20:
                score += 0.1

        # Clamp score
        self.sophistication_score = max(0.0, min(1.0, score))
        
        if self.sophistication_score < 0.4:
            self.categorization = "scripted_bot"
        elif self.sophistication_score > 0.7:
            self.categorization = "sophisticated_human"
        else:
            self.categorization = "low_skill_human"

        logging.info(f"[Analyzer] Score: {self.sophistication_score:.2f} ({self.categorization})")
        return self.sophistication_score, self.categorization
