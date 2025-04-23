from database.users import (
    usersCreate, usersDelete, usersResponse, usersUpdate,
    db_create_users,
    db_delete_users,
    db_get_users,
    db_update_users
)
from database.models import Users, NotFoundError
from database.database import get_session
from sqlmodel import Session
from fastapi import  APIRouter, HTTPException, Depends, APIRouter

router = APIRouter(
    prefix='/users',
)

#Agregar una compañia
@router.post("/", response_model = Users, tags=["users"])
def create_users(users: usersCreate, db: Session = Depends(get_session))->Users:
    try:
        db_comp = db_create_users(users, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp


@router.get("/", tags=["users"])
def get_users(db: Session = Depends(get_session))->list[Users]:
    try:
        db_comp = db_get_users(db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp



#Actualizar una compañia segun id
@router.put("/{id}", tags=["users"])
def update_users(id:int, users: usersUpdate, db: Session = Depends(get_session))->usersUpdate:
    try:
        db_comp = db_update_users(id, users, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp

#Eliminar una compañia segun id
@router.delete("/{id}", tags=["users"])
def delete_users(id: int, db: Session = Depends(get_session)):
    try:
        db_comp = db_delete_users(id, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return {"message":f"users {id} eliminado correctamente"}

