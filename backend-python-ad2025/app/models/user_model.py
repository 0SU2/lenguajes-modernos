from typing import Optional
from pydantic import BaseModel, EmailStr

class Usuario(BaseModel):
    id: Optional[str] = None
    nombre: str
    apaterno: str
    amaterno: str
    direccion: str
    telefono: str
    ciudad: str
    estado: str
    email: EmailStr
    usuario: str
    password: str
    createdAt: Optional[str] = None
    updatedAt: Optional[str] = None
    deleted: Optional[bool] = False
    