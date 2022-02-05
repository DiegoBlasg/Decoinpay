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
7. Tener instalado la extension de Metamask
8. No es obligatorio pero se recomienda tener instalado Ganache (blockchain local) para no gastar dinero real

# Desarrollo
La fase de desarrollo que se prevee que acabe el 1 de febrero, hasta entonces se irán subiendo actualizaciones cada 1 o 2 semanas 
como pre alfas con un pequeño resumen de lo que trae dicha actualización, la intención es subir una pre alfa cada vez que haya un cambio significativo, 
o cada vez que se implementa una mecánica de la aplicación.<br>
Todos los cambios que se realicen en cada actualización, se subirán en el apartado de Issues
