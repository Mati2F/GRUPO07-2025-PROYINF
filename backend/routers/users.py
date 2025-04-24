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
def create_users(users: usersCreate, db: Session = Depends(get_session))->Users:
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



#Actualizar usuario
@router.put("/update/{id}", tags=["users"])
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
