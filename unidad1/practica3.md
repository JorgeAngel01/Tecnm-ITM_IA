# Practica 3. Introducción a la Inteligencia Artificial: Introspección

Coloca ocho alfiles (cuatro negros y cuatro blancos) en un tablero de ajedrez reducido, tal como se ve en la figura. El problema consiste en hacer que los alfiles negros intercambien sus posiciones con los blancos, ningún alfil debe atacar en ningún momento otro del color opuesto. Se deben alternar los movimientos, primero uno blanco, luego uno negro, luego uno blanco y así sucesivamente. ¿Cuál es el mínimo número de movimientos en que se puede conseguir?.

![Problema de las ocho torres](/assets/alfiles.jpg)

## Resolucion del problema

Para abordar este problema, es crucial comprender las características y restricciones del movimiento de los alfiles en un tablero de dimensiones reducidas (4x5). Aquí se presenta una análisis detallado de la estrategia para minimizar el número de movimientos necesarios.

**Movimiento de los Alfiles:**

Un alfil se desplaza exclusivamente en diagonal.
Las dimensiones del tablero limitan el espacio de movimiento, complicando la tarea.

**Consideraciones:**

Es necesario evitar interferencias entre los alfiles.
Los movimientos deben ser alternados entre alfiles blancos y negros.

Hay que tener estrategia para resolver el problema, algunos puntos importantes que hay que tener en cuenta durante la planificacion de esta son:

- Movimientos Iniciales:
    - Colocar alfiles en posiciones estratégicas para maximizar el espacio de movimiento.
    - Anticipar movimientos futuros para evitar bloqueos.

- Movimientos Alternados:
    - Realizar movimientos alternados entre alfiles blancos y negros.
    - Ajustar estratégicamente las posiciones para evitar amenazas.

- Visualización y Adaptación:
    - Mantener una representación mental clara de las posiciones deseadas.
    - Adaptar la estrategia según la evolución del tablero.

Para resolver este problema utilizaremos dos enfoques:

###  Enfoque de Divide y Conquista

La primera fase de este enfoque implica dividir el problema en partes manejables. En nuestro caso, segmentamos el tablero en secciones para alfiles blancos y negros. Al centrarnos en una sección a la vez, buscamos patrones y estrategias para organizar los alfiles sin amenazas.

Comenzamos por los alfiles blancos, considerando movimientos iniciales estratégicos y anticipando posiciones futuras. La repetición de este proceso para los alfiles negros nos permite abordar cada sección de manera más efectiva. Luego, integramos las soluciones para lograr el intercambio deseado.

### Exploración de Patrones

La búsqueda de patrones es esencial para comprender la dinámica del intercambio de alfiles. Observamos los movimientos iniciales y buscamos repeticiones en la secuencia de movimientos alternados entre alfiles blancos y negros. Identificamos posiciones estratégicas y movimientos fundamentales que evitan amenazas mutuas.


### Solución

1.

|  A1  |  A2  |  A3  |  A4  |
| :--: | :--: | :--: | :--: |
|  -   |  -   |  -   |  -   |
|  -   |  -   |  -   |  -   |
|  -   |  -   |  -   |  -   |
|  B1  |  B2  |  B3  |  B4  |



2.

|  -   |  A2  |  A3  |  A4  |
| :--: | :--: | :--: | :--: |
|  -   |  -   |  -   |  -   |
|  -   |  -   |  -   |  -   |
|  -   |  -   |  -   |  A1  |
|  B1  |  B2  |  B3  |  B4  |



3.

|  -   |  A2  |  A3  |  A4  |
| :--: | :--: | :--: | :--: |
|  -   |  -   |  -   |  -   |
|  -   |  -   |  B1  |  -   |
|  -   |  -   |  -   |  A1  |
|  -   |  B2  |  B3  |  B4  |



4.

|  -   |  A2  |  -   |  A4  |
| :--: | :--: | :--: | :--: |
|  -   |  -   |  -   |  A3  |
|  -   |  -   |  B1  |  -   |
|  -   |  -   |  -   |  A1  |
|  -   |  B2  |  B3  |  B4  |



