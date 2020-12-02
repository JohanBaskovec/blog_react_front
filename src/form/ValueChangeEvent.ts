export class ValueChangeEvent<T> {
    constructor(private _name: string, private _newValue: T) {

    }

    get name(): string {
        return this._name;
    }

    get newValue(): T {
        return this._newValue;
    }
}

export type ValueChangeEventHandler<T> = (e: ValueChangeEvent<T>) => void;
