/**
 * @description remove [x:string]:any
 */
type Keys<T extends { [x: string]: any;[x: number]: any }> = {
    [K in keyof T]: string extends K
    ? never
    : number extends K
    ? never
    : K;
} extends { [_ in keyof T]: infer U }
    ? U
    : never;


/**
 * @description omit properties beasd on Keys
 */
type SafeOmit<T, K extends string | number | symbol> = Exclude<Keys<T>, K> extends keyof T
    ? Pick<T, Exclude<Keys<T>, K>>
    : {};