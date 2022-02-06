# Decoinview
Decoinview es una aplicacion de terminal creada específicamente para decoinpay, en ella se pueden ver todos los datos de la propia base de datos de decoinpay, su funcionamiento es el siguiente:
# Uso
Para poder usar la aplicación hay que ejecutar los siguientes comandos para poder entrar en el contenedor de backend e iniciar la app de decoinview
```bash
docker exec -i -t api-server /bin/bash
```
```bash
npm link
```
# Funcionamiento
Esta aplicación funciona por comandos de consola, poniendo decoinview y los siguiente posibles argumentos, argumentos que se pueden combinar para una mayor exactitud:
## Ver usuarios:
* Para verlos todos
```bash
decoinview users
```
* Para ver uno en especifico
```bash
-u <wallet>
```
* Para guardar el resultado en un archivo .json con el nombre especificado
```bash
 -f <name>
```
## Ver contratos:
* Para verlos todos
```bash
decoinview contracts
```
* Para ver uno en especifico
```bash
-c <contract_id>
```
* Para guardar el resultado en un archivo .json con el nombre especificado
```bash
 -f <name>
```
## Ver transacciones:
* Para verlas todas
```bash
decoinview txn
```
* Para ver una en especifico
```bash
-t <txn_hash>
```
* Para guardar el resultado en un archivo .json con el nombre especificado
```bash
 -f <name>
```
* Para ver las transacciones de un contrato
```bash
 -c <contract_id>
```
* Para ver las transacciones de un usuario
```bash
 -u <wallet>
```
