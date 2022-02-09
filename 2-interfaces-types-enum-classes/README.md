# Lesson 2 - Interfaces, type Aliases, enum, classes

- Author: [Yi Zhang](mailto:yi.zhang@bitrock.it)

- Go back [Home](../README.md)

## Summary

- Interfaces
- type Aliases
- enum
- classes

## Interfaces (intro)

[Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)

An `interface` declaration is another way to name an object type and to make it reusable.

```typescript
interface Person {
  name: string;
  age: number;
}

let myObject: Person = { name: "Daniel", age: 34 };
// let myObject: { name: string; age: number } = { name: 'Daniel', age: 34 };
```

Fields in `interface` can be set as `optional` adding a `?` as a suffix.

```typescript
interface Person {
  name: string;
  age?: number; // <- now "age" is not mandatory
}
```

### Good To Know

1. Interfaces, like type annotations, are not compiled to the output JavaScript. They exist purely in the TypeScript type system.
2. it possible to make a property read only using the modifier `readonly`

```typescript
interface Messenger {
  readonly announcement: string;
}

function proclaim(messenger: Messenger) {
  // Ok: reading the message property doesn't attempt to modify it
  console.log(messenger.announcement);

  messenger.announcement += "?";
  //        ~~~~~~~~~~~~
  // Error: Cannot assign to 'announcement'
  // because it is a read-only property.
}
```

### Interface Extensions

```typescript
interface Athlete {
  name: string;
}

interface Swimmer {
  style: string | string[];
}

interface Gymnast extends Athlete {
  moves: string[];
}

// multiple extension
interface Bob extends Gymnast, Swimmer {
  sayHi: () => string;
}
```

### Type Aliases

[Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

Type aliases allow you to create a new name for an existing type

```typescript
type alphanumeric = string | number;
let input: alphanumeric;
input = 100; // valid
input = "Hi"; //valid
input = false; // Compiler error

type Animals = "dog" | "cat" | "mole";

type Actions =
  | { type: "openModal"; payload: true }
  | { type: "closeModal"; payload: false };

type Point = {
  x: number;
  y: number;
};
```

### Interfaces vs Type Aliases

[Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.
(note Interface are better integrated with Classes)

- It's suggested to use type alias to describe single value type
- Use Interfaces to describe object and classes for a better extension syntax and having the possibility to re-open the interface declaration (redefine the interface)
- Type Aliases can be extended using & (intersection).

Extending a interface

```typescript
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

Extending a type via intersections

```typescript
type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: boolean;
};

const bear = getBear();
bear.name;
bear.honey;
```

### Enumerations

[Docs](<[Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)>)

1. Numeric enum

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction.Up); // = 0
console.log(Direction.Down); // = 1

enum Direction {
  Up = 2,
  Down,
  Left,
  Right
}

console.log(Direction.Up); // = 2
console.log(Direction.Down); // = 3
```

2. String Enum

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
```

3. Heterogenous Enum

```typescript
enum Answer {
  No = 0,
  Yes = "YES"
}
```

4. Computed and constant members

```typescript
enum FileAccess {
  // constant members
  None,
  Read = "read",
  Write = "write",
  ReadWrite = Read | Write,
  // computed member
  G = "123".length
}
```

**You don't need Enumeration:**

In modern TypeScript, you may not need an enum when an object with as const could suffice:\
The biggest argument in favour of this format over TypeScript’s enum is that it keeps your codebase aligned with the state of JavaScript, and when/if enums are added to JavaScript then you can move to the additional syntax.

```typescript
const enum EDirection {
  Up,
  Down,
  Left,
  Right
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3
} as const;
```
