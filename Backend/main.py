from urllib import response
from tables import createTables
import time
import psycopg2
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List

SECRET_KEY = "RANDOM"
ALGORITHM = "HS256"
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

# Se crean las tablas en la base de datos
createTables()

# Connect to database
while True:
    try:
        conn = psycopg2.connect('postgresql://postgres:1234@localhost:5432/postgres')
        break
    except Exception:
        print("Esperando a la base de datos postgres, reintentando en 1 segundo...")
        time.sleep(1)

# Create a cursor
cur = conn.cursor()

class Evaluacion(BaseModel):
    id: str
    asignatura: str
    description: str
    tipo: str
    dia: str

@app.post("/AddEvaluacion/", response_model=Evaluacion)
async def updateEvaluaciones(event: Evaluacion):
    try:
        print("INSERT INTO evaluaciones (id, asignatura, descrip, tipo, dia) VALUES ("+event.id+",\'"+event.asignatura+"\',\'"+event.description+"\',\'"+event.tipo+"\',"+event.dia+");")
        cur.execute("INSERT INTO evaluaciones (id, asignatura, descrip, tipo, dia) VALUES ("+event.id+",\'"+event.asignatura+"\',\'"+event.description+"\',\'"+event.tipo+"\',"+event.dia+");")
        conn.commit()
        return JSONResponse(content={"message": "Evaluación agregada"}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al agregar la evaluación: {str(e)}")

@app.get("/Eventos/", response_model=List[Evaluacion])
def get_eventos():
    cur.execute("SELECT * FROM evaluaciones ORDER BY id ASC")
    rows = cur.fetchall()
    result = []
    for row in rows:
        eval_dict = {
            "id": row[0],
            "asignatura": row[1],
            "description": row[2],
            "tipo": row[3],
            "dia": row[4]
        }
        result.append(eval_dict)
    return result
