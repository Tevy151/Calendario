from tables import createTables
import time
import psycopg2
from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
import jwt

SECRET_KEY = "RANDOM"
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800


app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#se crean las tablas en la base de datos
#se tiene que tener postgres instalado, y el servicio se debe estar ejecutando
#al crear la base de datos ingresen con la clave "admin" y usuario será "postgres" el puerto default es 5432
#y la base de datos default es postgres
createTables()

# connect to database
while True:
    try:
        conn = psycopg2.connect('postgresql://postgres:1234@localhost:5432/postgres')
        break
    except Exception:
        print("Esperando a la base de datos postgres, reintentando en 1 segundo...")
        time.sleep(1)


# create a cursor
cur = conn.cursor()

