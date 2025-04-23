from sqlmodel import SQLModel, text, SQLModel, Column, Integer, String, Field, LargeBinary, SmallInteger
from datetime import datetime, date
from typing import Optional

class NotFoundError(Exception):
    pass

#Definicion de tablas
class Fuentes(SQLModel, table=True):
    __tablename__ = "fuentes"
    id: int | None = Field(default=None, primary_key=True)
    url: str
    active: bool = 1
    categoria: str = Field(sa_type=String(255))


class Users(SQLModel, table=True):
    __tablename__ = "users"
    userId: Optional[int] = Field(default=None,primary_key=True)
    rol: int = Field(sa_type=SmallInteger)
    correo: str = Field(sa_type = String(255))
    pwd: str = Field(sa_type =String(15))
    nombre: str = Field(sa_type =String(50))
    apellidos: str = Field(sa_type =String(255))

class Boletines(SQLModel, table=True):
    __tablename__ = "boletines"
    id: int = Field(default=None, primary_key=True)
    categoria: int = Field( foreign_key="categorias.id")
    fecha: datetime
    pdf:bytes = Field(default=None,sa_type=LargeBinary, nullable=True) 

# Manejar borrado al momento de publicar!!
class Borradores(SQLModel, table=True):
    __tablename__ = "borradores"
    id: int = Field(default=None, primary_key=True)
    categoria: int = Field( foreign_key="categorias.id")
    fechaCreacion: datetime
    fechaUltimaMod: datetime
    pdf:str = Field(sa_type=LargeBinary) 

class Categorias(SQLModel, table=True):
    __tablename__ = "categorias"
    id: int = Field(default=None, primary_key=True)
    nombre: str