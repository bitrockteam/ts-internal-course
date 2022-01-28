# Lesson 1 - Introduction and basic concepts

- Author: [Daniel Zotti](mailto:daniel.zotti@bitrock.it)

- Go back [Home](../README.md)

## Summary

- Primitive types
  - string
  - boolean
  - number
- Type Inference
- any
- Array & Tuple
- Object
- Interface (intro)
- Function

## Project creation

- Init project `npm init`
- Install typescript package `npm install --save-dev typescript` | `npm i -D typescript`
- optional steps:
  - `git init`
  - `touch .gitignore`
  - `echo 'node_modules' >> .gitignore`

### File compilation (`tsc` cli)

- Create TS file `touch index.ts`

```typescript
// index.ts
const message = "Hello!";
console.log(message);
```

- Compile index.ts into index.js using tsc (default target ES3)

`tsc index.ts`

Result:

```javascript
// index.js
var message = "Hello!";
console.log(message);
```

- `tsc --target ES6 index.ts`

Result:

```javascript
// index.js
const message = "Hello!";
console.log(message);
```

#### tsconfig.json

It's the default configuration file for `tsc` cli

- Create TS config file `touch tsconfig.json`

```json5
// tsconfig.json
{
  compilerOptions: {
    target: "es5",
    // The most common target for browsers
  },
  exclude: ["node_modules"],
}
```

- Run `tsc --project tsconfig.json` | `tsc` (`./tsconfig.json` is the default configuration file for tsc cli)

Result:

```javascript
// index.js
const message = "Hello!";
console.log(message);
```

- A common `tsconfig.json` file:

```json5
{
  compilerOptions: {
    target: "ES5",
    sourceMap: true,
    module: "CommonJS",
    // ES6, AMD, System, ...
    outDir: "dist",
    rootDir: "src",
    watch: true,
  },
  exclude: ["node_modules"],
}
```

- More info on typescript configuration file => https://www.typescriptlang.org/docs/handbook/compiler-options.html

### Importing files

```typescript
import { message } from "./constants.models";

console.log(message);
```

### Importing 3rd party libraries

Let's import [date-fns](https://www.npmjs.com/package/date-fns)

```typescript
import { format } from "date-fns"; // Treeshakeable
// import * as dateFns from 'date-fns'; // Non-Treeshakeable

const message = format(new Date(), "'Today is a' eeee");
// const message = dateFns.format(new Date(), "'Today is a' eeee");
console.log(message);
```

Modern libraries have their own type definition inside their own package, but if it's missing we can use the
DefinitelyTyped repository: a list of type definitions created by the community.

