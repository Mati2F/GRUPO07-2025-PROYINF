#aqui van las querys para draftetines y borradores :3

#Aqui van las querys para usuarios
from pydantic import BaseModel, EmailStr, ValidationError, field_validator
from sqlmodel import SQLModel, select
from sqlmodel import Session
from fastapi import  HTTPException, Depends, File, UploadFile, Form, status
from .models import Borradores, Boletines
from .database import Session, get_session
from datetime import datetime, date
from typing import Optional
from fastapi.encoders import jsonable_encoder

class draftPdf(BaseModel):
    pdf: bytes
    id: int

class draftResponse(BaseModel):
    id: int
    categoria: int
    fechaCreacion: datetime
    fechaMod: datetime


class draftDelete(BaseModel):
    id: int


#Crea borrador
async def db_create_draft(cat: int,file: UploadFile=File(...), db: Session = Depends(get_session)):
    pdf_content = await file.read()
    statement = Borradores(
        categoria=cat,
        fechaCreacion=datetime.now(),
        fechaUltimaMod=datetime.now(),
        pdf=pdf_content
    )
    db.add(statement)
    db.commit()
    db.refresh(statement)
    return statement

#Obtener borradores
def db_get_draft(db: Session = Depends(get_session)):
    statement = db.exec(select(Borradores.id, Borradores.categoria, Borradores.fechaCreacion, Borradores.fechaUltimaMod)).all()
    return [
        {
            "id": row.id,
            "categoria": row.categoria,
            "fechaCreacion": row.fechaCreacion,
            "fechaMod": row.fechaUltimaMod  # Asegúrate de que esto coincida
        }
        for row in statement
    ]

#Obtiene pdf borrador
def db_get_pdf_draft(id: int, db: Session):
    draft = db.get(Borradores, id)
    if not draft:
        raise HTTPException(status_code=404, detail="borrador no encontrado")
    return draft.pdf

#Actualizar borrador
async def db_update_draft(id:int, file: UploadFile=File(...), db: Session = Depends(get_session)):
    statement = db.get(Borradores,id)
    if not statement:
        raise HTTPException(status_code=404, detail="borrador not found")
    pdf_content = await file.read()
    statement.pdf = pdf_content
    statement.fechaUltimaMod = datetime.now()
    db.add(statement)
    db.commit()
    db.refresh(statement)
    return statement

#Eliminar borrador
def db_delete_draft(id: int, db: Session = Depends(get_session)):
    statement = db.get(Borradores, id)
    if not statement:
        raise HTTPException(status_code=404, detail="borrador not found")
    db.delete(statement)
    db.commit()
    return {"message":f"borrador {id} eliminado correctamente"}

#Publicar borrador
def db_publish_draft(id: int, db: Session = Depends(get_session)):
    statement = db.get(Borradores, id) #Obtiene borrador
    if not statement:
        raise HTTPException(status_code=404, detail="borrador not found")
    #Inserta en boletines el borrador
    boletin = Boletines(categoria=statement.categoria,fecha=datetime.now(),pdf=statement.pdf)
    try:
        db.add(boletin)
        db.commit()
        db.delete(statement)
        db.commit()
    except Exception as e:
        raise Exception
    return boletin