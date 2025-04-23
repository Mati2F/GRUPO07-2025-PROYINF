from database.boletines import (
    bolDelete, bolResponse, bolUpdate,
    db_create_bol,
    db_delete_bol,
    db_get_bol,
    db_update_bol
)
from database.models import Boletines, NotFoundError
from database.database import get_session
from sqlmodel import Session
from fastapi import  APIRouter, HTTPException, Depends, APIRouter, UploadFile, File, Form

router = APIRouter(
    prefix='/bol',
)

#file: UploadFile = File(...), 
@router.post("/",  tags=["bol"])
async def create_bol(categoria: int = Form(...),file: UploadFile = File(...), db: Session = Depends(get_session))->bolResponse:
    try:
        db_comp = await db_create_bol(categoria, file, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp


@router.get("/", tags=["bol"])
def get_bol(db: Session = Depends(get_session))->list[Boletines]:
    try:
        db_comp = db_get_bol(db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp



#Actualizar una compañia segun id
@router.put("/{id}", tags=["bol"])
def update_bol(id:int, bol: bolUpdate, db: Session = Depends(get_session))->bolUpdate:
    try:
        db_comp = db_update_bol(id, bol, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp

#Eliminar una compañia segun id
@router.delete("/{id}", tags=["bol"])
def delete_bol(id: int, db: Session = Depends(get_session)):
    try:
        db_comp = db_delete_bol(id, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return {"message":f"bol {id} eliminado correctamente"}

