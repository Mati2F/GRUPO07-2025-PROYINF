#Aqui van las querys para usuarios
from pydantic import BaseModel, EmailStr
from sqlmodel import SQLModel, select
from sqlmodel import Session
from fastapi import  HTTPException, Depends
from .models import Users
from .database import Session, get_session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import bcrypt
class usersCreate(BaseModel):
    rol: int
    correo: EmailStr
    pwd: str
    nombre: str
    apellidos: str

class LoginForm(BaseModel):
    email: str
    password: str

# Login check user
def db_check_user(data: LoginForm, db: Session = Depends(get_session)):
    # Query to get the user by email only
    user = db.exec(select(Users).where(Users.correo == data.email)).first()
    
    # Check if user exists
    if not user:
        raise HTTPException(status_code=404, detail="No record found. Please check your email")

    # Verify the password against the hashed password in the database
    if not bcrypt.checkpw(data.password.encode('utf-8'), user.pwd.encode('utf-8')):
        raise HTTPException(status_code=400, detail="Invalid password.")

    return user
