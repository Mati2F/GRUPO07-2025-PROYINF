from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import db_engine, SQLModel
from database import models
from routers.users import router as users_router
from routers.boletines import router as boletines_router
import uvicorn

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

@app.get("/")
async def root():
    return {"message": "Hello World"}