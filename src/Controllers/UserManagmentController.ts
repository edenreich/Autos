import { BaseContext } from "koa";

export default class UserManagmentController
{
    constructor() 
    {
        //
    }

    public static create(ctx: BaseContext) 
    {
        ctx.body = "creating..";
        ctx.status = 200
    }
}