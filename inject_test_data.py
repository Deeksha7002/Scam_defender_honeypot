import os
from datetime import datetime, timedelta, timezone
from backend.database import SessionLocal, Case, Stats
import random

def inject_historical_data():
    db = SessionLocal()
    
    # 1. Update overall stats table
    stats = db.query(Stats).first()
    if not stats:
        stats = Stats(reports_filed=0, scams_detected=0, types_json={})
        db.add(stats)
        
    stats.reports_filed += 45
    stats.scams_detected += 45

    types = {"ROMANCE": 12, "CRYPTO": 15, "JOB": 8, "LOTTERY": 5, "TECHNICAL_SUPPORT": 5}
    stats.types_json = types
    
    # 2. Add historically staggered Cases
    now = datetime.now(timezone.utc)
    
    cases_to_add = [
        # Today (0-1 days ago): 3 cases
        ("ROMANCE", 0), ("CRYPTO", 0), ("JOB", 0),
        # This Week (2-6 days ago): 10 cases
        ("CRYPTO", 2), ("CRYPTO", 3), ("ROMANCE", 4), ("JOB", 4),
        ("LOTTERY", 5), ("TECHNICAL_SUPPORT", 5), ("CRYPTO", 6),
        # This Month (8-29 days ago): 15 cases
        ("ROMANCE", 10), ("ROMANCE", 12), ("JOB", 14), ("JOB", 15),
        ("CRYPTO", 18), ("CRYPTO", 20), ("LOTTERY", 22), ("LOTTERY", 25),
        ("TECHNICAL_SUPPORT", 28), ("ROMANCE", 29)
    ]
    
    for c_type, days_ago in cases_to_add:
        # Generate timestamp
        past_time = now - timedelta(days=days_ago, hours=random.randint(1, 23))
        
        c = Case(
            id=f"HIST-{int(past_time.timestamp())}",
            scammer_name=f"Historical Threat {random.randint(100, 999)}",
            platform=random.choice(["whatsapp", "telegram", "sms"]),
            status="closed",
            threat_level=c_type,
            iocs={"urls": [], "paymentMethods": []},
            transcript=[],
            timestamp=past_time.isoformat(),
            auto_reported=True
        )
        db.add(c)
        
    db.commit()
    print("Historical case data injected successfully!")

if __name__ == "__main__":
    inject_historical_data()
