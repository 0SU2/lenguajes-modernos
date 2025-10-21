from datetime import datetime, timedelta
from jose import JWTError, jwt
from app.config.settings import JWT_SECRET, JWT_EXPIRES_HOURS

def create_token(user_id: str, usuario: str):
    exp = datetime.utcnow() + timedelta(hours=JWT_EXPIRES_HOURS)
    payload = {
        "sub": user_id,
        "usuario": usuario,
        "exp": exp
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def decode_token(token: str):
    return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])

