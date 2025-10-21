import os

from dotenv import load_dotenv
from google.cloud import firestore

load_dotenv()

PORT = int(os.getenv("PORT", 5000))
PROJECT_ID = os.getenv("GCP_PROJECT_ID")
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_EXPIRES_HOURS = int(os.getenv("JWT_EXPIRES_HOURS", 24))
COLLECTION_USUARIOS = os.getenv("FIRESTORE_COLLECTION_USUARIOS", "usuariospython")

db = firestore.Client(project=PROJECT_ID)