5.

|  -   |  A2  |  -   |  A4  |
| :--: | :--: | :--: | :--: |
|  -   |  -   |  -   |  A3  |
|  B3  |  -   |  B1  |  -   |
|  -   |  -   |  -   |  A1  |
|  -   |  B2  |  -   |  B4  |



6.

|  -   |  A2  |  -   |  A4  |
| :--: | :--: | :--: | :--: |
|  -   |  -   |  -   |  A3  |
|  B3  |  -   |  B1  |  -   |
|  -   |  -   |  -   |  -   |
|  -   |  B2  |  A1  |  B4  |



7.

|  B1  |  A2  |  -   |  A4  |
| :--: | :--: | :--: | :--: |
|  -   |  -   |  -   |  A3  |
|  B3  |  -   |  -   |  -   |
|  -   |  -   |  -   |  -   |
|  -   |  B2  |  A1  |  B4  |



8.

|  B1  |  A2  |  -   |  A4  |
| :--: | :--: | :--: | :--: |
|  -   |  -   |  -   |  -   |
|  B3  |  -   |  -   |  -   |
|  -   |  -   |  -   |  -   |
|  A3  |  B2  |  A1  |  B4  |



9.

|  B1  |  A2  |  B3  |  A4  |
| :--: | :--: | :--: | :--: |
|  -   |  -   |  -   |  -   |
|  -   |  -   |  -   |  -   |
|  -   |  -   |  -   |  -   |
|  A3  |  B2  |  A1  |  B4  |



10.

|  B1  |  -   |  B3  |  A4  |
| :--: | :--: | :--: | :--: |
|  A2  |  -   |  -   |  -   |
|  -   |  -   |  -   |  -   |
|  -   |  -   |  -   |  -   |
|  A3  |  B2  |  A1  |  B4  |



11.

|  B1  |  -   |  B3  |  A4  |
| :--: | :--: | :--: | :--: |
|  A2  |  -   |  -   |  -   |
|  -   |  -   |  -   |  B2  |
|  -   |  -   |  -   |  -   |
|  A3  |  -   |  A1  |  B4  |



12.

|  B1  |  -   |  B3  |  -   |
| :--: | :--: | :--: | :--: |
|  A2  |  -   |  -   |  -   |
|  -   |  -   |  -   |  B2  |
|  A4  |  -   |  -   |  -   |
|  A3  |  -   |  A1  |  B4  |



13.

|  B1  |  -   |  B3  |  -   |
| :--: | :--: | :--: | :--: |
|  A2  |  -   |  -   |  -   |
|  -   |  B4  |  -   |  B2  |
|  A4  |  -   |  -   |  -   |
|  A3  |  -   |  A1  |  -   |



14.

|  B1  |  -   |  B3  |  -   |
| :--: | :--: | :--: | :--: |
|  A2  |  -   |  -   |  -   |
|  -   |  B4  |  -   |  B2  |
|  -   |  -   |  -   |  -   |
|  A3  |  A4  |  A1  |  -   |



15.

|  B1  |  -   |  B3  |  B4  |
| :--: | :--: | :--: | :--: |
|  A2  |  -   |  -   |  -   |
|  -   |  -   |  -   |  B2  |
|  -   |  -   |  -   |  -   |
|  A3  |  A4  |  A1  |  -   |



16.

|  B1  |  -   |  B3  |  B4  |
| :--: | :--: | :--: | :--: |
|  -   |  -   |  -   |  -   |
|  -   |  -   |  -   |  B2  |
|  -   |  -   |  -   |  -   |
|  A3  |  A4  |  A1  |  A2  |



17.

|  B1  |  B2  |  B3  |  B4  |
| :--: | :--: | :--: | :--: |
|  -   |  -   |  -   |  -   |
|  -   |  -   |  -   |  -   |
|  -   |  -   |  -   |  -   |
|  A3  |  A4  |  A1  |  A2  |


# 