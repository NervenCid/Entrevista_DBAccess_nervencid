#Esto es un comentario
#Esta sera una imagen por etapas que contendra tanto el frontend como el backend

#Para compilar la imagen usar el comando (NO OLVIDAR EL PUNTO)
#
#   >docker build -t dbaccess .
#
#Donde 'dbaccess' puede ser cualquier nombre

#Para ejecutar usar el comando
#
#   >docker run -it --publish 7000:4000 dbaccess
#
#Donde 'dbaccess' es el nombre asignado cuando se compilo la imagen
#Donde '7000:4000' es el puerto de la aplicacion, esto quiere decir que el puerto 4000 interno (revisar primero EL PUERTO)
#del contenedor sera accesible atraves del puerto 7000 externamente (ESTO ES OPCIONAL se pueden usar los puertos de la aplicacion '4000:4000')

###################################################FRONTEND###################################################

#Indicamos que se necesita una version de Node.js especifica
#Para mas informacion: https://hub.docker.com/_/node
#Esto lo almacenamos dentro de la variable 'client'
FROM node:14 as client

#Indicamos la ubicacion del proyecto DENTRO del contenedor (no dentro de la maquina)
WORKDIR /app/frontend

#Copiamos la carpeta del 'frontend' al directorio del proyecto dentro del contenedor
COPY frontend/ ./

#Instalamos las dependencias
RUN npm install

#Compilamos el proyecto de 'React' esto crea una carpeta 'build'
RUN npm run build

##################################################BACKEND###################################################

#Indicamos que se necesita una version de Node.js especifica
#Para mas informacion: https://hub.docker.com/_/node
FROM node:14

#Indicamos la ubicacion del proyecto DENTRO del contenedor (no dentro de la maquina)
WORKDIR /app

#De 'client' que es el resultado de la etapa anterior copiamos al directorio 'build'
#en un directorio 'frontend/build' en el contendor ACTUAL
#No confundir las carpetas del contenedor aunque tengan el mismo nombre
COPY --from=client /app/frontend/build/ ./frontend/build/

#Cambiamos el directorio de trabajo para definir la ubicacion del 'backend'
WORKDIR /app/backend

#Copiamos la carpeta 'backend' al contenedor en el directorio de trabajo actual
COPY backend/ ./

#Instalamos las dependencias
RUN npm install

#Ejecutamos el servidor
CMD ["npm", "run", "start"]