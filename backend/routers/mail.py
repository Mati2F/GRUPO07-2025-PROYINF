from database.users import (
    UsersCreate, UsersDelete, UsersResponse, UsersUpdate, UsersMail,
    db_get_mails
)
from database.mail import (
    EmailFormat, EmailData, send_email
)
from database.models import Users, NotFoundError
from database.database import get_session
from sqlmodel import Session
from fastapi import  APIRouter, HTTPException, Depends, APIRouter, BackgroundTasks
from typing import List
router = APIRouter(
    prefix='/mail',
)

@router.post("/send", tags=["debug"])
async def send_emails(data: EmailData, background_tasks: BackgroundTasks, db: Session = Depends(get_session)):
    recipients = db_get_mails(db)
    for email in recipients:
        schema = EmailFormat(
            recipient= email['mail'],
            subject= data.subject,
            body = data.body
        )
        background_tasks.add_task(send_email, schema)
    return {"message":"Enviando correos..."}