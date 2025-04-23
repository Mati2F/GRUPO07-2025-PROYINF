#Aqui van las querys para usuarios
from pydantic import BaseModel, EmailStr
from sqlmodel import SQLModel, select
from sqlmodel import Session
from fastapi import  HTTPException, Depends
from .models import Users
from .database import Session, get_session

class usersCreate(BaseModel):
    rol: int
    correo: EmailStr
    pwd: str
    nombre: str
    apellidos: str

class usersResponse(BaseModel):
    id: int
    nombre: str

class usersUpdate(BaseModel):
    nombre: str

class usersDelete(BaseModel):
    id: int

#Crear usuario
def db_create_users(users: usersCreate, db: Session = Depends(get_session)):
    statement = Users(
        rol=users.rol,
        correo=users.correo,
        pwd=users.pwd,
        nombre=users.nombre,
        apellidos=users.apellidos
    )
    db.add(statement)
    db.commit()
    db.refresh(statement)
    return statement


#Obtener usuarios
def db_get_users(db: Session = Depends(get_session)):
    statement = db.exec(select(Users)).all()
    return statement

#Actualizar usuarios
def db_update_users(id:int, users: usersUpdate, db: Session = Depends(get_session)):
    statement = db.get(users,id)
    if not statement:
        raise HTTPException(status_code=404, detail="statement not found")
    data = users.dict(exclude_unset=True)
    for key, value in data.items():
        setattr(statement, key, value)
    db.add(statement)
    db.commit()
    db.refresh(statement)
    return statement

#Eliminar usuario
def db_delete_users(id: int, db: Session = Depends(get_session)):
    statement = db.get(Users, id)
    if not statement:
        raise HTTPException(status_code=404, detail="Flow State not found")
    db.delete(statement)
    db.commit()
    return {"message":f"users {id} eliminado correctamente"}