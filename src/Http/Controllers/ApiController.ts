import { IResponse } from "../../Interfaces/IResponse";
import { HttpStatus } from "../HttpStatus";

export default class ApiController
{
    /**
     * Responds with no content.
     */
    protected static respondNoContent(ctx: any)
    {
        let response: IResponse = {};

        response.success = false;
        response.data = [];
        response.message = "no content!";
        response.status = HttpStatus.NO_CONTENT;

        ctx.throw(JSON.stringify(response), HttpStatus.NO_CONTENT);
        
        return Promise.resolve(ctx);
    }

    /**
     * Responds with data.
     */
    protected static respondWithData(ctx: any, data: Array<object> | object)
    {
        let response: IResponse = {};

        response.success = true;
        response.data = data;
        response.message = "success!";
        response.status = HttpStatus.OK;

        ctx.body = response;
        ctx.status = HttpStatus.OK;

        return Promise.resolve(ctx);
    }

    /**
     * Responds with validation failed.
     */
    protected static respondValidationFailed(ctx: any, errors?: Array<object>, message?: string)
    {
        let response: IResponse = {};

        response.success = false;
        response.message = message || "validation error!";
        response.status = HttpStatus.UNPROCESSABLE_ENTITY;
        response.errors = errors || [];
        
        ctx.throw(JSON.stringify(response), HttpStatus.UNPROCESSABLE_ENTITY);
    
        return Promise.resolve(ctx);
    }

     /**
     * Responds with error.
     */
    protected static respondWithError(ctx: any, message?: string)
    {
        let response: IResponse = {};

        response.success = false;
        response.message = message || "error!";
        response.status = HttpStatus.UNPROCESSABLE_ENTITY;
        
        ctx.throw(JSON.stringify(response), HttpStatus.UNPROCESSABLE_ENTITY);
    
        return Promise.resolve(ctx);
    }
}