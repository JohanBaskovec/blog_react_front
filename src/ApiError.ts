export enum ApiErrorType {
    invalidRequest,
    notFound,
    unknown,
}

export class ApiError {
    private _type: ApiErrorType = ApiErrorType.unknown;
    private _code: number = 500;
    private _message = '';

    public static fromError(error: any) {
        let apiError = new ApiError();
        if (error.status) {
            apiError._code = error.status;
            switch (error.status) {
                case 400:
                    apiError._type = ApiErrorType.invalidRequest;
                    break;
                case 404:
                    apiError._type = ApiErrorType.notFound;
                    break;
                default:
                    apiError._type = ApiErrorType.unknown;
                    break;
            }
            if (error.message) {
                apiError._message = error.message;
            }
        }
        return apiError;
    }

    get type(): ApiErrorType {
        return this._type;
    }

    get code(): number {
        return this._code;
    }

    get message(): string {
        return this._message;
    }
}
