from database.borradores import (
    draftDelete, draftResponse,
    db_create_draft,
    db_delete_draft,
    db_get_draft,
    db_update_draft,
    db_get_pdf_draft,
    db_publish_draft
)
from database.boletines import bolResponse
from database.models import Borradores, NotFoundError
from database.database import get_session
from sqlmodel import Session
from fastapi import  APIRouter, HTTPException, Depends, APIRouter, UploadFile, File, Form
from fastapi.responses import StreamingResponse #Agregado para ver si funciona el visor de PDF
from io import BytesIO#Agregado para ver si funciona el visor de PDF

router = APIRouter(
    prefix='/draft',
)

#Create Borrador
@router.post("/",  tags=["borradores"])
async def create_draft(categoria: int = Form(...),file: UploadFile = File(...), db: Session = Depends(get_session)):
    try:
        db_comp = await db_create_draft(categoria, file, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return {"message":f"borrador {db_comp.id} creado correctamente"}

#Get lista Borradores
@router.get("/", tags=["borradores"])
def get_draft(db: Session = Depends(get_session))->list[draftResponse]:
    try:
        db_comp = db_get_draft(db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp

#Get pdf borrador
@router.get("/{id}", tags=["borradores"])
def get_pdf(id: int, db: Session = Depends(get_session)):
    pdf_content = db_get_pdf_draft(id, db)
    return StreamingResponse(BytesIO(pdf_content), media_type="application/pdf")

#Actualizar Borrador
@router.put("/{id}", tags=["borradores"])
async def update_draft(id: int,file: UploadFile = File(...), db: Session = Depends(get_session)):
    try:
        db_comp = await db_update_draft(id, file, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return {"message":f"borrador {id} actualizado correctamente"}

#Eliminar borrador
@router.delete("/{id}", tags=["borradores"])
def delete_draft(id: int, db: Session = Depends(get_session)):
    try:
        db_comp = db_delete_draft(id, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return {"message":f"borrador {id} eliminado correctamente"}

#Publicar borrador
@router.get("/publish/{id}", tags=["borradores"])
def publish_draft(id: int, db: Session = Depends(get_session))->bolResponse:
    try:
        id = int(id)
        db_state = db_publish_draft(id, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_state