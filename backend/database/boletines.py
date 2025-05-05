#aqui van las querys para boletines y borradores :3

#Aqui van las querys para usuarios
from pydantic import BaseModel, EmailStr, ValidationError
from sqlmodel import SQLModel, select
from sqlmodel import Session
from fastapi import  HTTPException, Depends, File, UploadFile, Form, status
from .models import Boletines
from .database import Session, get_session
from datetime import datetime, date
from typing import Optional
from fastapi.encoders import jsonable_encoder

class bolPdf(BaseModel):
    pdf: bytes
    id: int
class bolResponse(BaseModel):
    id: int
    categoria: int
    fecha: datetime
class bolDelete(BaseModel):
    id: int


#Crea boletin
async def db_create_bol(cat: int,file: UploadFile=File(...), db: Session = Depends(get_session)):
    pdf_content = await file.read()
    statement = Boletines(
        categoria=cat,
        fecha=datetime.now(),
        pdf=pdf_content
    )
    db.add(statement)
    db.commit()
    db.refresh(statement)
    return statement

#Obtener boletines
def db_get_bol(db: Session = Depends(get_session)):
    statement = db.exec(select(Boletines.id, Boletines.categoria, Boletines.fecha)).all()
    return statement

#Extraer pdf segun id boletin
def db_get_pdf(id:int, db: Session=Depends(get_session)):
    statement = db.exect(
        select(bolPdf.pdf)
        .where(bolPdf.id == id))
    return statement

#Version para ver si funciona el visor de pdf
def db_get_pdf2(id: int, db: Session):
    boletin = db.get(Boletines, id)
    if not boletin:
        raise HTTPException(status_code=404, detail="Boletín no encontrado")
    return boletin.pdf

#Eliminar boletin
def db_delete_bol(id: int, db: Session = Depends(get_session)):
    statement = db.get(Boletines, id)
    if not statement:
        raise HTTPException(status_code=404, detail="Boletin not found")
    db.delete(statement)
    db.commit()
    return {"message":f"boletin {id} eliminado correctamente"}