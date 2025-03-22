# GRUPO02-2024-PROYINF

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

## Motivación y Pasos a Seguir
<p>La FIA es la "Fundación para la Innovación Agraria". Su principal objetivo es financiar proyectos innovadores que contribuyan al desarrollo sostenible del sector agropecuario chileno, esto pudiendo ser a través del mejoramiento y mantenimiento de los sistemas de riego, cosecha, drones, entre otros.</p>
<p>VIGIFIA es el sistema de inteligencia de vigilancia de la FIA. Su objetivo es brindar información seleccionada sobre temas específicos en materias de tecnología, patentes, proyectos, ciencia, mercado, tendencias u otras areas para los lineamientos ministeriales. El funcionamiento de este sistema es manual, lo que puede inducir errores o periodos de tiempo muy largos para obtener la información, siendo actualmente de unos 3 meses. Debido a lo anterior es que se busca formar un software capaz de acelerar el proceso de recopilación, filtración y publicación de la información en boletines con un formato específico, los cuales puedan ordenarse por ciertos criterios. </p>

<p> Para lograr lo anterior se seguirá un procedimiento sistemático de postulación de objetivos y criterios de éxito, los cuales se irán progresando a través de distintas herramientas de modelamiento como lo son los diagramas de contexto, modelo de dominio, diagramas de secuencia, etc e historias de usuario, para poder entender el punto de vista del cliente. Junto con ello se iran implementando las distintas propuestas planteadas en el trabajo a través de 5 hitos en fechas distintas. </p>

## Información para levantar el proyecto:
* Para levantar el proyecto es necesario tener instalado [Node.js](https://nodejs.org/en/)
* Para levantar la base de datos es necesario tener instalado [XAMPP](https://www.apachefriends.org/es/index.html)
* Existe una carpeta llamada BaseDeDatos donde se encuentra la base de datos usada. Es necesario importarla en el phpMyAdmin en una Base de Datos llamada "analisis".

1. Lo primero es clonar el proyecto subido a [Github](https://github.com/Mati2F/GRUPO02-2024-PROYINF).
2. Ahora hay que abrir el XAMPP y iniciar tanto Apache como MySql.
3. Dirigirse a la carpeta donde se encuentra el proyecto a través de la terminal (el ultimo camino debe ser la carpeta "GRUPO02-2024-PROYINF")
4. Ahora se debe dirigir a la carpeta "backend" a través del comando "cd backend".
5. Una vez en la carpeta "backend" se usa el comando "npm start" para levantar la base de datos (en caso de que no funcione, intente "npm i" para actualizar los paquetes en caso de ser necesario).
6. Luego, abra otra terminal y diríjase a la carpeta frontend con "cd frontend".
7. Una vez en la carpeta "frontend", se usa el comando "npm start" para levantar la página.
8. Ahora la consola abrirá automáticamente la pagina y en esta puede explorar a su gusto.
