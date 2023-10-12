#define aca las tablas de la base de datos
import psycopg2
import time

#Al instalar 
while True:
    try:
        conn = psycopg2.connect('postgresql://postgres:1234@localhost:5432/postgres')
        break
    except Exception:
        print
        print("Esperando a la base de datos postgres, reintentando en 1 segundo...")
        time.sleep(1)
cur = conn.cursor()
# Las tablas progreso tienen como variables booleanas las distintas actividades de cada etapa, el nombre corresponde al
# Nombre de la página en el front (eg http://localhost:3000/memorice) las paginas en React no son cap sensitive ->
#  (eg http://localhost:3000/memorice) = (eg http://localhost:3000/Memorice)
def createTables():
    cur.execute("""
        CREATE TABLE IF NOT EXISTS Evaluaciones (
        ID varchar(30) NOT NULL PRIMARY KEY,
        Asignatura varchar(30),
        Tipo varchar(30) NOT NULL,
        Dia varchar(30) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS Topes (
        ID varchar(30) NOT NULL PRIMARY KEY,
        Tipo varchar(30) NOT NULL,
        Asignatura varchar(30),
        Dia varchar(30) NOT NULL
        );         
        """)    
    conn.commit()
    print("Tablas creadas correctamente")