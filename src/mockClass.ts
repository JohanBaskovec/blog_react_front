
// Function to mock a single object instead of a module (like jest.mock does),
// and mocks its member arrow functions too.
// (TODO, work in progress)
export function mockClass<T>(o: T): T {
    const mocked: any = {};
    for (const key in o) {
        if (typeof o[key] === 'function') {
            mocked[key] = jest.fn();
        }
    }
    return mocked;
}
