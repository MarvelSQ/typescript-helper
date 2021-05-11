# typescript-helper

some tricky typescript utilities

## Keys\<T\>

Keys is a Generic to get real keys and prevent keys narrow down to _string|number_
```ts
type OriginType = {
    name?: string;
    age?: number;
    [x:string]: any;
}

// now i want to get key of OriginType
type OriginKeys = keyof OriginType;
// oops, there is string|number ! where is "name"|"age"?

// now we use Keys to get keys
type RealOriginKeys = Keys<OriginType>;
// "name" | "age"
```

## SafeOmit<T, K>

SafeOmit is a safe way to omit properties from ObjectType, by using **Keys**, Omited Type can be more accurate
```ts
type OriginType = {
    name?: string;
    age?: number;
    [x:string]: any;
}
// now i want to remove age of OriginType
type NoAgeType = Omit<OriginType, "age">;
// actual we get {[x:string]:any;[x:number]:any}

// use SafeOmit
type RealNoAgeType = SafeOmit<OriginType, "age">;
// { name?: string }
```