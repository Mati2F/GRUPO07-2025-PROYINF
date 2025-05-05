from database.boletines import (
    bolDelete, bolResponse, bolUpdate,
    db_create_bol,
    db_delete_bol,
    db_get_bol,
    db_get_pdf,
    db_update_bol,
)
from database.models import Boletines, NotFoundError
from database.database import get_session
from sqlmodel import Session
from fastapi import  APIRouter, HTTPException, Depends, APIRouter, UploadFile, File, Form
from fastapi.responses import StreamingResponse #Agregado para ver si funciona el visor de PDF
from io import BytesIO#Agregado para ver si funciona el visor de PDF

router = APIRouter(
    prefix='/bol',
)

#Create boletin
@router.post("/",  tags=["bol"])
async def create_bol(categoria: int = Form(...),file: UploadFile = File(...), db: Session = Depends(get_session))->bolResponse:
    try:
        db_comp = await db_create_bol(categoria, file, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp

#Get display boletines
@router.get("/", tags=["bol"])
def get_bol(db: Session = Depends(get_session))->list[bolResponse]:
    try:
        db_comp = db_get_bol(db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp

#Get pdf
#@router.get("/", tags=["bol"])
#def get_bol(id: int, db: Session = Depends(get_session))->bytes:
#    try:
#        db_comp = db_get_pdf(id,db)
#    except NotFoundError as e:
#        raise HTTPException(status_code=404) from e
#    return db_comp


#Actualizar boletin
@router.put("/{id}", tags=["bol"])
def update_bol(id:int, bol: bolUpdate, db: Session = Depends(get_session))->bolUpdate:
    try:
        db_comp = db_update_bol(id, bol, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp

#Eliminar boletin
@router.delete("/{id}", tags=["bol"])
def delete_bol(id: int, db: Session = Depends(get_session)):
    try:
        db_comp = db_delete_bol(id, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return {"message":f"bol {id} eliminado correctamente"}

#Agregado para ver si funciona el visor de PDF
@router.get("/pdf/{id}", tags=["bol"])
def get_pdf(id: int, db: Session = Depends(get_session)):
    pdf_content = db_get_pdf(id, db)
    return StreamingResponse(BytesIO(pdf_content), media_type="application/pdf")