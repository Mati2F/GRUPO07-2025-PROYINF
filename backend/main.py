from fastapi import FastAPI, Depends, HTTPException, Cookie, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from database.database import db_engine, SQLModel, Session, get_session
from database import models
from database.models import Users
from database.login import db_check_user

from routers.users import router as users_router
from routers.boletines import router as boletines_router
from routers.borradores import router as drafts_router
import uvicorn
import bcrypt
import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import sqlmodel
from schemas import LoginForm

SECRET_KEY = "jwt-secret-key"
def create_tables():
    SQLModel.metadata.create_all(db_engine)

app = FastAPI()
create_tables()

origins= ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

app.include_router(users_router)
app.include_router(boletines_router)
app.include_router(drafts_router)

@app.post("/login")
async def login(form_data: LoginForm, db: Session = Depends(get_session)):
    try:
        db_res = db_check_user(form_data, db)
    except HTTPException as http_exc: #Captura el user not found que levanta db_check_user
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Login failed due to an unexpected error {e}.")
    
    if db_res and bcrypt.checkpw(form_data.password.encode('utf-8'), db_res.pwd.encode('utf-8')):
        # Generate JWT token
        token = jwt.encode({"name": db_res.nombre, "role": db_res.rol}, "jwt-secret-key", algorithm="HS256")
        
        response = JSONResponse(content={"message": "Login successfully"})
        response.set_cookie(key="token", value=token, httponly=True, secure=True)

        return response


@app.get("/logout")
async def logout(response: Response):
    response.delete_cookie("token")  # Clear the token cookie
    return {"Status": "Success"}


@app.get("/")
async def root():
    return {"message": "Hello World"}