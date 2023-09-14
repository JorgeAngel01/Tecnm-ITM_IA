
- [Unidad 1](#unidad-1)
- [Unidad 2](#unidad-2)
- [Unidad 3](#unidad-3)


# Unidad 1

## Apuntes

- [Tema 1](#tema-1)
- [Tema 2](#tema-2)
- [Tema 3](#tema-3)
- [Tema 4](#tema-4)

## Actividades

- [Actividad 1](#actividad-1)
- [Actividad 2](#actividad-2)
- [Actividad 3](#actividad-3)
- [Actividad 4](#actividad-4)
- [Actividad 5](#actividad-5)


---

## Tema 1

Aquí puedes escribir tus apuntes y notas relacionadas con el tema 1 de la unidad.

## Tema 2

Apuntes y notas del tema 2.

## Tema 3

Apuntes y notas del tema 3.

## Tema 4

Racionalidad.

Un agente racional es aquel que que debe aprender aquella accion que maximice su medida de rendimiento.

---

## Actividad 1

Detalles de la actividad 1, instrucciones y resultados.

## Actividad 2

Detalles de la actividad 2, instrucciones y resultados.

## Actividad 3

Detalles de la actividad 3, instrucciones y resultados.

## Actividad 4

### Estrategia para nunca perder con en gato 3d

Para no perder creo que es importante tener estos dos puntos en cuenta:

- **Control del centro**: Al igual que en el juego de gato clasico, tener el control del centro del tablero facilita el acto de empatar, asi como el de ganar. Tener el centro nos permite generar una linea en multiples direcciones.
- **Bloquear al oponente**: Si el oponente está cerca de ganar en una dirección específica, hay que colocar la ficha en esa dirección para bloquearlo.

Teniendo en cuenta esos dos puntos se puede seguir una secuencia basica para definir las acciones de la IA:
    
1.  **Generación de movimientos**: Hay que ver que movimiento esta disponible, esto implica encontrar las celdas vacías, asi como las celdas nuestras y del oponente en las tres dimensiones.
    
2.  **Evaluación del movimiento**: Diseña una función de evaluación que califique la bondad de un estado del juego. Esta función debe considerar patrones ganadores en todas las direcciones posibles en tres dimensiones, así como amenazas del oponente y oportunidades propias de ganar.
    
3.  **Selección del mejor movimiento**: Seleccionar el movimiento que tnega la mejor evaluacion, según corresponda al turno del jugador. Esto garantiza que el jugador trate de ganar o evitar perder en cada paso.
 
 4.  **Realización del movimiento**: Una vez que se ha seleccionado el mejor movimiento, realizar este movimiento en el tablero y actualizar el juego.
    
5.  **Repetición del proceso**: Repetir estos pasos en cada turno hasta que se alcance una condición como una victoria o empate.

## Actividad 5

Mejor medida de rendimiento y mejor secuencia para el problema del hombre, lechuga,pollo y zorro; problema de los tres canibales y tres monjes

### Problema 1: 

Medida de rendimiento:
- Menor cantidad de movimientos.
- El pollo no debe estar solo con el zorro, ni la lechuga.
- El hombre debe manejar el bote
- Solo dos por viaje del bote
- Pasar a todos al otro lado

Secuencia de percepciones:

| H, L, P, Z |  |             |
|--          |--| --          |
| H, L, Z    |  | P           |
| H, Z, P    |  | L           |
| H, P       |  | L, Z        |
|            |  | H, P ,L, Z  |

### Problema 2: 

Medida de rendimiento:
- Menor cantidad de movimientos.
- No dejar a los monjes solos con los canibales
- Dos individuos por bote
- Pasar a todos al otro lado

Secuencia de percepciones:

| C,C,C,M,M,M |  |              |
|--           |--| --           |
| C,C,M,M     |  | C,M          |
| M,M,M       |  | C,C,C        |
| C,M         |  | M,M,C,C      |
|             |  | M,M,M,C,C,C  |


---

# Unidad 2