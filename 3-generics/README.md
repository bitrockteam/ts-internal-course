# Lesson 3 - Generics

- Author: [Federico Muzzo](mailto:federico.muzzo@bitrock.it)

- Go back [Home](../README.md)

## Summary

- Common abbreviations
    - T, I, E, K, V
- Generic methods
- Generic interfaces and types
- Generic classes
- Default Types
- Generics with a restraint
- Standard generics
    - Array<T>
    - Promise<T>
    - Record<K,V>
- Pick, Omit, Partial, Required

## Common abbreviations

Usually when employing generics in the exercises and in everyday usage of Typescript, the following letters are usually referring to the following concepts:

- T = Type
- I = Interface
- E = Enum
- K = Key
- V = Value

Knowing this can make the generics syntax look a little less intimidating.

## Generic methods

The most common usage of generics is with functions. They are standins for types that we might, or might not, expect other developers to use. Using a number of operations, we can restrict what sort of arguments can be used, or return values will be spit out. Here is a common example:


```ts
/* We can receive any array that features the T type of elements, and return the first one */
function getFirstElement<T>( array: T[] ): T {
    return array[0];
}

/* We can use it with any sort of typed values */
type Coordinate = [number, number];
const coords: Coordinate[] = [[3,3], [6,8], [-3,4]];
const firstPoint = getFirstElement<Coordinate>(coords); // [3,3]
/* ... */
type Contact = { name: string, lastName: string };
const book: Contact[] = [{name: "Mario", lastName: "Rossi"}, {name: "Anna", lastName: "Verdi"}];
const firstContact = getFirstElement<Contact>(book); // {name: "Mario", lastName: "Rossi"}
```

## Generic interfaces and types

As we can use generics to define a method signature, we can define interfaces and types both by allowing for a generic to be passed. This allows us for example to expose similar contracts from classes that implement an interface.

```ts
/* We pass an enum to a sort of "smart" indicator */
interface IStatus<E> {
  status: E;
  setStatus: (newStatus: E) => void;
}

enum Color { Red, Yellow, Green };
enum Direction { Left, Forward, Right };

class Semaphore implements IStatus<Color> {
  public status = Color.Green;
  setStatus = ( newColor: Color ) => this.status = newColor;
}

class Sign implements IStatus<Direction> {
  public status = Direction.Forward;
  setStatus = ( newDirection: Direction ) => this.status = newDirection;
}

const aSign = new Sign();
console.clear();
console.log(aSign.status); // Direction.Forward === 1;
aSign.setStatus(Direction.Left);
console.log(aSign.status); // Direction.Left === 0;
aSign.setStatus(Color.Red); // Argument of type 'Color.Red' is not assignable to parameter of type 'Direction';
```

## Generic classes

Classes can also use generics in their signatures.

```ts
class Log<T> {
  private logs: T[] = [];

  public push = (newLog: T): void => {
    this.logs = [...this.logs, newLog];
  };
  public clear = (): void => {
    this.logs = [];
  };

  public last = (): T => this.logs[0];
  public print = (): void => console.log(this.logs);
}
```
## Default Types

We can pass a default type in our signature, so our users can omit to define the type they're using. Let's rewrite the previous example so that our Log expects an object if we don't give it any type.

```ts
class Log<T = {}> {
  private logs: T[] = [];

  public push = (newLog: T): void => {
    this.logs = [...this.logs, newLog];
  };
  public clear = (): void => {
    this.logs = [];
  };

  public last = (): T => this.logs[0];
  public print = (): void => console.log(this.logs);
}

const httpLog = new Log();
httpLog.push("/another-route/");
/* No error from compiler */
httpLog.push({ method: "GET", route: "/example/" });
/* Argument of type '{ method: string; route: string; ip: string; }' is not assignable to parameter of type 'string'. */
httpLog.print();
```

## Generics with a restraint

Let's say we want our Log to have generic messages, but also have with date attached to them, so we can sort them by that value. Therefore we make sure that our T is always an object carrying a date. We're gonna make sure that T has the kind of data we need.

