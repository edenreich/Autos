import { HttpStatus } from '../Http/HttpStatus'


export interface IResponse {
    success?: boolean,
    message?: string,
    data?: object,
    status?: HttpStatus
}