import random
import time

class MockScammerAPI:
    """
    Simulates an API provided for the challenge.
    Generates incoming messages from 'scammers' and 'benign users'.
    """
    
    SCENARIOS = [
        {
            "id": "scam_crypto_01",
            "type": "scam",
            "messages": [
                "Hello, I am reaching out from CoinBase Support. Your account has been compromised.",
                "Please click here to verify your wallet: http://bit.ly/fake-crypto-link",
                "We need your private key to restore funds."
            ]
        },
        {
            "id": "scam_job_01",
            "type": "scam",
            "messages": [
                "Hi there! We have a job opening for you. Earn $500/day working from home.",
                "Just fill out this form with your bank details: www.scam-job-site.com/apply",
                "Do it fast, limited spots!"
            ]
        },
        {
            "id": "benign_greeting_01",
            "type": "benign",
            "messages": [
                "Hey Alex, are we still on for lunch tomorrow?",
                "Let me know if 1 PM works."
            ]
        },
        {
             "id": "likely_scam_package_01",
             "type": "likely_scam",
             "messages": [
                 "[PostOffice] You have a pending delivery. Address incomplete. Update here: http://tinyurl.com/post-fail",
                 "Failure to update will result in return to sender."
             ]
        }
    ]

    def __init__(self):
        self.active_conversations = {} # map conversation_id to index in scenario

    def get_new_message(self):
        """Simulates receiving a new conversation starter."""
        scenario = random.choice(self.SCENARIOS)
        conv_id = f"conv_{int(time.time())}_{random.randint(100,999)}"
        
        self.active_conversations[conv_id] = {
            "scenario": scenario,
            "msg_index": 0
        }
        
        initial_msg = scenario["messages"][0]
        return {
            "conversation_id": conv_id,
            "text": initial_msg,
            "timestamp": time.time()
        }

    def send_message(self, conversation_id, message_text):
        """
        Simulates sending a message to the scammer.
        The mock API will respond with the next message in the script if available.
        """
        print(f"[API] > Agent sent to {conversation_id}: {message_text}")
        
        if conversation_id not in self.active_conversations:
            return None

        conv_data = self.active_conversations[conversation_id]
        scenario = conv_data["scenario"]
        current_index = conv_data["msg_index"]
        
        # Advance conversation
        next_index = current_index + 1
        
        if next_index < len(scenario["messages"]):
            conv_data["msg_index"] = next_index
            response_text = scenario["messages"][next_index]
            time.sleep(0.5) # Simulate network delay
            return {
                "conversation_id": conversation_id,
                "text": response_text,
                "timestamp": time.time()
            }
        else:
            # End of script
            return {
                "conversation_id": conversation_id,
                "text": "[Connection Closed by Remote User]",
                "timestamp": time.time()
            }