```ts
interface ICall {
    date: string,
    number: 555123456
}

class Log<T extends { date: string }> {
  private logs: T[] = [];

  public push = (newLog: T): void => {
    this.logs = [...this.logs, newLog];
  };
  public clear = (): void => {
    this.logs = [];
  };

  public last = (): T => this.logs[0];
  public print = (): void => console.log(this.logs);
}

/* Can't do this anymore! */
const httpLog = new Log<{method: string, route: string}>();
/* But we can do this: */
const httpLog = new Log<{date: string, method: string, route: string}>();
/* Or we can pass an appropriate interface to our generic class, that meets the demands we set in the signature */
const callLog = new Log<ICall>();
```

## Standard generics

When we spoke about generic types, we mentioned that we could pass a type to a function so to have both the return value and the elements in the array function share the same type. We can in fact define an array using a generic type, indeed Array.

```ts
type NumArray = Array<number>;
const scores: NumArray = [];
scores.push(10); // [10];
scores.push("ottimo") // Argument of type 'string' is not assignable to parameter of type 'number'.
```

Another useful standard generic is Promise<T>. This makes it possible to type in the kind of value we expect our promise to assume in the future.

```ts
type Verb = "POST" | "GET";
type Bill = { id: string, value: number, datetime: string };

const hocApiFetch = <T>(url: string, method: Verb) => async (id: string): Promise<T> => {
    const response = await fetch(url + id, {method});
    const data: Promise<T> = response.json();
    return data;
}

const fetchBill = hocApiFetch<Bill>("/bills/", "GET");
const bill: Promise<Bill> = fetchBill("1");
```

## Utility types (Pick, Omit, Partial, Required...)

TypeScript provides several global types that can be useful in certain situations in addition to the standard generics. [A list is available on the official website.](https://www.typescriptlang.org/docs/handbook/utility-types.html)

```ts
interface Contact {
    id?: number,
    name: string,
    last_name: string,
    email: string,
}
/* Let's make a contact list using the standard type Record<K,V>, whcih gives us a map where K is the key and V is the value */
type ContactList = Record<number, Contact>;
/* In the real world, we would probably have something like UUIDs or incremental values or another kind of unique information, but I'm using a number here for simplicity. */

const myList: ContactList = {
    0: {
        name: "Mario",
        last_name: "Rossi",
        email: "mario.rossi@example.com",
    },
    1: {
        name: "Luigi",
        last_name: "Bianchi",
        email: "b.luigi@example.com",
    },
    2: {
        name: "Anna",
        last_name: "Verdi",
        email: "a.verdi@example.com",
    },
};
```

A type created using Partial<T> has all the keys of T, but set to optional. Therefore, it will match any object that has some or one of the properties of the original type.

```ts
class Contacts {
    private list: ContactList = myList;
    public updateContactById = (id: number, newFields: Partial<Contact>): ContactList => {
        this.list[id] = {
            ...this.list[id],
            ...newFields
        }
        return this.list;
    }
}
```

Conversely, using Required<T> imposes all fields to be mandatory. (This way we could omit the first argument from the former example.)

```ts
class Contacts {
    /* ... */
    public replaceContact = (replacement: Required<Contact>): ContactList => {
        this.list[replacement.id] = replacement;
        return this.list;
    };
}
```

A type created using Pick<T, Keys> will return an object with a subset of keys from T. Keys can be passed as a literal, or union of literals. Omit<T, Keys> works in reverse, omitting the keys from the object.

```ts
type Names = "name" | "last_name";

type ContactNames = Pick<Contact, Names>;
type ContactMails = Pick<Contact, "email">;

type ContactWithoutNames = Omit<Contact, Names>;

class Contacts {
    /* ... */
    public getAllNames = (): Array<ContactNames> => Object.entries(this.list).map(([, {name, last_name}]) => ({
        name, last_name
    }));
    /* ... */
    public getAllEmails = (): Array<ContactMails> => Object.entries(this.list).map(([, {email}]) => ({
        email
    }));
    /* Same operation as above! */
    public getOnlyEmails = (): Array<ContactWithoutNames> => Object.entries(this.list).map(([, {email}]) => ({
        email
    }));
}
```

## Exercise:

+ Create a generic class that does fetching from a remote API, and allow users to pass in the type of the response and the type of the parameters to be sent to the API. Return a set of records using the standard type.

+ Make a standard function to sort a number of records, that expects the records to have a common generic key.
