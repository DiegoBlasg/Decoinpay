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
* Poder añadir tokens externos, por ejemplo **0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82**
* Restricción y redirección de urls si el usuario no está conectado.

## Pre Alfa 3
* Nuevo sistema de usuarios que funciona con metamask (cartera virtual de criptomonedas), es necesario descargar metamask (es una extensión del buscador), las cuentas de metamask actúan como cuentas en la página.
* Se ha añadido una página para ver la información básica de una criptomoneda y su gráfica, pinchando en su nombre.
* Restricción de rutas cuando un usuario entra en un contrato que no es suyo, intenta modificarlo...
* Se ha añadido un sistema de seguridad en la api.
* Arreglo y reestructuración de código
* Se puede ver el balance de la moneda global de la blockchain en la que estés conectado con metamask, en la página de cuenta.
* Ahora aparecen los contratos a los que tienes acceso, y sólo se puede ver la información de ellos.
* Se han arreglado fallos como poder añadir usuarios permitidos duplicados en los contratos, poder añadirte a ti mismo…
## Pre Alfa 4
A Partir de la siguiente actualización, los cambios se podrán ver en el apartado de issues y no en el README, por otra parte la siguiente actualización ya será la versión alfa de la aplicación y tiene una duración de desarrollo prevista de 2 semanas.
Los cambios de esta pequeña actualización antes de la alfa son los siguientes:

* En la anterior pre alfa no funcionaba el inicio de sesión de usuario cuando montabas el docker-compose debido a una variable mal puesta, en esta pre alfa se ha arreglado
* Los formularios y los alerts de cuando eliminas algo se han cambiado por modales para un mejor diseño

* Se han arreglado errores como:
    * Ahora los imput tienen un maxLength para evitar nombres grandes
    * Antes cuando estabas en un móvil no funcionaba la calculadora de precios, ahora si funciona

* Mejora la legibilidad del código
* Se ha añadido el botón de recibir pagos en los contratos
* Se ha añadido el botón de mandar pago en la pestaña de Cuenta

