from sqlmodel import create_engine, SQLModel, Session, text, SQLModel, Column, Integer, String, Field
from datetime import datetime, date

#servername = ".\\SQLEXPRESS"
servername = "DESKTOP-4VTMM2I"
db_name = "grupo07"
driver = "ODBC+Driver+17+for+SQL+Server"

SQLALCHEMY_URL = ("mssql+pyodbc://"+servername+"/"+db_name+"?trusted_connection=yes&driver="+driver)
db_engine = create_engine(SQLALCHEMY_URL)


#Test conexión base de datos
try:
    with Session(db_engine) as session:
        print(f"Conexión exitosa a la base de datos '{db_name}'.")
except Exception as e:
    print(f"Error al conectarse a la base de datos: {e}")


def get_session():
    with Session(db_engine) as session:
        yield session

