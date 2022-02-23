# Lesson 3 - Generics

- Author: [Federico Muzzo](mailto:federico.muzzo@bitrock.it)

- Go back [Home](../README.md)

## Summary

- Abbreviazioni comuni
    - T, I, E, K, V
- Funzioni con i generici
- Tipi con i generici
- Interfacce coi generici
- Classi con i generici
- Generici estendono
- Generici implementano
- Generici standard
    - Array<T>
    - Promise<T>
    - Record<K,V>
- Pick, Omit, Partial, Required
- Generici di default

### Exercise:

+ Tipizzare la funzione che fa il fetch da un servizio remoto, rendendo flessibile il tipo di risposta, l'url del servizio, e impelementando i tipi standard Record e Promise

+ Creare una funzione standard che fa un sort alfabetico di una lista, dove la lista include oggetti con una chiave in comune fra tutti
