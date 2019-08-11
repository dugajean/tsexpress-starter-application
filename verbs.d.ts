export interface Route {
    path: string;
    handler: Function;
    middlewares?: Function[];
}
export declare function Get(route?: string, ...middlwares: Function[]): (target: object, key: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function Post(route?: string, ...middlwares: Function[]): (target: object, key: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function Patch(route?: string, ...middlwares: Function[]): (target: object, key: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function Put(route?: string, ...middlwares: Function[]): (target: object, key: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function Delete(route?: string, ...middlwares: Function[]): (target: object, key: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
