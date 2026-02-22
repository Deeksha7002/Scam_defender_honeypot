from backend.database import SessionLocal, User
import sys

def delete_user(username):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.username == username).first()
        if user:
            db.delete(user)
            db.commit()
            print(f"User {username} deleted.")
        else:
            print(f"User {username} not found.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    if len(sys.argv) > 1:
        delete_user(sys.argv[1])
