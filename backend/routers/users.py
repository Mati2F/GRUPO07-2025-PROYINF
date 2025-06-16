from database.users import (
    UsersCreate, UsersDelete, UsersResponse, UsersUpdate, UsersMail, UsersBanned,
    db_create_users,
    db_delete_users,
    db_get_users,
    db_update_users,
    db_get_mails,
    db_banned_users
)
from database.models import Users, NotFoundError
from database.database import get_session
from sqlmodel import Session
from fastapi import  APIRouter, HTTPException, Depends, APIRouter,  Cookie
import jwt

router = APIRouter(
    prefix='/admin',
)

# Secret key for JWT
SECRET_KEY = "jwt-secret-key"

# Verify user with cookie
def verify_user(token: str = Cookie(None)):
    if not token:  # si no existe la cookie del login
        raise HTTPException(status_code=401, detail="Not logged in :(")
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return {"name": decoded["name"], "role": decoded["role"]}
    except jwt.PyJWTError:
        raise HTTPException(status_code=403, detail="Token not right")


# Check cookie
@router.get("/all-drafts")
async def admin_all_drafts(user: dict = Depends(verify_user)):
    return {"Status": "Success", "name": user["name"], "role": user["role"]}


#Create user
@router.post("/create", response_model = Users, tags=["users"])
def create_users(users: UsersCreate, db: Session = Depends(get_session))->Users:
    try:
        db_comp = db_create_users(users, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp

#Show users
@router.get("/", tags=["users"])
def get_users(db: Session = Depends(get_session))->list[Users]:
    try:
        db_comp = db_get_users(db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp

#Show list of suscribed users mails
@router.get("/mails", tags=["users"])
def get_users(db: Session = Depends(get_session))->list[UsersMail]:
    try:
        db_comp = db_get_mails(db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp

#Actualizar usuario
@router.put("/update/{id}", tags=["users"])
def update_users(id:int, users: UsersUpdate, db: Session = Depends(get_session))->UsersUpdate:
    try:
        db_comp = db_update_users(id, users, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp


#Eliminar user 
@router.delete("/{id}", tags=["users"])
def delete_users(id: int, db: Session = Depends(get_session)):
    try:
        db_comp = db_delete_users(id, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return {"message":f"users {id} eliminado correctamente"}

@router.put("/ban/{id}", tags=["users"])
def ban_users(id:int, users: UsersBanned, db: Session = Depends(get_session))->UsersBanned:
    try:
        db_comp = db_banned_users(id, users, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp