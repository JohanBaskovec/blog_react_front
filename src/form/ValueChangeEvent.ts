export class ValueChangeEvent<T> {
    constructor(private _name: string, private _value: T) {

    }

    get name(): string {
        return this._name;
    }

    get value(): T {
        return this._value;
    }
}

export type ValueChangeEventHandler<T> = (e: ValueChangeEvent<T>) => void;
