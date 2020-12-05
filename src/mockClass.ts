

type constructorTypeOf<T> = new (...args:any[]) => T;

export function mockDefaultApi<T>(o: T): T {
    const mocked: any = {};
    for (const key in o) {
        if (typeof o[key] === 'function') {
            mocked[key] = jest.fn();
        }
    }
    return mocked;
}

type MockedProxy<T> = jest.Mock<T extends (...args: any[]) => infer U ? U : T, any[]>;

type MockedClass<T> = {
    [k in keyof T]: MockedProxy<T[k]>;
}

export function mockClass<T>(constr: constructorTypeOf<T>): T & MockedClass<T>{
    let obj: T = new constr();
    const mocked: any = {};

    do {
        const properties = Object.getOwnPropertyNames(obj);
        for (const propertyName of properties) {
            if (typeof (obj as any)[propertyName] === "function" && !mocked[propertyName]) {
                mocked[propertyName] = jest.fn();
            }
        }
    } while (obj = Object.getPrototypeOf(obj));
    return mocked as any;
}
