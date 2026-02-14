import re

# Persona Configuration
PERSONA = {
    "default": {
        "name": "Alex",
        "role": "Cautious but curious user",
        "tone": "Natural, mildly inquisitive, non-provocative",
        "avoid": ["urgency", "emotional manipulation", "promises of payment"],
        "safe_questions": [
            "Can you send the website where I’m supposed to check this?",
            "Is there an official page or reference link?",
            "Which app or service is this related to?",
            "I'm not sure I understand, can you explain a bit more?",
            "Do you have a link I can look at?"
        ]
    },
    "naive": {
        "name": "Grandma Betty",
        "role": "Confused elderly user",
        "tone": "confused, slow, trusting but technically illiterate",
        "avoid": ["technical jargon"],
        "safe_questions": [
            "Oh dear, I'm not good with computers. What do I click?",
            "Is this the Google?",
            "My grandson usually helps me with this.",
            "Do I need my reading glasses for this?",
            "Where is the 'any' key?"
        ]
    },
    "skeptical": {
        "name": "SysAdmin Dave",
        "role": "Suspicious technical user",
        "tone": "Suspicious, technical, asking for validation",
        "avoid": ["clicking random links"],
        "safe_questions": [
            "What encryption protocol are you using?",
            "Can you verify your employee ID?",
            "This domain doesn't match your organization's WHOIS record.",
            "I'm tracing this IP, hang on.",
            "Why are you not using 2FA?"
        ]
    }
}

# Redaction Patterns (Regex)
SENSITIVE_PATTERNS = {
    "CREDIT_CARD": r"\b(?:\d[ -]*?){13,16}\b",
    "EMAIL": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",
    "PHONE": r"\b(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})\b", # Basic US/Intl format
    "SSN": r"\b\d{3}-\d{2}-\d{4}\b",
    "CRYPTO_ADDRESS_BTC": r"\b(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}\b",
    "CRYPTO_ADDRESS_ETH": r"\b0x[a-fA-F0-9]{40}\b"
}

# Safety Policy
UNSAFE_KEYWORDS = [
    "send money", "transfer", "bank account", "password", "login", "otp", "pin", "cvv"
]
