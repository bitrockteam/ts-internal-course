# Lesson 4 - Tips and Tricks

- Author: [Marco Petreri](mailto:marco.petreri@bitrock.it)

- Go back [Home](../README.md)

## Summary

- Type Narrowing
  - Using type assertions
  - Non-null assertion operator
  - Type guards
    - typeof guard
    - instanceof guard
    - in guards
    - user-defined type guards
  - Discriminated unions
- Mapped types
  - Using keyof
  - Creating a mapped type
  - Using mapped types modifiers
  - Using typeof to infer a type
- Conditional types
- Tips and trick
  - Some utility types
  - Extend or narrow a type/interface

## Type Narrowing

In a TypeScript program, a variable can move from a less precise type to a more precise type. This process is called type narrowing.

```ts
type Animal = {
  name: string;
  legs?: number;
};
function addLeg(animal: Animal) {
  animal.legs = animal.legs + 1; // 💥 - Object is possibly 'undefined'
}
```

TypeScript raises a type error because the legs property could be undefined, (i.e `animal.legs: number | undefined)` and it doesn't make sense to add 1 to undefined.

To resolve this type error, we need to narrow the type of the legs property to number. i.e. we need to remove undefined from its type.

In this module we will learn different ways in which we can narrow types to prevent type errors

### Using type assertions

Type assertions are helpful when we know more about a variable value than TypeScript does.

There are two types of syntax for a type assertion. The first is to define the type in angle-brackets just before the value or expression we are asserting:

#### Angle-bracket syntax

```ts
const button = <HTMLButtonElement>document.querySelector(".go");
```

ESLint may warn about the use of the angle-bracket syntax because the "As" syntax is generally preferred. **This is the case** when using TypeScript in **React** apps because the React transpilation process may think the type assertion is a React component.

#### “As” syntax

The alternative and preferred syntax is to put the type after an as keyword after the expression:

```ts
const button = document.querySelector(".go") as HTMLButtonElement;
```

### Using the non-null assertion

The code contains a function that has a type error in its return statement.

```ts
function duplicate(text: string | null) {
  return text.concat(text); // error: text could be null
}
```

We can, of course, use a type assertion to resolve the type error. In this way TypeScript would understand that text on the return statement wasn't null.

```ts
function duplicate(text: string | null) {
  if (text === null || text === undefined) {
    text = "";
  }
  return text.concat(text);
}
```

> :warning: Our code is running in strict mode with `strictNullChecks` on. If `strictNullChecks` is off, then the non-null assertion operator isn't required.

#### Non-null assertion operator syntax

The non-null assertion operator is a concise way of avoiding unnecessary null and undefined checks in our code. We should only use this when we definitely know the variable or expression can't be `null` or `undefined`.

The non-null assertion operator is an exclamation mark (`!`), and this is placed after the variable or expression.

```ts
function duplicate(text: string | null) {
  return text!.concat(text);
}
```

### Type guards

A type guard is a mechanism of narrowing a type. There are several types of type guards in TypeScript.

Each type narrowing follows the same structure, we just need a “check“ like an `if` or a ternary expression where we have to put the right type assertion.

#### The `typeof` type guard

TypeScript can narrow the type of a variable following an `if` statement that uses a `typeof` check. This approach is useful when checking against primitive types.

> `typeof` is a JavaScript operator that returns a string indicating the JavaScript type of the operand

```ts
function double(item: string | number) {
  if (typeof item === "string") {
    return item.concat(item); // item is a string for sure
  } else {
    return item + item; // item is a number (by exclusion)
  }
}
```

#### The `instanceof` type guard

As we just saw about `typeof`, the `instanceof` operator can be used to help TypeScript narrow the type of a class object variable.
It is a JavaScript operator that can check whether an object belongs to a particular class. It also takes inheritance into account.

> :warning: It only works on `class` structures and not other TypeScript structures, such as `interfaces`.

```ts
function logError(error: string | Error) {
  const errorString = error instanceof Error ? error.message : error;
  console.error(errorString);
}
```

#### The `in` type guard

Again, the `in` operator can be used to help TypeScript narrow the type of an object variable by its property name. **It is arguably more useful** than `instanceof` because it can be applied to any object structure.

```ts
function logError(error: string | Error) {
  const errorString = "message" in error ? error.message : error;
  console.error(errorString);
}
```

#### Using a user-defined type guard with a type predicate

A _user-defined_ type guard can carry out checks on its parameter and use a type predicate to tell TypeScript its type. A _user-defined_ type guard that uses a type predicate must return a boolean value.

##### Understanding a type predicate

A _type predicate_ can be used in a function's return type to indicate the narrowed type of the parameter:

```ts
function isTypeName(paramName: WideTypeName): paramName is NarrowTypeName {
  // some check
  return boolean_result_of_check;
}
```

##### Creating a user-defined type guard

Let's create a user defined type guard to check whether an object is an `Error`:

```ts
interface CustomError {
  message: string;
}

function isError(error: Object): error is CustomError | Error {
  return (error as CustomErrorr).message !== undefined;
}

function logError(error: string | Error | CustomError) {
  const errorString = isError(error) ? error.message : error;
  console.error(errorString);
}
```

We could have used `"message" in error` as the return statement, but this could be used directly as a type guard. A more common implementation for a user-defined type guard is to check whether properties have values, which is what we have done here.

### The discriminated union

The discriminated union pattern is a way of narrowing a union type. A requirement for this pattern is for the types in the union to have a common property. Conditional statements can then be used on the common property as a type guard to narrow the union type.

The discriminated union pattern has three key parts:

1. The first part of the pattern is to have a common singleton type property. A singleton type is one that contains only a single value. An example of a singleton type is a string literal. This part of the pattern is called the discriminant:

```ts
interface CustomInterface {
  type_or_wathever: the_discriminant;
}
```

2. The second part of the pattern is to have a union type of all the singleton types used or we can let Typescript infer the union as we'll see in the example. This part of the pattern is called the union:

```ts
type UnionType = "foo" | "bar" | "baz";
```

3. The final part of the pattern is to have type guards on the common property which narrows the union type:

```ts
interface CustomCriticalError {
  type: "critical";
  message: string;
}

interface CustomFatalError {
  type: "fatal";
  stackTrace: string;
}

function logError(error: CustomCriticalError | CustomFatalError) {
  // here TS infers the union of the types from the union defined in the error param
  switch (error.type) {
    case "critical":
      console.warn(`An error has been catched: ${error.message}`);
      break;
    case "fatal":
      console.error(`A fatal error occurred: ${error.stackTrace}`);
      break;
  }
}
```

## Mapped Types

### Using `keyof`

The `keyof` type annotation can be used to extract the keys from an object. This is a key ingredient for creating mapped types which we will explore soon.

The `keyof` operator is sometimes referred to as the _index query operator_ because it queries the type specified after it. When TypeScript sees the `keyof` operator in a type annotation, it queries the type after it and extracts all its keys. It then constructs a union string literal type from the keys.

```ts
interface CustomInterface {
  foo: string;
  bar: number;
  baz: boolean;
}

type CustomInterfaceKeys = keyof CustomInterface; // 'foo' | 'bar' | 'baz'
```

### Creating a mapped type

Mapped types allow us to create new types based on an existing type. They are useful for handling generic data in a strongly-typed manner.

```ts
type MappedTypeName = { [K in UnionType]: ExistingType };
```

The `in` operator maps over each item in the union type to create a new type. In other words, the `in` operator allows us to loop through each type in a union type. In a loop iteration, each item in the union type is put in `K`, which becomes a key in the new type. So, the union type is usually a union of string literals. The type annotation in the mapped type is the type given to each key in the type.

So:

```ts
type ContactDetails = { [K in "name" | "email"]: string };
```

... creates the following type:

```ts
{
  name: string;
  email: string;
}
```

This becomes more useful when used with the keyof operator we learned about previously:

```ts
type ValidationTypes = {
  REQUIRED: "required";
  EMAIL: "email";
};

enum ValidationTypes2 {
  REQUIRED = "required",
  EMAIL = "email",
}

type ValidationMessages = {
  [key in keyof ValidationTypes]: string;
};

// produces
// type ValidationMessages = {
//     REQUIRED: string;
//     EMAIL: string;
// }

type ValidationMessages2 = {
  [key in ValidationTypes2]: string;
};

// produces
// {
//     required: string;
//     email: string;
// }
```

### Using mapped types modifiers

Mapped type modifiers add flexibility in mapped types to make properties required and writable.

By using a question mark `?` in front of the key's type annotation we can make a property optional:

```ts
{
  [K in keyof T]?: TypeName
}
```

The `readonly` modifier makes a property in the mapped type readonly (not modificable).

```ts
{
  readonly [K in keyof T]: TypeName
}
```

Using the `-` symbol before a `?` will map to a required key:

```ts
{
  [K in keyof T]-?: TypeName
}
```

Using the `-` symbol before the `readonly` keyword will map to a writable property:

```ts
{
  -readonly [K in keyof T]: TypeName
}
```

As an example, in the code editor below, we will create a couple of mapped types to make all the keys required or optional.

```ts
type Partial<T> = {
  [K in keyof T]?: T[K];
};

type Required<T> = {
  [K in keyof T]-?: T[K];
};
```

### Using `typeof` to infer a type

The `typeof` type annotation can be used to extract the type from an object. This approach reduces the types we need to create, making our code more maintainable.

Lets say you have the following data, you can create a type based on that:

```ts
const data = {
  value: 123,
  text: "text",
  subData: {
    value: false,
  },
};

type Data = typeof data;
// produces
// {
//     value: number;
//     text: string;
//     subData: {
//         value: boolean;
//     };
// }
```

## Conditional types

With the help of generics and the `never` type, conditional types allow utility types to be created that remove possible values from a type. This approach is heavily used within Typescript's standard utility types.

The conditional type syntax uses the ternary operator that we are familiar with from JavaScript code.

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```

`NonNullable` will remove `undefined` and `null` from the input type.

## Tip and Tricks

### Some utility types

Typescript provide several utility types that make our life much easier.

We already saw `Partial<T>` and `Required<T>`

Here an ideal use case:

```ts
interface Person {
  name: string;
  surname: string;
  age: number;
  address: string;
}

function patchPerson(update: Partial<Person>) {
  ....
}
```

What if we wanna omit or change a property from an iterface?

```ts
interface EventFromServer {
  name: string;
  date: string;
}

type LocalEvent = Omit<EventFromServer, "date"> & {
  date: Date;
};
```

or if we wanna do the inverse (just in case you wanna know how):

```ts
interface EventFromServer {
  name: string;
  location: string;
  date: string;
}

type LocalEvent = Pick<EventFromServer, "name" | "location"> & {
  date: Date;
};
```

Another very useful type is `ReturnType<T>`, when you have a function that produces a type that could change over time you may want to avoid to update the type but querying it from the function itself:

```ts
  function makeServiceContainer() {
    return {
      localeService: new LocaleService(),
      currencyService: new CurrencyService(),
      dataService: new DataService(),
      ...
    }
  }

  type ServiceContainer = ReturnType<typeof makeServiceContainer>;
  // produces
  // {
  //   localeService: LocaleService,
  //   currencyService: CurrencyService,
  //   dataService: DataService,
  //   ...
  // }
```

### Extend or narrow a type/interface

Using union and intersection we can extend and narrow a certain type or interface.

```ts
interface Person {
  id: string;
  name: string;
  surname: string;
  age: number;
  address: string;
}

// what if we wanna enforce that Person should still have the id?
function patchPerson(update: Partial<Person> & {id: string}) {
  ....
}

```

## Exercise:

- Create an inheritance chain of interfaces and a method that discriminates and works on them differently. Use discriminated unions and type guards to achive the goal and as much as possible of what we have seen so far.
