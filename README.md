# Criptopagos
Una aplicación web para ayudar a las empresas a recibir pagos con criptomonedas, ya sea desde su página web o en su tienda física.<br>
Con esta plataforma podrán:
* Tener un control de las transacciones que han recibido separándolas por bloques (Contratos) para una mayor organización.
* Ver el precio de todas las criptomonedas existentes dentro de la blockchain y poder añadir las que necesiten a una lista de seguimiento.
* Intercambiar unas criptomonedas por otras.

Los clientes también podrán:

* Ver todas las transacciones que han realizado.
* Gestionar los contratos a los que la empresa le ha dado acceso.
* Ver el precio de las criptomonedas y tener su propia lista de seguimiento.
* Intercambiar unas criptomonedas por otras.

# Cómo probar el proyecto
1. Tener instalado docker compose.
2. Meterte dentro de la carpeta cripto pagos.
3. Tener libres los puertos: 3000, 4000, 27017.
4. Ejecutar el siguiente comando.
```bash
docker-compose build
```
5. Una vez acabado ejecutar este otro.
```bash
docker-compose up
```
6. si todo ha salido bien la página web tiene que estar el http://localhost:3000/

# Desarrollo
La fase de desarrollo que se prevee que acabe el 1 de febrero, hasta entonces se irán subiendo actualizaciones cada 1 o 2 semanas 
como pre alfas con un pequeño resumen de lo que trae dicha actualización, la intención es subir una pre alfa cada vez que haya un cambio significativo, 
o cada vez que se implementa una mecánica de la aplicación.

## Pre Alfa 1
Se ha creado la aplicación con el stack MERN, con mongodb para base de datos express y node para el backend y react para el frontend. <br>
En esta pre alfa se ha añadido el diseño de la página, creado con bootstrap y react, y el sistema de contratos (crearlos, borrarlos, editarlos,
añadir usuarios permitidos, modificarlos y borrarlos), los contratos serán lo que creen las empresas o tiendas para aceptar los pagos y que dichos pagos se vean 
reflejados en dicho contrato, y lo de usuarios permitidos es para que más usuarios que decida la empresa puedan controlar ese contrato.

## Pre Alfa 2
* Arreglados algunos fallos (ya no deja ni agregar ni modificar nada si el campo del input está vacío).
* Visualización del top 100 de monedas.
* Sistema de búsquedas de contratos y monedas.
* Una versión de desarrollo del sistema de usuarios, poder crear, elegir, y cerrar sesión.
* Añadir y quitar monedas a favoritos.
* Poder añadir tokens externos, por ejemplo **0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82**.
* Restricción y redirección de urls si el usuario no está conectado.
