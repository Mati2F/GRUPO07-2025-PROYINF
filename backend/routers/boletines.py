from database.boletines import (
    bolDelete, bolResponse,
    db_create_bol,
    db_delete_bol,
    db_get_bol,
    db_get_pdf,
)
from database.users import (
    db_get_mails
)
from database.mail import (
    EmailFormat, EmailData, send_email
)

from database.models import Boletines, NotFoundError
from database.database import get_session
from sqlmodel import Session
from fastapi import  APIRouter, HTTPException, Depends, APIRouter, UploadFile, File, Form,  BackgroundTasks
from fastapi.responses import StreamingResponse #Agregado para ver si funciona el visor de PDF
from io import BytesIO#Agregado para ver si funciona el visor de PDF

router = APIRouter(
    prefix='/bol',
)

#Create boletin
@router.post("/",  tags=["boletines"])
async def create_bol(background_tasks: BackgroundTasks, categoria: int = Form(...),file: UploadFile = File(...), db: Session = Depends(get_session))->bolResponse:
    try:
        db_comp = await db_create_bol(categoria, file, db)
        recipients = db_get_mails(db)

        for email in recipients:
            schema = EmailFormat(
                recipient= email['mail'],
                subject= "Boletin VIGIFIA disponible",
                body = "Hola"+ email['nombre']+" Hay un nuevo boletin en vigifia. Dirigete a [link pagina]"
            )
            background_tasks.add_task(send_email, schema)

    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp

#Get display boletines
@router.get("/", tags=["boletines"])
def get_bol(db: Session = Depends(get_session))->list[bolResponse]:
    try:
        db_comp = db_get_bol(db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return db_comp

#Obtener pdf boletin
@router.get("/pdf/{id}", tags=["boletines"])
def get_pdf(id: int, db: Session = Depends(get_session)):
    pdf_content = db_get_pdf(id, db)
    return StreamingResponse(BytesIO(pdf_content), media_type="application/pdf")

#Eliminar boletin
@router.delete("/{id}", tags=["boletines"])
def delete_bol(id: int, db: Session = Depends(get_session)):
    try:
        db_comp = db_delete_bol(id, db)
    except NotFoundError as e:
        raise HTTPException(status_code=404) from e
    return {"message":f"boletin {id} eliminado correctamente"}

