from pydantic import BaseModel, EmailStr
from sqlmodel import SQLModel, select
from sqlmodel import Session
from fastapi import  HTTPException, Depends
from .models import Users
from .database import Session, get_session
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class EmailFormat(BaseModel):
    recipient: str
    subject: str 
    body: str

class EmailData(BaseModel):
    subject: str
    body: str

def send_email(email: EmailFormat):
    #SMTP Config
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    smtp_username = 'vigifia@gmail.com'
    smtp_password = 'etxctikvqmstbuhl'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = email.subject
    msg['From'] = smtp_username
    msg['To'] = email.recipient
    msg.attach(MIMEText(email.body, "plain"))
    try:
        #Connect to server
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)

        #Send Email
        server.sendmail(smtp_username, [email.recipient], msg.as_string())
        server.quit()
        return {"message":"Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error ocurred while sending the mails: {e}.")
    