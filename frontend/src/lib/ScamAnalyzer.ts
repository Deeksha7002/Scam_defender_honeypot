import type { Message } from './types';

export class ScamAnalyzer {
    sophisticationScore: number = 0.0; // 0.0 to 1.0
    categorization: 'scripted_bot' | 'low_skill_human' | 'sophisticated_human' | 'unknown' = 'unknown';

    analyzeBehavior(history: Message[]): { score: number, category: string } {
        if (!history || history.length === 0) {
            return { score: 0.0, category: 'unknown' };
        }

        const scammerMsgs = history.filter(m => m.sender === 'scammer').map(m => m.content);
        if (scammerMsgs.length === 0) {
            return { score: 0.0, category: 'unknown' };
        }

        // 1. Analyze message length variance and uniqueness
        const uniqueMsgs = new Set(scammerMsgs).size;
        const repetitionRatio = uniqueMsgs / scammerMsgs.length;

        // 2. Key behavioral indicators
        const latestMsg = scammerMsgs[scammerMsgs.length - 1].toLowerCase();

        // Indicators of scripts
        const scriptKeywords = ["kindly", "verify", "click here", "urgent", "immediate action", "valued customer"];

        // Indicators of human conversation/responsiveness
        const humanKeywords = ["why", "what do you mean", "no", "explain", "listen", "wrong", "hello?"];

        let score = 0.5; // Start neutral

        // Penalize for script-like tokens
        if (scriptKeywords.some(kw => latestMsg.includes(kw))) {
            score -= 0.2;
        }

        // Penalize for exact repetition
        if (repetitionRatio < 0.8) {
            score -= 0.3;
        }

        // Boost for conversational flow keywords
        if (humanKeywords.some(kw => latestMsg.includes(kw))) {
            score += 0.3;
        }

        // Boost for length variability (simple proxy for non-template)
        if (scammerMsgs.length > 2) {
            const lengths = scammerMsgs.map(m => m.length);
            const variance = Math.max(...lengths) - Math.min(...lengths);
            if (variance > 20) {
                score += 0.1;
            }
        }

        // Clamp score
        this.sophisticationScore = Math.max(0.0, Math.min(1.0, score));

        if (this.sophisticationScore < 0.4) {
            this.categorization = 'scripted_bot';
        } else if (this.sophisticationScore > 0.7) {
            this.categorization = 'sophisticated_human';
        } else {
            this.categorization = 'low_skill_human';
        }

        return { score: this.sophisticationScore, category: this.categorization };
    }
}
