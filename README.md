# GRUPO07-2025-PROYINF

Este es el repositorio del *Grupo 2*, cuyos integrantes son:

* <mark> Alejandro Sánchez</mark> - 202273605-4
* <mark>Constanza Hidalgo</mark> - 202273617-8
* <mark>Daniel Quispe</mark> - 202273529-5
* <mark>Matías Fernández</mark> - 202273506-6
* **Tutor INF236 Analisis y Diseño de Software**: <mark>Ignacio Muñoz</mark>
* **Tutor INF225 Ingenieria de Software**: <mark>Eduardo Mendoza</mark>

(Los integrantes se mantienen para el proyecto 2025-1)

## Wiki
Puede acceder a la Wiki mediante el siguiente [enlace](https://github.com/Mati2F/GRUPO02-2024-PROYINF/wiki)

## Videos
* [Video Presentación Cliente](https://www.youtube.com/watch?v=abJau21SDIk&ab_channel=RicardoSalasLetelier)

## Información para levantar el proyecto:
* Para levantar el proyecto es necesario tener instalado [python](https://www.python.org/downloads/) y [Node.js](https://nodejs.org/en/).
* Para levantar la base de datos es necesario tener instalado [SQL Server](https://www.microsoft.com/es-cl/sql-server/sql-server-downloads). Tiene que ser la versión Express para que funcione sin modificar nada. ![alt text](https://github.com/Mati2F/GRUPO07-2025-PROYINF/blob/main/docs/SQLServer.png)
* Pero en caso de tener instalada la versión Developer en "/backend/database/database.py" linea 4. la variable "servername" se le debe colocar el nombre del "Server name" que dice al momento de abrir SQL Server. ![alt tetxt](https://github.com/Mati2F/GRUPO07-2025-PROYINF/blob/main/docs/servername.png)
  
## Información para importar la base de datos:
* En la carpeta "BaseDeDatos" se encuentra el archivo "grupo07.bacpac" el cual se debe importar en la carpeta Databases.
* Se va a import Data-tier Aplication y se sube el archivo con la base de datos.
![alt text](https://github.com/Mati2F/GRUPO07-2025-PROYINF/blob/main/docs/import.png)

## Pasos para levantar el proyecto:
1. Lo primero es clonar el proyecto subido a [Github](https://github.com/Mati2F/GRUPO02-2024-PROYINF).
2. Dirigirse a la carpeta donde se encuentra el proyecto a través de la terminal (el ultimo camino debe ser la carpeta "GRUPO02-2024-PROYINF")
3. Ahora por consola se tiene que hacer un ambiente virtual, el cual se crea de la siguiente forma:
   - primero hay que entrar a la carpeta de "backend" usando el comando `cd backend`
   - luego se crea el ambiente con el comando `python -m venv <Nombre del ambiente>` en lo particular recomendamos `python -m venv myenv`
   - Si la creación se hizo correctamente se debería poder ingresar al ambiente virtual con el comando `.\<Nombre del ambiente>\Scripts\Activate.ps1 `, si se uso el myenv `.\myenv\Scripts\Activate.ps1 `
   - Una vez dentro se instalan todos los requerimientos necesarios con el comando `pip install -r .\requirements.txt`
4. Ahora en la misma ruta que se tiene después de hacer todos los pasos anteriores se usa el comando `uvicorn main:app --reload`
5. Luego, abra otra terminal y diríjase a la carpeta frontend con "cd frontend".
6. Una vez en la carpeta "frontend", se usa el comando "npm start" para levantar la página (en caso de que no funcione, intente "npm i" para actualizar los paquetes en caso de ser necesario)..
7. Ahora la consola abrirá automáticamente la pagina y en esta puede explorar a su gusto.
