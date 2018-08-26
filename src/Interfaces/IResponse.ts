import { HttpStatus } from '../Http/HttpStatus'


export interface IResponse {
    success?: boolean,
    message?: string,
    data?: Array<object> | object,
    status?: HttpStatus,
    errors?: Array<object>
}