On [npmjs.com](https://www.npmjs.com) website, there's a little icon next to the package's name that define the type of
the "source" definition:

- `TS` TypeScript: The project has been written natively in TypeScript
- `DT` DefinitelyTyped: The project has been written in JavaScript and the type definition can be found on
  DefinitelyTyped repo (e.g. `@types/{npmProjectName}`)

_TypeScript_

- Install 3rd party library as usual `npm install date-fns`

_DefinitelyTyped_

- Install 3rd party library as usual `npm install lodash`
- Install type definition `npm install --save-dev @types/lodash`

## Theory

TypeScript is a **superset** of JavaScript. Any JavaScript code is valid TypeScript code; this is why TypeScript could
also use js files.

### Primitive types

[Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

Primitive types in TypeScript are:

- string
- number
- boolean

```typescript
let name: string;
name = "Daniel";
name = String("Daniel");
name = 2; // Error

let age: number;
age = 34;
age = Number(34);
name = { me: "Daniel" }; // Error

let isMale: boolean;
isMale = true;
isMale = Boolean(true);
isMale = "yes"; // Error
```

### Type Inference

[Docs](https://www.typescriptlang.org/docs/handbook/type-inference.html)

```typescript
let name = "Daniel";
let age = 32;
let isMale = true;
```

### any

[Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html?#any)

`any` is the implicit type of every variable that has no type defined, and it says that the variable can accept **all**
kind of type.

Avoid using any type all along the application, because it's like no using TypeScript features at all.

The `any` type is useful when you don’t want to write out a long type just to convince TypeScript that a particular line
of code is okay.

```typescript
let myVariable: any = 2;
myVariable = "Test";
myVariable = { name: "Daniel" };
```

See also [noImplicitAny](https://www.typescriptlang.org/docs/handbook/2/basic-types.html#noimplicitany)

### Array & Tuple

[Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)

```typescript
let myNumberArray: Array<number> = [1, 2, 3];
let myStringArray: Array<any> = ["One", "Two", "Three"];
let myTuple: [number, boolean, number, string] = [2, true, 1, "Daniel"];
let myDynamicTuple: [number, ...string] = [1, "Daniel", "Mario", "Luigi"];
```

### Object

[Docs](https://www.typescriptlang.org/docs/handbook/2/objects.html)

```typescript
let myObject: {
  name: string;
  age: number;
};

myObjetc = { name: "Daniel", age: 34 };
```

### Interface (intro)

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

### Function

[Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#functions),
[Advanced Docs](https://www.typescriptlang.org/docs/handbook/2/functions.html)

#### function keyword vs lambda

```typescript
function greet(name: string): void {
  console.log("Hello, " + name.toUpperCase() + "!!");
}

// or
const greet2 = (name: string): void => {
  console.log("Hello, " + name.toUpperCase() + "!!");
};
```

#### optional parameters

`function`'s parameter can be set as `optional` adding a `?` as a suffix.

```typescript
function greet(name?: string): void {
  const myName = name ? name : "Daniel";
  console.log("Hello, " + myName.toUpperCase() + "!!");
}
```

#### default values

A **default value** can be added to a parameter with an `=` and a default value.

```typescript
function greet(name = "Daniel"): void {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

#### Other examples

```typescript
function getFullName(name: string, surname: string): string {
  return `${name} ${surname}`;
}

function getFullName(obj: { name: string; surname: string }): string {
  return `${name} ${surname}`;
}

interface Person {
  name: string;
  surname: string;
}

function getFullName(obj: Person): Person {
  return `${name} ${surname}`;
}

function getPersonByNameAndSurname(name: string, surname: string): Person {
  return {
    nane,
    surname,
  };
}
```

#### function type definition

```typescript
function getFullName(obj: Person): Person {
  return `${name} ${surname}`;
}

function sum(a: number, b: number): number {
  return a + b;
}

let sumFunction: (a: number, b: number) => number;
sumFunction = sum;
sumFunction = getFullName; // Error

let mySum: (a: number, b: number) => number;
mySum = (a: number, b: number): number => a + b;
```

## Exercise

Define types for [Rick and Morty API](https://rickandmortyapi.com).

The REST API to use is the one that manages characters: https://rickandmortyapi.com/api/character.

List all characters as objects of `name`, `species` and `episodesCount` in console.

NB: If pagination is difficult to manage, get all characters of first page only.

### Prerequisites:

- `npm install --save-dev @types/node` (Node environment doesn't have types pre-installed).
- `npm install node-fetch` (Node environment doesn't have access to browser's fetch API).
- `node v14.17.6` or higher.
- `tsconfig.json` file.

```json5
{
  compilerOptions: {
    target: "ES2021",
    module: "ES2022",
    outDir: "dist",
    rootDir: "src",
    moduleResolution: "node",
    //    "sourceMap": true,
    //    "watch": true
  },
  exclude: ["node_modules"],
}
```

## Useful resources

- [Typescript/Node: Error [ERR_MODULE_NOT_FOUND]: Cannot find module](https://stackoverflow.com/questions/65551383/typescript-node-error-err-module-not-found-cannot-find-module)
- [ESM](https://nodejs.org/api/esm.html)

## Next(?)

### Bonus point

Add the capability to request a specific page and list the first 15 pages of characters with the previous format.

### Extra bonus point

Use a generator to do the previous task 😏

### unknown

[Docs](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)

`unknown` is the type-safe counterpart of `any`. Anything is assignable to `unknown`, but `unknown` isn’t assignable to
anything but itself.

No operations are permitted on an `unknown` without first **asserting** or **narrowing** to a more specific type.
