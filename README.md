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

## Allow<T, A>

Allow is a Generic for React ComponetProps Condition
```ts
// we need to allow more props to add in component
function Base({name, age, ...props}: {name:string;age:number}){
    return <div {...props}>{name}: {age}</div>;
}

// we can modify props type to {name: string; age: number; [x:string]: any}
const Instance = <Base name="test" age={20} className="addition-class">
// in this case, Base Component's prop type was polluted by [x:string]: any
// means, this is some props that dosen't belong to 'Base'

// or
function Base<P>({name, age, ...props}: P & Allow<{name: string; age: number}, P>){
    return <div {...props}>{name}: {age}</div>;
}
// this time, your props can keep original type, and **allow** you to control component in Instance
```