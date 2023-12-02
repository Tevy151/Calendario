from urllib import response
from tables import createTables
import time
import jwt
from datetime import datetime, timedelta
import psycopg2
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
# agregar en el frontend para poder ver el correo.  "import jwt_decode from 'jwt-decode'"";

SECRET_KEY = "RANDOM"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 30

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
    
class User(BaseModel):
    correo: str
    contraseña: str
    nombre: str
    
class UserLogin(BaseModel):
    correo: str
    contraseña: str



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
    try:
        cur.execute("SELECT * FROM evaluaciones ORDER BY id ASC")
        rows = cur.fetchall()

        if not rows:
            return JSONResponse(content={"message": "No hay evaluaciones disponibles"}, status_code=404)

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

    except Exception as e:
        return JSONResponse(content={"message": f"Error al obtener evaluaciones: {str(e)}"}, status_code=500)

@app.post("/Registro/", response_model=User)
async def updateEvaluaciones(user: User):
    cur.execute(f"SELECT * FROM users WHERE Correo = \'{user.correo}\'")
    repetido = cur.fetchall()
    if(repetido):
        return JSONResponse(content={"message": "Correo en uso"}, status_code=500)
    else:
        try:
            print(f"INSERT INTO users (correo, contrasena, nombre) VALUES (\'{user.correo}\', \'{user.contraseña}\', \'{user.nombre}\');")
            cur.execute(f"INSERT INTO users (correo, contrasena, nombre) VALUES (\'{user.correo}\', \'{user.contraseña}\', \'{user.nombre}\');")
            conn.commit()
            return JSONResponse(content={"message": "Evaluación agregada"}, status_code=200)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Usuario registrado correctamente: {str(e)}")
        
@app.post("/Login/", response_model=UserLogin)
async def updateEvaluaciones(user: UserLogin):
    cur.execute(f"SELECT * FROM users WHERE Correo = \'{user.correo}\' AND Contrasena = \'{user.contraseña}\' ")
    repetido = cur.fetchone()
    if(repetido):
        try:
            carga = {
                'correo': user.correo,
                'exp': datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)  # Tiempo de expiración 
            }
            llave = 'calendario_usm_infosoco_ayuda'   
            token = jwt.encode(carga, llave, algorithm='HS256')
            print(f"INSERT INTO users (correo, contrasena, nombre) VALUES (\'{user.correo}\', \'{user.contraseña}\');")
            return JSONResponse(content={"token": token}, status_code=200)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error al agregar la evaluación: {str(e)}")

    else:
        return JSONResponse(content={"message": "Credenciales incorrectas"}, status_code=500)

@app.get("/Cant/")
def get_eventos():
    cur.execute("CREATE TEMPORARY TABLE IF NOT EXISTS numeros AS SELECT generate_series(1, 365) as dia;")
    
    cur.execute("""
        SELECT numeros.dia, COALESCE(COUNT(evaluaciones.dia), 0) as cantidad_evaluaciones
        FROM numeros
        LEFT JOIN evaluaciones ON numeros.dia = evaluaciones.dia
        GROUP BY numeros.dia
        ORDER BY numeros.dia ASC;
    """)
    
    rows = cur.fetchall()
    result = []
    for row in rows:
        result.append(row[1])
    return result
