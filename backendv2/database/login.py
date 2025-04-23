#Aqui van las querys para usuarios
from pydantic import BaseModel, EmailStr
from sqlmodel import SQLModel, select
from sqlmodel import Session
from fastapi import  HTTPException, Depends
from .models import Users
from .database import Session, get_session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

class usersCreate(BaseModel):
    rol: int
    correo: EmailStr
    pwd: str
    nombre: str
    apellidos: str


#Login check user
def db_check_user(data: OAuth2PasswordRequestForm, db: Session = Depends(get_session)):
    statement = db.exec(select(Users).where((Users.correo == data.username)&(Users.pwd == data.password))).first()
    if not statement:
        raise HTTPException(status_code=404, detail="User not found")
    return statement
