Para la instalación de FastApi con uvicorn, deben tener python3 instalado y ejecutar en consola:

`$pip install "uvicorn[standard]"` 

Luego para la incialización del backend, deben estar en la carpeta Backend y ejecutar en consola:

`$ uvicorn main:app --host 0.0.0.0 --port 3001 `

### No olviden que deben referirse a esta dirección y puerto desde el Frontend utilizando la librería _axios_

