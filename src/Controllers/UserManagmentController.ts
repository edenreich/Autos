import { BaseContext } from "koa";

export default class UserManagmentController
{
    constructor() 
    {
        //
    }

    public static async show(ctx: any) 
    {
        ctx.body = `showing..${ctx.params.id}`;
        ctx.status = 200;
    }

    public static async create(ctx: BaseContext) 
    {
        ctx.body = "creating..";
        ctx.status = 200;
    }
}