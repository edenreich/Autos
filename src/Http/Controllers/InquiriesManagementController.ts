import { BaseContext } from "koa";
import { IResponse } from "../../Interfaces/IResponse";
import { Inquiry } from "../../Models/Inquiry";

export default class InquiriesManagementController
{
    public static async show(ctx: any): Promise<any>
    {
        ctx.body = `showing..${ctx.params.id}`;
        ctx.status = 200;
    }

    public static async create(ctx: any): Promise<any>
    {
        
    }
}
